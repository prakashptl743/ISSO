import { Component, createPlatform, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IssoUtilService } from 'src/app/services/isso-util.service';
import { ReportMeritService } from '../service/report-merit.service';
import { MessageService } from 'primeng/api';
import { PaymentInvoiceService } from '../service/payment-invoice.service';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.css']
})
export class AdminPayment implements OnInit { 
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

  selectedCities: string[] = [];

  selectedCategories: any[] = ['Technology', 'Sports'];

  categories: any[] = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];

  checked: boolean = false;
  gameArray= [];
  reportValue: any;
  reportLabel: string;
  schoolType: any;
  schoolPayment: number;
  totalDues: any;
  totalPaidTillNow: number;

   constructor( private issoUtilService: IssoUtilService, private paymentInvoiceService: PaymentInvoiceService,private messageService: MessageService, private meritService: ReportMeritService) { }

    ngOnInit() {
      this.reportLabel = 'payment';
      this.reportValue = 0;
    }
    onloadMenu(index) {
      this.reportValue = index;
      if(index == '0') {
        this.isConsolited = false;
        this.reportLabel = "payment"
      } else if(index == '1') {
        this.reportLabel = "invoice"
      } else if(index == '2') {
        this.reportLabel = "receipt"
      }
    }
 
 
 
 
 
}
