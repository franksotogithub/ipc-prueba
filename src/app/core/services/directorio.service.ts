import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DirectorioIPC} from './../models/directorio.model';


@Injectable({
  providedIn: 'root'
})
export class DirectorioService {
  ulr_api = `${environment.url_api}/api/v1/core`;
  constructor( private http: HttpClient) { 

  }

  getAllDirectorioIPC() {
    return this.http.get<any>(`${this.ulr_api}/directorio/`);
  }

  getDirectorioIPC(id:number) {
    return this.http.get<DirectorioIPC>(`${this.ulr_api}/directorio/${id}/`);
  }

  updateDirectorioIPC(id:number,directorio :DirectorioIPC){
    return this.http.put(`${this.ulr_api}/directorio/${id}/`,directorio);
  }


}
