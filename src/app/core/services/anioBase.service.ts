import { Injectable } from '@angular/core';
import { AnioBase} from '../models/anioBase.models';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class AnioBaseService {
  headers =new HttpHeaders()
  ulr_api = `${environment.url_api}/api/v1/core`;
  constructor(private http: HttpClient) { 
    
  }

  
  getAllAnioBase(){
    return this.http.get<any>(`${this.ulr_api}/aniobase/`);
  }

  
}