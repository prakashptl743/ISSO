import {
  Component,
  createPlatform,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { SelectItem } from "primeng/api";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { ReportMeritService } from "../../service/report-merit.service";
import { MessageService } from "primeng/api";
import { PaymentInvoiceService } from "../../service/payment-invoice.service";

@Component({
  selector: "app-download-invoice",
  templateUrl: "./download-invoice.component.html",
  styleUrls: ["./download-invoice.component.css"],
})
export class DownloadInvoice implements OnInit {
  @ViewChild("dropdown", { static: false }) dropdown!: ElementRef;

  yearOptions: SelectItem[];
  eventOptions: SelectItem[];
  gameOptions: SelectItem[];
  schoolOptions: SelectItem[];
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  studentAttendanceArray = [];
  studentAbsentArray = [];
  attendanceArray = [];

  gameIdList: any;
  gameNameList: any;
  myObjArray: any;

  eventValue: number;
  yearvalue: number;
  schoolvalue: number;
  eventData: any;
  schoolDataArray = [];
  eventReadable: boolean = false;
  gameReadble: boolean = false;
  schoolReadble: boolean = false;
  selectedEvent: string;
  schoolList: any;
  gameList: any;
  public gameID: number;
  public schoolID: any;
  certificateData: any;
  reportData: any;
  coachData: any;
  isCertificate: boolean = false;
  isDataAvailble: boolean = false;
  schooName: string;
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

  selectedCategories: any[] = ["Technology", "Sports"];

  categories: any[] = [
    { name: "Accounting", key: "A" },
    { name: "Marketing", key: "M" },
    { name: "Production", key: "P" },
    { name: "Research", key: "R" },
  ];

  checked: boolean = false;
  gameArray = [];
  reportValue: any;
  reportLabel: string;
  schoolType: any;
  schoolPayment: number;
  totalDues: any;
  totalPaidTillNow: number;
  isShowLoader: boolean;
  selectedIndex: any;

  constructor(
    private issoUtilService: IssoUtilService,
    private paymentInvoiceService: PaymentInvoiceService,
    private messageService: MessageService,
    private meritService: ReportMeritService
  ) {}

  ngOnInit() {
    this.isDataAvailble = false;
    this.yearOptions = this.issoUtilService.setYear();
    // this.selectedCategories = this.categories.slice(1,3);
    this.reportLabel = "attendance";
    this.totalTeamAmount = 0;
    this.totalDues = 0;
    this.schoolPayment = 0;
    this.totalPaidTillNow = 0;
  }
  onyeareChange(event) {
    this.totalTeamAmount = 0;
    this.schoolID = null;
    this.selectedEvent = "";
    this.schoolReadble = false;
    this.schoolOptions = [];
    this.studentAttendanceArray = [];
    this.studentAbsentArray = [];
    this.yearvalue = event.value;
    this.meritService.loadEventByYearForReport(this.yearvalue, 0).subscribe(
      (response) => {
        if (response !== "") {
          this.eventData = response;
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
              this.eventOptions.push({
                label: element.eventName,
                value: element.eventId,
              });
            });
          } else {
            this.isDataAvailble = false;
            this.eventReadable = false;
            this.gameReadble = false;
            this.schoolReadble = false;
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: "Event not found for this year",
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
  onEventChange(event) {
    const indexVal = this.eventOptions.findIndex(
      (option) => option.value === event.value
    );
    this.selectedIndex = indexVal + "01";
    this.totalTeamAmount = 0;
    this.selectedSchool = "";
    this.schoolID = null;
    this.studentAttendanceArray = [];
    this.studentAbsentArray = [];
    let yearVal = this.yearvalue.toString();
    let eventYear = yearVal.split("-");
    console.log("Hello" + eventYear[1]);
    this.selectedYearVal = eventYear[1];
    this.eventValue = event.value;
    console.log("this.eventValue------------>" + this.eventValue);
    this.gameOptions = [];
    this.selectedGame = "";
    this.paymentInvoiceService.getSchoolList(this.eventValue).subscribe(
      (response) => {
        if (response !== "") {
          this.schoolList = response;
          if (this.schoolList.length > 0) {
            this.schoolOptions = [];
            this.schoolReadble = true;
            this.isDataAvailble = false;
            this.schoolOptions.push({
              label: "Please Select",
              value: "",
            });
            this.schoolList.forEach((element) => {
              const SchoolIdAndName =
                element.schoolId + "," + element.schoolName;
              this.schoolOptions.push({
                label: element.schoolName,
                value: SchoolIdAndName,
              });
            });
          } else {
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: "School not found for this game",
            });
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

  loadschoolChange(schoolData) {
    this.isShowLoader = true;
    this.isDataAvailble = false;
    this.totalTeamAmount = 0;
    this.totalDues = 0;
    this.schoolPayment = 0;
    this.totalPaidTillNow = 0;
    this.studentAttendance = false;
    this.studentAttendanceArray = [];
    this.studentAbsentArray = [];
    this.attendanceArray = [];
    this.schoolID = schoolData.value;
    this.schoolDataArray = this.schoolID.split(",");
    this.schoolID = this.schoolDataArray[0];
    if (this.schoolID !== "") {
      this.paymentInvoiceService
        .downloadInvoicePdf(this.yearvalue, this.eventValue, this.schoolID)
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
                summary: "School not found for this game",
              });
            }
          },
          (error) => {
            //this.errorAlert =true;
          }
        );
    }
  }
}
