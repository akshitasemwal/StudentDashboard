import { group } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { student } from '../StudentDashboard/student-dashboard.student';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})

export class StudentDashboardComponent implements OnInit, OnDestroy {

  formValue !: FormGroup // what does !: this do?
  studentObj: student = new student();
  studData !: any //Used in get call to store student data from json server
  private subscription !: Subscription;
  private sub !: Subscription;
  private subscription1 !: Subscription;

  constructor(private formbuilder: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      fullName : [""],
      email : ["",],
      phoneNo : [0]
    })
    //should run when application starts to get all details from json-server
    this.getStudentDetails();
  }

  onClickAdd() {
    this.router.navigateByUrl('/add-student');
  }

  postStudentDetails() {
    this.studentObj.fullName = this.formValue.value.fullName;
    this.studentObj.email = this.formValue.value.email;
    this.studentObj.phoneNo = this.formValue.value.phoneNo;

    this.subscription = this.api.postStudent(this.studentObj).subscribe(res => {
      console.log("Student details added");
      alert("Student details added");  // on success res (response) generate alert
      this.formValue.reset();
      this.getStudentDetails(); //if new record is posted, get the new record and display it
    },
    err => {
      alert("Something went wrong");
    })
    this.getStudentDetails();
  }

  getStudentDetails() {
    this.sub = this.api.getStudent().subscribe(res => {
      this.studData = res;
    })
  }

  deleteStudent(id: number) {
    //if(confirm("Are you sure you want to delete this entry?")){
      this.subscription1 = this.api.deleteStudent(id).subscribe(res => {
        this.getStudentDetails();
        alert("Student deleted");
        //every time a student is deleted, get changed student list from json server
      },
      err => {
        alert("Something went wrong");
      })
    //}
  }

  onClickEdit(id: number) {
    this.router.navigate(['/student', id ]);
  }

  ngOnDestroy()
  {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
  }
}
