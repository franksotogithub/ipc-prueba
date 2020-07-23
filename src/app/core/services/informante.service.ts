import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import {Informante} from './../models/informante.model';

@Injectable({
  providedIn: 'root'
})
export class InformanteService {
  url_api = `${environment.url_api}/api/v1`;

  constructor(private http: HttpClient) { }

  getInformantesByUser(){
    return this.http.get<any>(`${this.url_api}/programacionruta/`);
  }

}
