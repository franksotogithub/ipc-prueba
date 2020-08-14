import { Injectable } from '@angular/core';
import {ArticuloDirectorio} from './../models/articuloDirectorio.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ArticuloDirectorioService {

  ulr_api = `${environment.url_api}/api/v1`;
  constructor(private http: HttpClient) {
    
  }

  getAll(informante: number) {
    return this.http.get<any>(`${this.ulr_api}/articulo-directorio/?informante=${informante}`);
  }
  
  get(id:number) {
    return this.http.get<ArticuloDirectorio>(`${this.ulr_api}/articulo-directorio/${id}`);
  }
 
  update(id:number,data) {
    return this.http.put<ArticuloDirectorio>(`${this.ulr_api}/articulo-directorio/${id}`,data);
  }
  
  delete(id:number) {
    return this.http.delete<any>(`${this.ulr_api}/articulo-directorio/${id}`);
  }

  create(data){
    
    return this.http.post<any>(`${this.ulr_api}/articulo-directorio/`,data);
  }

}
