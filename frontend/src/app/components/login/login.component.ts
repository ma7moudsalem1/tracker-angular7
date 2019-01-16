import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from 'src/app/backend.service';

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

  constructor(private http: HttpClient,private _backend: BackendService) { }

  onSubmit(){
   this._backend.doLogin(this.form).subscribe(
    data => console.log(data),
    error => this.handleError(error)
  );
   
  }

  handleError(error){
    this._error = error.error.errors;
  }

  ngOnInit() {
  }

}
