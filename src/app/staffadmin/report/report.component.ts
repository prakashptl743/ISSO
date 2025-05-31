import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SelectItem } from "primeng/api";
import { ReportMeritService } from "src/app/admin/service/report-merit.service";
//import * as jspdf from 'jspdf';
import { IssoUtilService } from "../../services/isso-util.service";
import { MenuItem } from "primeng/api";
import { MessageService } from "primeng/api";
import { StudentService } from "../service/student.service";
//import * as html2canvas from 'html2canvas';
import * as pdfMake from "pdfmake/build/pdfmake";
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfFonts from "./vfs_fonts";
import { Observable } from "rxjs";
import { Observer } from "rxjs/Rx";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpBackend,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DatePipe } from "@angular/common";
import { PaymentInvoiceService } from "src/app/admin/service/payment-invoice.service";
@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"],
  providers: [MessageService, DatePipe],
})
export class ReportComponent implements OnInit {
  base64Image: any;

  //   yearOptions: SelectItem[];
  //   eventOptions: SelectItem[];
  //   yearvalue: any;
  //   schoolId: string;
  //   eventData: any;
  //   eventReadable: boolean = false;

  //   constructor(
  //     private confirmation: ConfirmationService,
  //     private messageService: MessageService,
  //     private fb: FormBuilder,
  //     private router: Router,
  //     private studentService: StudentService,
  //   ) { }

  //   ngOnInit() {
  //     this.schoolId = localStorage.getItem('schoolId');
  //     this.initialComponent();
  //   }
  //   initialComponent () {
  //       this.yearOptions = [
  //         {label: '2018-19', value: '2018-2019'},
  //         {label: '2019-20', value: '2019-2020'},
  //         {label: '2020-21', value: '2020-2021'},
  //         {label: '2021-22', value: '2021-2022'},
  //         {label: '2022-23', value: '2022-2023'},
  //         {label: '2023-24', value: '2023-2024'},
  //         {label: '2024-25', value: '2024-2025'},
  //         {label: '2025-26', value: '2025-2026'},
  //         {label: '2026-27', value: '2026-2027'}
  //     ];
  //  }
  //  onyeareChange(event){
  //   this.yearvalue = event.value;
  //   this.studentService.loadEventByYear(this.yearvalue, this.schoolId).subscribe(
  //     response => {
  //       if(response!=="") {
  //         this.eventData =response;
  //         console.log(this.eventData);
  //         if(this.eventData.length > 0 ){
  //           this.eventOptions = [];
  //           this.eventReadable = true;
  //           this.eventData.forEach(element => {
  //             console.log(element);
  //             this.eventOptions.push({
  //               label: element.eventName,
  //               value: element.eventId
  //             });
  //           })
  //         } else {
  //           this.eventReadable = false;
  //         //  this.schoolReadble =false;
  //           this.eventOptions = [];
  //          // this.schoolOptions = [];
  //         }
  //       } else {
  //        console.log('Data is blannk from service')
  //       }

  //    } ,
  //    error => {
  //      //this.errorAlert =true;
  //     });
  // }

  @ViewChild("reportContent", { static: false }) reportContent: ElementRef;
  @ViewChild("report_Content", { static: false }) report_Content: ElementRef;

  yearOptions: object;
  eventOptions: SelectItem[];
  gameOptions: SelectItem[];
  schoolOptions: SelectItem[];
  eventValue: any;
  yearvalue: any;
  schoolvalue: number;
  eventData: any;
  schoolDataArray = [];
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
  isReport: boolean;
  isShowLoader: boolean;
  isCertificateAvailable: any;
  finalGameList = [];
  isFirstYear: boolean;
  serverUrl: string;
  constructor(
    private issoUtilService: IssoUtilService,
    private studentService: StudentService,
    private messageService: MessageService,
    private http: HttpClient,
    private datePipe: DatePipe,
    private paymentInvoiceService: PaymentInvoiceService,
    private meritService: ReportMeritService
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.serverUrl = environment.baseUrl;
    //console.log(new DatePipe('en-US').transform(new Date(), 'dd-MM-yyyy'));
    // this.time = this.datePipe.transform(new Date());
    this.isCertificate = false;
    this.isDataAvailble = false;
    this.yearOptions = this.issoUtilService.setYearToStaffadmin();
    this.schoolId = localStorage.getItem("schoolId");
    // let imageUrl = '../../assets/images/general/1568798071IMG_8449214933993.jpg';
    // this.getBase64ImageFromURL1(imageUrl).subscribe(base64data => {
    //   this.base64Image = 'data:image/jpg;base64,' + base64data;
    // });
    this.onyeareChange(this.yearOptions[1].year, "second");
    this.isReport = true;
    this.setPhotoPath();
  }
  setPhotoPath() {
    this.setPhotoYear = this.issoUtilService.setPhotoYear();
  }

