import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
 public _baseUrl = "http://127.0.0.1:8000/api";
  constructor(private http: HttpClient) { }

  doLogin(form){
    return this.http.post(this._baseUrl + '/login', form); 
  }

  doRegister(form){
    return this.http.post(this._baseUrl + '/register', form); 
  }

  
  
}
