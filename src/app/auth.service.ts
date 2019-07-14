import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, first, flatMap } from 'rxjs/operators';
import { ISession, Account } from './interfaces/session.interface';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accountSub: Subject<Account>;

  constructor(private http: HttpClient, private cookiesService: CookieService) {
    this.accountSub = new Subject<Account>();
    const accessToken = this.cookiesService.get('accessToken');
    if (!accessToken) {
      this.accountSub.next(null);
      return;
    }
    http.get(`${environment.API_URL}/auth`).pipe(first()).subscribe((sessionResponse: ISession) => {
      this.accountSub.next(sessionResponse.account);
    });
  }

  authenticate(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/auth`, {
      email,
      password
    }).pipe(
      map((sessionResponse: ISession) => {
        this.cookiesService.set('accessToken', sessionResponse.accessToken, moment(sessionResponse.expiration).toDate());
        this.accountSub.next(sessionResponse.account);
        return true;
      })
    );
  }

  revoke() {
    const revoke = this.http.put(`${environment.API_URL}/auth/revoke`, {}).pipe(first());
    revoke.subscribe((sessionResponse: ISession) => {
      this.accountSub.next(null);
      this.cookiesService.delete('accessToken');
    });
    return revoke;
  }

  getAccount() {
    return this.accountSub;
  }
}
