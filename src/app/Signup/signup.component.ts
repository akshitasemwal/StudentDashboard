import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [""],
      email: [""],
      password: [""]
    })
  }

  signUp()
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

  ngOnDestroy()
  {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
