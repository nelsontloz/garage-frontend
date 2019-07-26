import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getSlotsByCustomer() {
    return this.http.get(`${environment.API_URL}/booking/my-slots`);
  }

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

  getBookedSlotsCountByDateRange(
    startDate: moment.Moment,
    endDate: moment.Moment
  ) {
    let params = new HttpParams();
    params = params.append('startDate', startDate.format('DD-MM-YYYY'));
    params = params.append('endDate', endDate.format('DD-MM-YYYY'));
    return this.http.get(`${environment.API_URL}/booking/booked-slots`, {
      params,
    });
  }

  getBookedSlotsDetailsDateRange(
    startDate: moment.Moment,
    endDate: moment.Moment
  ) {
    let params = new HttpParams();
    params = params.append('startDate', startDate.format('DD-MM-YYYY'));
    params = params.append('endDate', endDate.format('DD-MM-YYYY'));
    return this.http.get(`${environment.API_URL}/booking/booked-slots-details`, {
      params,
    });
  }

  getSlotByDate(date: moment.Moment) {
    let params = new HttpParams();
    params = params.append('date', date.toISOString());
    return this.http.get(`${environment.API_URL}/booking/slot`, { params });
  }

  bookSlot(slotId: string, bookingDetails: any) {
    let params = new HttpParams();
    params = params.append('slotId', slotId);
    return this.http.put(
      `${environment.API_URL}/booking/book-slot`,
      bookingDetails,
      { params }
    );
  }
}
