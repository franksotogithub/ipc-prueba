import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto} from './../models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  ulr_api = `${environment.url_api}/api/v1`;
  
  constructor( private http: HttpClient) { 

  }
  
  getAllProductos() {
    return this.http.get<Producto[]>(`${this.ulr_api}/producto?page_size=10`);
  }

  getProductos(query:string) {
    return this.http.get<Producto[]>(`${this.ulr_api}/producto?page_size=10&?q=${query}`);
  }
  
  getProducto(id) {
    return this.http.get<Producto>(`${this.ulr_api}/producto/${id}`);
  }


}
