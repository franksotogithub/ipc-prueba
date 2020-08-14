import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Articulo} from './../models/articulo.model';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  ulr_api = `${environment.url_api}/api/v1`;
  constructor(private http: HttpClient) { }

  getAllArticulos(pageSize: number,pageIndex :number,query:string) {
    return this.http.get<any>(`${this.ulr_api}/articulo/?page_size=${pageSize}&page=${pageIndex}&q=${query}`);
  }
  
  getArticulo(id:number) {
    return this.http.get<Articulo>(`${this.ulr_api}/articulo/${id}`);
  }
}
