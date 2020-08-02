import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Usuario} from './../models/usuario.model';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
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
}
