import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { EndPoints} from 'src/app/global/end-points';
import { Observable } from 'rxjs';
import { DatosResquest } from '../../models/datos/datos.request';


@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) {
    
  }

  
  descargarDatos():Observable<DatosResquest>{
    return this.http.get<DatosResquest>(`${environment.url_api}${EndPoints.DESCARGAR_DATOS}`);
  }

  cargarDatos(data): Observable<any>{
    let requestBody = data;
    return this.http.post<any>(`${environment.url_api}${EndPoints.CARGAR_DATOS}`,requestBody);
  }

}



/*import {environment} from '@env/environment';

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
*/