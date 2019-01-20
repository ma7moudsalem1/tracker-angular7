import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  public id;
  public tasks: any;
  public project: any;
  constructor(private _route: ActivatedRoute, private _backend: BackendService) { }

  ngOnInit() {
    this.id = this._route.snapshot.params.project;
    this.getProject();
    this.getTasks();
  }

  getTasks(){
    this._backend.getRequest('/' + this.id + '/tasks/get').subscribe(
      data => this.handleResponse(data),
      error => console.log(error)
    );
  }

  getProject(){
    this._backend.getRequest('/project/'+this.id).subscribe(
      data => {this.project = data},
      error => alert(error)
    );
  }

  deleteTask(task){
    if(confirm("Are you sure?")){
      this._backend.deleteRequest('/task/'+task.id).subscribe(
        data => this.tasks.splice(this.tasks.indexOf(task), 1),
        error => console.log(error)
      );
    }
  }

  handleResponse(data){
    this.tasks = data;
  }

}
