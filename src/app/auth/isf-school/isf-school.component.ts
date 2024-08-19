import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolService } from 'src/app/admin/service/school.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IfsSchoolService } from 'src/app/admin/service/ifs-school.service';
import { PaymentService } from 'src/app/staffadmin/service/payment.service';
 
 
@Component({
  selector: 'app-login',
  templateUrl: './isf-school.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./isf-school.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class IsfSchoolComponent implements OnInit {
  @ViewChild('filePassportInput', { static: false }) filePassportInput: ElementRef;
  @ViewChild('fileInputSchoolNoc', { static: false }) fileInputSchoolNoc: ElementRef;
  @ViewChild('fileInputparentNoc', { static: false }) fileInputparentNoc: ElementRef;

  netImage:any = "assets/images/general/isso_logo.png";
  display: boolean = true;
  schoolForm: FormGroup;
  fileForm:FormGroup;
  verifyEmail: FormGroup;
  isRegisteredSchool: boolean = true;
  isDocUpload: boolean = false;
  registeredSchoolData: any;
  verifyEmailForSchool: any;
  showErrorMessage: boolean;
  schoolId: any;
  fileName: number;
  fullFilename: string;
  schoolNocFile:string;
  parentNoc:string;
  selectedPassport: string;
  selectedSchoolNoc: string;
  selectedParentNoc: string;
  isValidFile: boolean = true;
  isFileBig: boolean = false; 
  editStudentPhoto: string;
  studentPhoto: any;
  reactiveForm!: FormGroup;
  isButtonDisabled: boolean  = false; 
  showEmailErrorMessage: boolean  = false; 
  emailOfSchool:string;
  isMoreDot: boolean;
  isPassPortValidFile: boolean  = true;
  isParentNocValidFile: boolean  = true;
  isSchoolNocValidFile: boolean = true;

 
  isParnetNocFileBig: boolean;
  isSchoolNocFileBig: boolean;
  verifyMobNo: boolean  = false; 
  isPassportFileBig: boolean  = false;
  payableAmount: any;
  totalAmount: any;
  mobileValue: string;
  isPaidStatus: string;
  mobileNumberVal: string;
  isPassportUpload: boolean = false; 
  isSchoolNocUpload:boolean= false;
  isParentNocUpload:boolean = false;
  isMobfind: any;
  isMobExist: boolean= false;
 
  showDialog() {
      this.display = true;
  }
  
  errormessage: boolean;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {errorTitle: '', errorDesc: ''};
  loginError: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pb:FormBuilder,
    private ifsSchoolService: IfsSchoolService,
    //private authService1 :SchoolService,
    private authService: AuthService,
    private httpClient:HttpClient,
    private schoolService: SchoolService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private payemntService:  PaymentService,
    ) {  }

  ngOnInit() {
    this.errormessage = false;
    this.fileUpladForm();    
    this.getIfsSchoolAmout()
  }
  
  getIfsSchoolAmout(){
    this.ifsSchoolService.getIfsSchoolAmount().subscribe(response => {
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
 


  fileUpladForm() {
    const numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    this.fileForm= this.pb.group({
      schoolId:[''],
      mobNo:['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.min(1000000000), Validators.max(9999999999)]],
      name:['', Validators.required],  
      gameName:['', Validators.required],         
      profile:['', Validators.required],
      schoolNoc:['', Validators.required],
      parentNoc:['', Validators.required]          
    })
 
  } 
 
  get ifs() {   return this.fileForm.controls; }
 
 
uploadDoc() {
  this.showEmailErrorMessage = false;
  this.isRegisteredSchool = false;
  this.isDocUpload = true;
  this.schoolId = '';
  this.verifyEmail.reset();
}
resetFiles() {
  this.filePassportInput.nativeElement.value = "";
  this.fileInputSchoolNoc.nativeElement.value = "";
  this.fileInputparentNoc.nativeElement.value = "";
}
 
onMobChange(mobValue: string): void {  
  if(mobValue !=='') {
    console.log('im not empty')
    this.verifyMobNo = true;
    
  } else {
    this.verifyMobNo = false;
  }
  this.mobileValue = mobValue;
}
 verifyMob() {
  this.ifsSchoolService.verifyMobNo(this.mobileValue).subscribe((data) => {
   this.verifyEmailForSchool = data;
  if(JSON.stringify(this.verifyEmailForSchool) == "[]") {
     this.showErrorMessage = true;
   } else {
     let paidVal =  JSON.stringify(this.verifyEmailForSchool[0]["isPaid"]);
     this.mobileNumberVal =JSON.stringify(this.verifyEmailForSchool[0]["mobNo"]).slice(1, -1);
     console.log('mob val--->'+this.mobileNumberVal)
     this.isPaidStatus = paidVal.slice(1, -1)
     this.showErrorMessage = false;
   }
 
   },
    error => this.error = error
  );


} 
onFileUpload() {
  if (this.fileForm.valid) {
  this.isButtonDisabled = true;
  const formData = new FormData();
  formData.append('name', this.fileForm.get('name').value);
  formData.append('mobNo', this.fileForm.get('mobNo').value);
  formData.append('gameName', this.fileForm.get('gameName').value);
  formData.append('profile', this.fileForm.get('profile').value,this.fullFilename);
  formData.append('schoolNoc', this.fileForm.get('schoolNoc').value,this.schoolNocFile);
  formData.append('parentNoc', this.fileForm.get('parentNoc').value,this.parentNoc);
  this.ifsSchoolService.uploadDoc(formData).subscribe(
    res => {
      console.log('RES==>',res);
        if (res.status === 'error') {
          this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        } else {
          this.messageService.add({key: 'custom', severity:'success', summary: 'Data Saved Successfully'});
          this.fileForm.reset();
          this.resetFiles();
          this.isButtonDisabled = false;
        }
    },
    error => this.error = error
  );
}
}
onPassportSelected(event: Event): void {
  this.isPassportUpload = false;
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    var newName=(input.files[0].name).split('.').slice(0, -1).join('.')
    var removeSpace = newName.replace(/\s/g, "");
    var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "")
    var ext = (input.files[0].name).split('.').pop(); 
    this.fileName = Math.floor((Math.random() * 1000000000) + 1);
    this.fullFilename= removeSpecialChar+this.fileName+'.'+ext;
    console.log('Selected file:', file);
    if ( ext == 'pdf'  || ext == 'PDF' ||ext == 'png'  || ext == 'PNG' || ext == 'jpeg' || ext == 'JPEG' || ext == 'JPG' || ext == 'jpg' ) {
      this.isPassPortValidFile = true;
    } else {
      this.isPassPortValidFile = false;
      this.filePassportInput.nativeElement.value = "";
    } 
    if (this.filePassportInput.nativeElement.value && input.files[0].size > 102400) { 
      this.isPassportFileBig = true;
      this.filePassportInput.nativeElement.value = "";
    } else {
     this.isPassportFileBig = false;
   }
  
   if(this.filePassportInput.nativeElement.value) {
    this.isPassportUpload = true;
   
   } else {
    this.isPassportUpload = false;
  }
   if(this.isPassPortValidFile && !this.isPassportFileBig) {
    this.fileForm.get('profile').setValue(file);
   } else {
    this.fileForm.patchValue( {'profile':null} );
   }
 
  }
}
resetFileInput(fileInput: HTMLInputElement): void {
  fileInput.value = '';
}
onParentNocSelected(event: Event): void {
  this.isParentNocUpload = false;
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    var newName=(input.files[0].name).split('.').slice(0, -1).join('.')
    var removeSpace = newName.replace(/\s/g, "");
    var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "")
    var ext = (input.files[0].name).split('.').pop(); 
    this.fileName = Math.floor((Math.random() * 1000000000) + 1);
    this.parentNoc = removeSpecialChar+this.fileName+'.'+ext;
    if ( ext == 'pdf'  || ext == 'PDF' ||ext == 'png'  || ext == 'PNG' || ext == 'jpeg' || ext == 'JPEG' || ext == 'JPG' || ext == 'jpg' ) {
      this.isParentNocValidFile = true;
    } else {
      this.isParentNocValidFile = false;
      this.resetFileInput(input);
    } 
    if (this.fileInputparentNoc.nativeElement.value && input.files[0].size > 102400) { 
      this.resetFileInput(input);
      this.isParnetNocFileBig = true;
    } else {
     this.isParnetNocFileBig = false;
   }
   if(this.fileInputparentNoc.nativeElement.value) {
    this.isParentNocUpload = true; 
   } else {
    this.isParentNocUpload = false; 
   }
   if(this.isParentNocValidFile && !this.isParnetNocFileBig) {
    this.fileForm.get('parentNoc').setValue(file);
   } else {
    this.fileForm.patchValue( {'parentNoc':null} );
   }
 
  }
}
onSchoolNocSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.schoolNocFile =input.files[0].name;
    const file = input.files[0];
    var newName=(input.files[0].name).split('.').slice(0, -1).join('.')
    var removeSpace = newName.replace(/\s/g, "");
    var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "")
    var ext = (input.files[0].name).split('.').pop(); 
    this.fileName = Math.floor((Math.random() * 1000000000) + 1);
    this.schoolNocFile = removeSpecialChar+this.fileName+'.'+ext;
    if ( ext == 'pdf'  || ext == 'PDF' ||ext == 'png'  || ext == 'PNG' || ext == 'jpeg' || ext == 'JPEG' || ext == 'JPG' || ext == 'jpg' ) {
      this.isSchoolNocValidFile = true;
    } else {
      this.resetFileInput(input);
      this.isSchoolNocValidFile = false;
    } 
    if (this.fileInputSchoolNoc.nativeElement.value && input.files[0].size > 102400) { 
      this.isSchoolNocFileBig = true;
      this.resetFileInput(input);
    } else {
     this.isSchoolNocFileBig = false;
   }

   if(this.fileInputSchoolNoc.nativeElement.value) {
    this.isParentNocUpload = true; 
   } else {
    this.isParentNocUpload = false; 
   }
   if(this.isSchoolNocValidFile && !this.isSchoolNocFileBig) {
    this.fileForm.get('schoolNoc').setValue(file);
   } else {
    this.fileForm.patchValue( {'schoolNoc':null} );
   }
    
  }
}


 
 onEnterMob(event:any) {
  this.ifsSchoolService.checkRegisteredMobNo(event).subscribe((isMobfind) => {
    if(!isMobfind) {
      this.isMobExist = false;
      this.fileForm.get('mobNo').setValue(event);
    } else {
      this.isMobExist = true;
      this.fileForm.patchValue( {'mobNo':null} );
 
    }
 
    },
     error => this.error = error
   );
 }
 payNow(amt) {
  console.log(amt)
    this.totalAmount = amt;
  // this.studentId = studentId;
  // this.paymentTypeInfo = paymentType;
 // this.paymentCapture.bind(this);
  // this.paymentCapture1();
  let options = {
    "key": "rzp_live_08wdE0QgVsFNVd", // Enter the Key ID generated from the Dashboard
    "amount": amt * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    // "amount": 100,
    "currency": "INR",
    "name": 'ISF GAMES',
    "description":'ISF GAMES',
    "image": "https://issoindia.com/assets/img/logo_retina.png", 
    //'handler': this.paymentCapture.bind(this),
    'handler':(response)=>{this.paymentCapture(response)},
 
    // "order_id": "order_9A33XWu170gUtb", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
   "callback_url": "https://issoindia.com/isso/#/staffadmin/pay-now",
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
    var propay = new this.payemntService.nativeWindow.Razorpay(options);
    propay.open();
    
    propay.on('payment.success', function(resp) {
    alert("payment checking.");
    alert(resp.razorpay_payment_id),
    alert(resp.razorpay_order_id),
    alert(resp.razorpay_signature)}); 
  }
 
  paymentCapture(response) {
 
  var object1 = {};
  console.log("response id "+JSON.stringify(response));
  let paymentId = response.razorpay_payment_id;
    console.log("payment id "+paymentId);
 
    const formData = new FormData();
    formData.append('order_id', paymentId);
    formData.append('isPaid', '1');
    formData.append('mobNo', this.mobileNumberVal);
    this.ifsSchoolService.savePaymentData(formData).subscribe(
      res => {
        console.log('RES==>',res);
          if (res.status === 'error') {
            this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
          } else {
            this.messageService.add({key: 'custom', severity:'success', summary: 'Payment Data Saved Successfully'});
            this.isPaidStatus = '1';      
          }
      },
      error => this.error = error
    );
  }


 setFilForm(fileName,profile,setFileName) {
  console.log('im file')
  if(fileName == 'passport') {
    this.fileForm.get('profile').setValue(profile);
    this.fullFilename = setFileName;
  } else if(fileName == 'schoolNoc'){
    this.fileForm.get('schoolNoc').setValue(profile);
    this.schoolNocFile = setFileName;
    console.log('school file-->'+this.schoolNocFile)
  } else {
    console.log('sdfsdg im else')
    this.fileForm.get('parentNoc').setValue(profile);
    this.parentNoc = setFileName;
    console.log('parentNoc  file-->'+this.parentNoc)
  }
  console.log('ds--->'+this.parentNoc)
 }
 makeFileEmpty(fileName) {
  if(fileName == 'passport') {
    this.selectedPassport ='';
  } else if(fileName == 'schoolNoc'){
    this.selectedSchoolNoc ='';
  } else {
    this.selectedParentNoc='';
  }
 }
}

