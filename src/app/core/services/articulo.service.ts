import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Producto} from './../models/producto.model';
@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  ulr_api = `${environment.url_api}/api/v1/core`;
  constructor(private http: HttpClient) { }

  getArticulos() {
    return this.http.get<any>(`${this.ulr_api}/articulos/`);
  }

  
}
