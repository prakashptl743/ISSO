import { Component, OnInit, ViewChild } from '@angular/core';
//import { SchoolService } from '../service/school.service';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { PageNotFoundComponent} from 'src/app/page-not-found/page-not-found.component'
import { ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Student } from '../staffadmin-interfaces';
import { IssoUtilService } from '../../services/isso-util.service'; 
import { StudentEnrollmentService } from '../service/student-enrollment.service';
import { environment } from '../../../environments/environment';
 
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class StudentDashboardComponent implements OnInit {
  serverUrl = environment.baseUrl;
  schoolForm: FormGroup;
  editForm: FormGroup;
  errormessage: boolean;
  submitted = false;
  display: boolean = false;
  options: SelectItem[];
  schoolArray =[];
  control: FormControl;
  schoolServiceDATA:any;
  school: Student;
  error: string;
  eventValue:number;
  yearvalue: any;
  schoolvalue:number;
  cols: any[];
  placeholderText = "Select Option"
  actions: string;
  loading: boolean;
  disable = false;
  schoolData: Student[];
  eventData: any;
  yearArray: any;
  schoolList: any;
  schoolServiceData:any;
  showStudentCount: boolean = false;
  sortOptions: SelectItem[];
  yearOptions: object;
  eventOptions: SelectItem[];
  schoolOptions: SelectItem[];
  ageRange;
  standardClass;
  sortKey: string;
  sortField: string;
  shoolName : string;
  eventName : string; 
  sortOrder: number;
  selectedSchool: Student;
  carDatavalue:any;
  carId:number
  displayDialog: boolean;
  eventReadable: boolean = false;
  schoolReadble: boolean = false;
  studentCount: number;
  schoolId: string;
  today: string;
  isEditStudent: boolean;
  setPhotoYear: string;
  isFirstYear: boolean;
  selectedEvent: string;
  constructor(
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private issoUtilService: IssoUtilService,
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private studentEnrollmentService: StudentEnrollmentService
  ) {
 
   }

ngOnInit() {
   this.schoolId = localStorage.getItem('schoolId');
   this.initialForm();
   this.loading = true;
   this.seCurrenttDate();
   this.setPhotoPath();
   this.onyeareChange(this.yearOptions[1].year,'second')
}
setPhotoPath () { 
  // this.setPhotoYear = this.issoUtilService.setPhotoYear();
  let photoPath = this.yearvalue;
  this.setPhotoYear =  this.serverUrl+'upload/'+photoPath;
}
 
loadData(event) {
}

editSchool(event: Event, car: Student) {
  let carData=  JSON.stringify(car);
  this.carId =car.sId;
  this.carDatavalue = car;
  this.displayDialog = true;
  event.preventDefault();
}

onDialogHide() {
  this.selectedSchool = null;
}
onyeareChange(val,yearText) {
  this.schoolData = [];
  this.selectedEvent ='';
  this.showStudentCount = false;
  if(yearText == 'first') {
    this.isFirstYear = true;
  } else {
    this.isFirstYear = false;
  }
  this.yearvalue = val;
  this.setPhotoPath();
  this.isEditStudent = false;
  if(this.yearvalue !== '') {
  this.studentService.loadEventByYear(this.yearvalue, this.schoolId).subscribe(
    response => {
      if(response!=="") {
        this.eventData =response;
        console.log(this.eventData);
        if(this.eventData.length > 0 ){
          this.eventOptions = [];
          this.eventReadable = true;
          this.eventOptions.push({
            label: "Please Select",
            value: ''
          });
          this.eventData.forEach(element => {
            this.eventOptions.push({
              label: element.eventName,
              value: element.eventId
            });
          })
        } else {
          this.eventReadable = false;
          this.schoolReadble =false;
          this.eventOptions = [];
          this.schoolOptions = [];
        }
      } else {
       console.log('Data is blannk from service')
      }

   } ,
   error => {
     //this.errorAlert =true;
    });
  } else {
    this.eventOptions = [];
    this.eventReadable = false;
 }
}
seCurrenttDate() {
  const now = new Date;
  this.today =now.toISOString();
}
onEventChange(event) {
  this.eventValue = event.value;
  this.isEditStudent = false;
  console.log('this.eventValue'+this.eventValue);
 
  this.schoolvalue = event.value;
  console.log('this.eventValue'+this.schoolvalue);
  this.loadStudentData()
 
}
loadStudentData() {
  this.studentService.loadStudentDataByEvent(this.eventValue,this.schoolId).subscribe(response => {
    if(response!=="") {
      this.schoolServiceData =response;
      this.schoolData = this.schoolServiceData;
      if(this.schoolData.length > 0) {
        this.showStudentCount = true;
        this.studentCount = this.schoolData.length;
      }
    } else {
      console.log('Data is blannk from service')
    }

 } ,
 error => {
   //this.errorAlert =true;
});
}
onSortChange(event) {
  let value = event.value;
  if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
  }
  else {
      this.sortOrder = 1;
      this.sortField = value;
  }
}

showDialog(rowid:number) {
  this.display = true;
}

initialForm() {
    this.ageRange = this.issoUtilService.setAge();
    this.standardClass = this.issoUtilService.setClass();
    this.yearOptions = this.issoUtilService.setYearToStaffadmin();
  
}
cancelForm() {
  this.isEditStudent = false;
}
 
 
 


deleteSchoolData(event: Event, schoolData: Student) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: 'confirm-delete-school',
      icon: 'pi pi-info-circle',
      message: 'Are you sure to delete student data?',
      accept: () => { this.deleteSchool(schoolData); },
    });
}

private _deleteSchoolData() {
    this.messageService.add({key: 'custom', severity:'success', summary: 'School Data Deleted Successfully'});
}

deleteSchool(School) {
  let schoolId=School.sId
  this.studentEnrollmentService.deleteStudent(schoolId).subscribe(
    res => {
        this.messageService.add({key: 'custom', severity:'success', summary: 'Student Data Deleted Successfully'});
    },
    error => this.error = error
  );
this.loadStudentData()
}



private _dropDatabase() {
  console.log('Database dropped');
}

}
