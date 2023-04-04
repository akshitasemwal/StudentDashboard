import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private auth : AuthService, private router : Router) {}

  canActivate():boolean    //returns true or false based on some conditions
  {
    if(!this.auth.isLoggedIn())
    {
      this.router.navigate(['login']);
    }
    return true;
  }

}
