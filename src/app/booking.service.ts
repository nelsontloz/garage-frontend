import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Moment } from 'moment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getSlotsByDate(date: Moment) {
    let params = new HttpParams();
    params = params.append('date', date.format('dd-mm-yyyy'));
    console.log(params);
    return this.http.get(`${environment.API_URL}/booking`, { params });
  }
}
