import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import { EndPoints} from 'src/app/global/end-points';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatosResquest } from '../../models/datos/datos.request';
import { DatosSearch } from '../../models/datos/datos.search';
import { UtilHelper } from 'src/app/util/util.helper';


@Injectable({
  providedIn: 'root'
})
export class CameraService {
  public imgUrl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  

  public setImgUrl(img:any){
    this.imgUrl$.next(img);

   }

   public getImgUrl(){
    return this.imgUrl$.value;
   }


 

  constructor(private http: HttpClient) {
    
  }

  

}

