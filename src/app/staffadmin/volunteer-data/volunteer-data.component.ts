// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-coach-entires',
//   templateUrl: './coach-entires.component.html',
//   styleUrls: ['./coach-entires.component.css']
// })
// export class CoachEntiresComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { ReportMeritService } from 'src/app/admin/service/report-merit.service';
// import * as jspdf from 'jspdf';
import { IssoUtilService  } from '../../services/isso-util.service'
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { StudentService } from '../service/student.service';
// import * as html2canvas from 'html2canvas';
// import * as pdfMake from 'pdfmake/build/pdfmake';
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';
 
 import { Observable } from 'rxjs';
// import { Observer } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';

import { DatePipe, isPlatformBrowser } from '@angular/common';
import { PaymentService } from '../service/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentEnrollmentService } from '../service/student-enrollment.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-volunteer-data',
  templateUrl: './volunteer-data.component.html',
  styleUrls: ['./volunteer-data.component.css'],
  providers: [MessageService,DatePipe,ConfirmationService],
 // providers: [MessageService,ConfirmationService]
 

})
export class VolunteerDataComponent implements OnInit {
  // rzp_test_7HdkaZ1xFGPomB
  serverUrl = environment.baseUrl;

  profileForm:FormGroup;
  
  

base64Image:any;
 

 

yearOptions: object;
feeOptions: SelectItem[];
eventOptions: SelectItem[];
gameOptions: SelectItem[];
schoolOptions: SelectItem[];
ageOptions: SelectItem[];
studentEnroolForm: FormGroup;
studentName: string;
fatherName: string;
eventValue: any;
yearvalue: any;
schoolvalue:number;
eventData: any;
schoolDataArray =[];
gameArray=[];
eventReadable: boolean = false;
gameReadble: boolean = false;
schoolReadble: boolean = false;
genderReadble: boolean = false;
schoolList: any;
gameList: any;
gameIdList:any;
gameNameList:any;
public gameID: any;
public schoolID: any;
certificateData: any;
reportData: any;
coachData: any;
isCertificate: boolean = false;
isDataAvailble: boolean = false;
isReportShow: boolean = false;
schooName:string;
items2: MenuItem[];
eventArray =[];
reportLabel:string;
showspinner: boolean = false;
reportValue: number;
reportDataLength: number;
evetName: string;
content: any;
school_Name: string;
event_name: string;
schoolId: string;
myObjArray: any;
noParticipateEvent: boolean = false;
eventNote: any;
eventDescription: any;
selectedYearVal: any;
gameType: any;
isDataTrue: (obj: any) => boolean;
newImage: Promise<unknown>;
setPhotoYear: string;
event_year: any;
totalAngularPackages: any;
eventPrice: any;
totalAmount: number;
showPayment: boolean;
paymentType: string;
isAffilated: string;
schoolType: string;
 
