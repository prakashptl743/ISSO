
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ReportMeritService } from 'src/app/admin/service/report-merit.service';
//import * as jspdf from 'jspdf';
import { IssoUtilService  } from '../../services/isso-util.service'
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { StudentService } from '../service/student.service';
 //import * as html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfFonts from './vfs_fonts';
 import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';

import { DatePipe } from '@angular/common';
import { PaymentInvoiceService } from 'src/app/admin/service/payment-invoice.service';
@Component({
  selector: 'app-certificate-invoice',
  templateUrl: './certificate-invoice.component.html',
  styleUrls: ['./certificate-invoice.component.css'],
  providers: [MessageService,DatePipe], 
})
export class CertificateInvoiceComponent implements OnInit {
 

yearOptions: object;
eventOptions: SelectItem[];
gameOptions: SelectItem[];
schoolOptions: SelectItem[];
subgameOptions: SelectItem[];
eventValue: any;
yearvalue: any;
schoolvalue:number;
eventData: any;
schoolDataArray =[];
eventReadable: boolean = false;
gameReadble: boolean = false;
schoolReadble: boolean = false;
schoolList: any;
gameList: any;
gameIdList:any;
gameNameList:any;
public gameID: number;
public schoolID: any;
certificateData: any;
reportData: any;
meritData: any;
coachData: any;
isCertificate: boolean = false;
isDataAvailble: boolean = false;
isMeritDataAvailble: boolean = false;
isInvoiceDataAvailble: boolean = false;
isReceiptDataAvailble: boolean = false;

isReportShow: boolean = false;
schooName:string;
items2: MenuItem[];
reportLabel:string;
showspinner: boolean = false;
reportValue: number;
reportDataLength: number;
meritDataLength: number;
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
selectedYear: string;
gameType: any;
isDataTrue: (obj: any) => boolean;
newImage: Promise<unknown>;
eventDataArray=[];
ageOptions: SelectItem[];
genderOptions: SelectItem[];
event_year: any;
totalAngularPackages: any;
isReport: boolean;
isShowLoader: boolean;
isCertificateAvailable: any;
meritevent: boolean;
invoiceEvent: boolean;
receiptEvent: boolean;
selectedEvent: string;
selectedMeritEvent: string;
selectedInvoiceEvent: string;
selectedReciptEvent: string;
selectedGame: string;
selectedMeritGame: string;
meritGame: boolean;
selectedMeritYear: string;
selectedInvoiceYear: string;
selectedReceiptYear: string;
isCertificateData: any;
isMeritCertificateData: any;
gameArray =[];
 
