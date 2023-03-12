import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email : [""],
      password : [""]
    })
  }

  login()
  {
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe( res=> {
      const user = res.find( (a:any) => {
        return (a.email === this.loginForm.value.email && a.password === this.loginForm.value.password);
      });
      if(user){
        alert("Login sucessful!");
        this.loginForm.reset();
        this.router.navigate(['student-db']);
      }
      else
      {
        alert("User not found");
      }
      }, err => {
        alert("Something went wrong");
      })
  }
}
