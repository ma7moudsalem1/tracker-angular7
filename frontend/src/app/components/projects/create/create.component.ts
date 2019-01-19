import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public form: any = {
    name: ''
  };
  public _error;
  public isCreate = true;
  public id;
  constructor(private _backend: BackendService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    let id = this._route.snapshot.params.id;
    if(id){
      this.id = id;
      this.isCreate = false;
      this.getFormData();
    }
    
  }

  onSubmit(){
    if(this.isCreate){
      this._backend.postRequest('/project',this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }else{
      this._backend.patchRequest('/project/' + this.id,this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
   }

   getFormData(){
     this._backend.getRequest('/project/'+this.id).subscribe(
      data => {this.form = data},
      error => alert(error)
    );
   }
 
   handleResponse(data){
     this._router.navigateByUrl('/projects');
   }
 
   handleError(error){
     this._error = error.error.errors;
   }

}
