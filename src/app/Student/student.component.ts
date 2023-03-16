import { group } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { student } from '../StudentDashboard/student-dashboard.student';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})


export class EditComponent implements OnInit, OnDestroy {
  formValue !: FormGroup // what does !: this do?
  studentObj: student = new student();
  studData: any //Used in get call to store student data from json server
  val: any;
  private subscription !: Subscription;
  private sub !: Subscription;
  private subscription1 !: Subscription;
  private subscription2 !: Subscription;

  constructor(private formbuilder: FormBuilder, private api: ApiService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    let sub = this.route.params.subscribe(params => {
      this.val= params['id'];
    });
    console.log("id: "+this.val);
    this.getStudentDetails();

    this.subscription = this.api.getStudentById(this.val).subscribe((res: any) => {
      this.formValue = this.formbuilder.group({
        studentid: [this.val],
        fullName : [res.fullName],
        email : [res.email],
        phoneNo : [res.phoneNo]
      })
    });

    this.formValue = this.formbuilder.group({
      studentid: [],
      fullName : [""],
      email : [""],
      phoneNo : []
    })

    //should run when application starts to get all details from json-server
    this.getStudentDetails();
  }

  getStudentDetails() {
    this.subscription1 = this.api.getStudent().subscribe(res => {
      this.studData = res;
    })
  }

  onClickClose()
  {
    this.router.navigateByUrl('/student-dashboard');
  }

  updateStudentDetails() {
    // we will not update the student id. It acts as primary key to access db.json
    this.studentObj.fullName = this.formValue.value.fullName;
    this.studentObj.email = this.formValue.value.email;
    this.studentObj.phoneNo = this.formValue.value.phoneNo;

    this.subscription2 = this.api.updateStudent(this.studentObj, this.val).subscribe(res => {
      console.log("Student details updated");
      alert("Student details updated");  // on success res (response) generate alert
    },
    err => {
      alert("Something went wrong");
    });
  }

  ngOnDestroy(){
    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }

    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}
