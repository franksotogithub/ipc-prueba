import { Injectable } from '@angular/core';
import { RutaDetalleProducto} from './../models/rutaDetalleProducto.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RutaDetalleProdService {
  ulr_api = `${environment.url_api}/api/v1/core`;
  constructor(private http: HttpClient) { 
    
  }

  getRutaDetalleProducto(id:number) {
    return this.http.get<RutaDetalleProducto>(`${this.ulr_api}/ruta-detalle-prod/${id}/`);
  }
  
  updateRutaDetalleProducto(id:number,data:RutaDetalleProducto) {
    return this.http.put<RutaDetalleProducto>(`${this.ulr_api}/ruta-detalle-prod/${id}/`,data);
  }

  createRutaDetalleProducto(data:RutaDetalleProducto) {
    return this.http.post<RutaDetalleProducto>(`${this.ulr_api}/ruta-detalle-prod/`,data);
  }
}
