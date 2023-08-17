import { Component, OnInit } from '@angular/core';
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
  yearOptions: SelectItem[];
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
onyeareChange(event) {
  this.yearvalue = event.value;
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
    
    this.schoolForm = this.fb.group({
      sId:[''],
      studentName: ['', Validators.required],
      fatherName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      standardClass: ['', Validators.required],
      ageRange: ['', Validators.required],
      aadharNumber: ['', Validators.required],
      gameName: ['', Validators.required],
      subGameName: [''],
      eventName: ['', Validators.required],
      schoolName: ['', Validators.required],
      createdDate:['', Validators.required],
    });
     this.yearOptions = this.issoUtilService.setYearForStaffadmin();
   // this.setYear();
    this.sortOptions = [
      {label: 'Newest First', value: '!year'},
      {label: 'Oldest First', value: 'year'},
      {label: 'Brand', value: 'brand'}
   ];
}
cancelForm() {
  this.isEditStudent = false;
}
editStudent(event: Event, studentData: Student,type:any) {
  console.log(studentData);
  this.shoolName = studentData.schoolName;
  this.eventName = studentData.eventName;
    if(type == 'edit') {
        this.isEditStudent = true;
        this.schoolForm.setValue({
          sId:studentData.sId,  
          studentName: studentData.studentName,
          fatherName:  studentData.fatherName,
          dateOfBirth: new Date(studentData.dateOfBirth),
          standardClass:  studentData.standardClass,
          ageRange:  studentData.ageRange,
          aadharNumber: studentData.aadharNumber,
          gameName: studentData.gameName,
          subGameName:  studentData.subGameName,
          eventName: studentData.eventName,
          schoolName: studentData.schoolName,
          createdDate: studentData.createdDate,
        });  
   } else {
       this.schoolForm.setValue({ 
        sId:'',   
        studentName: '',
        fatherName: '',
        dateOfBirth: ' ',
        standardClass: ' ',
        ageRange: ' ',
        aadharNumber: ' ',
        gameName:' ',
        subGameName:'',
        eventName:'',
        schoolName:'',
        createdDate:''
      }); 
    }
    this.display = true;
    
}
 

onSubmit() {
      this.submitted = true;
      const formData = new FormData();
      let schoolID =  this.schoolForm.get('schoolId').value;
      formData.append('schoolname', this.schoolForm.get('schoolname').value);
      formData.append('schoolEmail', this.schoolForm.get('schoolEmail').value);
      formData.append('schoolBoard', this.schoolForm.get('schoolBoard').value);
      formData.append('schoolPassword', this.schoolForm.get('schoolPassword').value);
      formData.append('schoolInfra', this.schoolForm.get('schoolInfra').value);
      formData.append('schoolTelePhone', this.schoolForm.get('schoolTelePhone').value);
      formData.append('schoolAddress', this.schoolForm.get('schoolAddress').value);
     // formData.append('hiddentext', this.schoolForm.get('hiddentext').value);
      if(schoolID == '') {
        console.log('im add')
      //   this.studentService.saveSchoolData(formData).subscribe(
      //   res => {
      //       if (res.status === 'error') {
      //         this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
      //       } else {
      //         this.messageService.add({key: 'custom', severity:'success', summary: 'New School Added Successfully'});

      //       }
      //     this.display =false
      //   },
      //   error => this.error = error
      // );

     } else {
       console.log('im edit')
      // this.schoolService.editSchoolData(formData,schoolID).subscribe(
      //   res => {
      //       if (res.status === 'error') { 
      //         this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
      //       } else {
      //         this.messageService.add({key: 'custom', severity:'success', summary: 'School Data Updated Successfully'});

      //       }
      //     this.display =false
      //     this.getSchoolData();
      //   },
      //   error => this.error = error
      //);

     }
 
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
