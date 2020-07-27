import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ProgramacionRuta } from './../models/programacionRuta.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionRutaService {

  url_api = `${environment.url_api}/api/v1`;

  constructor(private http: HttpClient) { }

  getProgramacionRuta(){
    return this.http.get<any>(`${this.url_api}/programacionruta/`);
  }

  updateProductos(articulos:Producto[]){
    return this.http.put(`${this.url_api}/programacionruta/update_productos/`,articulos);
  }
  
}
