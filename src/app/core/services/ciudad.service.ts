import { Injectable } from '@angular/core';
import { Ciudad} from '../models/ciudad.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class CiudadService {
  ulr_api = `${environment.url_api}/api/v1/core`;
  constructor(private http: HttpClient) { 
    
  }
  getAllCiudades(){
    return this.http.get<any>(`${this.ulr_api}/ciudad/`);
  }


}