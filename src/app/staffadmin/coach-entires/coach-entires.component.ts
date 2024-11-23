import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { ReportMeritService } from 'src/app/admin/service/report-merit.service';
//import * as jspdf from 'jspdf';
import { IssoUtilService  } from '../../services/isso-util.service'
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { StudentService } from '../service/student.service';
//import * as html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';
 
 import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';

import { DatePipe, isPlatformBrowser } from '@angular/common';
import { PaymentService } from '../service/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentEnrollmentService } from '../service/student-enrollment.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-coach-entires',
  templateUrl: './coach-entires.component.html',
  styleUrls: ['./coach-entires.component.css'],
  providers: [MessageService,DatePipe,ConfirmationService],
 // providers: [MessageService,ConfirmationService]
 

})
export class CoachEntiresComponent implements OnInit {
  // rzp_test_7HdkaZ1xFGPomB
  serverUrl = environment.baseUrl;

  profileForm:FormGroup;
  
  

base64Image:any;
 

@ViewChild('reportContent', {static: false})reportContent: ElementRef;
@ViewChild('report_Content', {static: false})report_Content: ElementRef;

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

  genderOptions: SelectItem[];
  genderVal: any;
  selectedEvent: string;
  selectedGame: string;
  selectedAge: string;
  selectedGender: string;
  display: boolean;
  showAddbutton: boolean;
  isFirstYear: boolean;
  isButtonEnabled = false;
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
 // this.ageOptions = this.issoUtilService.setAge();
  this.isCertificate =false
  this.isDataAvailble = false
  this.yearOptions = this.issoUtilService.setYearToStaffadmin();
  this.feeOptions = this.issoUtilService.setFeeType();
  this.schoolId = localStorage.getItem('schoolId');
  this.initialForm();
  this.fileUpladForm();
  this.onyeareChange(this.yearOptions[1].year,'second')
  
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
setAgeMap(evenVal) {
  this.meritService.setAgeMapForMerit(evenVal,this.gameID).subscribe(
   response => {
      let ageList;
      const ageListArray = [];
      if(response[0].ageRange !== 'null' ||  response[0].girlsAgeRange !== 'null') {
        if (response[0].ageRange == 'null') {
          ageList =  response[0].girlsAgeRange;
        } else if( response[0].girlsAgeRange !== 'null') {
          ageList =  response[0].ageRange;
        } else {
          ageList = response[0].ageRange + " " + response[0].girlsAgeRange;
        }
  //  const ageList = response[0].ageRange + " " + response[0].girlsAgeRange;
    //this.ageMeritArray= ageList.split(" ");
    const x = Array.from(new Set(ageList.split(" "))).toString();
    
    var myarray = x.split(',');
    let ageArrayLength =  myarray.length;

    this.ageOptions =[];
    this.ageOptions.push({
      label: "Please Select",
      value: ''
    });

    for(var i = 0; i < ageArrayLength; i++) {
      if(myarray[i] !=='' && myarray[i] !=='null'){
      this.ageOptions.push({
        label: myarray[i],
        value: myarray[i]
      });
    }
    }

  } else {
    console.log('im else')
  }
    } ,
    error => {
      //this.errorAlert =true;
   });

}

onKeypressEvent(amount) {
   this.totalAmount = amount;
   console.log(this.totalAmount);
}
get f() { return this.studentEnroolForm.controls; }
initialForm() {
 //this.isFileBig = false;
  this.genderOptions =this.issoUtilService.setGender();
  this.url = '';
  this.isValidFile = true;
  
  this.studentEnroolForm = this.fb.group({
    editStudentPhoto:[],
    studentId: '',
    ageRange:['', Validators.required],
    gender:['', Validators.required],
    studentName: ['', Validators.required],
    fatherName: ['', Validators.required],
    profile: ['', Validators.required],
   
  }); 
  this.submitButtonLabel = "Submit"
}

makeEmptyForm() {
  this.isEdit = false;
  this.studentName ='';
  this.fatherName ='';
  this.selectedProfile ='';
  this.studentId= ''
  this.editStudentPhoto = '';
  this.submitButtonLabel = "Submit"
  this.url= '';
  if(document.getElementById('my-input')) {
     let control2 = this.studentEnroolForm.get('profile');
        control2.setValue(null);
        control2.setValidators([Validators.required]);
         control2.updateValueAndValidity();
  }
}
onFileSelected(event) {    
  if(event.target.files) { 
   var reader = new FileReader();
   reader.readAsDataURL(event.target.files[0]);
   reader.onload=(event:any)=>{
     this.url=event.target.result;
   }
   var newName=(event.target.files[0].name).split('.').slice(0, -1).join('.')
   if(newName.indexOf('.') !== -1)
   {
     this.isMoreDot = true;
   } else {
      this.isMoreDot = false;
   }
   var removeSpace = newName.replace(/\s/g, "");
   var ext = (event.target.files[0].name).split('.').pop(); 
   this.fileName= Math.floor((Math.random() * 1000000000) + 1);
   this.fullFilename= removeSpace+this.fileName+'.'+ext;
  // this.blobName = this.fullFilename
   const profile = event.target.files[0];
   const fileType = profile.type
   if ((ext == 'png'  || ext == 'PNG' || ext == 'jpeg' || ext == 'JPEG' || ext == 'JPG' || ext == 'jpg' ) && !this.isMoreDot) {

   // if ((fileType == 'image/png' || fileType == 'image/jpeg' || fileType == 'image/PNG' || fileType == 'image/JPG' || fileType == 'image/JPG') && !this.isMoreDot) {
     this.isValidFile = true;
   } else {
     this.isValidFile = false;
     this.selectedProfile = '';
     if(document.getElementById('my-input')) {
         let control2 = this.studentEnroolForm.get('profile');
         control2.setValue(null);
         control2.setValidators([Validators.required]);
         control2.updateValueAndValidity();
     }
   }
   if (profile.size > 102400) { 
      this.isFileBig = true;
     this.selectedProfile = '';
     if(document.getElementById('my-input')) {
      let control2 = this.studentEnroolForm.get('profile');
      control2.setValue(null);
      control2.setValidators([Validators.required]);
      control2.updateValueAndValidity();
    }
   } else {
     this.isFileBig = false;
   }
   this.profileForm.get('profile').setValue(profile);
   
 } 
}
fileUpladForm() {
  this.profileForm= this.pb.group({
    name:[''],
    profile:['']
  })
}
onSubmit() {
  // this.submitted = true;
  
  const formData = new FormData();
  const schoolId = localStorage.getItem('schoolId');
 
 
  
  formData.append('schoolId', schoolId);
  formData.append('studentName', this.studentEnroolForm.get('studentName').value);
  formData.append('studentId', this.studentEnroolForm.get('studentId').value);
  formData.append('editStudentPhoto', this.studentEnroolForm.get('editStudentPhoto').value);
  
  formData.append('fatherName', this.studentEnroolForm.get('fatherName').value);
 
 

  // if(this.studentEnroolForm.get('profile').value == 'C:\\fakepath\\'+this.studentPhoto || this.studentEnroolForm.get('profile').value == this.studentPhoto) {
  if (this.studentEnroolForm.get('profile').value == '' || this.studentEnroolForm.get('profile').value == 'C:\\fakepath\\'+this.studentPhoto || this.studentEnroolForm.get('profile').value == this.studentPhoto) {
    formData.append('fileNoChange', '1');
    formData.append('oldPhotoName', this.studentPhoto);
  } else {
   	formData.append('fileNoChange', '0');
   	formData.append('profile', this.profileForm.get('profile').value, this.fullFilename);
  }
  formData.append('ageRange', this.ageRange);
  // formData.append('gender', this.gender);
  formData.append('yearvalue', this.yearvalue);
  formData.append('gameId', this.gameID);
  formData.append('eventId', this.eventValue);
  formData.append('genderVal', this.genderVal);
  if(this.submitButtonLabel == "Submit") {
    this.studentEnrollmentService.saveCoachData(formData).subscribe(
      res => {
          if (res.status === 'error') {
            this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
          } else {
            this.messageService.add({key: 'custom', severity:'success', summary: 'Coach Data Added Successfully'});
            this.studentEnroolForm.reset();
            this.display = false;
            this.loadCoachData();
          }
      },
      error => this.error = error
     );
   }
   if (this.submitButtonLabel == "Update") { 
        this.studentEnrollmentService.updateCoachData(formData).subscribe(
      res => {
          if (res.status === 'error') {
            this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
          } else {
            this.messageService.add({key: 'custom', severity:'success', summary: 'Coach Data updated Successfully'});
            this.studentEnroolForm.reset();
            this.display = false;
            this.loadCoachData();
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
    message: 'Are you sure to delete coach data?',
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
 
  this.studentEnrollmentService.deleteCoach(studentID).subscribe(
  res => {
       this.messageService.add({key: 'custom', severity:'success', summary: 'Coach Data Deleted Successfully'});
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
loadCoachData_BK() {
  this.isEdit = false;
  this.genderReadble = true;
  this.coachDataArray = [];
  this.coachDataArray.push(
    this.eventValue, this.gameID, this.ageRange,this.schoolId,this.genderVal
  );
  const formData = new FormData();
  formData.append('coachInfo', JSON.stringify(this.coachDataArray));
  this.studentEnrollmentService.loadCoachData(formData).subscribe(
    response => {
      this.coachListArray = response;
     // if(response!=="") {
        if(response.length > 0) {
          this.studentId = this.coachListArray[0].id;
          this.coachDataAvailable = false;
         // this.submitButtonLabel= 'Update';
        } else {
          // this.submitButtonLabel = 'Submit';
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

loadCoachData() {
  this.isEdit = false;
  this.genderReadble = true;
  this.coachDataArray = [];
  this.coachDataArray.push(
    this.eventValue, this.gameID, this.schoolId,
  );
  const formData = new FormData();
  formData.append('coachInfo', JSON.stringify(this.coachDataArray));
  this.studentEnrollmentService.loadCoachData(formData).subscribe(
    response => {
      this.coachListArray = response;
     // if(response!=="") {
        if(response.length > 0) {
          this.studentId = this.coachListArray[0].id;
          this.coachDataAvailable = false;
         // this.submitButtonLabel= 'Update';
        } else {
          // this.submitButtonLabel = 'Submit';
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

showDialog() {
  this.display = true;
  this.initialForm();
  this.makeEmptyForm();
}
// hideDialog(){
//   console.log('im')
// }
editStudent(i: number): void {
  this.display = true;
  this.isEdit = true;
  this.isValidFile = true;
  this.isFileBig = false;
 
  this.submitButtonLabel = "Update";
  console.log(this.submitButtonLabel)
  //this.selectedProfile = this.coachListArray[i].coachPhoto,
  this.studentPhoto = this.coachListArray[i].coachPhoto,
  this.studentEnroolForm.setValue({
 //  schoolId: this.schoolId,
   ageRange: this.coachListArray[i].ageRange,
   gender: this.coachListArray[i].gender,
   editStudentPhoto: this.coachListArray[i].coachPhoto,
   studentId: this.coachListArray[i].id,
   studentName: this.coachListArray[i].coachName,
   fatherName: this.coachListArray[i].coachFatherName,
   selectedProfile:this.coachListArray[i].coachPhoto,
   profile :'',
 
 });  
 //console.log('Form==>'+JSON.stringify(this.studentEnroolForm))
 
// this.coachDataAvailable = false;
  //this.setFocus('studentNameText');
  let filePath = 'https://issoindia.com/isso-php/upload/'+this.yearvalue+'/coach/'+this.studentPhoto;
  this.changeFileName(filePath, this.studentPhoto);
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
onyeareChange(val, yearText) {
  if(yearText == 'first') {
    this.isFirstYear = true;
  } else {
    this.isFirstYear = false;
  }
  this.coachListArray = [];
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
  this.gameID = '';
  this.selectedGame ='';
  this.genderReadble = false;
  this.selectedAge='';
  // this.eventValue = event.value;
  this.coachDataAvailable = true;
  this.coachListArray =[];
  let yearVal = this.yearvalue.toString();
  let eventYear = yearVal.split("-");
  this.selectedYearVal = eventYear[1];
   this.ageReaadble = false;

  const eventval = event.value
  this.eventArray =  eventval.split(","); 
  this.eventValue = this.eventArray[0];
  this.eventName =  this.eventArray[1];

  if(this.eventValue !== '') {
  this.meritService.loadGameForStaff(this.eventValue).subscribe(
    response => {
      if(response!=="") {
        this.gameList =response;
        this.gameOptions =[];
        this.schoolReadble = false;
        if(this.gameList.length > 0 ) {
          this.gameIdList = this.gameList[0].gameId.split(',')
          this.gameNameList =  this.gameList[0].game_name.split(',')
          console.log('im game name'+this.gameNameList)
          this.myObjArray = [];
        
          
         for(let i=0;i<this.gameIdList.length;i++) {
           this.myObjArray.push({gameId: Number(this.gameIdList[i]), game_name: this.gameNameList[i] });
         }


          this.gameOptions = [];
          this.gameReadble = true;
          this.isDataAvailble = false;
          this.gameOptions.push({
            label: "Please Select",
            value: '',
          });
          this.gameList.forEach(element => {
            const gameIdAndName = element.gameId +','+ element.game_name;
            this.gameOptions.push({
              label: element.game_name,
              value: gameIdAndName
            });
          })
          console.log('gameOptions'+JSON.stringify(this.gameOptions));

       } else {
        this.isDataAvailble = false;
        this.gameReadble = false;
        this.schoolReadble = false;
        this.genderReadble = false;
        this.coachDataAvailable = true;
        
        this.ageReaadble = false;
        this.selectedAge ='';
        this.selectedGender ='';
        this.messageService.add({key: 'custom',severity:'error', summary: 'Game not found for this Event!'});

       }
      } else {
        console.log('Data is blannk from service')
      }

   } ,
   error => {
     //this.errorAlert =true;
    });
  } else {
    this.gameOptions = [];
    this.gameReadble = false;
  }
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
  //this.isEdit = false; 
 // this.ageRange = ageData.value;
  this.genderVal = gender.value;
  console.log(this.ageRange);
  
 // this.loadCoachData();
}
loadAgeChange(ageData) {
 // this.isEdit = false;
  this.ageRange = ageData.value;
 if(this.ageRange) {
   this.isButtonEnabled = true;
 } else {
  this.isButtonEnabled = false;
 }
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
     this.loadCoachData()
     this.setAgeMap(this.eventValue)
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

          } else {
            this.setPaymentForGame()
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
setPaymentForGame() {
    this.meritService.loadStaffReport(this.yearvalue,0, this.eventValue,this.gameID, this.schoolId).subscribe(
    response => {
      if(response!=="") { 
        this.reportData = response;
        this.reportDataLength = Object.keys(this.reportData).length;
        if (this.reportDataLength > 0) {
          this.showPayment = true;
          this.isDataAvailble = true;
          this.noParticipateEvent = false;
          this.eventPrice = this.reportData[0].price;
         
          if(this.schoolType == 'Yes') {
            this.totalAmount =   this.eventPrice * this.reportDataLength;
          } else {
            this.totalAmount =  2 * (this.eventPrice * this.reportDataLength);
          }
          console.log('sdfsfaf'+this.totalAmount)
          this.school_Name = this.reportData[0].schoolName;
          this.event_year = this.reportData[0].event_year;
          this.evetName = this.reportData[0].eventName;
          this.event_name= this.evetName;
          this.schooName = this.school_Name;
          this.eventNote = this.reportData[0].note;
          this.eventDescription = this.reportData[0].description;
          this.ageReaadble = true;
          this.showAddbutton = true;
        } else {
          this.coachDataAvailable = true;
          this.coachListArray =[];
          this.ageReaadble = false;
          this.genderReadble = false;
          this.showAddbutton = false;
          this.messageService.add({key: 'custom', severity:'error', summary: 'You have not participated in this game'});
          this.noParticipateEvent = true;
          this.isDataAvailble = false;
          this.showPayment = false;
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
