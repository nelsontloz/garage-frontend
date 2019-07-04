import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { ISession } from './interfaces/session.interface';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookiesService: CookieService) { }

  authenticate(email: string, password: string) {
    return this.http.post('http://localhost:3000/auth', {
      email,
      password
    }).pipe(first()).subscribe((sessionResponse: ISession) => {
      this.cookiesService.set('accessToken', sessionResponse.accessToken, moment(sessionResponse.expiration).toDate());
    });
  }
}
