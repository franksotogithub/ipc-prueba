import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class GiroService {
  ulr_api = `${environment.url_api}/api/v1/core`;
  constructor(private http: HttpClient) { 
    
  }

  getAllGiroEmpresa(){
    return this.http.get<any>(`${this.ulr_api}/giroempresa/`);
  }
}