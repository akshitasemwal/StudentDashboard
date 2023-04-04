import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './StudentDashboard/student-dashboard.component';
import { EditComponent } from './Student/student.component';
import { AddStudentComponent } from './AddStudent/add-student.component';
import { LoginComponent } from './Login/login.component';
import { SignupComponent } from './Signup/signup.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'student-dashboard',
    canActivate : [AuthGuard],
    component: StudentDashboardComponent
  },
  {
    path: '',
    // canActivate : [AuthGuard],
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'student/:id',
    canActivate : [AuthGuard],
    component: EditComponent
  },
  {
    path: 'add-student',
    canActivate : [AuthGuard],
    component: AddStudentComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
