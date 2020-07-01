import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Investigador} from '../models/investigador.model';

@Injectable({
  providedIn: 'root'
})
export class InvestigadorService {

  ulr_api = `${environment.url_api}/api/shared`;

  constructor( private http: HttpClient) { 

  }
  
  getAllInvestigadores() {
    return this.http.get<Investigador[]>(`${this.ulr_api}/investigador`);
  }
}
