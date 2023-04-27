import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {
  public signupForm !: FormGroup;
  private subscription !: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required])
    })
  }

  signUp()
  {
    if(this.signupForm.valid)
    {
      this.subscription = this.http.post<any>("http://localhost:3000/signupUsers", this.signupForm.value)
      .subscribe( res=> {
        alert("Signup sucessful!");
        this.signupForm.reset();
        this.router.navigate(['login']);
      },err=>{
        alert("Something went wrong");
      })
    }
    else
    {
      alert("Something went wrong, enter your crendentials correctly");
    }
  }

  ngOnDestroy()
  {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
