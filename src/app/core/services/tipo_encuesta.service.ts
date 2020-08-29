import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class TipoEncuestaService {
  ulr_api = `${environment.url_api}/api/v1`;
  constructor(private http: HttpClient) { 
    
  }

  getAllTipoEncuesta(){
    return this.http.get<any>(`${this.ulr_api}/tipo_encuesta/`);
  }
}