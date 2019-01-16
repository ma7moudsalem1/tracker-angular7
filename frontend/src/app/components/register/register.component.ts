import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

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

  constructor(private _backend: BackendService) { }

  onSubmit(){
    this._backend.doRegister(this.form).subscribe(
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
