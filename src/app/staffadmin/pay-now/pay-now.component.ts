import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  DoCheck,
} from "@angular/core";
import { SelectItem } from "primeng/api";
import { ReportMeritService } from "src/app/admin/service/report-merit.service";
// import * as jspdf from 'jspdf';
import { IssoUtilService } from "../../services/isso-util.service";
import { MenuItem } from "primeng/api";
import { MessageService } from "primeng/api";
import { StudentService } from "../service/student.service";
// import * as html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as pdfMake from "pdfmake/build/pdfmake";
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';

import { Observable } from "rxjs";
import { Observer } from "rxjs/Rx";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpBackend,
} from "@angular/common/http";

import { DatePipe } from "@angular/common";
import { PaymentService } from "../service/payment.service";
@Component({
  selector: "app-pay-now",
  templateUrl: "./pay-now.component.html",
  styleUrls: ["./pay-now.component.css"],
  providers: [MessageService, DatePipe],
})
export class PayNowComponent implements OnInit {
  base64Image: any;

  @ViewChild("reportContent", { static: false }) reportContent: ElementRef;
  @ViewChild("report_Content", { static: false }) report_Content: ElementRef;

  yearOptions: object;
  feeOptions: SelectItem[];
  eventOptions: SelectItem[];
  gameOptions: SelectItem[];
  schoolOptions: SelectItem[];
  eventValue: any;
  yearvalue: any;
  schoolvalue: number;
  eventData: any;
  schoolDataArray = [];
  gameArray = [];
  eventReadable: boolean = false;
  gameReadble: boolean = false;
  schoolReadble: boolean = false;
  schoolList: any;
  gameList: any;
  gameIdList: any;
  gameNameList: any;
  public gameID: number;
  public schoolID: any;
  certificateData: any;
  reportData: any;
  coachData: any;
  isCertificate: boolean = false;
  isDataAvailble: boolean = false;
  isReportShow: boolean = false;
  schooName: string;
  items2: MenuItem[];
  mapStudentPaymentData = [];
  eventArray = [];
  reportLabel: string;
  showspinner: boolean = false;
  reportValue: number;
  reportDataLength: number;
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
  gameType: any;
  isDataTrue: (obj: any) => boolean;
  newImage: Promise<unknown>;
  setPhotoYear: string;
  event_year: any;
  totalAngularPackages: any;
  eventPrice: any;
  totalAmount: number;
  totalTeamAmount: number;
  showPayment: boolean;
  paymentType: string;
  isAffilated: string;
  schoolType: string;
  feeType: string;
  slectedYear: string;
  slectedEvent: string;
  slectedGame: string;
  rzp1;

  payementData: Object;
  eventName: any;
  gameName: any;
  affilateAmounnt: any;
  error: any;
  studentId: string;
  showPaidSuccess: boolean = false;
  generatedpaymentId: string;
  showPayemntScreen: boolean = true;
  paymentTypeInfo: any;
  showAlredayPaidMessage: boolean;
  isFirstYear: boolean;
  //options;
  // options: {
  //   key: string; // Enter the Key ID generated from the Dashboard
  //   amount: string; // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //   currency: string; name: string; description: string; image: string; order_id: string; //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //   callback_url: string; prefill: { name: string; email: string; contact: string; }; notes: { address: string; }; theme: { color: string; };
  // };
  constructor(
    private issoUtilService: IssoUtilService,
    private studentService: StudentService,
    private payemntService: PaymentService,
    private messageService: MessageService,
    private http: HttpClient,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private meritService: ReportMeritService
  ) {}

