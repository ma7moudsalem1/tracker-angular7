import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/projects/create/create.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskFormComponent } from './components/tasks/task-form/task-form.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AfterLoginService]
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'projects/create',
    component: CreateComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'project/:id',
    component: CreateComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'tasks/:project',
    component: TasksComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'task/create/:project',
    component: TaskFormComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'task/:project/:task',
    component: TaskFormComponent,
    canActivate: [AfterLoginService]
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
