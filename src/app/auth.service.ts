import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { ISession } from './interfaces/session.interface';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookiesService: CookieService) { }

  authenticate(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/auth`, {
      email,
      password
    }).pipe(
      first(),
      map((sessionResponse: ISession) => {
        this.cookiesService.set('accessToken', sessionResponse.accessToken, moment(sessionResponse.expiration).toDate());
        return true;
      })
    );
  }
}
