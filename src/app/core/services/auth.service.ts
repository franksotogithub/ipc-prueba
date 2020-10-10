import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Usuario} from './../models/usuario.model';
import { BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioModel } from '../models/usuario/usuario.model';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ulr_api = `${environment.url_api}/api/v1`;
  private currentUserSubject: BehaviorSubject<Usuario>;
  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
  }
  
  login(username:string,password:string){
    let formData: any = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    let url_auth= `${this.ulr_api}/api-token-auth/`;
    return this.http.post<any>(url_auth,formData).pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

      
    }));

    

  }

  testToken(token:string){
   // path('api/v1/validar-token-auth/', ValidarToken.as_view(), name='validar_token_auth'),
    const body={
      token:token
    }

    let url_validate= `${this.ulr_api}/validar-token-auth/`;
    return this.http.post<any>(url_validate,body).pipe(map( (user:UsuarioModel) => {
      let res;
      // login successful if there's a jwt token in the response
      if (user) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
       
        /*localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);*/
        user.token = token;
        res = user

      }

      return res;
    }),
    catchError(err => {
      
      return of([]);
      /*if (typeof(err) === 'string') {
        this.alertModalService.alert(SweetAlertTypeEnum.error, err);
      } else {
        this.alertModalService.alert(SweetAlertTypeEnum.error, err.message);
      }*/
      /*return of([]);*/
    })
    
    
    );
/*

    console.log('res>>>',res);
        if (res.success) {
          console.log('holasss>>>',res.data);
          response = FormatHelper.formatRequestContactExtern( res.data);
          console.log('response>>>',response);
        } else {

          throw new Error('No se ha logrado obtener datos del servidor');
        }
        return response;


*/



    /*http post http://127.0.0.1:8000/api/v1/validar-token-auth/ token=c1badd*****b3424*/

  }

/*
  login(email:string,password:string){
    return this.afa.signInWithEmailAndPassword(email,password);
  }
*/
/*
  createUser(email:string,password:string){
    return this.afa.createUserWithEmailAndPassword(email,password);
  }
  
  logout(){
    return this.afa.signOut();
  }
  hasUser(){
    return this.afa.authState;
  }*/

  logout() { 
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
   
    
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }


/*

    return this.http.get<GeneralRequest<ContactExternRequest[]>>(`${environment.baseUrl}${EndPoints.CONTACT_EXTERN}`,{ params }).pipe(
      map((res: GeneralRequest<ContactExternRequest[]>) => {
        let response = [];
        if (res.success) {
          response = FormatHelper.formatRequestContactExternList(res.data);
        } else {

          throw new Error('No se ha logrado obtener datos del servidor');
        }
        return response;
      }),
      catchError(err => {
        if (typeof(err) === 'string') {
          this.alertModalService.alert(SweetAlertTypeEnum.error, err);
        } else {
          this.alertModalService.alert(SweetAlertTypeEnum.error, err.message);
        }
        return of([]);
      })
    );
  }



*/

}
