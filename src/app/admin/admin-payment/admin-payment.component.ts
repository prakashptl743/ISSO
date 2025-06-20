import { Component, createPlatform, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { ReportMeritService } from "../service/report-merit.service";
import { MessageService } from "primeng/api";
import { PaymentInvoiceService } from "../service/payment-invoice.service";

@Component({
  selector: "app-admin-payment",
  templateUrl: "./admin-payment.component.html",
  styleUrls: ["./admin-payment.component.css"],
})
export class AdminPayment implements OnInit {
  date: Date[];
  yearOptions: SelectItem[];
  monthOptions: SelectItem[];
  isConsolited: boolean;
  reportValue: any;
  reportLabel: string;
  yearvalue: any;
  isDataAvailble: boolean;
  paymentData: any;
  selectedYear: any;
  selectedMonth: any;
  feeOptions: SelectItem[];
  feeType: string;
  paymentType: string;
  reportDataLength: number;
  constructor(
    private issoUtilService: IssoUtilService,
    private paymentInvoiceService: PaymentInvoiceService,
    private messageService: MessageService,
    private meritService: ReportMeritService
  ) {}

  ngOnInit() {
    this.reportLabel = "payment";
    this.reportValue = 0;
    this.yearOptions = this.issoUtilService.setYear();
    this.monthOptions = this.issoUtilService.setMonth();
    this.feeOptions = this.issoUtilService.setFeeType();
    this.feeType = "affilation";
    this.getPaymentData();
  }
  onPaymentTypeChange(event) {
    this.reportDataLength = 0;

    // this.mapStudentPaymentData = [];
    // this.slectedEvent = "";
    this.feeType = event.value;
    console.log(this.paymentType);
    this.loadPaymentData();
    // this.totalAmount = 0;
    // console.log("affilateAmounnt===>" + this.totalAmount);
    // if (this.paymentType !== "") {
    //   if (
    //     this.paymentType == "affilation" ||
    //     this.paymentType == "kit" ||
    //     this.paymentType == "misc"
    //   ) {
    //     this.showPayment = true;
    //     this.isAffilated = "1";
    //     this.totalAmount = 0;
    //     this.affilateAmounnt = "";
    //   } else {
    //     this.showPayment = false;
    //     this.showAlredayPaidMessage = false;
    //     this.isAffilated = "2";
    //     this.loadEvents();
    //   }
    // } else {
    //   this.isAffilated = "0";
    // }
  }
  onloadMenu(index) {
    this.reportValue = index;
    if (index == "0") {
      this.isConsolited = false;
      this.reportLabel = "payment";
    } else if (index == "1") {
      this.reportLabel = "invoice";
    } else if (index == "2") {
      this.reportLabel = "receipt";
    } else if (index == "3") {
      this.reportLabel = "affilationfee";
    } else if (index == "4") {
      this.reportLabel = "sgfi";
    } else {
      this.reportLabel = "ifsSchool";
    }
  }
  getPaymentData() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    // var  m =  new Date().getMonth();
    // var y =  new Date().getFullYear();
    if (month >= 5) {
      this.yearvalue = year + "-" + (year + 1);
    } else {
      this.yearvalue = year - 1 + "-" + year;
    }
    //this.selectedMonth = m + '-' + y
    this.selectedYear = this.yearvalue;
    this.loadPaymentData();
  }
  onyeareChange(event) {
    this.yearvalue = event.value;
    this.selectedYear = this.yearvalue;
    this.loadPaymentData();
  }

  onMonthChange(event) {
    console.log(event);
    var m = (event.getMonth() + 1).toString().padStart(2, "0");
    var y = event.getFullYear().toString();
    console.log(m + "-" + y);
    // 2024-01-01 year month and date
    const filterMonthString = y + "-" + m + "-" + "01";

    this.paymentInvoiceService
      .getPaymentDataMonthWise(filterMonthString)
      .subscribe(
        (response) => {
          if (response !== "") {
            this.paymentData = response;
            if (this.paymentData.length > 0) {
              this.isDataAvailble = true;
            } else {
              this.isDataAvailble = false;
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "Data not found for this year",
              });
            }
          } else {
            console.log("Data is blannk from service");
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }
  exportAsXLSX() {
    this.meritService.exportAsExcelFile(this.paymentData, "paymentSheet");
  }
  loadPaymentData() {
    this.paymentInvoiceService
      .getPaymentData(this.feeType, this.yearvalue)
      .subscribe(
        (response) => {
          if (response !== "") {
            //  const sortedData = response.sort((a, b) => b.payAmount - a.payAmount);
            this.paymentData = response;
            this.paymentData = this.paymentData.sort(
              (a, b) => b.payAmount - a.payAmount
            );

            if (this.paymentData.length > 0) {
              this.isDataAvailble = true;
            } else {
              this.isDataAvailble = false;
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "Data not found for this year",
              });
            }
          } else {
            console.log("Data is blannk from service");
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }
}
