import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TokenService } from './services/token.service';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
 public _baseUrl = "http://127.0.0.1:8000/api";
  constructor(private http: HttpClient, private _token: TokenService) { }

  doLogin(form){
    return this.postRequest('/login', form); 
  }

  doRegister(form){
    return this.postRequest('/register', form); 
  }

  postRequest(url, data){
    return this.http.post(this._baseUrl + url, data, this.giveHeaderRequest()); 
  }

  getRequest(url){
    return this.http.get(this._baseUrl + url, this.giveHeaderRequest());
  }

  patchRequest(url, data){
    return this.http.patch(this._baseUrl + url, data, this.giveHeaderRequest());
  }

  deleteRequest(url){
    return this.http.delete(this._baseUrl + url, this.giveHeaderRequest());
  }

  giveHeaderRequest(){
    let auth = 'Bearer ' + this._token.get();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': auth
      })
    };
    return httpOptions;
  }
  
}
