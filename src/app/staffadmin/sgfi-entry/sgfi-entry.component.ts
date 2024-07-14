import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SgfiEntriesService } from 'src/app/admin/service/sgfi-entries.service';
import { MessageService, SelectItem,Message } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { PaymentService } from '../service/payment.service';
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-sgfi-entry',
  templateUrl: './sgfi-entry.component.html',
  styleUrls: ['./sgfi-entry.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class SgfiEntryComponent implements OnInit {
  rootGameServicData: any;
  rootGameData: any;
  gameOptions: any[];
  schoolId: string;
  gameArray =[];
  gameId: any;
  gameName: any;
  gameType: any;
  alreadyAddedStudentList: any;
  studentRecordLength: number;
  showSgfi: boolean = false;
  display: boolean= false;
   sgfiEnrollForm: FormGroup;
  modal='modal';
  isForm: boolean;
  isDoc: boolean;
  isPayment: boolean;
  studentName: any;
  schoolName: any;
  dateOfBirth: any;
  selectedFatherName: any;
  visible: boolean= false;
  schoolAddress: any;
  schoolContact: any;
  completedYear: moment.Duration;
  finalCompletedYear: string;
  submitted: boolean;
  sgfiFormData:any;
  error: any;
  studentId: any;
  payableAmount: any;
  totalAmount: any;
  paymentTypeInfo: any;
  generatedpaymentId: any;
 
  constructor( 
    private sgfiEntriesService :SgfiEntriesService,  
    private messageService: MessageService,
    private payemntService:  PaymentService,

  ) { 
    
  }
 
  // get name() { return this.sgfiEnrollForm.controls; }
   get name() { return this.sgfiEnrollForm.get('name'); }
   get fatherName() { return this.sgfiEnrollForm.get('fatherName'); }
   get motherName() { return this.sgfiEnrollForm.get('motherName'); } 
   get admissionNo() { return this.sgfiEnrollForm.get('admissionNo'); }
   get schoolJoinDate() { return this.sgfiEnrollForm.get('schoolJoinDate'); }
   get studyingYear() { return this.sgfiEnrollForm.get('studyingYear'); }
   get sgfiRegNo() { return this.sgfiEnrollForm.get('sgfiRegNo'); }
   get dicipline() { return this.sgfiEnrollForm.get('dicipline'); }
   get studyingLastYear() { return this.sgfiEnrollForm.get('studyingLastYear'); }
   get personalIdentity() { return this.sgfiEnrollForm.get('personalIdentity'); }
   
  ngOnInit() {
    this.schoolId = localStorage.getItem('schoolId')
    this.loadGame();
    this.getSgfiAmount();
  // this.initialiseForm();
    
  }
  getSgfiAmount(){
    this.sgfiEntriesService.getSgfiAmount().subscribe(response => {
      if(response!=='') {
        this.payableAmount = response[0].amount;
      }
    },
    error => {
      console.log('this is error-->'+JSON.stringify(error.errorDesc));
     // this.messageService.add({key: 'error', severity:'error', summary: error.errorDesc});
      this.messageService.add({key: 'custom',severity:'error', summary:  error.errorDesc});
      //this.errorAlert =true;
     });
  }
  payNow(amt,studentId,paymentType) {
    this.totalAmount = amt;
    this.studentId = studentId;
    this.paymentTypeInfo = paymentType;
   // this.paymentCapture.bind(this);
    // this.paymentCapture1();
    let options = {
      "key": "rzp_live_08wdE0QgVsFNVd", // Enter the Key ID generated from the Dashboard
      "amount": amt * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      // "amount": 100,
      "currency": "INR",
      "name": 'SGFI PAYMENT',
      "description": this.gameName,
      "image": "https://issoindia.com/assets/img/logo_retina.png", 
      //'handler': this.paymentCapture.bind(this),
      'handler':(response)=>{this.paymentCapture(response)},
   
      // "order_id": "order_9A33XWu170gUtb", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
     "callback_url": "http://localhost:4200/#/staffadmin/sgfi",
      "prefill": {
          "name": "",
          "email": "", 
          "contact": ""
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  // options.handler = ((response) => {
  //   //this.pay_id = response.razorpay_payment_id;
  //   this.orderanything()
  // }); 
  var propay = new this.payemntService.nativeWindow.Razorpay(options);
  propay.open();
  
  propay.on('payment.success', function(resp) {
  alert("payment checking.");
  alert(resp.razorpay_payment_id),
  alert(resp.razorpay_order_id),
  alert(resp.razorpay_signature)}); 
   
  }
  paymentCapture(response) {
    const formData = new FormData();
    this.generatedpaymentId = response.razorpay_payment_id;
 
    let paidAmount =(this.totalAmount).toString();
    formData.append('paymentTypeInfo', this.paymentTypeInfo);
    formData.append('schoolId', this.schoolId);
    formData.append('generatedpaymentId', this.generatedpaymentId);
    formData.append('studentId', this.studentId);
    formData.append('paidAmount', paidAmount);
    formData.append('gameId', this.gameId);
 
  
  this.sgfiEntriesService.savePaymentData(formData).subscribe(
    res => {
        if (res.status === 'error') {
          this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        }  
    },
    error => this.error = error
   );
  }
  initialiseForm(response) {
    console.log(response)
    this.studentName = response[0].studentName;
    this.selectedFatherName = response[0].fatherName;
    this.schoolName =  response[0].schoolName;
    this.dateOfBirth =  response[0].dateOfBirth;
    this.schoolAddress = response[0].schoolAddress;
    this.studentId = response[0].sId;
    this.completedYear =  moment.duration(moment().diff(response[0].dateOfBirth));
    this.schoolContact =response[0].designation1;
    this.sgfiEnrollForm = new FormGroup({
      'name': new FormControl('', [ Validators.required]),
      'fatherName': new FormControl('', [ Validators.required]),
      'motherName': new FormControl('', [ Validators.required]),
      'studentAddress': new FormControl(''),
      'admissionNo': new FormControl('', [ Validators.required]),
      'schoolJoinDate': new FormControl('', [ Validators.required]),
      'studyingYear': new FormControl('', [ Validators.required]),
      'sgfiRegNo': new FormControl('', [ Validators.required]),
      'dicipline': new FormControl('', [ Validators.required]),
      'studyingLastYear': new FormControl('', [ Validators.required]),
      'personalIdentity': new FormControl('', [ Validators.required]),
      'personalIdentitytwo': new FormControl(''),
      'aadharNo': new FormControl(''),
      'passport': new FormControl(''),
      'bankDetails': new FormControl(''),   
              
      
    });
  }
  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
}
  loadGame(){
    this.sgfiEntriesService.getGameForStaff(this.schoolId).subscribe(response => {
      if(response!=='') {
        this.rootGameServicData = response;
        this.rootGameData = this.rootGameServicData;
        let recordCount = JSON.stringify(this.rootGameData.length);
        if(recordCount !== '0') {
          this.showSgfi = true;
          this.gameOptions = []; 
          this.gameOptions.push({
            label:"Please select",
            value: ''
          });
          this.rootGameData.forEach(element => {
            const gameIdAndName = element.gameId +','+ element.gameName +','+ element.gameType;
            this.gameOptions.push({
              label: element.gameName,
              value: gameIdAndName
            });
  
          })
        } else {
          this.showSgfi = false;
        }
       
      } else {
        
        alert('im blankl=')
      }
    } ,
   error => {
     //this.errorAlert =true;
    });
  }
  loadGameChange(gameData) {
    const gameval = gameData.value;
    this.gameArray =  gameval.split(","); 
    this.gameId = this.gameArray[0];
    this.gameName =  this.gameArray[1];
    this.gameType =  this.gameArray[2];
    if(gameData.value!='') {
      this.getStudents();
    }
 
  }
  
  showDialog1() {
    this.visible = true;
    this.isForm = true;
}
  getStudents() {
    this.sgfiEntriesService.getStudentForStaff(this.schoolId,this.gameId).subscribe(response => {
          if(response!=="") {
              this.alreadyAddedStudentList =   response;
              this.dateOfBirth =  response[0].dateOfBirth
              this.studentRecordLength = Object.keys( this.alreadyAddedStudentList).length;
              if(this.studentRecordLength >0) {
                this.initialiseForm(response)
              }
          }
      } ,
      error => {
        //this.errorAlert =true;
      });
  }
  
showDialog() {
  this.display = true;
 }
 onFormSubmit() {
 this.sgfiFormData = this.sgfiEnrollForm.value;
  console.log(this.sgfiFormData);
  // const formData = new FormData();
  // formData.append('sgfiStudentData', JSON.stringify(this.sgfiFormData));

   
  const formData = new FormData();
  formData.append('name', this.sgfiEnrollForm.get('name').value);
  formData.append('fatherName', this.sgfiEnrollForm.get('fatherName').value);
  formData.append('motherName', this.sgfiEnrollForm.get('motherName').value);
  formData.append('studentAddress', this.sgfiEnrollForm.get('studentAddress').value);
  formData.append('admissionNo', this.sgfiEnrollForm.get('admissionNo').value);
  formData.append('schoolJoinDate', this.sgfiEnrollForm.get('schoolJoinDate').value);
  formData.append('studyingYear', this.sgfiEnrollForm.get('studyingYear').value);
  formData.append('sgfiRegNo', this.sgfiEnrollForm.get('sgfiRegNo').value);
  formData.append('dicipline', this.sgfiEnrollForm.get('dicipline').value);
  formData.append('studyingLastYear', this.sgfiEnrollForm.get('studyingLastYear').value);
  formData.append('personalIdentity', this.sgfiEnrollForm.get('personalIdentity').value);
  formData.append('personalIdentitytwo', this.sgfiEnrollForm.get('personalIdentitytwo').value);
  formData.append('aadharNo', this.sgfiEnrollForm.get('aadharNo').value);
  formData.append('passport', this.sgfiEnrollForm.get('passport').value);
  formData.append('bankDetails', this.sgfiEnrollForm.get('bankDetails').value);
  formData.append('dateOfBirth', this.gameId);
  formData.append('schoolId', this.schoolId);
  formData.append('gameId', this.gameId);
  formData.append('studentId', this.studentId);

      this.sgfiEntriesService.enrollStudent(formData).subscribe(
        res => {
          if(res.status === 'success') { 
            this.messageService.add({key: 'custom', severity:'success', summary: 'Student Data Added Successfully'});
            this.sgfiEnrollForm.reset();
            this.isDoc = true;
            this.isForm = false;
            this.selectedFatherName ='';
         } 
         },
        error => this.error = error
  
        );
}
openModal(inp: string) {
  console.log(inp);
  this.modal='modal-open';
  this.isForm = true;
}
closeModal(){
  this.modal='modal';
  this.isForm = false;
  this.isDoc = false;
  this.isPayment = false;
}
formMenu(type:string) {
  if (type=='form') {
    this.isForm = true;
    this.isDoc = false;
    this.isPayment = false;
  } else  if (type=='doc') {
    this.isDoc = true;
    this.isForm = false;
    this.isPayment = false;
  }  if (type=='payment') {
    this.isPayment = true;
    this.isForm = false;
    this.isDoc = false;
  }
}
}
