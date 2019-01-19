import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null
  };
  public _error = [];
  public data: any;

  constructor(private _backend: BackendService, private _token: TokenService, private _router: Router) { }

  onSubmit(){
    this._backend.doRegister(this.form).subscribe(
     data => this.handleResponse(data),
     error => this.handleError(error)
   );
    }

    handleResponse(data){
        this._token.handle(data.token);
        this._router.navigateByUrl('/dashboard');
    }

    handleError(error){
      this._error = error.error.errors;
    }

  ngOnInit() {
  }

}
