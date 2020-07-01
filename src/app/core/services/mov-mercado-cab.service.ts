import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovMercadoCab} from './../models/movMercadoCab.model';

@Injectable({
  providedIn: 'root'
})
export class MovMercadoCabService {
  ulr = `${environment.url_api}/api/formatos`;
  
  constructor(private http: HttpClient) {

  }

  getMovMercadoCab(id: string) {
      return this.http.get<MovMercadoCab[]>(`${this.ulr}/mov-mercado-cab/${id}`);
  }

  createMovMercadoCab(movMercadoCab: MovMercadoCab) {
    return this.http.post(`${this.ulr}/mov-mercado-cab/`, movMercadoCab);
  }

  updateMovMercadoCab(id: string, changes: Partial<MovMercadoCab>) {
    return this.http.put(`${this.ulr}/mov-mercado-cab/${id}`, changes);
  }

  deleteMovMercadoCab(id: string) {
    return this.http.delete(`${this.ulr}/mov-mercado-cab/${id}`);
  }

}


/*
 getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products`, product);
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`);
  }


*/