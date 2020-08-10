import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ProgramacionRuta } from './../models/programacionRuta.model';

import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProgramacionRutaService {

  url_api = `${environment.url_api}/api/v1`;

  rutaSubject = new Subject<ProgramacionRuta>();

  constructor(private http: HttpClient) { }

  setRutaSubject( ruta: ProgramacionRuta){
    this.rutaSubject.next(ruta);
  }

  getRutaSubject( ){
    return this.rutaSubject;
  }

  getProgramacionRuta(id:any){
    return this.http.get<any>(`${this.url_api}/programacionruta/${id}`);
  }

  
  descargarProgramacionRuta(){
    return this.http.get<any>(`${this.url_api}/programacionruta/descargar_datos/`);
  }


  cargarProgramacionRuta(datos: any ){
    return this.http.put<any>(`${this.url_api}/programacionruta/cargar_datos/`,datos);
  }


  getAllProgramacionRuta(){
    return this.http.get<ProgramacionRuta[]>(`${this.url_api}/programacionruta/`);
  }
  
  
}
