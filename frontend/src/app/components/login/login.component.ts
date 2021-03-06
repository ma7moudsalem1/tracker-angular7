import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from 'src/app/backend.service';
import { TokenService } from 'src/app/services/token.service';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };
  public _error = null;
  public data: any;

  constructor(
    private _backend: BackendService,
    private _token: TokenService,
    private _router: Router, 
    private _auth: AuthService
    ) { }

  onSubmit(){
   this._backend.doLogin(this.form).subscribe(
    data => this.handleResponse(data),
    error => this.handleError(error)
  );
  }

  handleResponse(data){
    this._token.handle(data.token);
    this._auth.changeAuthStatus(true);
    this._router.navigateByUrl('/dashboard');
  }

  handleError(error){
    this._error = error.error.errors;
  }

  ngOnInit() {
  }

}
