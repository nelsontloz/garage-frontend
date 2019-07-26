import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay, first, flatMap } from 'rxjs/operators';
import { ISession, Account } from './interfaces/session.interface';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accountChangeSub = new BehaviorSubject<Account>(null);

  constructor(private http: HttpClient, private cookiesService: CookieService) {
    this.accountChangeSub.next(null);
    const accessToken = this.cookiesService.get('accessToken');
    if (!accessToken) {
      this.accountChangeSub.next(null);
      return;
    }
    http.get(`${environment.API_URL}/auth`).pipe(first()).subscribe((sessionResponse: ISession) => {
      this.accountChangeSub.next(sessionResponse.account);
    });
  }

  authenticate(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/auth`, {
      email,
      password
    }).pipe(
      map((sessionResponse: ISession) => {
        this.cookiesService.set('accessToken', sessionResponse.accessToken, moment(sessionResponse.expiration).toDate());
        this.accountChangeSub.next(sessionResponse.account);
        return true;
      })
    );
  }

  revoke() {
    return this.http.put(`${environment.API_URL}/auth/revoke`, {}).pipe(map(
      (sessionResponse: ISession) => {
        this.accountChangeSub.next(null);
        this.cookiesService.delete('accessToken');
        return sessionResponse;
      }
    ));
  }

  getAccount() {
    return this.accountChangeSub;
  }

}
