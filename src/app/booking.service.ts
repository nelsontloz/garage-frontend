import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DateTime } from 'luxon';
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getSlotById(id: string) {
    let params = new HttpParams();
    params = params.append('slotId', id);
    return this.http.get(`${environment.API_URL}/booking/one-slot`, { params });
  }

  addOnePart(slotId: string, part: any) {
    let params = new HttpParams();
    params = params.append('slotId', slotId);
    return this.http.put(`${environment.API_URL}/booking/one-slot-part`, part, {
      params,
    });
  }

  removeOnePart(slotId: string, partId: string) {
    let params = new HttpParams();
    params = params.append('slotId', slotId);
    params = params.append('partId', partId);
    return this.http.delete(`${environment.API_URL}/booking/one-slot-part`, {
      params,
    });
  }

  updateSlotStatus(id: string, status: string) {
    let params = new HttpParams();
    params = params.append('slotId', id);
    params = params.append('status', status);
    return this.http.put(
      `${environment.API_URL}/booking/one-slot-status`,
      {},
      {
        params,
      }
    );
  }

  getSlotsByCustomer() {
    return this.http.get(`${environment.API_URL}/booking/my-slots`);
  }

  getSlotsByDate(date: Date) {
    const dateLux = DateTime.fromJSDate(date);
    let params = new HttpParams();
    params = params.append('date', dateLux.toFormat('dd-MM-yyyy'));
    return this.http.get(`${environment.API_URL}/booking`, { params });
  }

  getSlotsCountByDateRange(startDate: Date, endDate: Date) {
    const start = DateTime.fromJSDate(startDate);
    const end = DateTime.fromJSDate(endDate);
    let params = new HttpParams();
    params = params.append('startDate', start.toFormat('dd-MM-yyyy'));
    params = params.append('endDate', end.toFormat('dd-MM-yyyy'));
    return this.http.get(`${environment.API_URL}/booking/slots`, { params });
  }

  getBookedSlotsCountByDateRange(startDate: Date, endDate: Date) {
    const start = DateTime.fromJSDate(startDate);
    const end = DateTime.fromJSDate(endDate);
    let params = new HttpParams();
    params = params.append('startDate', start.toFormat('dd-MM-yyyy'));
    params = params.append('endDate', end.toFormat('dd-MM-yyyy'));
    return this.http.get(`${environment.API_URL}/booking/booked-slots`, {
      params,
    });
  }

  getBookedSlotsDetailsDateRange(startDate: Date, endDate: Date) {
    const start = DateTime.fromJSDate(startDate);
    const end = DateTime.fromJSDate(endDate);
    let params = new HttpParams();
    params = params.append('startDate', start.toFormat('dd-MM-yyyy'));
    params = params.append('endDate', end.toFormat('dd-MM-yyyy'));
    return this.http.get(
      `${environment.API_URL}/booking/booked-slots-details`,
      {
        params,
      }
    );
  }

  getSlotByDate(date: Date) {
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
