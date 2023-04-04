import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedIn = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    this.http.get<any>("http://localhost:3000/signupUsers")
    .subscribe( res=> {
      const user = res.find( (userEntry:any) => {
        return (userEntry.email === email && userEntry.password === password);
      });
      if(user){
        alert("Login sucessful!");
        this.loggedIn = true;
        this.router.navigate(['student-dashboard']);
      }
      else
      {
        this.loggedIn = false;;
        alert("User not found");
      }
      }, err => {
        alert("Something went wrong");
      })
}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
