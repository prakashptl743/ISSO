import {  OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { PaymentService  } from '../service/payment.service'
import { IssoUtilService  } from '../../services/isso-util.service'
import { Component } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
 
})
export class PaymentComponent implements OnInit {
 

 // @ViewChild('content') content: ElementRef;
  content:any
  yearOptions: SelectItem[];
  yearvalue:number;
  paymentData: any;
  showPaymenData: boolean;
  nopayment: boolean;
  selectedYear: string;
  eventYear: string;
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  constructor(
    private issoUtilService: IssoUtilService,private paymentService: PaymentService) { }

  ngOnInit() {
    this.yearOptions = this.issoUtilService.setYear();
    this.ageOptions = this.issoUtilService.setAge();
    this.genderOptions = this.issoUtilService.setGender();
    this.setCurrentYear();
    this.loadPaymentData();
  }
 
  loadPaymentData(){
    this.paymentService.loadPaymentData(this.selectedYear).subscribe(
      response => {
        if(response!=="") {
          this.paymentData = response;
          if( this.paymentData.length > 0) {
             this.nopayment = false
            this.showPaymenData = true;
          }else {
            this.showPaymenData = false;
            this.nopayment = true
           }
      
        } else {
         console.log('Data is blannk from service')
        }
  
     } ,
     error => {
       //this.errorAlert =true;
      });
  }
  
  ngAfterViewChecked() {
    // if (this.table._totalRecords === 0) {
    // this.table.currentPageReportTemplate = this.table.currentPageReportTemplate.replace("{first}", "0")
    // } else {
    // this.table.currentPageReportTemplate = this.table.currentPageReportTemplate.replace("0", "{first}")
    // }
   // this.cdRef.detectChanges();
   }
  setCurrentYear() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    
    console.log('month==>'+month)
    console.log('Year==>'+year)
    if(month >= 6) {
      this.eventYear = year +'-'+ (year + 1)
      console.log('im if'+ this.eventYear)
    } else {
      this.eventYear =(year - 1)  +'-'+ year
    }
    this.selectedYear = this.eventYear;
  }
  onyeareChange(event) {
    this.yearvalue = event.value;
    this.paymentService.loadPaymentData(this.yearvalue).subscribe(
      response => {
        if(response!=="") {
          this.paymentData = response;
          if( this.paymentData.length > 0) {
             this.nopayment = false
            this.showPaymenData = true;
          }else {
            this.showPaymenData = false;
            this.nopayment = true
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
