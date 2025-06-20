import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { SelectItem } from "primeng/api";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/api";
import * as pdfMake from "pdfmake/build/pdfmake";
import { Observable } from "rxjs";
import { Observer } from "rxjs/Rx";

import { DatePipe } from "@angular/common";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { SgfiEntriesService } from "../service/sgfi-entries.service";
import { ReportMeritService } from "../service/report-merit.service";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-sgfi-entries",
  templateUrl: "./sgfi-entries.component.html",
  styleUrls: ["./sgfi-entries.component.css"],
})
export class SgfiEntriesComponent implements OnInit {
  isAddStudent: boolean;
  isViewStudent: boolean;
  yearOptions: SelectItem[];
  gameOptions: SelectItem[];
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  subgameOptions: SelectItem[];
  schoolOptions: SelectItem[];
  gameArray = [];
  getSchoolList = [];
  subGameIdArray = [];
  subGameNameArray = [];
  studentDataArray = [];
  sgfiStudentArray = [];
  saveSgfiStudentArray = [];
  gameServiceDATA: any;
  rootGameServicData: any;
  subGameServicData: any;
  rootGameData: any;
  subGameData: any;
  yearvalue: any;
  selectedGame: string;
  gameReadble: boolean;
  gameId: any;
  gameName: any;
  gameType: any;
  ageReadble: boolean;
  selectedAge: string;
  genderReadble: boolean;
  selectedGender: string;
  selectedSchool: string;
  genderVal: any;
  schoolReadble: boolean;
  selectedSubGame: string;
  subGameReadable: boolean;
  subgameArray = [];
  subGameId: any;
  subGameName: any;
  subGameType: any;
  schoolList: any;
  subGameVal: any;
  isShowStudent: boolean;
  studentData: any;
  schoolId: any;
  isDuplicate: boolean;
  error: any;
  alreadyAddedStudentList: any;
  studentRecordLength: number = 0;
  schoolName: any;
  selectedYear: string;
  enrolledStudentData: any;
  enrolledStudentRecordLength: number;
  alreadyExist: boolean;
  display: boolean;
  docArray: any;
  baseUrl: string;
  dialogTitle: any;
  isShowPayment: boolean;
  sgfiPaymentData: any;
  sgfiPaymentDataLength: any;
  gameconsolitedArray: any[];
  isPaymentData: boolean;

  constructor(
    private confirmation: ConfirmationService,
    private issoUtilService: IssoUtilService,
    private sgfiEntriesService: SgfiEntriesService,
    private messageService: MessageService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private meritService: ReportMeritService
  ) {}

  ngOnInit() {
    this.isAddStudent = true;
    this.loadInitialData();
    this.loadGame();
    console.log(environment.baseUrl);
    this.baseUrl = environment.baseUrl;
    const routeData = this.route.snapshot.data;

    this.isAddStudent = routeData["isAddStudent"];
    this.isViewStudent = routeData["isViewStudent"];
    this.isShowPayment = routeData["isShowPayment"];
    this.makeEmptyForm();
  }