  ngOnInit() {
    this.showPaidSuccess = false;

    this.showPayemntScreen = true;
    this.schoolType = localStorage.getItem("isAffiliate");
    console.log(this.schoolType);
    //console.log(new DatePipe('en-US').transform(new Date(), 'dd-MM-yyyy'));
    // this.time = this.datePipe.transform(new Date());
    this.isCertificate = false;
    this.isDataAvailble = false;
    this.yearOptions = this.issoUtilService.setYearToStaffadmin();
    // this.yearOptions = this.issoUtilService.setYearForStaffadmin();
    this.feeOptions = this.issoUtilService.setFeeType();
    this.schoolId = localStorage.getItem("schoolId");
    this.yearvalue = this.yearOptions[1].year;
    // let imageUrl = '../../assets/images/general/1568798071IMG_8449214933993.jpg';
    // this.getBase64ImageFromURL1(imageUrl).subscribe(base64data => {
    //   this.base64Image = 'data:image/jpg;base64,' + base64data;
    // });
    this.setPhotoPath();
    this.setPaymentJson();

    //  console.log(this.testFun1());
  }
  testFun1() {
    console.log("im tes4634634t");
    this.showPaidSuccess = true;
    this.showPayemntScreen = false;
  }
  setPaymentJson() {}
  onGoBack() {
    this.showPaidSuccess = false;
    this.showPayemntScreen = true;
    this.generatedpaymentId = "";
    this.totalAmount = 0;
    this.affilateAmounnt = 0;
  }
  //ngDoCheck() {
  //   console.log('Running change detection ',this.affilateAmounnt);
  //   this.totalAmount = this.affilateAmounnt;
  // }

