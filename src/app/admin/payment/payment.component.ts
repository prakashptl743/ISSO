import { Component, createPlatform, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IssoUtilService } from 'src/app/services/isso-util.service';
import { MessageService } from 'primeng/api';
import { PaymentInvoiceService } from '../service/payment-invoice.service';
import { ReportMeritService } from '../service/report-merit.service';
 

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
 
})
export class PaymentComponent implements OnInit {

  yearOptions: SelectItem[];
  eventOptions: SelectItem[];
  gameOptions: SelectItem[];
  schoolOptions: SelectItem[];
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  studentAttendanceArray=[];
  studentAbsentArray=[];
  attendanceArray=[];

  gameIdList:any;
  gameNameList:any;
  myObjArray: any;

  eventValue:number;
  yearvalue:number;
  schoolvalue:number;
  eventData: any;
  schoolDataArray =[];
  eventReadable: boolean = false;
  gameReadble: boolean = false;
  schoolReadble: boolean = false;
  selectedEvent:string;
  schoolList: any;
  gameList: any;
  public gameID: number;
  public schoolID: any;
  certificateData: any;
  reportData: any;
  paymentData:any;
  coachData: any;
  isCertificate: boolean = false;
  isDataAvailble: boolean = false;
  schooName:string;
  mapStudentPaymentData = [];
  totalTeamAmount: number;
  showspinner: boolean = false;
  reportDataLength: number;
  selectedGame: string;
  selectedSchool: string;
  selectedYear: string;
  imageData: any;
  isConsolited: boolean;
  genderReadble: boolean;
  ageValue: any;
  genderVal: any;
  consolidatedData: any;
  consoliDatedLength: any;
  checked1: boolean = true;
  consolateFileName: any;
  gameType: any;
  selectedYearVal: string;
  studentAttendance: boolean;
 
  checked: boolean = false;
  gameArray= [];
  reportValue: any;
  reportLabel: string;
  schoolType: any;
  schoolPayment: number;
  totalDues: any;
  totalPaidTillNow: number;
  rootGameType: any;
  loading: boolean;
  eleVenBCount: any =0;
  eleVenGCount: any =0;
  fourBcount:any =0;
  fourGcount: any =0;
  sixGcount: any =0;
  sixBcount: any =0;
  sevenGcount: any =0;
  sevenBcount: any =0;
  nineGcount: any =0;
  nineBcount: any =0;
  totalPaid: any =0;
   constructor( private issoUtilService: IssoUtilService, 
     private paymentInvoiceService: PaymentInvoiceService,
     private messageService: MessageService, 
     private meritService: ReportMeritService) { }

    ngOnInit() {
       this.isDataAvailble = false;
      this.yearOptions = this.issoUtilService.setYear();
     // this.selectedCategories = this.categories.slice(1,3);
     this.reportLabel = 'attendance';
     this.totalTeamAmount = 0;
     this.totalDues = 0;
     this.schoolPayment = 0;
     this.totalPaidTillNow =0; 
    }
    onyeareChange(event) {
      this.totalTeamAmount = 0;
      this.studentAttendanceArray = [];
      this.studentAbsentArray = [];
      this.yearvalue = event.value;
      this.meritService.loadEventByYearForReport(this.yearvalue,0).subscribe(
        response => {
          if(response!=="") {
            this.eventData =response;
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
                this.eventOptions.push({
                  label: element.eventName,
                  value: element.eventId
                });
              })
            } else {
              this.isDataAvailble = false;
              this.eventReadable = false;
              this.gameReadble =false;
              this.schoolReadble = false;
            }
          } else {
          console.log('Data is blannk from service')
          }
    
      } ,
      error => {
        //this.errorAlert =true;
        });
    }
    onEventChange(event) {
      this.totalTeamAmount = 0;
      this.studentAttendanceArray = [];
      this.studentAbsentArray = [];
      let yearVal = this.yearvalue.toString();
      let eventYear = yearVal.split("-");
      console.log('Hello'+eventYear[1]);
      this.selectedYearVal = eventYear[1];

      //if (eventYear[1] > '2020')   {
       // console.log('Immgretae')
      //  this.reportGreaterForNewYear(event)
    //  } else {
        console.log('im less')
      
      this.eventValue = event.value;
      this.gameOptions =[];
      this.selectedGame =''; 
      this.meritService.loadGameByEvent(this.eventValue, false).subscribe(
        response => {
          if(response!=="") {
            this.gameList =response;
            console.log(this.gameList)
            this.schoolReadble = false;
            if(this.gameList.length > 0 ) {
              this.gameOptions = [];
              this.gameReadble = true;
              this.isDataAvailble = false;
              this.gameOptions.push({
                label: "Please Select",
                value: ''
              });
              this.gameList.forEach(element => {
                const gameIdAndName = element.gameId +','+ element.gameName +','+ element.gameType;
                this.gameOptions.push({
                  label: element.gameName,
                  value: gameIdAndName
                });
            })
          } else {
            this.isDataAvailble = false;
            this.gameReadble = false;
            this.schoolReadble = false;
          }
          } else {
            console.log('Data is blannk from service')
          }
    
      } ,
      error => {
        //this.errorAlert =true;
      });
   // }
    }
  
    loadGameChange(gameData) {
      this.totalTeamAmount = 0;
      this.studentAttendanceArray = [];
      this.studentAbsentArray = [];
      this.selectedSchool =''; 


      const gameDataValues = gameData.value
      this.gameArray =  gameDataValues.split(","); 
      const gameId = this.gameArray[0];
      this.rootGameType =  this.gameArray[2];
      this.showspinner = true;
    if(gameId!='') {
        this.paymentInvoiceService.getStudentData(this.eventValue, gameId,this.rootGameType).subscribe(
          response => {
            if(response!=="") {
              this.paymentData = response;
              this.showspinner = false;
              this.calculateTotalStutdent()
              if(this.paymentData.length > 0 ){
                this.isDataAvailble = true;
               
             } else {
               this.isDataAvailble = false;
               this.messageService.add({key: 'custom', severity:'error', summary: 'Data not found for this game'});    
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
  
    calculateTotalStutdent() {
      this.eleVenBCount =0;
      this.eleVenGCount =0;
      this.fourBcount =0;
      this.fourGcount =0;
      this.sixBcount =0;
      this.sixGcount =0;
      this.sevenBcount =0;
      this.sevenGcount =0;
      this.nineBcount =0;
      this.nineGcount =0;
      this.totalPaid =0;
      for(let i=0;i<= this.paymentData.length-1;i++) {
       this.eleVenBCount +=  Number(this.paymentData[i].elevenBcount);
       this.eleVenGCount +=  Number(this.paymentData[i].elevenGcount);
       this.fourBcount +=   Number(this.paymentData[i].fourBcount);
       this.fourGcount +=   Number(this.paymentData[i].fourGcount);
       this.sixBcount +=   Number(this.paymentData[i].sixBcount);
       this.sixGcount +=   Number(this.paymentData[i].sixGcount);
       this.sevenBcount +=   Number(this.paymentData[i].sevenBcount);
       this.sevenGcount +=   Number(this.paymentData[i].sevenGcount);
       this.nineBcount +=   Number(this.paymentData[i].nineBcount);
       this.nineGcount +=   Number(this.paymentData[i].nineGcount);
       this.totalPaid +=   Number(this.paymentData[i].paidStudent);
      }
      console.log(this.eleVenBCount)
    }
 
 
}
