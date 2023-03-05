import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDBComponent } from './student-db/student-db.component';
import { EditFormComponent } from './edit-form/edit-form.component';

const routes: Routes = [
  {
    path: 'student-db',
    component: StudentDBComponent
  },
  {
    path: '',
    redirectTo: 'student-db',
    pathMatch: 'full'
  },
  {
    path: 'edit-form',
    component: EditFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
