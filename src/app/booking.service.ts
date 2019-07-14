import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getSlotsByDate(date: moment.Moment) {
    let params = new HttpParams();
    params = params.append('date', date.format('DD-MM-YYYY'));
    return this.http.get(`${environment.API_URL}/booking`, { params });
  }

  getSlotsCountByDateRange(startDate: moment.Moment, endDate: moment.Moment) {
    let params = new HttpParams();
    params = params.append('startDate', startDate.format('DD-MM-YYYY'));
    params = params.append('endDate', endDate.format('DD-MM-YYYY'));
    return this.http.get(`${environment.API_URL}/booking/slots`, { params });
  }

  getSlotByDate(date: moment.Moment) {
    let params = new HttpParams();
    params = params.append('date', date.toISOString());
    return this.http.get(`${environment.API_URL}/booking/slot`, { params });
  }
}
