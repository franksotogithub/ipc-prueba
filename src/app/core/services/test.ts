import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TestService {
  ulr_api = `http://localhost:3000`;
  constructor(private http: HttpClient) { }

  testInit() {
    let body ={
      'document_number' : "75402332",
      'document_type': 1,
      'phone' : "941923262" 
    }
    return this.http.post<any>(`${this.ulr_api}/api/employees/register`,body);
  }
  
  
}
