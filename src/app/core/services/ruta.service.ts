import { Injectable } from '@angular/core';
import { Ruta} from '../models/ruta.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class RutaService {
  headers =new HttpHeaders()
  ulr_api = `${environment.url_api}/api/v1`;
  constructor(private http: HttpClient) { 
     this.headers.append("Content-Type","application/json");
     this.headers.append('Accept', 'application/json');
     this.headers.append("Authorization", "Bearer "+ localStorage.getItem("token"));
  }

  createHeader(headers: Headers) {
    headers.append('Accept', 'application/json'); 
  }

  getAllRuta(){
    return this.http.get<any>(`${this.ulr_api}/ruta/`);
  }

  getRutaPag(pag:number){

    if (pag==0)
    {
      return this.getAllRuta();
    }
    
    return this.http.get<any>(`${this.ulr_api}/ruta/?page=${pag}`);
  }

  getRutaDetalle(id:number){
    return this.http.get<any>(`${this.ulr_api}/ruta/${id}`);
  }

  updateRutaDetalles(id:number, data:any){
        return this.http.patch<any>(`${this.ulr_api}/ruta/${id}/editardetalles`,data, {headers: this.headers});
  }

  saveRutaDetalles(data:any){
    return this.http.post<any>(`${this.ulr_api}/ruta/create`, data, {headers: this.headers});
  }


  deleteRuta(id:number){
    return this.http.patch<any>(`${this.ulr_api}/ruta/${id}/deshabilitar/`, {headers: this.headers});
  }

  buscarNombreRuta(valor:string){
    return this.http.get<any>(`${this.ulr_api}/ruta/?q=${valor}`);
  }
  buscarCiudadRuta(valor:string){
    return this.http.get<any>(`${this.ulr_api}/ruta/?ciudad=${valor}`);
  }
}