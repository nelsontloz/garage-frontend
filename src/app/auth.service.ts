import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first, skipWhile } from 'rxjs/operators';
import { ISession, Account } from './interfaces/session.interface';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
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
    this.http
      .get(`${environment.API_URL}/auth`)
      .pipe(first())
      .subscribe(
        (sessionResponse: ISession) => {
          this.accountChangeSub.next(sessionResponse.account);
        },
        error => {
          this.cookiesService.delete('accessToken');
          this.accountChangeSub.next(null);
        }
      );
  }

  signUp(values: any) {
    return this.http.post(`${environment.API_URL}/account`, values);
  }

  logout() {
    return this.http.put(`${environment.API_URL}/auth/logout`, {}).pipe(
      map((sessionResponse: ISession) => {
        this.removeAccount();
        this.cookiesService.delete('accessToken');
        return sessionResponse;
      })
    );
  }

  revoke(sessionId: string) {
    return this.http
      .put(`${environment.API_URL}/auth/revoke`, { sessionId })
      .pipe(
        map((sessionResponse: ISession) => {
          this.removeAccount();
          this.cookiesService.delete('accessToken');
          return sessionResponse;
        })
      );
  }

  checkAuth() {
    const accessToken = this.cookiesService.get('accessToken');
    if (!accessToken) {
      return this.accountChangeSub;
    }
    return this.accountChangeSub.pipe(
      skipWhile((account: Account) => {
        return !account;
      })
    );
  }

  getAccount() {
    return this.accountChangeSub;
  }

  removeAccount() {
    this.accountChangeSub.next(null);
  }

  authenticate(email: string, password: string) {
    return this.http
      .post(`${environment.API_URL}/auth`, {
        email,
        password,
      })
      .pipe(
        map((sessionResponse: ISession) => {
          this.cookiesService.set(
            'accessToken',
            sessionResponse.accessToken,
            new Date(sessionResponse.expiration)
          );
          this.accountChangeSub.next(sessionResponse.account);
          return true;
        })
      );
  }
}
