import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolService } from 'src/app/admin/service/school.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-login',
  templateUrl: './student-certificate.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./student-certificate.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class StudentCertificateComponent implements OnInit {  StudentCertificate
  netImage:any = "assets/images/general/isso_logo.png";
  eventId: string;
  eventYear: string;
  errormessage: boolean;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: {errorTitle: '', errorDesc: ''};
  loginError: string;
  certificateData: any;


  name = 'Google Font Tester';
  fontFamilyInput: string = 'Gaegu';
  fontFamily: string = 'roboto';
  fontUri: string = null;
  randomstring: string;
  gameId: string;
  schoolId: string;
  studentId: string;
  loading: boolean;
  isShowLoader: boolean;
  imagepath = "../../assets/images/goodsport.JPG";
  rank: string;
  subgameId: string;
  isMerit: boolean = false;
  rankText: string;
  showTime: boolean;
  showNoQrData: boolean = false;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    ) {    }

  ngOnInit() {
   
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.gameId = this.route.snapshot.paramMap.get('gameId');
    this.schoolId = this.route.snapshot.paramMap.get('schoolId');
    this.studentId = this.route.snapshot.paramMap.get('studentId');
    this.subgameId = this.route.snapshot.paramMap.get('subgameId');
    this.rank = this.route.snapshot.paramMap.get('rank');
    this.randomstring = this.route.snapshot.paramMap.get('randomstring');
    this.getCertificateData();
    //this.getCertificateData('27','30','1','143')
    this.loading = true;
  }
  getCertificateData() {
 
    if(this.rank == 'norank') {
      console.log('Im merit');
      this.isMerit = false;
    
    } else {
      this.isMerit = true;
      if (this.rank == '1') {
         this.rankText = "FIRST";
      } else if(this.rank == '2') {
        this.rankText = "SECOND";
      } else {
        this.rankText = "THIRD";
      }
       
    }
   // this.getCertificateData('2022-2023','5','9','143')
    this.isShowLoader = true;
    this.authService.getCertificateData(this.eventId,this.gameId,this.schoolId,this.studentId,this.subgameId,this.rank).subscribe(response => {
      
    // this.authService.getCertificateData(27,1,30,7075,'nosubgame','norank').subscribe(response => {
      if(response!=="") {
        this.isShowLoader = false;
        this.certificateData =response;
        this.certificateData.length;
        if(this.certificateData.length == 1) {
          let timeDistanceVal = this.certificateData[0]['timeDistance'];
          if(timeDistanceVal === undefined) {
            this.showTime = false;
          } else {
            this.showTime = true;
          }
        } else {
          this.showNoQrData = true;
        }
      
       
        //this.schoolServiceData =response;
        //this.schoolData = this.schoolServiceData;
      } else {
        alert('im blankl=')
      }

    } ,
    error => {
      //this.errorAlert =true;
     });
  }
 

 

}
