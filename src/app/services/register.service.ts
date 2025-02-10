import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Device} from '../interfaces/device';
import { Model } from '../interfaces/model';
import { Brand } from '../interfaces/brand';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  brandList(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}/brand`);
  }

  modelList(id: number): Observable<Model[]> {
    return this.http.get<Model[]>(`${this.apiUrl}/model/${id}`).pipe(tap((res) => {
    }));
  }

  deviceRegister(dispositivo: Device ): Observable<Device> {
    return this.http.post<Device>(
      `${this.apiUrl}/device`,
      dispositivo,
    );
  }

  deviceListId(id: number): Observable<Device> {  
    return this.http.get<Device>(`${this.apiUrl}/device/${id}`);   
  }

  deviceUpdate(dispositivo: Device): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/device/${dispositivo.id}`, dispositivo);
  }
}