  getBase64Image(img: HTMLImageElement) {
    // We create a HTML canvas object that will create a 2d image
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    // This will draw image
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  getBase64ImageFromURL1(url: string) {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }
  // getBase64ImageFromURL(url) {
  //   return new Promise((resolve, reject) => {
  //     var img = new Image();
  //    // img.setAttribute("crossOrigin", "anonymous");
  //   // img.crossOrigin="anonymous";
  //    img.crossOrigin= 'Anonymous',
  //     img.onload = () => {
  //       var canvas = document.createElement("canvas");

  //       canvas.width = img.width;
  //       canvas.height = img.height;

  //       var ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);

  //       var dataURL = canvas.toDataURL("image/jpg");

  //       resolve(dataURL);
  //     };

  //     img.onerror = error => {
  //       reject(error);
  //     };

  //     img.src = url;
  //   });
  // }
  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width / 10;
        canvas.height = img.height / 10;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = url;
    });
    // return this.newImage;
  }

  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }
  loadMenu() {
    this.items2 = [
      { label: "Report", icon: "fa fa-fw fa-bar-chart" },
      { label: "Certificate", icon: "fa fa-fw fa-calendar" },
      { label: "Coache Certificate", icon: "fa fa-fw fa-calendar" },
    ];
  }
  downloadReport() {
    console.log("im donwnload report");
    this.isReport = true;
  }
  downloadInvoice() {
    this.isReport = false;
    console.log("im donwnload downloadInvoice");
    this.eventValue = "";
  }
  onyeareChange(val, yearText) {
    if (yearText == "first") {
      this.isFirstYear = true;
    } else {
      this.isFirstYear = false;
    }
    this.eventReadable = false;
    this.yearvalue = val;
    this.finalGameList = [];

    if (this.yearvalue !== "") {
      this.studentService
        .loadEventByYear(this.yearvalue, this.schoolId)
        .subscribe(
          //this.meritService.loadEventByYear(this.yearvalue).subscribe(
          (response) => {
            let objectLength = Object.keys(response).length;

            if (objectLength > 0) {
              this.eventData = response;
              this.gameReadble = false;
              this.schoolReadble = false;
              this.isCertificateAvailable = this.eventData[0]["isCertificate"];
              console.log(this.isCertificateAvailable);
              if (this.eventData.length > 0) {
                console.log("im if ");
                this.eventOptions = [];
                this.eventReadable = true;
                this.isDataAvailble = false;
                this.eventOptions.push({
                  label: "Please Select",
                  value: "",
                });
                this.eventData.forEach((element) => {
                  this.eventOptions.push({
                    label: element.eventName,
                    value: element.eventId,
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
    } else {
      this.eventOptions = [];
      this.gameOptions = [];
      this.eventReadable = false;
      this.gameReadble = false;
    }
  }
  onEventChange(event) {
    this.eventValue = event.value;
    this.finalGameList = [];
    let yearVal = this.yearvalue.toString();
    let eventYear = yearVal.split("-");
    this.selectedYearVal = eventYear[1];
    if (this.isReport) {
      this.getGameForReport();
    } else {
      this.getInvoiceData();
    }
  }
  getGameForReport() {
    if (this.eventValue !== "") {
      this.meritService.loadGameForStaff(this.eventValue).subscribe(
        (response) => {
          if (response !== "") {
            this.gameList = response;
            this.gameOptions = [];
            this.schoolReadble = false;
            if (this.gameList.length > 0) {
              this.getGameData(this.gameList);
              //  for(let i=0;i<=this.gameList.length - 1;i++) {
              //   console.log('Im ID--->'+this.gameList[i]['gameId'])
              //   this.getGameData(this.gameList[i]['gameId'])
              //  }
              //   this.gameIdList = this.gameList[0].gameId.split(',')
              //   this.gameNameList =  this.gameList[0].game_name.split(',')
              //   console.log('im game name'+this.gameNameList)
              //   this.myObjArray = [];

              //  for(let i=0;i<this.gameIdList.length;i++) {
              //    this.myObjArray.push({gameId: Number(this.gameIdList[i]), game_name: this.gameNameList[i] });
              //  }

              //   this.gameOptions = [];
              //   this.gameReadble = true;
              //   this.isDataAvailble = false;
              //   this.gameOptions.push({
              //     label: "Please Select",
              //     value: '',
              //   });
              //   this.gameList.forEach(element => {
              //     this.gameOptions.push({
              //       label: element.game_name,
              //       value: element.gameId
              //     });
              //   })
              //   console.log('gameOptions'+JSON.stringify(this.gameOptions));
            } else {
              this.isDataAvailble = false;
              this.gameReadble = false;
              this.schoolReadble = false;
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
  }
  getInvoiceData() {
    this.isShowLoader = true;
    this.isDataAvailble = false;
    this.paymentInvoiceService
      .downloadInvoicePdf(this.yearvalue, this.eventValue, this.schoolId)
      .subscribe(
        (response) => {
          if (response !== "") {
            this.isShowLoader = false;
            if (response == "false") {
              this.isDataAvailble = false;
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "Invoice data not found for this school",
              });
            } else {
              this.isDataAvailble = true;
            }
          } else {
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: "Data not",
            });
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }
  loadGameChange(gameData) {
    this.gameID = gameData.value;

    this.meritService
      .loadSchoolByGameReport(this.eventValue, this.gameID)
      .subscribe(
        (response) => {
          if (response !== "") {
            this.schoolList = response;
            if (this.schoolList.length > 0) {
              // this.schoolOptions.length = 0;
              this.schoolOptions = [];
              this.schoolReadble = true;
              this.isDataAvailble = false;
              this.schoolList.forEach((element) => {
                const SchoolIdAndName =
                  element.schoolId + "," + element.schoolName;
                this.schoolOptions.push({
                  label: element.schoolName,
                  value: SchoolIdAndName,
                });
              });
            } else {
              this.isDataAvailble = false;
              this.schoolReadble = false;
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
  loadschoolChange(gameData) {
    this.gameID = gameData.value;
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
  }

  getGameData(gameData) {
    this.finalGameList = [];
    for (let i = 0; i <= gameData.length - 1; i++) {
      console.log("Im ID--->" + gameData[i]["gameId"]);

      this.meritService
        .loadStaffReport(
          this.yearvalue,
          0,
          this.eventValue,
          gameData[i]["gameId"],
          this.schoolId
        )
        .subscribe(
          (response) => {
            if (response !== "") {
              this.reportData = response;
              this.reportDataLength = Object.keys(this.reportData).length;
              if (this.reportDataLength > 0) {
                //  this.finalGameList.push(this.reportData.gameId);
                this.finalGameList.push({
                  gameId: this.reportData[0].gameId,
                  gameName: this.reportData[0].gameName,
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
    if (this.finalGameList.length == 0) {
      this.messageService.add({
        key: "custom",
        severity: "error",
        summary: "Game not found for this year!",
      });
    }
    console.log("DATA asfa---->" + this.reportDataLength);
    console.log("DATA---->" + this.finalGameList);
  }

  async printReport() {
    if (this.reportDataLength > 0) {
      let body = [];
      let headers = [];
      let finalArray: any;
      let srNO: any;
      let strId: any;
      let str: any;
      let str1: any;
      let str2: any;
      let str3: any;
      let str4: any;
      let str5: any;
      let str6: any;

      let sr = { text: "Sr.No.", style: "tableHeader" };
      let h1 = { text: "Student Id", style: "tableHeader" };
      let h2 = { text: "Student Name", style: "tableHeader" };
      let h3 = { text: "Date Of Birth", style: "tableHeader" };
      let h4 = { text: "Age Range", style: "tableHeader" };
      let h5 = { text: "Gender", style: "tableHeader" };
      let h6 = { text: "Game Name", style: "tableHeader" };
      let h7 = { text: "Sub Game Name", style: "tableHeader" };
      let h8 = { text: "Photo", style: "tableHeader" };
      headers.push(sr);
      headers.push(h1);
      headers.push(h2);
      headers.push(h3);
      headers.push(h4);
      headers.push(h5);
      headers.push(h6);

      if (this.selectedYearVal <= "2020") {
        headers.push(h7);
      } else if (this.gameType[0].gameType === "Both") {
        headers.push(h7);
      }

      // headers.push(h7);
      headers.push(h8);
      body.push(headers);

      for (let i = 0; i < this.reportData.length; i++) {
        let tempArray = [];
        let gender = this.reportData[i].gender;
        let mappedGender: any;
        if (gender === "1") {
          mappedGender = "Boy";
        } else {
          mappedGender = "Girl";
        }
        srNO = i + 1;
        strId = this.reportData[i].sId;
        str = this.reportData[i].studentName;
        str1 = this.datePipe.transform(
          this.reportData[i].dateOfBirth,
          "dd/MM/yyyy"
        );
        //  str1 = this.reportData[i].dateOfBirth;
        str2 = this.reportData[i].ageRange;
        str3 = mappedGender;
        str4 = this.reportData[i].gameName;
        if (this.selectedYearVal <= "2020") {
          if (this.reportData[i].subGameName) {
            str5 = this.reportData[i].subGameName.trim();
          } else {
            str5 = "N/A";
          }
        } else if (this.reportData[i].gameType === "Both") {
          str5 = this.reportData[i].subGameName.trim();
        }

        let imageUrl = this.setPhotoYear + "/" + this.reportData[i].photo;
        this.getBase64ImageFromURL1(imageUrl).subscribe((base64data) => {
          this.base64Image = "data:image/jpg;base64," + base64data;
        });

        str6 = { image: this.base64Image };
        tempArray.push(srNO);
        tempArray.push(strId);
        tempArray.push(str);
        tempArray.push(str1);
        tempArray.push(str2);
        tempArray.push(str3);
        tempArray.push(str4);

        if (this.selectedYearVal <= "2020") {
          tempArray.push(str5);
        } else if (this.gameType[0].gameType === "Both") {
          tempArray.push(str5);
        }

        tempArray.push(str6);
        body.push(tempArray);
      }

      var content = [
        { text: "ISSO Nationals Games -" + this.event_year, style: "header" },

        {
          alignment: "justify",
          margin: [0, 0, 0, 10],
          fontSize: 11,
          columns: [
            {
              width: 100,
              text: "School Name: ",
            },
            {
              text: this.school_Name,
            },
          ],
        },

        {
          alignment: "justify",
          fontSize: 11,
          columns: [
            {
              width: 100,
              text: "Event Name: ",
            },
            {
              text: this.event_name,
            },
          ],
        },
        {
          style: "tableExample",
          table: {
            headerRows: 1,
            body,
          },
          layout: {
            hLineWidth: function (i, node) {
              return i === 0 || i === node.table.body.length ? 1 : 1;
            },
            vLineWidth: function (i, node) {
              return i === 0 || i === node.table.widths.length ? 1 : 1;
            },
            hLineColor: function (i, node) {
              return i === 0 || i === node.table.body.length ? "black" : "gray";
            },
            vLineColor: function (i, node) {
              return i === 0 || i === node.table.widths.length
                ? "black"
                : "gray";
            },
          },
        },
        { text: "Terms and condition", style: "smallheader" },
        { text: this.eventNote },
        { text: "Event Description", style: "smallheader" },
        { text: this.eventDescription },
        {
          text: "I hereby agree to the following terms & conditions governing the online official entry from process of participation in II ISSO National Games",
          style: "smallheader",
        },
        {
          ol: [
            "I declare that the information provided by me is genuine & authentic.",
            "I know that during verification of documents at the time of reporting, if any discrepancy is detected in original document including name, father’s name, date of birth, class, admission number, school name,eligibility and gender, then my school’s team / subjected players participation will be liable to be cancelled.",
            "I declare that I will not disclose or share the school ID and Password provided by ISSO for process of filling online official entry form of above said championship with anybody. I understand that I am solely responsible for safeguarding my password and avoid any misuse.",
            "I declare that, I shall be responsible for the safety & comfort of players of my team during their travel from their home to the venue of tournament and back to their home. The travel ticket expenses and the expenses during travel will be borne by our school . The food expense shall be completely borne by our school during the tournament including travel period. Our school shall bear the expenses of kit, dress, etc provided to the players.",
            "Our School shall provide medicalfacilities to our team’s players. Our unit will also provide medical & accidental insurance to our team’s each and every player & member.",
            "The school representative shall pay the players / team participation charges of 1000 per participant during the reporting and attendance . The DD shall be raised in the name of “ International Schools Sports Organisation “ payable at Pune.",
          ],
        },
        {
          pageBreak: "after",
          text: "If the NEFT Transaction is done through school , representative shall provide the NEFT reference number.",
          style: "smallheader",
        },
      ];

      pdfMake.fonts = {
        DejaVuSerif: {
          normal: "DejaVuSerif.ttf",
          bold: "DejaVuSerif-Bold.ttf",
        },
      };

      var dd = {
        content,
        styles: {
          header: {
            fontSize: 14,
            bold: true,
            alignment: "center",
            margin: [0, 50, 0, 30],
          },
          subheader: {
            fontSize: 12,
            bold: true,
            margin: [0, 10, 0, 50],
          },
          smallheader: {
            bold: true,
            margin: [0, 10, 0, 5],
          },
          tableExample: {
            fontSize: 10,
            margin: [0, 20, 0, 20],
          },
          tableHeader: {
            bold: true,
            fontSize: 11,
            color: "black",
          },
          boldText: {
            bold: true,
          },
        },
        defaultStyle: {
          alignment: "justify",
          font: "DejaVuSerif",
        },
      };

      pdfMake.createPdf(dd).download(this.school_Name + ".pdf");
    }
  }
}