  payNow(amt, studentId, paymentType) {
    this.totalAmount = amt;
    this.studentId = studentId;
    this.paymentTypeInfo = paymentType;
    // this.paymentCapture.bind(this);
    // this.paymentCapture1();
    let options = {
      key: "rzp_live_08wdE0QgVsFNVd", // Enter the Key ID generated from the Dashboard
      amount: amt * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      // "amount": 100,
      currency: "INR",
      name: this.eventName,
      description: this.gameName,
      image: "https://issoindia.com/assets/img/logo_retina.png",
      //'handler': this.paymentCapture.bind(this),
      handler: (response) => {
        this.paymentCapture(response);
      },

      // "order_id": "order_9A33XWu170gUtb", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://issoindia.com/isso/#/staffadmin/pay-now",
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    // options.handler = ((response) => {
    //   //this.pay_id = response.razorpay_payment_id;
    //   this.orderanything()
    // });
    var propay = new this.payemntService.nativeWindow.Razorpay(options);
    propay.open();

    propay.on("payment.success", function (resp) {
      alert("payment checking.");
      alert(resp.razorpay_payment_id),
        alert(resp.razorpay_order_id),
        alert(resp.razorpay_signature);
    });
  }
  testFun() {
    if (this.generatedpaymentId !== "") {
      console.log("Im if");
      this.generatedpaymentId = "";
    }
    console.log("Imfun");
  }
  orderanything() {
    console.log("Im after payment method");
    this.showPaidSuccess = true;
    this.showPayemntScreen = false;
  }
  checkPaymentStatus() {
    if (this.generatedpaymentId !== "") {
      this.showPaidSuccess = true;
      this.showPayemntScreen = false;
    }
  }
  paymentCapture1() {
    //  this.loadingProgress = true;
    // console.log("response id "+JSON.stringify(response));
    let paymentId = "hello";
    //   console.log("payment id "+paymentId);
    //   //TODO
    this.generatedpaymentId = "dffff@sdf$%";
    // this.generatedpaymentId = paymentId;
    if (paymentId !== "") {
      if (
        this.paymentTypeInfo == "individual" ||
        this.paymentTypeInfo == "affilation" ||
        this.paymentTypeInfo == "kit" ||
        this.paymentTypeInfo == "misc"
      ) {
        this.savePaymentData();
      } else {
        this.saveTeamPaymentData();
      }
    }
  }
  // public ngDoCheck(): void {
  //   if(this.generatedpaymentId !== undefined) {
  //     console.log('Im if in do check')
  //    // setTimeout(function () {
  //        this.showPaidSuccess = true;
  //        this.showPayemntScreen = false;
  //    // }, 0);
  //   } else {
  //     console.log('Im else in do check')
  //   }
  //   console.log('AppComponent: Change detection count = ' );
  // }
  paymentCapture(response) {
    this.showPaidSuccess = true;
    this.showPayemntScreen = false;
    //  this.loadingProgress = true;
    var object1 = {};
    console.log("response id " + JSON.stringify(response));
    let paymentId = response.razorpay_payment_id;
    console.log("payment id " + paymentId);
    //console.log(this.testFun1())
    // var nameString = function (name) {
    //   // this.showPaidSuccess = true;
    //   // this.showPayemntScreen = false;
    //   object1 = Object.create(object1, {
    //     property1: {
    //       value: name,
    //       enumerable: true,
    //       writable: true,
    //       configurable: false
    //     },
    //     property2: {  }
    //   });
    //   console.log('Hello==>',object1);

    // }
    // console.log(nameString("test"))
    //TODO
    this.generatedpaymentId = paymentId;
    // this.generatedpaymentId = paymentId;
    if (paymentId !== "") {
      // setTimeout(function () {
      //   this.showPaidSuccess = true;
      //   this.showPayemntScreen = false;
      // }, 0);

      if (
        this.paymentTypeInfo == "individual" ||
        this.paymentTypeInfo == "affilation" ||
        this.paymentTypeInfo == "kit" ||
        this.paymentTypeInfo == "misc"
      ) {
        this.savePaymentData();
      } else {
        this.showPaidSuccess = true;
        this.showPayemntScreen = false;
        this.saveTeamPaymentData();
      }
    }
  }
  savePaymentData() {
    const formData = new FormData();
    if (
      this.paymentTypeInfo == "affilation" ||
      this.paymentTypeInfo == "kit" ||
      this.paymentTypeInfo == "misc"
    ) {
      let paidAmount = this.totalAmount.toString();
      formData.append("paymentTypeInfo", this.paymentTypeInfo);
      formData.append("schoolId", this.schoolId);
      formData.append("generatedpaymentId", this.generatedpaymentId);
      formData.append("paidAmount", paidAmount);
    } else {
      let gameId = this.gameID.toString();
      let paidAmount = this.totalAmount.toString();
      formData.append("paymentTypeInfo", this.paymentTypeInfo);
      formData.append("schoolId", this.schoolId);
      formData.append("generatedpaymentId", this.generatedpaymentId);
      formData.append("studentId", this.studentId);
      formData.append("paidAmount", paidAmount);
      formData.append("gameId", gameId);
      formData.append("eventId", this.eventValue);
    }
    this.payemntService.savePaymentData(formData).subscribe(
      (res) => {
        if (res.status === "error") {
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: "Validation failed",
          });
        } else {
          this.setPaymentForGame();
          // this.messageService.add({key: 'custom', severity:'success', summary: 'Volunteer Data Added Successfully'});

          // this.loadCoachData();
        }
      },
      (error) => (this.error = error)
    );
  }

  saveTeamPaymentData() {
    let gameId = this.gameID.toString();
    let paidAmount = this.totalAmount.toString();
    let mappedData;

    const formData = new FormData();
    formData.append("schoolId", this.schoolId);
    formData.append("gameId", gameId);
    formData.append("eventId", this.eventValue);
    formData.append("mappedData", JSON.stringify(this.mapStudentPaymentData));
    this.payemntService.saveTeamPaymentData(formData).subscribe(
      (res) => {
        if (res.status === "error") {
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: "Validation failed",
          });
        } else {
          // this.messageService.add({key: 'custom', severity:'success', summary: 'Volunteer Data Added Successfully'});
          this.setPaymentForGame();
          this.totalTeamAmount = 0;
          // this.loadCoachData();
        }
      },
      (error) => (this.error = error)
    );
  }

  setPhotoPath() {
    this.setPhotoYear = this.issoUtilService.setPhotoYear();
  }

  onKeypressEvent(amount) {
    this.totalAmount = amount;
    console.log(this.totalAmount);
  }
  setAffiliateAmount() {
    console.log("hiii");
    if (this.affilateAmounnt <= 50000) {
      // this.affilateAmounnt = 50000;
      // this.totalAmount= 50000;
    }
  }

  onPaymentTypeChange(event) {
    this.reportDataLength = 0;
    this.feeType = event.value;
    this.mapStudentPaymentData = [];
    this.slectedEvent = "";
    this.paymentType = event.value;
    console.log(this.paymentType);
    this.totalAmount = 0;

    console.log("affilateAmounnt===>" + this.totalAmount);
    if (this.paymentType !== "") {
      if (
        this.paymentType == "affilation" ||
        this.paymentType == "kit" ||
        this.paymentType == "misc"
      ) {
        this.showPayment = true;
        this.isAffilated = "1";
        this.totalAmount = 0;
        this.affilateAmounnt = "";
      } else {
        this.showPayment = false;
        this.showAlredayPaidMessage = false;
        this.isAffilated = "2";
        this.loadEvents();
      }
    } else {
      this.isAffilated = "0";
    }
  }
  loadEvents() {
    this.studentService
      .loadEventByYear(this.yearvalue, this.schoolId)
      .subscribe(
        //this.meritService.loadEventByYear(this.yearvalue).subscribe(
        (response) => {
          if (response !== "") {
            this.eventData = response;
            console.log(this.eventData);
            this.gameReadble = false;
            this.schoolReadble = false;
            if (this.eventData.length > 0) {
              this.eventOptions = [];
              this.eventReadable = true;
              this.isDataAvailble = false;
              this.eventOptions.push({
                label: "Please Select",
                value: "",
              });
              this.eventData.forEach((element) => {
                const eventIdAndName =
                  element.eventId + "," + element.eventName;
                this.eventOptions.push({
                  label: element.eventName,
                  value: eventIdAndName,
                });
              });
            } else {
              this.isDataAvailble = true;
              this.eventReadable = false;
              this.gameReadble = false;
              this.schoolReadble = false;
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "Event not found for this year!",
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
  checkAlreadypaid() {
    this.payemntService.checkAlreadypaid(this.schoolId).subscribe(
      (response) => {
        if (Object.keys(response).length > 0) {
          this.showAlredayPaidMessage = true;
          this.showPayment = false;
        } else {
          this.showPayment = true;
          this.showAlredayPaidMessage = false;
        }
        // this.getGameData(this.gameID)
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  onyeareChange(val, yearText) {
    if (yearText == "first") {
      this.isFirstYear = true;
    } else {
      this.isFirstYear = false;
    }
    this.isAffilated = "0";
    this.showPayment = false;
    this.feeType = "";
    this.slectedEvent = "";
    this.slectedGame = "";
    this.eventReadable = false;
    this.gameReadble = false;
    this.reportDataLength = 0;
    this.totalTeamAmount = 0;
    this.yearvalue = val;
    this.showPayment = false;
    this.totalAmount = 0;
    this.mapStudentPaymentData = [];
    if (this.yearvalue !== "") {
    } else {
      this.eventOptions = [];
      this.gameOptions = [];
      this.eventReadable = false;
      this.gameReadble = false;
    }
    // event.preventDefault()
  }

  onEventChange(event) {
    // this.eventValue = event.value;
    this.mapStudentPaymentData = [];
    this.reportDataLength = 0;
    this.totalTeamAmount = 0;
    let yearVal = this.yearvalue.toString();
    let eventYear = yearVal.split("-");
    this.selectedYearVal = eventYear[1];

    const eventval = (this.slectedEvent = event.value);
    this.eventArray = eventval.split(",");
    this.eventValue = this.eventArray[0];
    this.eventName = this.eventArray[1];
    this.showPayment = false;
    this.totalAmount = 0;

    console.log("this.slectedEvent" + this.slectedEvent);
    if (this.eventValue !== "") {
      this.meritService.loadGameForStaff(this.eventValue).subscribe(
        (response) => {
          if (response !== "") {
            this.gameList = response;
            this.gameOptions = [];
            this.schoolReadble = false;
            if (this.gameList.length > 0) {
              this.gameIdList = this.gameList[0].gameId.split(",");
              this.gameNameList = this.gameList[0].game_name.split(",");
              console.log("im game name" + this.gameNameList);
              this.myObjArray = [];

              for (let i = 0; i < this.gameIdList.length; i++) {
                this.myObjArray.push({
                  gameId: Number(this.gameIdList[i]),
                  game_name: this.gameNameList[i],
                });
              }

              this.gameOptions = [];
              this.gameReadble = true;
              this.isDataAvailble = false;
              this.gameOptions.push({
                label: "Please Select",
                value: "",
              });
              this.gameList.forEach((element) => {
                const gameIdAndName = element.gameId + "," + element.game_name;
                this.gameOptions.push({
                  label: element.game_name,
                  value: gameIdAndName,
                });
              });
              console.log("gameOptions" + JSON.stringify(this.gameOptions));
            } else {
              this.isDataAvailble = false;
              this.gameReadble = false;
              this.schoolReadble = false;
              this.showPayment = false;
              this.totalAmount = 0;
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "Game not found for this Event!",
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
    } else {
      this.gameOptions = [];
      this.gameReadble = false;
    }
    // event.preventDefault()
  }

  loadschoolChange(gameData) {
    //   this.gameID = gameData.value;
    this.reportDataLength = 0;
    this.totalTeamAmount = 0;
    this.mapStudentPaymentData = [];
    const eventval = gameData.value;
    this.slectedGame = gameData.value;
    this.gameArray = eventval.split(",");
    this.gameID = this.gameArray[0];
    this.gameName = this.gameArray[1];

    this.meritService.checkGameType(this.gameID).subscribe(
      (response) => {
        this.gameType = response;
        console.log("game Type===>" + JSON.stringify(this.gameType));
        this.getGameData(this.gameID);
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
    //  event.preventDefault()
  }

  getGameData(gameID) {
    if (this.gameID) {
      this.meritService
        .checkAlredayPayment(this.eventValue, this.gameID)
        .subscribe(
          (response) => {
            if (response !== "") {
              this.payementData = response;
              // this.payementData.
              this.payementData = Object.keys(this.payementData).length;
              console.log(this.payementData);
              if (this.payementData == 1) {
                this.messageService.add({
                  key: "custom",
                  severity: "error",
                  summary: "You have already done payment for this game",
                });
              } else {
                this.setPaymentForGame();
              }
              //  console.log('DATA==>'+response.length);
            } else {
              console.log("Data is blannk from service");
            }
          },
          (error) => {
            //this.errorAlert =true;
          }
        );
    } else {
      this.isDataAvailble = false;
    }
  }
  addPaymentForStudent(e, studentId, amount) {
    if (e.target.checked) {
      this.mapStudentPaymentData.push({
        studentId: studentId,
        amount: amount,
      });
    } else {
      let removeIndex = this.mapStudentPaymentData.findIndex(
        (itm) => itm.studentId === studentId
      );
      if (removeIndex !== -1) this.mapStudentPaymentData.splice(removeIndex, 1);
    }
    let result = this.mapStudentPaymentData.reduce(
      (a, c) => (Object.keys(c).forEach((k) => (a[k] = (a[k] || 0) + c[k])), a),
      {}
    );
    this.totalTeamAmount = result["amount"];
    if (this.totalTeamAmount === undefined) {
      this.totalTeamAmount = 0;
    }
    // e.preventDefault()
  }
  setPaymentForGame() {
    this.mapStudentPaymentData = [];
    this.reportData = [];
    this.reportDataLength = 0;
    this.meritService
      .loadStaffReport(
        this.yearvalue,
        0,
        this.eventValue,
        this.gameID,
        this.schoolId
      )
      .subscribe(
        (response) => {
          if (response !== "") {
            this.reportData = response;
            this.reportDataLength = Object.keys(this.reportData).length;
            if (this.reportDataLength > 0) {
              // this.showPayment = true;
              this.isDataAvailble = true;
              this.noParticipateEvent = false;
              this.eventPrice = this.reportData[0].price;

              // if (this.schoolType == 'Yes') {
              //   this.totalAmount =   this.eventPrice * this.reportDataLength;
              // } else {
              //   this.totalAmount =  2 * (this.eventPrice * this.reportDataLength);
              // }
              console.log("sdfsfaf" + this.totalAmount);
              this.school_Name = this.reportData[0].schoolName;
              this.event_year = this.reportData[0].event_year;
              this.evetName = this.reportData[0].eventName;
              this.event_name = this.evetName;
              this.schooName = this.school_Name;
              this.eventNote = this.reportData[0].note;
              this.eventDescription = this.reportData[0].description;
            } else {
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "You have not participated in this game",
              });
              this.noParticipateEvent = true;
              this.isDataAvailble = false;
              //  this.showPayment = false;
              this.totalAmount = 0;
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