  payementData: Object;
  eventName: any;
  gameName: any;
  affilateAmounnt: any;
  ageReaadble: boolean;
  submitButtonLabel: string;
  url: string;
  isValidFile: boolean;
  isFileBig: boolean;
  selectedProfile: string;
  fullFilename: string;
  fileName: any;
  error: any;
  studentPhoto: string | Blob;
  ageRange: any;
  editStudentPhoto: string;
  coachDataArray=[];
  coachDataAvailable: boolean;
  coachListArray=[];
  studentId: string;
  isEdit: boolean;
  isMoreDot: boolean;
  isFirstYear: boolean;
  genderOptions: SelectItem[];
  genderVal: any;
  selectedEvent: string;
  selectedGame: string;
  selectedAge: string;
  selectedGender: string;
  aadharNumber: string;
  display: boolean;
  isShowButton: boolean;
constructor( 
  @Inject(PLATFORM_ID) private platformId: Object,
  private issoUtilService: IssoUtilService,
  private studentService: StudentService,
  private payemntService:  PaymentService,
  private messageService: MessageService,
  private http: HttpClient,
  private datePipe: DatePipe,
  private fb: FormBuilder,

  private pb:FormBuilder,
  private confirmation: ConfirmationService,
  private studentEnrollmentService: StudentEnrollmentService,
  private meritService: ReportMeritService) { }

ngOnInit() {
  console.log(this.coachDataAvailable);
 this.coachListArray.length = 0;
 this.coachDataAvailable = true;
  this.ageReaadble = false;
  this.ageOptions = this.issoUtilService.setAge();
  this.isCertificate =false
  this.isDataAvailble = false
  this.yearOptions = this.issoUtilService.setYearToStaffadmin();
  this.feeOptions = this.issoUtilService.setFeeType();
  this.schoolId = localStorage.getItem('schoolId');
  this.onyeareChange(this.yearOptions[1].year,'second')
  this.initialForm();
  this.fileUpladForm();
  //this.setPhotoPath();
}
 
setPhotoPath () { 
 // this.setPhotoYear = this.issoUtilService.setCoachPhotoYear();
  let photoPath = this.yearvalue+'/'+'coach';
  console.log(photoPath);
  this.setPhotoYear =  this.serverUrl+'upload/'+photoPath;
}
 
 
paymentCapture(response) {
//  this.loadingProgress = true;
console.log("response id "+JSON.stringify(response));
let paymentId = response.razorpay_payment_id;
  console.log("payment id "+paymentId);
  //TODO
}
 

onKeypressEvent(amount) {
   this.totalAmount = amount;
   console.log(this.totalAmount);
}
get f() { return this.studentEnroolForm.controls; }
initialForm() {
  this.studentEnroolForm = this.fb.group({
    studentId: '',
    studentName: ['', Validators.required],
    aadharNumber: ['', Validators.required]
  }); 
  this.submitButtonLabel = "Submit"
}

makeEmptyForm() {
  this.isEdit = false;
  this.studentName ='';
  this.aadharNumber ='';
  this.studentId= ''
  this.editStudentPhoto = '';
  this.submitButtonLabel = "Submit"
 
}
 
fileUpladForm() {
  this.profileForm= this.pb.group({
    name:[''],
    profile:['']
  })
}
onSubmit() {
  const formData = new FormData();
  const schoolId = localStorage.getItem('schoolId');
  formData.append('schoolId', schoolId);
  formData.append('studentName', this.studentEnroolForm.get('studentName').value);
  formData.append('aadharNumber', this.studentEnroolForm.get('aadharNumber').value);
  formData.append('studentId', this.studentEnroolForm.get('studentId').value);
  formData.append('yearvalue', this.yearvalue);
  formData.append('eventId', this.eventValue);
  if(this.submitButtonLabel == "Submit") {
    this.studentEnrollmentService.saveVolunteerData(formData).subscribe(
      res => {
          if (res.status === 'error') {
            this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
          } else {
            this.messageService.add({key: 'custom', severity:'success', summary: 'Volunteer Data Added Successfully'});
            this.studentEnroolForm.reset();
            this.loadCoachData();
            this.display = false;
          }
      },
      error => this.error = error
     );
   } 
   if (this.submitButtonLabel == "Update") { 
        this.studentEnrollmentService.updateVolunteersData(formData).subscribe(
      res => {
          if (res.status === 'error') {
            this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
          } else {
            this.messageService.add({key: 'custom', severity:'success',summary: 'Volunteer Data updated Successfully'});
            this.studentEnroolForm.reset();
            this.loadCoachData();
            this.display = false;
          }
      },
      error => this.error = error
    ); 
  }
 
  this.makeEmptyForm();
 // formData.append('hiddentext', this.studentEnroolForm.get('hiddentext').value);
}
deleteStudentData(event: Event, i) {
  const studentID = this.coachListArray[i].id
 
  // if (event.defaultPrevented) return;
  // event.preventDefault();
  this.confirmation.confirm({
    key: 'confirm-delete-student',
    icon: 'pi pi-info-circle',
    message: 'Are you sure to delete Volunteer data?',
    accept: () => { 
      
      this.deleteStudent(studentID);
      // this.studentListArray.splice(i, 1); 
       this.makeEmptyForm();
 
      //  if(this.studentListArray.length > 0) {
      //    this.isStudentListShow = true
      //  } else {
      //    this.isStudentListShow = false;
      //  }
      
      //this.deleteSchool(eventData);
     },
  });
}
deleteStudent(studentID: any) {
 
  this.studentEnrollmentService.deleteVolunteer(studentID).subscribe(
  res => {
       this.messageService.add({key: 'custom', severity:'success', summary: 'Volunteer Data Deleted Successfully'});
       this.loadCoachData();
  },
  error => this.error = error
);
}
addMoreData() {
  this.isEdit = false;
  this.studentEnroolForm.reset();
  this.submitButtonLabel = 'Submit';
}
 

loadCoachData() {
  this.isEdit = false;
  this.genderReadble = true;
  this.coachDataArray = [];
  this.coachDataArray.push(
    this.eventValue,this.schoolId
  );
  const formData = new FormData();
  formData.append('coachInfo', JSON.stringify(this.coachDataArray));
  this.studentEnrollmentService.loadVolunteerData(formData).subscribe(
    response => {
      this.coachListArray = response;
     // if(response!=="") {
        if(response.length > 0) {
          this.studentId = this.coachListArray[0].id;
          this.coachDataAvailable = false;
         // this.submitButtonLabel= 'Update';
        } else {
          // this.submitButtonLabel = 'Submit';
          this.messageService.add({key: 'custom',severity:'error', summary: 'Data not found for this event!'});
          this.studentEnroolForm.reset();
          this.coachDataAvailable = false;
        }
        console.log(response);
      
    //  }
    },
   error => {
     //this.errorAlert =true;
    });
}
editStudent(i: number): void {
  this.isEdit = true;
  this.display = true;
  this.submitButtonLabel = "Update";
 
  this.studentEnroolForm.setValue({
   studentId: this.coachListArray[i].id,
   studentName: this.coachListArray[i].studentName,
   aadharNumber: this.coachListArray[i].aadharNumber
 });  
  
}
setFocus(id: string) {
  if (isPlatformBrowser(this.platformId)) {
    this[id].nativeElement.focus();
  } 
}
changeFileName(filePath, fileName) {
  const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
  dataTransfer.items.add(new File([filePath], fileName));
  const inputElement: HTMLInputElement = document.getElementById('my-input') as HTMLInputElement
  
  inputElement.files = dataTransfer.files;
  let control2 = this.studentEnroolForm.get('profile');
  control2.setValidators(null);
  control2.updateValueAndValidity();
}
  
onLoadSchoolData(event) {
  this.yearvalue = event.value;
  console.log('im onload==>+'+this.yearvalue)
  this.setPhotoPath();
  if(this.yearvalue !== '') {
  this.studentService.loadEventByYearForVolunteer(this.yearvalue).subscribe(
    response => {
      if(response!=="") {
        this.eventData =response;
        console.log(this.eventData)
        this.gameReadble =false;
        this.schoolReadble  = false;
        if(this.eventData.length > 0 ){
          this.eventOptions = [];
          this.eventReadable = true;
          this.isDataAvailble = false;
          this.eventOptions.push({
            label: "Please Select",
            value: ''
          });
          this.eventData.forEach(element => {
            const eventIdAndName = element.eventId +','+ element.eventName;
            this.eventOptions.push({
              label: element.eventName,
              value: eventIdAndName
            });
          })
        } else {
          this.isDataAvailble = true;
          this.eventReadable = false;
          this.gameReadble =false;
          this.schoolReadble = false;
          this.coachDataAvailable = true;
          this.coachListArray =[];
          this.ageReaadble = false;
          this.messageService.add({key: 'custom',severity:'error', summary: 'Event not found for this year!'});
        }
      } else {
       console.log('Data is blannk from service')
      }

   } ,
   error => {
     //this.errorAlert =true;
    });
  } 
}
showDialog() {
  this.display = true;
  this.initialForm();
  this.makeEmptyForm();
}


onyeareChange(val, yearText) {
  if(yearText == 'first') {  
    this.isFirstYear = true;
  } else {
    this.isFirstYear = false;
  }
  this.isEdit = false;
  this.yearvalue = val;
  this.genderReadble = false;
  this.selectedEvent ='';
  this.selectedGame ='';
  this.selectedGender = '';
  this.selectedAge='';
  this.setPhotoPath();
  if(this.yearvalue !== '') {
  this.studentService.loadEventByYear(this.yearvalue, this.schoolId).subscribe(
  //this.meritService.loadEventByYear(this.yearvalue).subscribe(
    response => {
      if(response!=="") {
        this.eventData =response;
        console.log(this.eventData)
        this.gameReadble =false;
        this.schoolReadble  = false;
        if(this.eventData.length > 0 ){
          this.eventOptions = [];
          this.eventReadable = true;
          this.isDataAvailble = false;
          this.eventOptions.push({
            label: "Please Select",
            value: ''
          });
          this.eventData.forEach(element => {
            const eventIdAndName = element.eventId +','+ element.eventName;
            this.eventOptions.push({
              label: element.eventName,
              value: eventIdAndName
            });
          })
        } else {
          this.isDataAvailble = true;
          this.eventReadable = false;
          this.gameReadble =false;
          this.schoolReadble = false;
          this.coachDataAvailable = true;
          this.coachListArray =[];
          this.ageReaadble = false;
          this.messageService.add({key: 'custom',severity:'error', summary: 'Event not found for this year!'});
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
    this.gameOptions = [];
    this.eventReadable = false;
    this.gameReadble = false;
  }
}

onEventChange(event) {
  this.isEdit = false;
 
  // this.eventValue = event.value;
  this.coachDataAvailable = true;
  this.coachListArray =[];
  let yearVal = this.yearvalue.toString();
  let eventYear = yearVal.split("-");
  this.selectedYearVal = eventYear[1];
 

  const eventval = event.value
  this.eventArray =  eventval.split(","); 
  this.eventValue = this.eventArray[0];
  this.eventName =  this.eventArray[1];
  this.loadCoachData();
   if(this.eventValue !== '') {
    this.isShowButton = true;
   } else {
    this.isShowButton = false;
   }
  // this.meritService.loadGameForStaff(this.eventValue).subscribe(
  //   response => {
  //     if(response!=="") {
  //       this.gameList =response;
  //       this.gameOptions =[];
  //       this.schoolReadble = false;
  //       if(this.gameList.length > 0 ) {
  //         this.gameIdList = this.gameList[0].gameId.split(',')
  //         this.gameNameList =  this.gameList[0].game_name.split(',')
  //         console.log('im game name'+this.gameNameList)
  //         this.myObjArray = [];
        
          
  //        for(let i=0;i<this.gameIdList.length;i++) {
  //          this.myObjArray.push({gameId: Number(this.gameIdList[i]), game_name: this.gameNameList[i] });
  //        }


  //         this.gameOptions = [];
  //         this.gameReadble = true;
  //         this.isDataAvailble = false;
  //         this.gameOptions.push({
  //           label: "Please Select",
  //           value: '',
  //         });
  //         this.gameList.forEach(element => {
  //           const gameIdAndName = element.gameId +','+ element.game_name;
  //           this.gameOptions.push({
  //             label: element.game_name,
  //             value: gameIdAndName
  //           });
  //         })
  //         console.log('gameOptions'+JSON.stringify(this.gameOptions));

  //      } else {
  //       this.isDataAvailble = false;
  //       this.gameReadble = false;
  //       this.schoolReadble = false;
  //       this.genderReadble = false;
  //       this.coachDataAvailable = true;
        
  //       this.ageReaadble = false;
  //       this.selectedAge ='';
  //       this.selectedGender ='';
  //       this.messageService.add({key: 'custom',severity:'error', summary: 'Game not found for this Event!'});

  //      }
  //     } else {
  //       console.log('Data is blannk from service')
  //     }

  //  } ,
  //  error => {
  //    //this.errorAlert =true;
  //   });
  // } else {
  //   this.gameOptions = [];
  //   this.gameReadble = false;
  // }
}
loadGameChange(gameData) {
  this.isEdit = false;
  this.gameID = gameData.value;
  this.genderReadble = false;
  this.selectedAge='';
  this.meritService.checkAlredayPayment(this.eventValue, this.gameID).subscribe(
    response => {
      if(response!=="") {
     
      } else {
        console.log('Data is blannk from service')
      }

   },
   error => {
     //this.errorAlert =true;
    });

 }
loadGenderChange(gender) {
  this.isEdit = false;
 // this.ageRange = ageData.value;
  this.genderVal = gender.value;
  console.log(this.ageRange);
  this.loadCoachData();
}
loadAgeChange(ageData) {
  this.isEdit = false;
  this.ageRange = ageData.value;
  this.genderReadble = true;
  this.selectedGender ='';
  this.coachDataAvailable = true;
  this.coachListArray=[];
 // console.log(this.ageRange);
 // this.loadCoachData();
}
loadschoolChange(gameData) {
 //   this.gameID = gameData.value;
    this.selectedAge ='';
    this.selectedGender ='';
    this.genderReadble = false;
    const eventval = gameData.value
    this.gameArray =  eventval.split(","); 
    this.gameID = this.gameArray[0];
    this.gameName =  this.gameArray[1];
    this.coachDataAvailable = true;
    this.meritService.checkGameType(this.gameID).subscribe( 
      response => {
         this.gameType = response;
         console.log('game Type===>'+JSON.stringify(this.gameType))
         this.getGameData(this.gameID)
      },
      error => {
    //this.errorAlert =true;
      });

}
 
getGameData(gameID) {
  if(this.gameID) {

    this.meritService.checkAlredayPayment(this.eventValue, this.gameID).subscribe(
      response => {
        if (response!=="") {
          this.payementData = response;
         // this.payementData.
          this.payementData = Object.keys(this.payementData).length;
          console.log(this.payementData);
          if(this.payementData == 1 ) {
            this.messageService.add({key: 'custom', severity:'error', summary: 'You have already done payment for this game'});

          } 
          //  console.log('DATA==>'+response.length);

        } else {
      
          console.log('Data is blannk from service')
        }
  
     },
     error => {
       //this.errorAlert =true;
      });

  } else {
    this.isDataAvailble = false;
  }
}
 
 
}
