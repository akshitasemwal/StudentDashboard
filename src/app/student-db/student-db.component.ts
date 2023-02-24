import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { student } from '../student-db/student-db.student'; 

@Component({
  selector: 'app-student-db',
  templateUrl: './student-db.component.html',
  styleUrls: ['./student-db.component.css']
})
export class StudentDBComponent implements OnInit {

  formValue !: FormGroup // what does !: this do?
  studentObj: student = new student();
  studData !: any //Used in get call to store student data from json server
  showAddBtn !: boolean
  showUpdBtn !: boolean

  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      fullName : [""], 
      email : ["",], 
      phoneNo : [0], 
    })

    //should run when application starts to get all details from json-server
    this.getStudentDetails(); 
  }

  onClickAdd() {
    this.formValue.reset();
    this.showAddBtn = true;
    this.showUpdBtn = false;
  }

  postStudentDetails() {
    this.studentObj.fullName = this.formValue.value.fullName;
    this.studentObj.email = this.formValue.value.email;
    this.studentObj.phoneNo = this.formValue.value.phoneNo;

    this.api.postStudent(this.studentObj).subscribe(res => {
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
    this.api.getStudent().subscribe(res => {
      this.studData = res;
    })
  }

  deleteStudent(row:any) {
    this.api.deleteStudent(row.id).subscribe(res => {
      alert("Student deleted");
      this.getStudentDetails(); 
      //every time a student is deleted, get changed student list from json server
    },  
    err => {
      alert("Something went wrong");
    })
  }

  onClickEdit(row:any) {
    this.formValue.reset();
    this.showAddBtn = false;
    this.showUpdBtn = true;

    this.studentObj.id = row.id;
    this.formValue.controls['fullName'].setValue(row.fullName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phoneNo'].setValue(row.phoneNo);
  }

  updateStudentDetails() {
    // we will not update the student id. It acts as primary key to access db.json
    this.studentObj.fullName = this.formValue.value.fullName;
    this.studentObj.email = this.formValue.value.email;
    this.studentObj.phoneNo = this.formValue.value.phoneNo;

    this.api.updateStudent(this.studentObj, this.studentObj.id).subscribe(res => {
      console.log("Student details updated");
      alert("Student details updated");  // on success res (response) generate alert
      this.formValue.reset();
      this.getStudentDetails();
    }, 
    err => {
      alert("Something went wrong");
    })
  }
}
