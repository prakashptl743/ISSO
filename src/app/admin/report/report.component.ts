import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message, SelectItem } from 'primeng/api';
import { ReportMeritService } from '../service/report-merit.service';
//import { ExcelService } from '../service/excel-service';

// import * as jspdf from 'jspdf';
// import * as html2canvas from 'html2canvas';
// import * as pdfMake from 'pdfmake/build/pdfmake';
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfFonts from './vfs_fonts';
import { IssoUtilService  } from '../../services/isso-util.service'
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
// import { Observer } from 'rxjs/Rx';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
type AOA = any[][];

  @Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [MessageService,ConfirmationService,DatePipe]
})
export class ReportComponent implements OnInit {
  messages: Message[];
    isEventReport: boolean;
    isTeamEventReport: boolean;
    isTshirtReport:boolean;
    istshirtReport: boolean;
    baseUrl: string;

  addMessages() {
    this.messages = [
        { severity: 'success', summary: 'Success', detail: 'Message Content' },
        { severity: 'info', summary: 'Info', detail: 'Message Content' },
        { severity: 'warn', summary: 'Warning', detail: 'Message Content' },
        { severity: 'error', summary: 'Error', detail: 'Message Content' }
    ];
}

clearMessages() {
    this.messages = [];
}




  @ViewChild('reportContent', {static: false})reportContent: ElementRef;
  @ViewChild('report_Content', {static: false})report_Content: ElementRef;
  activeItem: MenuItem;
  yearOptions: SelectItem[];
  eventOptions: SelectItem[];
  gameOptions: SelectItem[];
  schoolOptions: SelectItem[];
  ageOptions: SelectItem[];
  ageArray: string[];
  genderOptions: SelectItem[];
  certificateContentForm: FormGroup;
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
  ageReadble: boolean = false;

  schoolList: any;
  gameList: any;
  public gameID: number;
  public schoolID: any;
  certificateData: any;
  reportData: any;
  coachReportData: any;
  coachData: any;
  isCertificate: boolean = false;
  isDataAvailble: boolean = false;
  isReportShow: boolean = false;
  schooName:string;
  items: MenuItem[];
  reportLabel:string;
  showspinner: boolean = false;
  reportValue: number;
  reportDataLength: number;
  coachReportDataLength:number;
  evetName: string;
  content: any;
  school_Name: string;
  event_name: string;
  selectedGame: string;
  selectedAge: string;
  selectedGender: string;
 
  selectedSchool: string;
    selectedEvent: string;
    selectedYear: string;
    imageData: any;
    base64Image:any;
    isConsolited: boolean;
    genderReadble: boolean;
    ageValue: any;
    genderVal: any;
    consolidatedData: any;
    gameConsoltedData: any;
    teamEventReport:any;
    consoliDatedLength: any;
    gameconsolitedLength: any;
    teamEventReportLength: any;
    consolidatedArray =[];
    gameconsolitedArray =[];
    teamEventReportArray =[];
    data: any = [{
      eid: 'e101',
      ename: 'ravi',
      esal: 1000
    },
    {
      eid: 'e102',
      ename: 'ram',
      esal: 2000
    },
    {
      eid: 'e103',
      ename: 'rajesh',
      esal: 3000
    }];
    consolateFileName: any;
    gameConsolateFileName: any;
    eventNote: any;
    gameType: any;
    selectedYearVal: string;
    setPhotoYear: string;
    event_year: string;
    eventDescription: any;
    eventYearForCertificate: string;
    noParticipateEvent: boolean;
    schoolIdForCoach: any;
    isConsolitedData: boolean;
    isCertificateContent: boolean;
    error: any;



  constructor( 
    private issoUtilService: IssoUtilService,
    public datepipe: DatePipe,
    private fb: FormBuilder,
    //private excelService:ExcelService,
    private messageService: MessageService,
    private meritService: ReportMeritService) { 
     // pdfMake.vfs = pdfFonts.pdfMake.vfs;
    }

  ngOnInit() {
    this.isCertificate =false;
    this.isDataAvailble = false;
    this.isReportShow = true;
    this.yearOptions = this.issoUtilService.setYear();
    this.loadMenu();
    this.initialiseData();
    this.baseUrl = environment.baseUrl;
    // let imageUrl = '../assets/images/studentphoto/avatar51.png';

    //  this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {    
    //    //console.log(base64data);
    //    // this is the image as dataUrl
    //    this.base64Image = 'data:image/jpg;base64,' + base64data;
    //  });
    this.setPhotoPath();
  }
 