  loadInitialData() {
    this.yearOptions = this.issoUtilService.setYear();
    this.ageOptions = this.issoUtilService.setAge();
    this.genderOptions = this.issoUtilService.setGender();
  }
  loadGame() {
    this.sgfiEntriesService.getRootGameList().subscribe(
      (response) => {
        if (response !== "") {
          this.rootGameServicData = response;
          this.rootGameData = this.rootGameServicData;
          this.gameOptions = [];
          this.gameOptions.push({
            label: "Please select",
            value: "",
          });
          this.rootGameData.forEach((element) => {
            const gameIdAndName =
              element.gameId + "," + element.gameName + "," + element.gameType;
            this.gameOptions.push({
              label: element.gameName,
              value: gameIdAndName,
            });
          });
        } else {
          alert("im blankl=");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  loadGameChange(gameData) {
    this.enrolledStudentRecordLength = 0;
    const gameval = gameData.value;
    this.gameArray = gameval.split(",");
    this.gameId = this.gameArray[0];
    this.gameName = this.gameArray[1];
    this.gameType = this.gameArray[2];
    if (this.isShowPayment) {
      this.getPaymentSheetData();
    } else {
      this.selectedAge = "";
      this.selectedGender = "";
      this.selectedSubGame = "";
      this.selectedSchool = "";
      this.subGameReadable = false;
      this.ageReadble = false;
      this.genderReadble = false;
      this.schoolReadble = false;
      this.alreadyAddedStudentList = [];
      this.studentData = [];
      this.studentRecordLength = 0;
      if (gameData.value != "") {
        // if(this.gameType == 'Both') {
        //   this.ageReadble = false;
        //   this.loadSubGameData();
        // } else {
        this.ageReadble = true;
        this.selectedSubGame = "";
        this.subGameReadable = false;
        // }
      } else {
        this.selectedAge = "";
        this.selectedSchool = "";
        this.selectedGender = "";
        this.selectedSubGame = "";
        this.ageReadble = false;
        this.genderReadble = false;
        this.subGameReadable = false;
        this.schoolReadble = false;
      }
    }
  }
  changeEventStatus(studentId, staus) {
    const formData = new FormData();
    if (staus == "1") {
      formData.append("issoadminstatus", "0");
    } else {
      formData.append("issoadminstatus", "1");
    }
    this.sgfiEntriesService.changeIssoStatus(studentId, formData).subscribe(
      (res) => {
        if (res.status === "success") {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Data Updated Successfully",
          });
        } else {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Data Updated Successfully",
          });
        }
        this.display = false;
        this.showEnroolledStudent();
        //this.getEventData();
      },
      (error) => (this.error = error)
    );
  }
  exportAsGameXLSX() {
    this.meritService.exportAsExcelFile(
      this.sgfiPaymentData,
      "sgfi-payment-sheet"
    );
  }
  getPaymentSheetData() {
    this.sgfiEntriesService
      .getPaymentSheetData(this.yearvalue, this.gameId)
      .subscribe(
        (response) => {
          if (response !== "") {
            this.sgfiPaymentData = response;
            this.sgfiPaymentDataLength = this.sgfiPaymentData.length;
            this.gameconsolitedArray = [];
            if (this.sgfiPaymentData.length > 1) {
              this.isPaymentData = true;
            } else {
              this.isPaymentData = false;
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "Data not found",
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
  showDialog(student) {
    console.log(student);
    this.display = true;
    this.docArray = [];
    this.dialogTitle = "";
    this.dialogTitle = student.studentName + " DOCUMENTS";
    this.docArray.push({
      birthCert:
        student.birthCertificate == null
          ? "N/A"
          : this.baseUrl + "upload/sgfi/" + student.birthCertificate,
      bonafide:
        student.studentBonafide == null
          ? "N/A"
          : this.baseUrl + "upload/sgfi/" + student.studentBonafide,
      govID:
        student.studentGovDoc == null
          ? "N/A"
          : this.baseUrl + "upload/sgfi/" + student.studentGovDoc,
      lastYearMarkSheet:
        student.lastYearmarkSheet == null
          ? "N/A"
          : this.baseUrl + "upload/sgfi/" + student.lastYearmarkSheet,
      Photo:
        student.studentPhoto == null
          ? "N/A"
          : this.baseUrl + "upload/sgfi/" + student.studentPhoto,
      stdSign:
        student.studentSign == null
          ? "N/A"
          : this.baseUrl + "upload/sgfi/" + student.studentSign,
      headMastSign:
        student.headMasterSign == null
          ? "N/A"
          : this.baseUrl + "upload/sgfi/" + student.headMasterSign,
    });
    console.log(this.docArray);
  }
  loadSubGameData() {
    this.sgfiEntriesService.getSubGameList(this.gameId).subscribe(
      (response) => {
        if (response !== "") {
          this.subGameServicData = response;
          this.subGameData = this.subGameServicData;
          this.subgameOptions = [];
          this.subGameData.forEach((element) => {
            const gameIdAndName =
              element.id + "," + element.subGameName + "," + element.gameType;
            this.subgameOptions.push({
              label: element.subGameName,
              value: gameIdAndName,
            });
          });
          this.subGameReadable = true;
        } else {
          alert("im blankl=");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  onViewStudentYearChange(event) {
    this.yearvalue = event.value;
  }
  onyeareChange(event) {
    this.yearvalue = event.value;
    this.selectedGame = "";
    this.selectedAge = "";
    this.selectedSchool = "";
    this.selectedGender = "";
    this.selectedSubGame = "";
    this.ageReadble = false;
    this.genderReadble = false;
    this.subGameReadable = false;
    this.gameReadble = false;
    this.schoolReadble = false;
    this.schoolReadble = false;
    this.alreadyAddedStudentList = [];
    this.studentRecordLength = 0;
    this.enrolledStudentRecordLength = 0;
    if (this.yearvalue) {
      this.gameReadble = true;
    }
  }
  loadAgeChange(ageData) {
    this.selectedGender = "";
    this.selectedSchool = "";
    this.selectedGender = "";
    this.genderReadble = false;
    this.genderReadble = false;
    this.schoolReadble = false;
    this.alreadyAddedStudentList = [];
    this.studentRecordLength = 0;
    this.enrolledStudentRecordLength = 0;
    if (ageData.value != "") {
      this.genderReadble = true;
    }
  }
  loadGenderChange(gender) {
    this.getSchoolList = [];
    if (this.subGameIdArray.length > 0) {
      this.subGameId = this.subGameIdArray.toString();
    } else {
      this.subGameId = "N";
    }
    this.genderVal = gender.value;
    this.subGameIdArray = [];
    this.subGameNameArray = [];
    if (this.genderVal !== "") {
      this.getSchoolList.push(
        this.yearvalue,
        this.gameId,
        this.selectedAge,
        this.genderVal,
        this.gameType
      );
      this.schoolReadble = true;
      if (this.isAddStudent) {
        if (this.subGameVal && this.gameType == "Both") {
          this.subGameVal.forEach((element) => {
            if (this.subGameIdArray.some((x) => x == element.split(",")[0])) {
            } else {
              this.subGameIdArray.push(Number(element.split(",")[0]));
              this.subGameNameArray.push(element.split(",")[1]);
              console.log(this.subGameNameArray);
            }
          });
        }
        this.getSchools();
      } else {
        this.showEnroolledStudent();
      }
    } else {
      this.schoolReadble = false;
      this.selectedSchool = "";
    }
  }
  showEnroolledStudent() {
    const formData = new FormData();
    formData.append("subGameId", JSON.stringify(this.subGameId));
    formData.append("getStudentData", JSON.stringify(this.getSchoolList));
    this.sgfiEntriesService
      .getEnrolledStudentData(formData)
      .subscribe((response) => {
        if (response !== "") {
          if (response.length > 0) {
            this.enrolledStudentData = response;
            console.log(this.enrolledStudentData);
            this.enrolledStudentRecordLength = Object.keys(
              this.enrolledStudentData
            ).length;
          } else {
            this.enrolledStudentRecordLength = 0;
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: "Data not found",
            });
          }
        }
      });
  }
  loadSubGameChange(subgame) {
    this.selectedAge = "";
    this.selectedGender = "";
    this.selectedSchool = "";
    this.genderReadble = false;
    this.ageReadble = false;
    this.schoolReadble = false;
    this.alreadyAddedStudentList = [];
    this.studentRecordLength = 0;
    this.subGameVal = subgame.value;
    if (this.subGameVal.length > 0) {
      this.ageReadble = true;
    } else {
      this.ageReadble = false;
    }
  }
  getSchools() {
    this.studentRecordLength = 0;

    // this.getAlreadyAddedData();
    const formData = new FormData();
    formData.append("getSchoolList", JSON.stringify(this.getSchoolList));
    formData.append("subGameId", JSON.stringify(this.subGameId));
    this.sgfiEntriesService.loadSchoolByGame(formData).subscribe(
      (response) => {
        if (response !== "") {
          if (response[0].length > 0) {
            this.schoolReadble = true;
            this.schoolList = response[0];
            this.schoolOptions = [];
            this.schoolOptions.push({
              label: "Please Select",
              value: "",
            });
            this.schoolList.forEach((element) => {
              const schoolIdAndName =
                element.schoolId + "," + element.schoolName;
              this.schoolOptions.push({
                label: element.schoolName,
                value: schoolIdAndName,
              });
            });
          } else {
            this.schoolList = [];
            this.schoolReadble = false;
            this.selectedSchool = "";
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: "School not found",
            });
          }
          if (response[1].length > 0) {
            this.alreadyAddedStudentList = response[1];
            this.studentRecordLength = Object.keys(
              this.alreadyAddedStudentList
            ).length;
          }
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  loadSchoolChange(schoolData) {
    console.log(schoolData);
    const schoolval = schoolData.value.split(",")[0];
    this.schoolId = schoolData.value.split(",")[0];
    this.schoolName = schoolData.value.split(",")[1];
    this.studentDataArray = [];
    this.studentDataArray.push(
      this.yearvalue,
      this.gameId,
      this.selectedAge,
      this.genderVal,
      schoolval
    );
    const formData = new FormData();
    formData.append("studentData", JSON.stringify(this.studentDataArray));
    formData.append("subGameId", JSON.stringify(this.subGameId));
    if (schoolval !== "") {
      this.sgfiEntriesService.loadStudentData(formData).subscribe(
        (response) => {
          if (response.length > 0) {
            this.studentData = response;
            this.isShowStudent = true;
            console.log(response);
          } else {
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: "Data not found",
            });
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
    }
  }
  deleteStudent(studentId) {
    this.sgfiEntriesService.deleteStudent(studentId).subscribe(
      (res) => {
        //  if (res.status !== 'error') {
        //    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        //  } else {
        this.messageService.add({
          key: "custom",
          severity: "success",
          summary: "Studnet Data Deleted Successfully",
        });
        this.getSchools();
        //  }
      },
      (error) => (this.error = error)
    );
  }
  addStudent(studentData) {
    console.log("alreadyAddedStudentList", this.alreadyAddedStudentList);
    let findElement = this.alreadyAddedStudentList.find(
      (el) => el.sId == studentData.sId
    );
    console.log("array find", findElement);
    if (findElement) {
      this.alreadyExist = true;
      this.messageService.add({
        key: "custom",
        severity: "error",
        summary: "This studnet already exist in database",
      });
      console.log("im yes");
    } else {
      this.alreadyExist = false;
    }
    this.isDuplicate = false;
    if (this.sgfiStudentArray.length !== 20) {
      if (this.sgfiStudentArray.length > 0) {
        for (let i = 0; i < this.sgfiStudentArray.length; i++) {
          if (this.sgfiStudentArray[i].studentId == studentData.sId) {
            this.isDuplicate = true;
            break;
          } else {
            this.isDuplicate = false;
          }
        }
      }

      if (this.isDuplicate) {
        this.messageService.add({
          key: "custom",
          severity: "error",
          summary: "This studnet already exist!",
        });
      } else if (!this.alreadyExist) {
        this.sgfiStudentArray.push({
          studentId: studentData.sId,
          studentName: studentData.studentName,
          gameId: this.gameId,
          agerange: this.selectedAge,
          genderId: this.genderVal,
          schoolId: this.schoolId,
          yearVal: this.yearvalue,
          gameName: this.gameName,
          subGameId: studentData.subgameId.replaceAll(",", " "),
          subGameName: studentData.subGameName,
          schoolName: this.schoolName,
        });
        console.log(this.sgfiStudentArray);
      }
    } else {
      this.messageService.add({
        key: "custom",
        severity: "error",
        summary: "Maximum 20 student only!",
      });
    }
  }
  removeStudnetData(i: number): void {
    this.sgfiStudentArray.splice(i, 1);
  }
  confirmAddStudent() {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-add-student",
      icon: "pi pi-info-circle",
      message: "Are you sure to add studnet data?",
      accept: () => {
        this.saveSgfiStudentData();
      },
    });
  }
  confirmDeleteStudent(studentId) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-delete-student",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete studnet data?",
      accept: () => {
        this.deleteStudent(studentId);
      },
    });
  }
  saveSgfiStudentData() {
    this.saveSgfiStudentArray = [];
    for (let i = 0; i < this.sgfiStudentArray.length; i++) {
      this.saveSgfiStudentArray.push(
        this.sgfiStudentArray[i].studentId,
        this.sgfiStudentArray[i].gameId,
        this.sgfiStudentArray[i].agerange,
        this.sgfiStudentArray[i].genderId,
        this.sgfiStudentArray[i].schoolId,
        this.sgfiStudentArray[i].yearVal,
        this.sgfiStudentArray[i].subGameId
      );
    }

    const formData = new FormData();
    formData.append(
      "sgfiStudentArray",
      JSON.stringify(this.saveSgfiStudentArray)
    );

    this.sgfiEntriesService.saveSgfiStudentData(formData).subscribe(
      (res) => {
        if (res.status === "error") {
          console.log("error occured");
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: "Validation failed",
          });
        } else {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Studnet Data Added Successfully",
          });
          this.makeEmptyForm();
        }
      },
      (error) => (this.error = error)
    );
    if (this.error) {
      this.messageService.add({
        key: "custom",
        severity: "error",
        summary: "Error occured",
      });
    }
  }
  makeEmptyForm() {
    this.saveSgfiStudentArray = [];
    this.sgfiStudentArray = [];
    this.selectedGame = "";
    this.selectedAge = "";
    this.selectedSchool = "";
    this.selectedGender = "";
    this.selectedSubGame = "";
    this.selectedYear = "";
    this.yearvalue = "";
    this.ageReadble = false;
    this.genderReadble = false;
    this.subGameReadable = false;
    this.gameReadble = false;
    this.schoolReadble = false;
    this.schoolReadble = false;
    this.isShowStudent = false;
    this.studentRecordLength = 0;
  }
}
