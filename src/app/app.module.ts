import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentDBComponent } from './StudentDashboard/student-db.component';
import { EditStudentComponent } from './EditStudent/edit-student.component';
import { AddStudentComponent } from './AddStudent/add-student.component';
import { LoginComponent } from './Login/login.component';
import { SignupComponent } from './Signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentDBComponent,
    EditStudentComponent,
    AddStudentComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