  initialiseData() {
  //  this.ageOptions = this.issoUtilService.setAge();
    this.genderOptions =this.issoUtilService.setGender();
  }
  initialForm() {
    this.certificateContentForm = this.fb.group({
      id: [''],
      headerName: ['', Validators.required],
      mainContent: ['', Validators.required],
    });
}

  loadMenu() {
    this.reportValue = 0;
    this.reportLabel = "Print Report"
    this.items = [
        {label: 'Report', icon: 'fa fa-fw fa-bar-chart'},
        {label: 'Certificate', icon: 'fa fa-fw fa-calendar'},
        {label: 'Coach Certificate', icon: 'fa fa-fw fa-calendar'},
        {label: 'Consolidated Report', icon: 'fa fa-fw fa-calendar'},
    ];
    this.activeItem = this.items[0];
     
      
    //const doc = new jspdf();
  }

 

 

  onloadMenu(index) {
    this.makeEmptyDropdown();
    this.reportValue = index;
    if(index == '0') {
      this.isConsolited = false;
      this.reportLabel = "Print Report"
      this.isCertificateContent = false;
      this.isEventReport = false;
    } else if(index == '1') {
      this.isConsolited = false;
      this.isCertificateContent = false;
      this.isEventReport = false;
      this.reportLabel = "Print Certificate"
    } else  if(index == '2') {
      this.isConsolited = false;
      this.isCertificateContent = false;
      this.isEventReport = false;
      this.reportLabel = "Print Coach Certificate"
    } else  if(index == '3') {
      this.isConsolited = true;
      this.isReportShow = false;
      this.isEventReport = false;
      this.isConsolitedData = false;
      this.isCertificateContent = false;
      this.reportLabel = "Print Consolidated"
    } else if(index == '4') {
      this.isConsolited = false;
      this.isEventReport = false;
      this.isCertificateContent = false;
      this.reportLabel = "Print Volunteer Certificate"
    } else if(index == '5') {
      this.isReportShow = false
      this.isConsolited = false;
      this.isEventReport = true;
      this.yearvalue = null;
      this.isTeamEventReport = false;
      this.isCertificateContent = false;
      this.reportLabel = "Print Event Report"
    } else {
      this.isEventReport = false;
      this.isConsolited = false;
      this.isCertificateContent = true;
      this.isReportShow = false
      this.reportLabel = "Certificate content";
      this.istshirtReport = false;
      this.getCertificateData();
      this.initialForm();
    }  
  }
  makeEmptyDropdown() { 
    this.isReportShow =true;
    this.eventReadable= false;
    this.gameReadble = false;
    this.schoolReadble = false;
    this.genderReadble = false;
    this.ageReadble = false;
    this.selectedSchool ='';
    // this.ageValue = '';
    // this.genderVal = '';
    this.selectedGame ='';
    this.selectedEvent ='';
    this.selectedYear =''
    this.eventOptions = [];
    this.gameOptions = [];
    this.schoolOptions =[];
    // this.ageOptions = [];
    // this.genderOptions = [];
    this.isDataAvailble = false;
    this.eventValue = null;
    this.schoolIdForCoach ='';
  }
  getCertificateData() {
    this.meritService.getCertificateData().subscribe(
      response => {
        if(response!=="") {
          this.certificateContentForm.setValue({
            id:response[0].id,  
            headerName: response[0].certificateHeader,
            mainContent:response[0].certificateContent
          }); 
        }
      });
  }
  onSubmit() {
    const formData = new FormData();
    let id =  this.certificateContentForm.get('id').value;
    formData.append('headerName', this.certificateContentForm.get('headerName').value);
    formData.append('mainContent', this.certificateContentForm.get('mainContent').value);
    this.meritService.updateCertificateData(id,formData).subscribe(
      res => {
          if (res.status === 'error') { 
            this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
          } else {
            this.messageService.add({key: 'custom', severity:'success', summary: 'Certificate Data Updated Successfully'});
          }
       // this.display =false
        this.getCertificateData();
      },
      error => this.error = error
    );
  }
  toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
setPhotoPath () { 
  this.setPhotoYear = this.issoUtilService.setPhotoYear();
}

downloadCertificatePdf() {
  let content=[];
  let str: any;
  let str1 : any;
  let str2 : any;
  let str3 : any;
  let str4 : any;
  let str5 : any;
  let str6 : any;
  let  genderval;
  for(let i=0; i< this.certificateData.length; i++){
    if(this.certificateData[i].gender == '1') {
      genderval=' Boys'
      } else {
        genderval=' Girls'
      }
 
      let imageUrl = this.setPhotoYear+'/'+this.reportData[i].photo;
      // this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {    
      //   this.base64Image = 'data:image/jpg;base64,' + base64data;
      // });


    str =  {text: 'ISSO Nationals Games -'+ this.eventYearForCertificate, style: 'header'},
    str1 = {text: 'PHASE 2', style: 'smallheader'};
    str6 =  {
              style: 'tableLocation',
              table: {
                widths: ['*'],
                body: [
                  ['VENUE : ' + this.certificateData[i].location +'\n'+ this.datepipe.transform(this.certificateData[i].startDate, 'd MMM, y') +' - '+ this.datepipe.transform(this.certificateData[i].endDate, 'd MMM, y')],
                ]
              }
            };
    str2 =  {text: 'PARTICIPATION CERTIFICATE', style: 'subheader'};
    str3 =  {
              columns: [
                {
                  style: 'tableExample',
                  table: {
                    heights: 20,
                    body: [
                      ['AWARDED TO : ', this.certificateData[i].studentName],
                      ['FATHER’S/MOTHER’S NAME: ',+this.certificateData[i].fatherName],
                      ['DATE OF BIRTH: ', this.datepipe.transform(this.certificateData[i].dateOfBirth, 'd MMM, y')],
                      ['CLASS: ', this.certificateData[i].standardClass],
                      ['SCHOOL NAME: ', this.certificateData[i].schoolName]
                    ]
                  },
                  layout: 'noBorders',
                  alignment: 'justify',
                },
                {
                  image: this.base64Image,
                  // width: 70,
                  
                   // text:'ISSO/'+this.certificateData[i].sId
                  // body: [
                  //   ['', 'ISSO/'+this.certificateData[i].sId]
                
                  // ]
                }, 

                // {
                //   style: 'tableExample',
                //   table: {
                //     heights: 20,
                //     body: [
                //       ['', 'ISSO/'+this.certificateData[i].sId]
                  
                //     ]
                //   },
                //   layout: 'noBorders',
                //   alignment: 'justify', 
                // }, 
               
              ]
            };
    // str4 = {
    //         alignment: 'justify',
    //          columns: [
    //           {
    //             width:160,
    //             text: 'SCHOOL NAME: ',
    //             style: 'alignSchool'
    //           },
    //           {
    //             text: ' '+ ' '+ ' ' +' '+this.certificateData[i].schoolName, style: 'alignSchool'
    //           }
    //         ]
    //       };

    str5 = {
            alignment: 'justify',
            margin: [0, 50, 0, 150],
            pageBreak: "after",
             text: [
               'HAS PARTICIPATED IN  ISSO NATIONAL GAMES'+this.eventYearForCertificate+' IN',
               { text: this.certificateData[i].gameName, style: 'boldText' },
                { text: ' UNDER ', style: 'boldText' },
                { text: this.certificateData[i].ageRange + genderval, style: 'boldText' },
               ' HELD AT ',
               { text: this.certificateData[i].location, style: 'boldText' }
             
             ]
           };
    content.push(str);
    content.push(str1);
    content.push(str6);
    content.push(str2);
    content.push(str3);
 //   content.push(str4);
    content.push(str5);

  }

    // pdfMake.fonts = {
    //   DejaVuSerif: {
    //           normal: 'DejaVuSerif.ttf',
    //           bold: 'DejaVuSerif-Bold.ttf'
    //   }
    // };


  var dd = {
   content,
    styles: {
    header: {
      fontSize: 18,
      bold: true,
      alignment:'center',
      margin: [0, 150, 0, 10]
    },
    subheader: {
      fontSize: 16,
      decoration: 'underline',
      decorationStyle: 'solid',
      decorationColor: 'black',
      margin: [0, 10, 0, 50]
    },
    smallheader: {
      fontSize: 13,
      bold: true,
      margin: [0, 10, 0, 5]
    },
    tableExample: {
      fontSize: 11,
      margin: [0, 0, 0, 0]
    },
    tableLocation: {
      margin: [0, 20, 0, 50]
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black'
    },
    boldText:{
      bold:true
    },
    alignSchool:{
      fontSize: 11,
      paddingRight: 20,
    }
  },
  defaultStyle: {
     alignment: 'center',
     font:'DejaVuSerif'
  }
 };

   //pdfMake.createPdf(dd).download(this.schooName +'.pdf');
    
  }

