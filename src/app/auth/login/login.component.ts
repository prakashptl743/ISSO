import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolService } from 'src/app/services/school.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { StudentService } from 'src/app/admin/service/student.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  netImage:any = "assets/images/general/isso_logo.png";
  display: boolean = false;
  isSchoolSelect: boolean;
  userId: any;

 
  schoolListResponse:any;
  _radioDevicesList:any;
  errormessage: boolean;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {errorTitle: '', errorDesc: ''};
  loginError: string;
  schoolName: any;
  filteredPages: any[];
  schoolListArray =[];
  newSchoolId: any;
  isEmail: boolean;
  userEnteredEmail: any;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService1 :SchoolService,
    private authService: AuthService,
    private studentService: StudentService,
    private httpClient:HttpClient
    ) { }

  ngOnInit() {
     this.errormessage = false;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.prefillCredentials();  
    this.authService.logout();
    this.loadAllSchool();
  }
 
  prefillCredentials() {
    if (window['PasswordCredential']) {
      console.log(navigator)
      // navigator.credentials.get({ password: true }).then((credential) => {
      //   if (credential) {
      //     this.loginForm.patchValue({
      //       username: credential.id,
      //       password: credential.password
      //     });
      //   }
      // });
    }
  }
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
  filterPages(event) {
    console.log('FILETR===>',event.query);
    if (!this.isSchoolSelect) {
      this.userId =  event.query;
    }
    this.filteredPages = this.filterCountry(event.query, this.schoolListArray);
  }
  showDialog() {
    this.display = true;
  }
  checkuserName(event) {
    console.log('checkuserName===>',event.target.value);
     var checkEmail = /@/gi; 
    const string = event.target.value;
    const substring = "@";
    console.log('Email val-->'+string.includes(substring)); // true
    
   if (string.includes(substring) ) { 
      console.log("email" ); 
      this.isEmail = true;
      this.userEnteredEmail = event.target.value;
   } else { 
      console.log("scholl Name" ); 
      this.isEmail = false;
   }
  }
  
  filterCountry(query, countries: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.text.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      } 
    }
    if(filtered.length <= 0){
      // this.schoolName ='';
    }
    return filtered;
  }
  loadAllSchool() {
    this.studentService.loadAllSchool().subscribe(response => {
      if(response!=="") {
       this.schoolListResponse= response;
       this.schoolListArray =  this.schoolListResponse;
       this._radioDevicesList = this.schoolListArray 
       } else {
        console.log('Data is blannk from service')
      }
  
   } ,
   error => {
     //this.errorAlert =true;
  });
  }
  onPageSelect(evt:any){
    console.log(evt.id);
   // this.schoolId = evt.id;
    this.newSchoolId = evt.id;
    console.log('Value'+JSON.stringify(evt));
    console.log('this.newSchoolId'+evt.id);
    this.isSchoolSelect = true;
    this.userId =  this.newSchoolId;
    localStorage.setItem('userIdForLogin',  this.userId);
  }
  onSubmit() {
    console.log('Usert Id-->'+localStorage.getItem('userIdForLogin'))
    this.submitted = true;
    if(this.isEmail) {
      this.userId = this.userEnteredEmail;
    } else {
      if(localStorage.getItem('userIdForLogin') !=='') {
        this.userId = localStorage.getItem('userIdForLogin'); 
      } else {
        this.userId = this.newSchoolId;
      }
   }
    this.authService.login(this.userId, this.password.value).subscribe((data) => {
      console.log('IM API RESPONSE--->'+data);
       if (this.authService.isLoggedIn) {
          // console.log('Hello===>'+this.authService.isLoggedIn)
          // const adminredirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin/dashboard';
          // const staffadminRedirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/staffadmin/event-dashboard';
          // console.log('Im url==>'+staffadminRedirect);
          // if(localStorage.getItem('roleId') === '1' || localStorage.getItem('roleId') === '3'){
          //   this.router.navigate([adminredirect]);
          // } else {
          //   this.router.navigate([staffadminRedirect]);
          // }
           
      } else {
        console.log('sdfsfdfff===.')
      }
        if(this.authService.loginFail) {
          this.errormessage = true;
        } 
      },
      error => this.error = error
    );
  }
}
