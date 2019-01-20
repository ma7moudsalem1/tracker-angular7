import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  public form:any = {
    name: '',
    project_id: '',
    status: '',
    comment: ''
  };
  public _error;
  public isCreate = true;
  public task:any;
  public id;
  constructor(
    private _backend: BackendService,
    private _router: Router,
    private _route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.form.project_id = this._route.snapshot.params.project;
    let id = this._route.snapshot.params.task;
    if(id){
      this.id = id;
      this.isCreate = false;
      this.getFormData();
    }
  }

  onSubmit(){
    if(this.isCreate){
      this._backend.postRequest('/task',this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }else{
      this._backend.patchRequest('/task/' + this.id,this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
   }

   getFormData(){
    this._backend.getRequest('/task/'+this.id).subscribe(
     data => {this.form = data},
     error => alert(error)
   );
  }

  handleResponse(data){
    this._router.navigateByUrl('/tasks/'+ this.form.project_id);
  }

  handleError(error){
    this._error = error.error.errors;
  }

}
