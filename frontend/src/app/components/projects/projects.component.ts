import { Component, OnInit  } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  
  public projects = [];
  constructor(private _backend: BackendService) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(){
    this._backend.getRequest('/project').subscribe(
      data => this.handleResponse(data),
      error => console.log(error)
    );
  }

  deleteProject(project){
    if(confirm("Are you sure?")){
      this._backend.deleteRequest('/project/'+project.id).subscribe(
        data => this.projects.splice(this.projects.indexOf(project), 1),
        error => console.log(error)
      );
    }
  }

  handleResponse(data){

    this.projects = data;
  }

  clcStatus(task, done){
    if(done == 0 || task == 0){
      return 0;
    } 
    return Math.round((done / task) * 100);
  }

}
