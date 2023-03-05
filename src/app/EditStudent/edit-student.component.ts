import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { student } from '../StudentDashboard/student-db.student';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})


export class EditStudentComponent implements OnInit {
  formValue !: FormGroup // what does !: this do?
  studentObj: student = new student();
  studData : any //Used in get call to store student data from json server
  showAddBtn !: boolean
  showUpdBtn !: boolean

  constructor(private formbuilder: FormBuilder, private api:ApiService, private router: Router, public route : ActivatedRoute) { }
  val : any;

  ngOnInit(): void {
    let sub = this.route.params.subscribe(params => {
      this.val= params['id'];
    });
    console.log("id: "+this.val);
    this.getStudentDetails();

    this.api.getStudentById(this.val).subscribe((res: any) => {
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
    this.api.getStudent().subscribe(res => {
      this.studData = res;
    })
  }

  onClickClose()
  {
    this.router.navigateByUrl('/student-db');
  }

  updateStudentDetails() {
    // we will not update the student id. It acts as primary key to access db.json
    this.studentObj.fullName = this.formValue.value.fullName;
    this.studentObj.email = this.formValue.value.email;
    this.studentObj.phoneNo = this.formValue.value.phoneNo;

    this.api.updateStudent(this.studentObj, this.val).subscribe(res => {
      console.log("Student details updated");
      alert("Student details updated");  // on success res (response) generate alert
    },
    err => {
      alert("Something went wrong");
    });
  }
}
