import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get(`${environment.API_URL}/account`);
  }

  deleteCustomer(customerId: string) {
    let params = new HttpParams();
    params = params.append('customerId', customerId);
    return this.http.delete(`${environment.API_URL}/account`, { params });
  }
}
