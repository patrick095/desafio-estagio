import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../interfaces/device';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.url;

  deviceList(page: number, size: number): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/device`,{params: {page, size}});
  }

  deleteDevice(id: number): Observable<Device[]> {
    return this.http.delete<Device[]>(`${this.apiUrl}/device/${id}`);
  }
}
