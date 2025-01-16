import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskForm } from './task-form/task-form.component';

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "auth/login",
    component: LoginComponent
  },
  {
    path: "tasks",
    component: TaskListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "tasks/registrar",  // Sub-rota para registrar
    component: TaskForm,
    canActivate: [AuthGuardService]  // Protege a sub-rota
  }

];
