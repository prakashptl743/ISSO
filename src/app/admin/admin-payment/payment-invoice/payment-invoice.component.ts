import { Component, createPlatform, OnInit } from "@angular/core";
import { SelectItem } from "primeng/api";
import { IssoUtilService } from "src/app/services/isso-util.service";
//import { ReportMeritService } from '../service/report-merit.service';
import { MessageService } from "primeng/api";
import { PaymentInvoiceService } from "../../service/payment-invoice.service";
import { ReportMeritService } from "../../service/report-merit.service";
//import { PaymentInvoiceService } from '../service/payment-invoice.service';

@Component({
  selector: "app-payment-invoice",
  templateUrl: "./payment-invoice.component.html",
  styleUrls: ["./payment-invoice.component.css"],
})
export class PaymentInvoice implements OnInit {
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
    this.totalTeamAmount = 0;
    this.studentAttendanceArray = [];
    this.studentAbsentArray = [];
    let yearVal = this.yearvalue.toString();
    let eventYear = yearVal.split("-");
    console.log("Hello" + eventYear[1]);
    this.selectedYearVal = eventYear[1];

    if (eventYear[1] > "2020") {
      console.log("Immgretae");
      this.reportGreaterForNewYear(event);
    } else {
      console.log("im less");

      this.eventValue = event.value;
      this.gameOptions = [];
      this.selectedGame = "";
      this.meritService.loadGameByEvent(this.eventValue, false).subscribe(
        (response) => {
          if (response !== "") {
            this.gameList = response;
            console.log(this.gameList);
            this.schoolReadble = false;
            if (this.gameList.length > 0) {
              this.gameOptions = [];
              this.gameReadble = true;
              this.isDataAvailble = false;
              this.gameList.forEach((element) => {
                this.gameOptions.push({
                  label: element.gameName,
                  value: element.gameId,
                });
              });
            } else {
              this.isDataAvailble = false;
              this.gameReadble = false;
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
  }
  reportGreaterForNewYear(event) {
    this.eventValue = event.value;
    this.studentAttendanceArray = [];
    this.studentAbsentArray = [];
    this.consolateFileName = event.originalEvent.currentTarget.ariaLabel;

    this.gameOptions = [];
    this.selectedGame = "";
    this.meritService.loadGameForStaff(this.eventValue).subscribe(
      (response) => {
        if (response !== "") {
          this.gameList = response;
          this.schoolReadble = false;
          if (this.gameList.length > 0) {
            console.log(this.gameList);
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
              const gameIdAndName =
                element.gameId +
                "," +
                element.game_name +
                "," +
                element.gameType;
              this.gameOptions.push({
                label: element.game_name,
                value: gameIdAndName,
              });
            });
            console.log(
              "Im game options===>" + JSON.stringify(this.gameOptions)
            );
          } else {
            this.isDataAvailble = false;
            this.gameReadble = false;
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
  loadGameChange(gameData) {
    this.totalTeamAmount = 0;
    this.studentAttendanceArray = [];
    this.studentAbsentArray = [];
    this.gameID = gameData.value;
    this.selectedSchool = "";

    const gameDataValues = gameData.value;
    this.gameArray = gameDataValues.split(",");
    const gameId = this.gameArray[0];
    // this.eventName =  this.eventArray[1];

    this.meritService.checkGameType(this.gameID).subscribe(
      (response) => {
        this.gameType = response;
        console.log("game Type" + JSON.stringify(this.gameType));
      },

      (error) => {
        //this.errorAlert =true;
      }
    );

    this.meritService.loadSchoolByGameReport(this.eventValue, gameId).subscribe(
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
    console.log("Hello mapStudentPaymentData===>" + this.mapStudentPaymentData);
    // e.preventDefault()
  }
  loadschoolChange(schoolData) {
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
    this.schooName = this.schoolDataArray[1];
    if (this.schoolID !== "") {
      this.meritService
        .getStudentDataForPayment(
          this.eventValue,
          this.gameID,
          this.schoolDataArray[0]
        )
        .subscribe(
          (response) => {
            if (response !== "") {
              this.reportData = response;
              this.schoolType = response[0].isAffiliate;
              this.reportDataLength = this.reportData.length;
              if (this.schoolType == "Yes") {
                this.schoolPayment =
                  this.reportDataLength * (Number(response[0].price) * 1);
                this.totalDues = this.schoolPayment;
              } else {
                this.schoolPayment =
                  this.reportDataLength * (Number(response[0].price) * 2);
                this.totalDues = this.schoolPayment;
              }
              let isAffilated = 0;
              let notAffilated = 0;
              for (let i = 0; i < this.reportData.length; i++) {
                if (this.reportData[i].isPaid === "Yes") {
                  //j= i+1;
                  if (this.schoolType == "Yes") {
                    isAffilated = isAffilated + 1;
                    console.log("im paid-->" + isAffilated);
                    this.totalDues =
                      this.schoolPayment -
                      isAffilated * Number(response[0].price) * 1;
                  } else {
                    notAffilated = notAffilated + 1;
                    console.log("im paid else-->" + notAffilated);
                    this.totalDues =
                      this.schoolPayment -
                      notAffilated * Number(response[0].price) * 2;
                  }
                } else {
                  console.log("im absent");
                }
              }

              if (this.reportDataLength > 0) {
                this.isDataAvailble = true;
                //  this.showspinner = false;
              }
            } else {
              console.log("Data is blannk from service");
            }
            console.log("Im total dues--->" + this.totalDues);
            console.log("imtotal fee-->" + this.schoolPayment);
            this.totalPaidTillNow = this.schoolPayment - this.totalDues;
          },
          (error) => {
            //this.errorAlert =true;
          }
        );
    } else {
      this.isDataAvailble = false;
    }
  }

  onStudentChange(event: any, studentId, amount) {
    var numberValue = Number(amount);
    if (event.target.checked == true) {
      if (this.studentAttendanceArray.indexOf(studentId) === -1) {
        this.studentAttendanceArray.push(studentId);
      }
      if (this.schoolType == "Yes") {
        this.totalTeamAmount = this.totalTeamAmount + numberValue * 1;
        this.totalDues = this.totalDues - numberValue;
      } else {
        this.totalTeamAmount = this.totalTeamAmount + numberValue * 2;
        this.totalDues = this.totalDues - numberValue * 2;
      }
    } else {
      if (this.studentAttendanceArray.length > 0) {
        console.log("Im if");
        for (let i = 0; i < this.studentAttendanceArray.length; i++) {
          console.log("Im for");
          if (this.studentAttendanceArray[i] == studentId) {
            this.studentAttendanceArray.splice(i, 1);
          }
        }
        if (this.schoolType == "Yes") {
          this.totalTeamAmount = this.totalTeamAmount - numberValue * 1;
          this.totalDues = this.totalDues + numberValue;
        } else {
          this.totalTeamAmount = this.totalTeamAmount - numberValue * 2;
          this.totalDues = this.totalDues + numberValue * 2;
        }
        // this.totalTeamAmount = this.totalTeamAmount - numberValue;
      }
    }
    if (this.studentAttendanceArray.length > 0) {
      this.studentAttendance = true;
    } else {
      this.studentAttendance = false;
    }
  }
  onStudentAbsentChange(event: any, studentId, amount) {
    var numberValue = Number(amount);
    if (event) {
      if (this.studentAttendanceArray.indexOf(studentId) === -1) {
        this.studentAttendanceArray.push(studentId);
      }
      if (this.studentAbsentArray.length > 0) {
        for (let i = 0; i < this.studentAbsentArray.length; i++) {
          if (this.studentAbsentArray[i] == studentId) {
            this.studentAbsentArray.splice(i, 1);
          }
        }
      }
      if (this.schoolType == "Yes") {
        //this.totalTeamAmount = this.totalTeamAmount - (numberValue * 1);
        this.totalDues = this.totalDues - numberValue;
      } else {
        //  this.totalTeamAmount = this.totalTeamAmount - (numberValue * 2);
        this.totalDues = this.totalDues - numberValue * 2;
      }
    } else {
      if (this.studentAbsentArray.indexOf(studentId) === -1) {
        this.studentAbsentArray.push(studentId);
      }
      if (this.schoolType == "Yes") {
        //this.totalTeamAmount = this.totalTeamAmount + (numberValue * 1);
        this.totalDues = this.totalDues + numberValue;
      } else {
        //  this.totalTeamAmount = this.totalTeamAmount + (numberValue * 2);
        this.totalDues = this.totalDues + numberValue * 2;
      }
    }
    if (
      this.studentAttendanceArray.length > 0 ||
      this.studentAbsentArray.length > 0
    ) {
      this.studentAttendance = true;
    } else {
      this.studentAttendance = false;
    }
    console.log("student attendance Array====>" + this.studentAttendanceArray);
    console.log("studentAbsentArray====>" + this.studentAbsentArray);
  }
  onStudentAbsentChange_BK(event: any, studentId) {
    if (event) {
      if (this.studentAttendanceArray.indexOf(studentId) === -1) {
        this.studentAttendanceArray.push(studentId);
      }
      if (this.studentAbsentArray.length > 0) {
        for (let i = 0; i < this.studentAbsentArray.length; i++) {
          if (this.studentAbsentArray[i] == studentId) {
            this.studentAbsentArray.splice(i, 1);
          }
        }
      }
    } else {
      if (this.studentAbsentArray.indexOf(studentId) === -1) {
        this.studentAbsentArray.push(studentId);
      }
    }
    if (
      this.studentAttendanceArray.length > 0 ||
      this.studentAbsentArray.length > 0
    ) {
      this.studentAttendance = true;
    } else {
      this.studentAttendance = false;
    }
    console.log("student attendance Array====>" + this.studentAttendanceArray);
    console.log("studentAbsentArray====>" + this.studentAbsentArray);
  }
  savePayment() {
    const formData = new FormData();
    formData.append("studentData", JSON.stringify(this.studentAttendanceArray));
    formData.append(
      "studentAbsentData",
      JSON.stringify(this.studentAbsentArray)
    );

    this.paymentInvoiceService.saveStudentAttendance(formData).subscribe(
      (response) => {
        if (response.status === "error") {
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: "Validation failed",
          });
        } else {
          // this.totalPaidTillNow = this.totalPaidTillNow + this.totalTeamAmount;
          this.totalPaidTillNow = this.schoolPayment - this.totalDues;
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Payment Data updated successfully",
          });
          this.showUpdatedPaymeData();
          this.studentAttendanceArray = [];
          this.studentAbsentArray = [];
          this.totalTeamAmount = 0;
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  showUpdatedPaymeData() {
    console.log("im ues");
    this.meritService
      .getStudentData(this.eventValue, this.gameID, this.schoolDataArray[0])
      .subscribe(
        (response) => {
          if (response !== "") {
            this.reportData = response;
            this.reportDataLength = this.reportData.length;
            //   this.selectedCategories = this.reportData.filter(item => item !== this.reportData.isPresent);

            for (let i = 0; i < this.reportData.length; i++) {
              if (this.reportData[i].isPresent === "1") {
                console.log("Im present");
              } else {
                console.log("im absent");
              }
            }

            if (this.reportDataLength > 0) {
              this.isDataAvailble = true;
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
