import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  setLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe( res=> {
      const user = res.find( (a:any) => {
        return (a.email === email && a.password === password);
      });
      if(user){
        alert("Login sucessful!");
        this.setLoggedIn=true;
        this.router.navigate(['student-dashboard']);
      }
      else
      {
        this.setLoggedIn = false;;
        alert("User not found");
      }
      }, err => {
        alert("Something went wrong");
      })
}

  isLoggedIn(): boolean {
    return this.setLoggedIn;
  }
}