  // getGameData(gameID) {
  //   if(this.gameID) {
  //     this.meritService.loadStaffReport(this.yearvalue,0, this.eventValue,gameID, this.schoolId).subscribe(
  //     response => {
  //       if(response!=="") { 
  //         this.reportData = response;
  //         this.reportDataLength = Object.keys(this.reportData).length;
  //         if (this.reportDataLength > 0) {
  //           this.isDataAvailble = true;
  //           this.noParticipateEvent = false;
  //           this.school_Name = this.reportData[0].schoolName;
  //           this.event_year = this.reportData[0].event_year;
  //           this.evetName = this.reportData[0].eventName;
  //           this.event_name= this.evetName;
  //           this.schooName = this.school_Name;
  //           this.eventNote = this.reportData[0].note;
  //           this.eventDescription = this.reportData[0].description;
  //         } else {
  //           this.messageService.add({key: 'custom', severity:'error', summary: 'You are not participating in this game'});
  //           this.noParticipateEvent = true;
  //           this.isDataAvailble = false;
  //         }
  //       } else {
  //         console.log('Data is blannk from service')
  //       }
  
  //    } ,
  //    error => {
  //      //this.errorAlert =true;
  //     });
  //   } else {
  //     this.isDataAvailble = false;
  //   }
  // }
  downloadReportPdf() {
    let body =[];
    let headers =[];
    let finalArray :any;
    let srNO: any;
    let strId: any;
    let str: any;
    let str1 : any;
    let str2 : any;
    let str3 : any;
    let str4 : any;
    let str5 : any;
    let str6 : any;

    let sr = {text: 'Sr.No.', style: 'tableHeader'};
    let h1 = {text: 'Student Id', style: 'tableHeader'};
    let h2 = {text: 'Student Name', style: 'tableHeader'};
    let h3 = {text: 'Date Of Birth', style: 'tableHeader'};
    let h4 = {text: 'Age Range', style: 'tableHeader'};
    let h5 = {text: 'Gender', style: 'tableHeader'};
    let h6 = {text: 'Game Name', style: 'tableHeader'};
    let h7 = {text: 'Sub Game Name', style: 'tableHeader'}
    let h8 = {text: 'Photo', style: 'tableHeader'};
    headers.push(sr);
    headers.push(h1);
    headers.push(h2);
    headers.push(h3);
    headers.push(h4);
    headers.push(h5);
    headers.push(h6);

   if (this.selectedYearVal <= '2020') {
       headers.push(h7);
   } else if(this.gameType[0].gameType  === 'Both' ) {
        headers.push(h7);
   }

   // headers.push(h7);
    headers.push(h8);
    body.push(headers);

  for(let i=0; i< this.reportData.length; i++){
    let tempArray = [];
    let gender = this.reportData[i].gender;
    let mappedGender:any;
    if(gender==='1'){
      mappedGender = 'Boy';
    } else {
      mappedGender = 'Girl';
    }
    srNO =  i+1;
    strId =  this.reportData[i].sId;
    str =  this.reportData[i].studentName;
   // str1 = this.reportData[i].dateOfBirth;
    str1 =    this.datepipe.transform(this.reportData[i].dateOfBirth, 'dd/MM/yyyy');
   // str1 =   this.datePipe.transform(this.reportData[i].dateOfBirth, 'dd/MM/yyyy')
    str2 = this.reportData[i].ageRange;
    str3 = mappedGender;
    str4 = this.reportData[i].gameName;
    if (this.selectedYearVal <= '2020') { 
        if(this.reportData[i].subGameName) {
        str5 = this.reportData[i].subGameName.trim();
     } else {
        str5 = 'N/A';
      }
    } else if(this.reportData[i].gameType === 'Both') {
      str5 = this.reportData[i].subGameName.trim();
    }  
    // if(this.reportData[i].subGameName) {
    //   str5 = this.reportData[i].subGameName.trim();
    // } else {
    //   str5 = 'N/A';
    // }
    let imageUrl = this.setPhotoYear+'/'+this.reportData[i].photo;
    // this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {    
    //   this.base64Image = 'data:image/jpg;base64,' + base64data;
    // });
    str6 = { image: this.base64Image};
    tempArray.push(srNO);
    tempArray.push(strId);
    tempArray.push(str);
    tempArray.push(str1);
    tempArray.push(str2);
    tempArray.push(str3);
    tempArray.push(str4);


    if (this.selectedYearVal <= '2020') {
      tempArray.push(str5);
    } else if(this.gameType[0].gameType  === 'Both' ) {
      tempArray.push(str5);
    }

    // if(this.gameType[0].gameType  === 'Both') {
    //   tempArray.push(str5);
    // }
    tempArray.push(str6);
 
    body.push(tempArray);
  }

  var content = [

    {text: 'ISSO Nationals Games -'+ this.event_year, style: 'header'},

   {
      alignment: 'justify',
      margin: [0, 0, 0, 10],
      fontSize: 11,
      columns: [
        {
          width:100,
          text: 'School Name: '
        },
        {
          text: this.school_Name
        }
      ]
    },

    {
        alignment: 'justify',
        fontSize: 11,
        columns: [
          {
            width:100,
            text: 'Event Name: '
          },
          {
            text: this.event_name
          }
        ]
      },
      {
      style: 'tableExample',
      table: {
        headerRows: 1,
        body
      },
      layout: {
        hLineWidth: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 1 : 1;
        },
        vLineWidth: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 1 : 1;
        },
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
        },
        // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
        // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
        // paddingLeft: function(i, node) { return 4; },
        // paddingRight: function(i, node) { return 4; },
        // paddingTop: function(i, node) { return 2; },
        // paddingBottom: function(i, node) { return 2; },
        // fillColor: function (rowIndex, node, columnIndex) { return null; }
      }
    },
    
      { text: 'Terms and condition',style: 'smallheader'},
      {text: this.eventNote,style: 'smallheader'},
      { text: 'Event Description',style: 'smallheader'},
      {text: this.eventDescription},
      {text: 'I hereby agree to the following terms & conditions governing the online official entry from process of participation in II ISSO National Games', style: 'smallheader'},
      {
        ol: [
          'I declare that the information provided by me is genuine & authentic.',
          'I know that during verification of documents at the time of reporting, if any discrepancy is detected in original document including name, father’s name, date of birth, class, admission number, school name,eligibility and gender, then my school’s team / subjected players participation will be liable to be cancelled.',
          'I declare that I will not disclose or share the school ID and Password provided by ISSO for process of filling online official entry form of above said championship with anybody. I understand that I am solely responsible for safeguarding my password and avoid any misuse.',
          'I declare that, I shall be responsible for the safety & comfort of players of my team during their travel from their home to the venue of tournament and back to their home. The travel ticket expenses and the expenses during travel will be borne by our school . The food expense shall be completely borne by our school during the tournament including travel period. Our school shall bear the expenses of kit, dress, etc provided to the players.',
          'Our School shall provide medicalfacilities to our team’s players. Our unit will also provide medical & accidental insurance to our team’s each and every player & member.',
          'The school representative shall pay the players / team participation charges of 1000 per participant during the reporting and attendance . The DD shall be raised in the name of “ International Schools Sports Organisation “ payable at Pune.'
        ]
      },
      { pageBreak: "after", text: 'If the NEFT Transaction is done through school , representative shall provide the NEFT reference number.', style: 'smallheader'}
   ];

    // pdfMake.fonts = {
    //   DejaVuSerif: {
    //           normal: 'DejaVuSerif.ttf',
    //           bold: 'DejaVuSerif-Bold.ttf'
    //   }
    // };


  var dd = {
   content,
    styles: {
    header: {
      fontSize: 14,
      bold: true,
      alignment:'center',
      margin: [0, 50, 0, 30]
    },
 
    subheader: {
      fontSize: 12,
      bold: true,
      margin: [0, 10, 0, 50]
    },
    smallheader: {
     
      bold: true,
      margin: [0, 10, 0, 5]
    },
    tableExample: {
     fontSize: 10,
      margin: [0, 20, 0, 20]
    },
    tableHeader: {
      bold: true,
      fontSize: 11,
      color: 'black'
    },
    boldText:{
      bold:true
    }
  },
  defaultStyle: {
     alignment: 'justify',
     font:'DejaVuSerif'
  }
 };

   //pdfMake.createPdf(dd).download(this.school_Name +'.pdf');

}

  onyeareChange(event) {
    this.yearvalue = event.value;
    this.selectedGender = '';
    this.selectedAge = '';
    this.genderReadble = false;
    this.ageReadble = false;
    this.selectedGame ='';
    if(this.yearvalue) {
    this.meritService.loadEventByYearForReport(this.yearvalue,this.reportValue).subscribe(
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
            this.messageService.add({key: 'custom', severity:'error', summary: 'Event not found for this year'});
          }
        } else {
 
        }
  
     } ,
     error => {
       //this.errorAlert =true;
      });
    } else {
      this.selectedEvent = '';
      this.selectedGame = '';
      this.selectedSchool = '';
      this.isConsolitedData = false;
      this.isDataAvailble = false;
      this.eventReadable = false;
      this.schoolReadble = false;
      this.gameReadble = false;
      this.schoolIdForCoach = false;
      this.isTeamEventReport = false;
    }
  }
  onEventChange(event) {
    let yearVal = this.yearvalue.toString();
    let eventYear = yearVal.split("-");
    this.selectedYearVal = eventYear[1];
    this.eventValue = event.value;
    this.genderReadble = false;
    this.ageOptions = [];
    this.ageReadble = false;
    this.selectedGender = '';
    this.selectedAge = '';
    //this.genderOptions = [];
    if (this.isEventReport) {
      this.checkTeamEventData();
    } else {
    if (eventYear[1] > '2020')   {
        this.reportGreaterForNewYear(event)
    } else {
    this.gameOptions =[];
    this.selectedGame =''; 
    if(this.eventValue) {
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
            this.gameList.forEach(element => {
              this.gameOptions.push({
                label: element.gameName,
                value: element.gameId
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
  } else {
     
    this.selectedGame = '';
    this.selectedSchool = '';
    this.isConsolitedData = false;
    this.isDataAvailble = false;
    this.schoolReadble = false;
    this.gameReadble = false;
  }
   }
  }
  }
  checkTshirtEventData() {
    if(this.eventValue) {
      this.meritService.checkTeamEventData(this.yearvalue,this.eventValue).subscribe(
        response => {
          if(response!=="false") {
              this.teamEventReport = response;
              this.teamEventReportLength = this.teamEventReport.length;
              if(this.teamEventReport.length > 0) {
                this.isTeamEventReport = true;
              } else {
                this.isTeamEventReport = false;
               // this.isDataAvailble = false;
                this.messageService.add({key: 'custom', severity:'error', summary: 'Data not found'});
              }
            } else {
              this.isTeamEventReport = false;
              this.messageService.add({key: 'custom', severity:'error', summary: 'Data not found'});
            
          }
    
       } ,
       error => {
         //this.errorAlert =true;
        });
      } else {
        this.isTeamEventReport = false;
      }
  }
  checkTeamEventData() {
    if(this.eventValue) {
    this.meritService.checkTeamEventData(this.yearvalue,this.eventValue).subscribe(
      response => {
        if(response!=="false") {
            // if(response == "true") {
            //   this.isTeamEventReport = true;
            // } else {
            //   this.isTeamEventReport = false;
            //   this.messageService.add({key: 'custom', severity:'error', summary: 'Data not found'});
            // }

            // if(!Object.keys(response).length){
            //   console.log("no data found");
            // }
            this.teamEventReport = response;
            console.log('Data==>'+JSON.stringify(this.teamEventReport));
            this.teamEventReportLength = this.teamEventReport.length;
          //  this.teamEventReportArray= [];
            if(this.teamEventReport.length > 0) {
              this.isTeamEventReport = true;
            //  this.showspinner = false;
            } else {
              this.isTeamEventReport = false;
             // this.isDataAvailble = false;
              this.messageService.add({key: 'custom', severity:'error', summary: 'Data not found'});
            }
          } else {
            this.isTeamEventReport = false;
            this.messageService.add({key: 'custom', severity:'error', summary: 'Data not found'});
          
        }
  
     } ,
     error => {
       //this.errorAlert =true;
      });
    } else {
      this.isTeamEventReport = false;
    }
  }
  reportGreaterForNewYear(event) {
    this.eventValue = event.value;
    this.consolateFileName =event.originalEvent.currentTarget.ariaLabel

    this.gameOptions =[];
    this.selectedGame =''; 
    if(this.eventValue) {
      this.meritService.loadGameForStaff(this.eventValue).subscribe(
      response => {
        if(response!=="") {
          this.gameList =response;
          this.schoolReadble = false;
          if(this.gameList.length > 0 ) {
            console.log(this.gameList);
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
              this.gameOptions.push({
                label: element.game_name,
                value: element.gameId
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
  } else {
    this.selectedGame = '';
    this.selectedSchool = '';
    this.isConsolitedData = false;
    this.isDataAvailble = false;
    this.schoolReadble = false;
    this.gameReadble = false;
  }
  }
  gameConsolitedData() {
    this.meritService.gameConsolatedData(this.eventValue, this.gameID).subscribe(
      response => {
        if(response!=="") {
          this.gameConsoltedData = response;
          console.log('Data==>'+JSON.stringify(this.gameConsoltedData));
          this.gameconsolitedLength = this.gameConsoltedData.length;
          this.gameconsolitedArray= [];
          if(this.gameConsoltedData.length > 0) {
            this.isConsolitedData = true;
          //  this.showspinner = false;
          } else {
            this.isConsolitedData = false;
           // this.isDataAvailble = false;
            this.messageService.add({key: 'custom', severity:'error', summary: 'Data not found'});
          }
        } else {
          console.log('Data is blannk from service')
        }
  
     } ,
     error => {
       //this.errorAlert =true;
      });
  }
  loadGameChange(gameData) {
    this.selectedGender = '';
    this.selectedAge = '';
    this.genderReadble = false;
    if(gameData.value!='') {
      if(this.reportValue == 4){
        this.getVoluenteerSchool(gameData);
      } else {
        this.getSchoolData(gameData);
        this.meritService.setAgeMapForMerit(this.eventValue,gameData.value).subscribe(
        response => {
          this.ageReadble = true;
          this.genderReadble = false;
          if(response[0].ageRange !== 'null' && response[0].girlsAgeRange !== 'null') {
          const ageList = response[0].ageRange + " " + response[0].girlsAgeRange;
          this.ageArray= ageList.split(" ");
          const x = Array.from(new Set(ageList.split(" "))).toString();
          
          var myarray = x.split(',');
          let ageArrayLength =  myarray.length;
      
          this.ageOptions =[];
          this.ageOptions.push({
            label: "Please Select",
            value: ''
          });
  
        for(var i = 0; i < ageArrayLength; i++) {
          if(myarray[i] !==''){
          this.ageOptions.push({
            label: myarray[i],
            value: myarray[i]
          });
        }
        }
      }
   
        } ,
        error => {
          //this.errorAlert =true;
       });
  
      }  
    } else {
      this.gameID = null;
      this.ageReadble = false;
      this.isDataAvailble = false;
      this.schoolReadble = false;
      this.genderReadble = false;
      this.isConsolitedData = false;
      this.schoolIdForCoach = false;
      this.selectedSchool = '';
      this.selectedGender = '';
      this.selectedAge = '';
    }
  }
  getVoluenteerSchool(gameData) {
    this.gameID = gameData.value;
    this.meritService.loadSchoolForVolunteer(this.eventValue).subscribe(
      response => {
        if(response!=="") {
          this.schoolList =response;
          if(this.schoolList.length > 0 ) {
            if(this.isConsolited) {
              this.ageReadble = true;   
            }
           // this.schoolOptions.length = 0;
            this.schoolOptions = [];
            this.schoolReadble = true;
            this.isDataAvailble = false;
            this.schoolOptions.push({
              label: "Please Select",
              value: ''
            });
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
  getSchoolData(gameData) {
    this.gameID = gameData.value;
    this.gameConsolateFileName = gameData.originalEvent.currentTarget.ariaLabel;
    this.selectedSchool =''; 
    this.meritService.checkGameType(this.gameID).subscribe( 
      response => {
         this.gameType = response;
         console.log('game Type'+JSON.stringify(this.gameType))
      },

       error => {
      //this.errorAlert =true;
    });
    if(this.gameID) {
      this.gameConsolitedData()
    } else {
      console.log('immelse')
      this.isConsolitedData = false;
      this.gameconsolitedLength = 0;
    }
    
    this.meritService.loadSchoolByGameReport(this.eventValue, this.gameID).subscribe(
      response => {
        if(response!=="") {
          this.schoolList =response;
          if(this.schoolList.length > 0 ) {
            if(this.isConsolited) {
              this.ageReadble = true;   
            }
           // this.schoolOptions.length = 0;
            this.schoolOptions = [];
            this.schoolReadble = true;
            this.isDataAvailble = false;
            this.schoolOptions.push({
              label: "Please Select",
              value: ''
            });
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
  loadAgeChange(ageVal) {
    this.genderReadble = true;
    this.ageValue = ageVal.value;
    if(!this.ageValue) {
     this.selectedGender = '';
     this.genderReadble = false;
     this.isDataAvailble = false;
    }
  }
  

  
  loadschoolChange(schoolData) {
      this.schoolID = schoolData.value;
      this.schoolDataArray =  this.schoolID.split(","); 
      this.schoolIdForCoach = this.schoolDataArray[0]
     // console.log(this.schoolDataArray[0]);
      this.schooName =this.schoolDataArray[1];
      if(this.reportValue != 4){ 
          if(this.schoolID !=='') {
            if (this.reportValue == 2) {
              this.meritService.loadCoachReport(this.yearvalue,this.reportValue, this.eventValue,this.gameID, this.schoolDataArray[0]).subscribe(
                response => {
                if(response!=="") {
                  this.coachReportData = response;
                  this.coachReportDataLength = Object.keys(this.coachReportData).length;
                  if (this.coachReportDataLength > 0) {
                    this.isDataAvailble = true;
                  } else {
                    this.messageService.add({key: 'custom', severity:'error', summary: 'Coach data not found!'});
                    this.isDataAvailble = false;
                  }
                }
              } ,
              error => {
                //this.errorAlert =true;
              });
            } else {
          this.meritService.loadStaffReport(this.yearvalue,this.reportValue, this.eventValue,this.gameID, this.schoolDataArray[0]).subscribe(
            response => {

          // this.meritService.loadCertificateData(this.yearvalue,this.reportValue, this.eventValue,this.gameID,this.schoolDataArray[0]).subscribe(
          // response => {
            if(response!=="") {
            //  if (this.reportValue == 0) {
                this.reportData = response;
                this.reportDataLength = Object.keys(this.reportData).length;
                if (this.reportDataLength > 0) {
                  this.isDataAvailble = true;
                  this.noParticipateEvent = false;
                  this.school_Name = this.reportData[0].schoolName;
                  this.event_year = this.reportData[0].event_year;
                  this.evetName = this.reportData[0].eventName;
                  this.event_name= this.evetName;
                  this.schooName = this.school_Name;
                  this.eventNote = this.reportData[0].note;
                  this.eventDescription = this.reportData[0].description;
                } else {
                  this.messageService.add({key: 'custom', severity:'error', summary: 'No report found for this game'});
                  this.noParticipateEvent = true;
                  this.isDataAvailble = false;
                }
              // } else {
              //   console.log('Data is blannk from service')
              // } 
            } else {
              console.log('Data is blannk from service')
            }
      
        } ,
        error => {
          //this.errorAlert =true;
          });
        }
        } else {
          this.isDataAvailble = false;
        }
   }

  }
  loadGenderChange(schoolData) {
    this.genderVal = schoolData.value;
    if(this.genderVal !=='') {
      console.log('im not blank')
  
    this.meritService.loadConsolatedData(this.reportValue, this.eventValue,this.gameID,this.ageValue, this.genderVal).subscribe(
    response => {
      if(response!=="") {
        this.consolidatedData = response;
        console.log('Data==>'+JSON.stringify(this.consolidatedData));
        this.consoliDatedLength = this.consolidatedData.length;
        this.consolidatedArray= [];
        if(this.consolidatedData.length > 0) {
          this.isDataAvailble = true;
        //  this.showspinner = false;
        } else {
          this.isDataAvailble = false;
          this.messageService.add({key: 'custom', severity:'error', summary: 'Data not found'});
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

  exportAsXLSX() {
    this.meritService.exportAsExcelFile(this.consolidatedData, this.consolateFileName);
  }
  exportAsGameXLSX() {
    this.meritService.exportAsExcelFile(this.gameConsoltedData, this.gameConsolateFileName);
  }
  exportTeamReportXLSX() {
    this.meritService.exportAsExcelFile(this.teamEventReport, 'team-event-report');
  }
  exportTshirtReport() {
    this.meritService.exportAsExcelFile(this.teamEventReport, 'team-event-report');
  }
}
