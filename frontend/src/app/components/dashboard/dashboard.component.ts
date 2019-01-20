import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public stats: any = {
    users: '',
    projects : '',
    tasks: '',
    done_task: ''
  };
  constructor(private _backend: BackendService) { }

  ngOnInit() {
    this.getStats();
  }

  getStats(){
    this._backend.getRequest('/dashboard').subscribe(
      data => this.handleResponse(data),
      error => console.log(error)
    );
  }

  handleResponse(data){
    this.stats = data;
  }

}
