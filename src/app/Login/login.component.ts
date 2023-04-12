import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,
     private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email : new FormControl("",[Validators.required, Validators.email]),
      password : new FormControl("",[Validators.required])
    })
  }

  // login() {
  //   if (this.loginForm.valid) {
  //     const email = this.loginForm.value.email;
  //     const password = this.loginForm.value.password;
  
  //     this.authService.login(email, password).subscribe(res => {
  //       if (res.success) {
  //         console.log(res);
  //         alert(res.message);
  //       } else {
  //         alert(res.message);
  //       }
  //     }); // <-- add closing parenthesis here
  //   }
  // }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
    
      return this.authService.login(email, password).subscribe(res => {
        if (res.success) {
          console.log(res);
          alert(res.message);
        } else {
          alert(res.message);
        }
      }, err => {
        // Handle any errors that may occur during the HTTP request.
        console.error(err);
      });
    }
  } 

  }
