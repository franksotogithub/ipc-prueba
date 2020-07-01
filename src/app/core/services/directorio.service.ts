import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DirectorioIPC} from './../models/directorio.model';

@Injectable({
  providedIn: 'root'
})
export class DirectorioService {
  ulr_api = `${environment.url_api}/api/shared`;
  constructor( private http: HttpClient) { 

  }

  getAllDirectorioIPC() {
    return this.http.get<DirectorioIPC[]>(`${this.ulr_api}/directorio`);
  }

}