  showMeritData: boolean;
  gameName: any;
  isFirstYear: boolean;
  isPartCssEnable: boolean;
  isMeritCssEnable: boolean;
  isInvoiceCssEnable: boolean;
  isReceiptCssEnable: boolean;
  certType: any;
constructor( 
  private issoUtilService: IssoUtilService,
  private studentService: StudentService,
  private messageService: MessageService,
  private http: HttpClient,
  private datePipe: DatePipe,
  private paymentInvoiceService: PaymentInvoiceService,
  private meritService: ReportMeritService) { pdfMake.vfs = pdfFonts.pdfMake.vfs; }
 
ngOnInit() {
  this.isCertificate =false
  this.isDataAvailble = false
  this.yearOptions = this.issoUtilService.setYearToStaffadmin();
  this.schoolId = localStorage.getItem('schoolId');
  this.isReport = true;
  this.isPartCssEnable = true;
  this.certType = 'certificate';
  this.onyeareChange(this.yearOptions[1].year,this.certType)
} 
makeCssEnable(type) {
  this.certType = type;
  if (type == 'certificate') {
    this.isPartCssEnable = true;
    this.isMeritCssEnable = false;
    this.isInvoiceCssEnable = false;
    this.isReceiptCssEnable= false;
  } else if (type == 'merit') {
    this.isPartCssEnable = false;
    this.isMeritCssEnable = true;
    this.isInvoiceCssEnable = false;
    this.isReceiptCssEnable= false;
  } else if (type == 'invoice') {
    this.isPartCssEnable = false;
    this.isMeritCssEnable = false;
    this.isInvoiceCssEnable = true;
    this.isReceiptCssEnable= false;
  } else if (type == 'receipt') {
    this.isPartCssEnable = false;
    this.isMeritCssEnable = false;
    this.isInvoiceCssEnable = false;
    this.isReceiptCssEnable= true;
  }
 //  this.makeReaadle(this.certType);
  //this.onyeareChange(this.yearvalue,this.certType)
 //this.resetDisable(); 
 this.selectedEvent ='';
 this.selectedGame = '';
 this.gameReadble = false;
}
downloadReport() {
  this.isReport = true;
  this.resetDisable();
}
downloadInvoice() {
  this.isReport = false;
  this.showMeritData  = false;
  this.eventValue = '';
  this.resetDisable();
}
 

onYear(val,yearText) {

}
// onyeareChange(event,type) {
onyeareChange(val,yearText) {

  this.yearvalue = val;
  this.showMeritData = false;
  if(yearText == 'first') {
    this.isFirstYear = true;
  } else {
    this.isFirstYear = false;
  }
  // if (type == 'certificate') {
  //    this.selectedMeritYear = ''; 
  // } else if (type == 'merit') {
  //   this.selectedYear = '';
  // }  else if (type == 'invoice') {
  //   this.selectedReceiptYear = '';
  // } else {
  //   this.selectedInvoiceYear = '';
  // }
  if(this.yearvalue !== '') {
  this.studentService.loadEventByYear(this.yearvalue, this.schoolId).subscribe(
  //this.meritService.loadEventByYear(this.yearvalue).subscribe(
    response => {
      if(response!=="") {
        this.eventData =response;
        this.gameReadble =false;
        this.schoolReadble  = false;
       // this.isCertificateAvailable =  this.eventData[0]['isCertificate'];
       // console.log(this.isCertificateAvailable);
        if(this.eventData.length > 0 ){
          this.eventOptions = [];
          this.makeReaadle(this.certType);
          this.isDataAvailble = false;
          this.eventOptions.push({
            label: "Please Select",
            value: ''
          });
          this.eventData.forEach(element => {
            const eventData = element.eventId +','+ element.isCertificate +','+ element.isMerit;
            this.eventOptions.push({
              label: element.eventName,
              value: eventData
            });
          })
        } else {
          this.resetDisable();
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
    this.resetDisable();
  }
}
resetDisable() {
  this.selectedEvent = '';
  this.selectedMeritEvent = '';
  this.selectedInvoiceEvent = '';
  this.selectedReciptEvent = '';
  this.selectedGame = '';
  this.selectedYear = '';
  this.selectedMeritYear = '';
  this.selectedInvoiceYear = '';
  this.selectedReceiptYear = '';
  this.selectedMeritGame = ''; 
  this.isMeritDataAvailble =false;
  this.invoiceEvent  = false;
  this.receiptEvent = false;
  this.eventReadable = false;
  this.gameReadble = false;
  this.meritevent = false;
  this.meritGame = false;
  this.isDataAvailble = false;
  this.isMeritDataAvailble = false;
  this.isInvoiceDataAvailble = false;
  this.isReceiptDataAvailble = false;
  this.subgameOptions = [];
 

}
makeReaadle(type) {
  this.selectedEvent = '';
  this.selectedMeritEvent = '';
  this.selectedInvoiceEvent = '';
  this.selectedReciptEvent = '';
  this.selectedGame = '';
  this.selectedMeritGame = '';
  if (type == 'certificate') {
    this.eventReadable = true;
    this.meritevent = false;
    this.invoiceEvent  = false;
    this.receiptEvent = false;
    this.meritGame = false;
    this.isMeritDataAvailble =false;
  } else if (type == 'merit') {
    this.eventReadable = false;
    this.meritevent = true;
    this.invoiceEvent  = false;
    this.receiptEvent = false;
    this.subgameOptions = [];
  } else if (type == 'invoice') {
    this.eventReadable = true;
    this.meritevent = false;
    this.invoiceEvent  = true;
    this.receiptEvent = false;
    this.isInvoiceDataAvailble = false;
    this.isReceiptDataAvailble = false; 
  } else {
    this.isInvoiceDataAvailble = false;
    this.isReceiptDataAvailble = false;
    this.eventReadable = true;
    this.meritevent = false;
    this.invoiceEvent  = false;
    this.receiptEvent = true;
  }


  this.isDataAvailble = true;
  this.gameReadble =false;
  this.schoolReadble = false;
}
setAgeMap(evenVal) {
  this.meritService.setAgeMap(evenVal).subscribe(
    response => {
     const myArray = response[0].ageRange.split(" ");
     const ageList = response[0].ageRange;
     var spaceCount = (ageList.split(" ").length - 1);
     console.log(spaceCount);
     this.ageOptions =[];
     this.ageOptions.push({
      label: "Please Select",
      value: ''
    });
     for(let i=0;i<=spaceCount;i++) {
        this.ageOptions.push({
          label: myArray[i],
          value: myArray[i]
        });
      } 
    } ,
    error => {
      //this.errorAlert =true;
   });
}
onEventChange(event,type) {
  this.showMeritData = false;
  const eventval = event.value;
  this.eventDataArray =  eventval.split(","); 
  this.eventValue = this.eventDataArray[0];
  this.isCertificateData = this.eventDataArray[1];
  this.isMeritCertificateData = this.eventDataArray[2];
  if (this.certType == 'certificate') { 
    if (this.isCertificateData == '1') {
      this.getGameForReport(type);
    } else {
      this.gameReadble = false;
      this.selectedGame = '';
      this.isDataAvailble = false;
      
      this.messageService.add({key: 'custom',severity:'error', summary: 'Certificate not Uploaded!'});
    }
  }
  if (this.certType == 'merit') { 
    if (this.isMeritCertificateData == '1') {
      this.getGameForReport(type);
      this.setAgeMap(this.eventValue);
      this.genderOptions =this.issoUtilService.setGender();
    } else { 
      this.meritGame = false;
      this.isMeritDataAvailble = false;
       this.selectedMeritGame = '';
       this.gameReadble = false;
       this.selectedGame = '';
      this.messageService.add({key: 'custom',severity:'error', summary: 'Certificate not Uploaded!'});
    }
  }


  // if (this.isCertificateData == '1' && type == 'certificate') {
  //   this.getGameForReport(type);
  // } else {
  //   this.messageService.add({key: 'custom',severity:'error', summary: 'Certificate not Uploaded!'});
  // }
 
  // if (this.isMeritCertificateData == '1' && type == 'merit') {
  //   this.getGameForReport(type);
  // } else {
  //   this.messageService.add({key: 'custom',severity:'error', summary: 'Certificate not Uploaded!'});
  // }

  let yearVal = this.yearvalue.toString();
  let eventYear = yearVal.split("-");
  this.selectedYearVal = eventYear[1];
 // this.makeReaadle(type);
  // if (this.isReport ) {
  //  this.getGameForReport(type);
  // } else {  
    if (this.certType == 'invoice') {
      this.getInvoiceData();
      this.gameReadble = false;

    } else if(this.certType == 'receipt') {
      this.getReceiptData()
      this.gameReadble = false;
    }
  //}
}
 

getGameForReport(type) {
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
          //  this.gameReadble = true;
            this.isDataAvailble = false;
            if (type == 'certificate') {
              this.gameReadble = true;
              this.meritGame = false;
            }  else if (type == 'merit') {
              this.meritGame= true;
              this.gameReadble = false;
    
            }

            this.gameOptions.push({
              label: "Please Select",
              value: '',
            });
            this.gameList.forEach(element => {
              const gameIdAndName = element.gameId +','+ element.game_name +','+ element.gameType;
              this.gameOptions.push({
                label: element.game_name,
                value: gameIdAndName
              });
            })
            console.log('gameOptions'+JSON.stringify(this.gameOptions));
       
         } else {
          // this.isDataAvailble = false;
          // this.gameReadble = false;
          // this.schoolReadble = false;
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
getReceiptData() {
  if(this.schoolID !=='') {
    this.paymentInvoiceService.downloadReceiptPdf(this.yearvalue,this.eventValue,this.schoolId).subscribe(
      response => {
        if(response!=="") { 
          this.isShowLoader = false;
          if(response == 'false') {
            this.isReceiptDataAvailble = false;
            this.messageService.add({key: 'custom', severity:'error', summary: 'Receipt data not found for this school'});
          } else {
            this.isReceiptDataAvailble = true;
          }
           
        } else {
          this.messageService.add({key: 'custom', severity:'error', summary: 'School not found for this game'});
        }
    } ,
    error => {
      //this.errorAlert =true;
  });
}
}
getInvoiceData() {
    this.isShowLoader = true;
    this.isDataAvailble = false;
    this.paymentInvoiceService.downloadInvoicePdf(this.yearvalue,this.eventValue,this.schoolId).subscribe(
      response => {
        if(response!=="") { 
          this.isShowLoader = false;
          if(response == 'false') {
            this.isInvoiceDataAvailble = false;
            this.messageService.add({key: 'custom', severity:'error', summary: 'Invoice data not found for this school'});
          } else {
            this.isInvoiceDataAvailble = true;
          }
          
        } else {
          this.messageService.add({key: 'custom', severity:'error', summary: 'Data not'});
        }
    } ,
    error => {
      //this.errorAlert =true;
  });
}
loadGameChange(gameData) {
  this.gameID = gameData.value;
  this.meritService.loadSchoolByGameReport(this.eventValue, this.gameID).subscribe(
    response => {
      if(response!=="") {
        this.schoolList =response;
        if(this.schoolList.length > 0 ) {
         // this.schoolOptions.length = 0;
          this.schoolOptions = [];
          this.schoolReadble = true;
          this.isDataAvailble = false;
          this.schoolList.forEach(element => {
            const  SchoolIdAndName = element.schoolId +','+ element.schoolName;
            this.schoolOptions.push({
              label: element.schoolName,
              value: SchoolIdAndName
            });
          })
       } else {
        this.isDataAvailble = false;
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
loadschoolChange(gameData,type) {
   // this.gameID = gameData.value;

    const gameval = gameData.value
    this.gameArray =  gameval.split(","); 
    this.gameID = this.gameArray[0];
    this.gameName =  this.gameArray[1];
    this.gameType =  this.gameArray[2];


    this.meritService.checkGameType(this.gameID).subscribe( 
      response => {
         this.gameType = response;
         console.log('game Type===>'+JSON.stringify(this.gameType))
        
         if (this.certType == 'certificate') {
          this.isDataAvailble = true;
          this.isMeritDataAvailble = false;
          this.getGameData(this.gameID,type)
        }  else if (this.certType == 'merit') {
          this.isDataAvailble = false;
         // this.isMeritDataAvailble = true;
          this.checkMertiAvailable();
        }
      },
      error => {
    //this.errorAlert =true;
      });

}
checkMertiAvailable(){
  console.log('im true');
  this.meritData = '';
  this.meritService.checkStaffMerit(this.eventValue,this.gameID, this.schoolId).subscribe(
    response => {
      if(response!=="") { 
        this.meritData = response;
        this.meritDataLength = Object.keys(this.meritData).length;
        if (this.meritDataLength > 0) {
           this.showMeritData = true;
        } else {
          this.messageService.add({key: 'custom', severity:'error', summary: 'No merit found for this game'});
          this.showMeritData = false;
        }
      } else {
        console.log('Data is blannk from service')
      }

   } ,
   error => {
     //this.errorAlert =true;
    });
}
getGameData(gameID,type) {
  if(this.gameID) {
    this.meritService.loadStaffReport(this.yearvalue,0, this.eventValue,gameID, this.schoolId).subscribe(
    response => {
      if(response!=="") { 
        this.reportData = response;
        this.reportDataLength = Object.keys(this.reportData).length;
        if (this.reportDataLength > 0) {
          
       
          this.noParticipateEvent = false;
          this.school_Name = this.reportData[0].schoolName;
          this.event_year = this.reportData[0].event_year;
          this.evetName = this.reportData[0].eventName;
          this.event_name= this.evetName;
          this.schooName = this.school_Name;
          this.eventNote = this.reportData[0].note;
          this.eventDescription = this.reportData[0].description;
        } else {
          this.messageService.add({key: 'custom', severity:'error', summary: 'You have not participated in this game'});
          this.noParticipateEvent = true;
          this.isDataAvailble = false;
          this.isMeritDataAvailble = false;
        }
      } else {
        console.log('Data is blannk from service')
      }

   } ,
   error => {
     //this.errorAlert =true;
    });
  } else {
    this.isDataAvailble = false;
  }
}
loadAgeChange() {
  this.isMeritDataAvailble = false;
}

 
}
