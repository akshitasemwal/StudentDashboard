import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDBComponent } from './StudentDashboard/student-db.component';
import { EditStudentComponent } from './EditStudent/edit-student.component';
import { AddStudentComponent } from './AddStudent/add-student.component';
import { LoginComponent } from './Login/login.component';
import { SignupComponent } from './Signup/signup.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'student-db',
    canActivate : [AuthGuard],
    component: StudentDBComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'edit-student/:id',
    canActivate : [AuthGuard],
    component: EditStudentComponent
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
