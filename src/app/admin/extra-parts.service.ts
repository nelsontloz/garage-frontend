import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExtraPartsService {
  constructor(private httpClient: HttpClient) {}

  getParts() {
    return this.httpClient.get(`${environment.API_URL}/parts`);
  }

  createParts(name: string, price: number) {
    return this.httpClient.post(`${environment.API_URL}/parts`, {
      name,
      price,
    });
  }

  deletePart(partId: string) {
    let params = new HttpParams();
    params = params.append('partId', partId);
    return this.httpClient.delete(`${environment.API_URL}/parts`, { params });
  }
}
