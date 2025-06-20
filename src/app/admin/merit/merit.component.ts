import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import { SelectItem } from "primeng/api";
import { ReportMeritService } from "../service/report-merit.service";
import { IssoUtilService } from "../../services/isso-util.service";
import { MessageService } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/api";
import * as pdfMake from "pdfmake/build/pdfmake";
import { Observable } from "rxjs";
import { Observer } from "rxjs/Rx";
// import * as jspdf from 'jspdf';
// import * as html2canvas from 'html2canvas';
import * as pdfFonts from "./vfs_fonts";
import { DatePipe } from "@angular/common";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-merit",
  templateUrl: "./merit.component.html",
  styleUrls: ["./merit.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class MeritComponent implements OnInit {
  disabledButtons = [0, 1, 2];
  buttons = [
    {
      actionName: "action1",
      title: "button1",
    },
    {
      actionName: "action2",
      title: "button2",
    },
    {
      actionName: "action3",
      title: "button3",
    },
  ];
  yearOptions: SelectItem[];
  eventOptions: SelectItem[];
  gameOptions: SelectItem[];
  schoolOptions: SelectItem[];
  studentOptions: SelectItem[];
  subgameOptions: SelectItem[];
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  rankOptions: SelectItem[];
  gameArray = [];
  schoolArray = [];
  studentArray = [];
  addMeritArray = [];
  teamMeritArray = [];
  checkAlreadyAddedteamMeritArray = [];
  checkAlreadyAddedteamSubGameMeritArray = [];
  checkAlreadyAddedIndividualMeritArray = [];
  saveTeamMeritArray = [];
  printIndividualMeritArray = [];
  individualMeritArray = [];
  teamSubGameArray = [];
  saveIndividualMeritArray = [];
  saveTeamSubGameMeritArray = [];
  eventArray = [];
  subgameArray = [];
  addMeritDataArray = [];
  ageMeritArray = [];
  eventValue: number;
  yearvalue: number;
  schoolvalue: number;
  rankValue: number;
  eventData: any;
  ageRange;
  eventReadable: boolean = false;
  isDataAvailble: boolean = false;
  gameReadble: boolean = false;
  schoolReadble: boolean = false;
  ageReadble: boolean = false;
  genderReadble: boolean = false;
  rankReadble: boolean = false;
  isShowStudent: boolean = false;
  selectedAge: string;
  selectedGame: string;
  selectedGender: string;
  schoolList: any;
  studentList: any;
  alredayAddedMeritData: any;
  gameList: any;
  subGameList: any;
  gameId: number;
  seleedgameData: any;
  gameName: any;
  gameType: any;
  eventName: any;
  schoolId: any;
  schoolName: any;
  meritList: any;
  isMeritDataShow: boolean;
  selectedYear: string;
  selectedSchool: string;

  selectedSubGame: string;
  genderVal: string;
  isShowSubGame: boolean;
  showspinner: boolean;
  subGameId: any;
  subGameType: any;
  subGameName: any;
  selectedRank: string;
  selectedStudent: string;
  selectedEvent: string;
  studentId: any;
  studentName: any;
  showStudentList: boolean;
  error: any;
  items2: MenuItem[];
  isAddMerit: boolean;
  display: boolean = false;
  isPrintMerit: boolean = false;
  certificateData: any;
  base64Image: any;
  printmeritData: boolean;
  individualMeritData: boolean;
  selectedYearVal: string;

  gameIdList: any;
  gameNameList: any;
  gameTypeList: any;
  myObjArray: any;
  teamSubGame: boolean;
  isDuplicate: boolean = false;
  setPhotoYear: string;
  schoolIdForPrintMerit: any;
  isConsolited: boolean;
  meritFlagForGame: boolean;
  showAlreadyMeritData: any;
  showAlredatMeritResponse: any;
  showMerit: boolean;
  individualAlreadyAddedMerit: boolean;
  alredayExistRecored: boolean = false;
  isAlreadyAddedMerit: boolean = false;
  timeAndDistance: boolean;
  timeAndDistanceValue: string;
  isTimeDistance: any;
  indexVal: any;
  baseUrl: string;

  constructor(
    private confirmation: ConfirmationService,
    private issoUtilService: IssoUtilService,
    private messageService: MessageService,
    public datepipe: DatePipe,
    private route: ActivatedRoute,
    private meritService: ReportMeritService
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.loadInitialData();
    this.items2 = [{ label: "Add Merit" }, { label: "Print Merit" }];
    this.setPhotoPath();
    this.baseUrl = environment.baseUrl;
    const routeData = this.route.snapshot.data;
    this.isAddMerit = routeData["isAddMerit"];
    this.isPrintMerit = routeData["isPrintMerit"];
    this.isConsolited = routeData["isConsolited"];
    console.log("Route Data:", routeData);
    this.makeEmptyForm();
  }
  setPhotoPath() {
    this.setPhotoYear = this.issoUtilService.setPhotoYear();
  }
  // onloadMenu(index) {
  //   console.log("Im index" + index);
  //   this.makeEmptyForm();
  //   if (index == "0") {
  //     this.isAddMerit = true;
  //     this.isPrintMerit = false;
  //     this.isConsolited = false;
  //   } else if (index == "1") {
  //     this.isPrintMerit = true;
  //     this.isAddMerit = false;
  //     this.isConsolited = false;
  //     this.showMerit = false;
  //   } else {
  //     this.gameId = undefined;
  //     this.isConsolited = true;
  //     this.isPrintMerit = false;
  //     this.isAddMerit = false;
  //     this.showMerit = false;
  //   }
  //   console.log("this.isAddMerit" + this.isAddMerit);
  //   console.log(" this.isPrintMerit" + this.isPrintMerit);
  // }
  getBase64ImageFromURL(url: string) {
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
  loadInitialData() {
    this.yearOptions = this.issoUtilService.setYear();
    this.ageOptions = this.issoUtilService.setAge();
    // this.genderOptions =this.issoUtilService.setGender();
    this.rankOptions = this.issoUtilService.setRank();
  }
  onyeareChange(event) {
    this.rankReadble = false;
    // this.showspinner = true;
    this.isShowStudent = false;
    this.printmeritData = false;
    this.genderReadble = false;
    this.selectedGender = "";
    this.selectedSubGame = "";
    this.isShowSubGame = false;
    this.subgameOptions = [];
    this.schoolOptions = [];
    this.isDataAvailble = false;
    this.showMerit = false;
    this.gameOptions = [];
    this.selectedRank = "";
    this.selectedAge = "";
    this.selectedStudent = "";
    this.ageReadble = false;
    this.yearvalue = event.value;
    if (this.isConsolited || this.isPrintMerit) {
      this.meritFlagForGame = true;
    } else {
      this.meritFlagForGame = false;
    }
    if (this.yearvalue) {
      this.meritService
        .loadEventByYear(this.yearvalue, this.meritFlagForGame)
        .subscribe(
          (response) => {
            if (response !== "") {
              this.eventData = response;
              this.gameReadble = false;
              this.schoolReadble = false;
              if (this.eventData.length > 0) {
                this.showspinner = false;
                this.eventOptions = [];
                this.eventReadable = true;
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
                this.showspinner = false;
                this.messageService.add({
                  key: "custom",
                  severity: "error",
                  summary: "Event not found",
                });
                this.eventReadable = false;
                this.gameReadble = false;
                this.schoolReadble = false;
                this.eventOptions = [];
                this.schoolOptions = [];
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
      this.eventReadable = false;
      this.schoolReadble = false;
      this.selectedEvent = "";
      this.gameReadble = false;
    }
  }
  onEventChange(event) {
    let yearVal = this.yearvalue.toString();
    let eventYear = yearVal.split("-");
    this.selectedYearVal = eventYear[1];
    this.ageReadble = true;
    this.genderReadble = true;
    this.genderReadble = false;
    this.ageReadble = false;
    this.isDataAvailble = false;
    this.isShowStudent = false;
    this.printmeritData = false;
    this.selectedGender = "";
    this.selectedAge = "";
    this.selectedGame = "";
    this.selectedRank = "";
    this.schoolOptions = [];
    this.subgameArray = [];
    this.selectedSubGame = "";
    this.selectedStudent = "";
    this.subgameOptions = [];
    this.isShowSubGame = false;
    const eventval = event.value;
    this.eventArray = eventval.split(",");
    this.eventValue = this.eventArray[0];
    this.eventName = this.eventArray[1];
    this.rankReadble = false;
    this.showMerit = false;
    if (this.isConsolited || this.isPrintMerit) {
      this.meritFlagForGame = true;
    } else {
      this.meritFlagForGame = false;
    }
    // if (eventYear[1] > '2020')   {
    //   console.log('Immgretae')
    //   this.reportGreaterForNewYear(event)
    // } else {
    //   console.log('im less')

    // this.setAgeMap(this.eventValue);
    if (this.eventValue) {
      this.meritService
        .loadGameByEvent(this.eventValue, this.meritFlagForGame)
        .subscribe(
          (response) => {
            if (response !== "") {
              this.gameList = response;
              this.schoolReadble = false;
              if (this.gameList.length > 0) {
                this.gameOptions = [];
                this.gameReadble = true;
                this.gameOptions.push({
                  label: "Please Select",
                  value: "",
                });
                this.gameList.forEach((element) => {
                  const gameIdAndName =
                    element.gameId +
                    "," +
                    element.gameName +
                    "," +
                    element.gameType;
                  this.gameOptions.push({
                    label: element.gameName,
                    value: gameIdAndName,
                  });
                });
                console.log(this.gameList);
              } else {
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
    } else {
      this.gameReadble = false;
      this.schoolReadble = false;
      this.timeAndDistance = false;
    }
    // }
  }
  setAgeMap() {
    this.meritService.setAgeMapForMerit(this.eventValue, this.gameId).subscribe(
      (response) => {
        let ageList;

        if (
          response[0].ageRange !== "null" &&
          response[0].girlsAgeRange == "null"
        ) {
          this.genderOptions = this.issoUtilService.setMapGender("boy");
        }
        if (
          response[0].ageRange == "null" &&
          response[0].girlsAgeRange !== "null"
        ) {
          this.genderOptions = this.issoUtilService.setMapGender("girl");
        }
        if (
          response[0].ageRange !== "null" &&
          response[0].girlsAgeRange !== "null"
        ) {
          this.genderOptions = this.issoUtilService.setMapGender("both");
        }

        if (
          response[0].ageRange !== "null" ||
          response[0].girlsAgeRange !== "null"
        ) {
          if (response[0].ageRange == "null") {
            ageList = response[0].girlsAgeRange;
          } else if (response[0].girlsAgeRange !== "null") {
            ageList = response[0].ageRange;
          } else {
            ageList = response[0].ageRange + " " + response[0].girlsAgeRange;
          }
          //  const ageList = response[0].ageRange + " " + response[0].girlsAgeRange;
          this.ageMeritArray = ageList.split(" ");
          const x = Array.from(new Set(ageList.split(" "))).toString();

          var myarray = x.split(",");
          let ageArrayLength = myarray.length;

          this.ageOptions = [];
          this.ageOptions.push({
            label: "Please Select",
            value: "",
          });

          for (var i = 0; i < ageArrayLength; i++) {
            if (myarray[i] !== "" && myarray[i] !== "null") {
              this.ageOptions.push({
                label: myarray[i],
                value: myarray[i],
              });
            }
          }
        } else {
          console.log("im else");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  reportGreaterForNewYear(event) {
    const eventval = event.value;
    this.eventArray = eventval.split(",");
    this.eventValue = this.eventArray[0];
    this.eventName = this.eventArray[1];

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
            this.gameTypeList = this.gameList[0].gameType.split(",");
            console.log("im game name" + this.gameNameList);
            this.myObjArray = [];

            for (let i = 0; i < this.gameIdList.length; i++) {
              this.myObjArray.push({
                gameId: Number(this.gameIdList[i]),
                game_name: this.gameNameList[i],
                gameType: this.gameTypeList[i],
              });
            }

            this.gameOptions = [];
            this.gameReadble = true;
            this.isDataAvailble = false;
            this.gameOptions.push({
              label: "Please Select",
              value: "",
            });
            // this.myObjArray.forEach(element => {
            //   const gameIdAndName = element.gameId +','+ element.game_name +','+ element.gameType;
            //   this.gameOptions.push({
            //     label: element.game_name,
            //     value: gameIdAndName
            //   });
            // })

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
            console.log("im game name11333" + JSON.stringify(this.gameOptions));
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

  loadAgeChange(ageData) {
    if (ageData.value != "") {
      this.selectedGender = "";
      this.selectedSchool = "";
      this.selectedRank = "";
      this.rankReadble = false;
      this.isDataAvailble = false;
      this.genderReadble = true;
      this.schoolOptions = [];
      this.schoolReadble = false;
      this.isShowStudent = false;
      this.printmeritData = false;
      this.showMerit = false;
      this.selectedSubGame = "";
      this.selectedStudent = "";
      this.isShowSubGame = false;
    } else {
      this.genderReadble = false;
      this.schoolReadble = false;
      this.selectedSchool = "";
      this.isShowSubGame = false;
      this.selectedSubGame = "";
      this.selectedGender = "";
      this.isDataAvailble = false;
      this.timeAndDistance = false;
      this.selectedStudent = "";
      this.isShowStudent = false;
      this.rankReadble = false;
      this.selectedRank = "";
      this.individualMeritData = false;
    }
  }
  loadGameChange(gameData) {
    this.isDataAvailble = false;
    this.isShowSubGame = false;
    this.genderReadble = false;
    this.schoolReadble = false;
    this.isShowStudent = false;
    this.printmeritData = false;
    this.showMerit = false;
    this.ageReadble = true;
    this.selectedGender = "";
    this.selectedAge = "";
    this.selectedSubGame = "";
    this.selectedRank = "";
    this.selectedStudent = "";
    this.schoolOptions = [];
    this.rankReadble = false;
    const gameval = gameData.value;
    this.gameArray = gameval.split(",");
    this.gameId = this.gameArray[0];
    this.gameName = this.gameArray[1];
    this.gameType = this.gameArray[2];
    console.log("Game Type" + this.gameType);
    if (gameData.value != "") {
      if (this.gameType == "Individual") {
        this.individualAlreadyAddedMerit = true;
      } else {
        this.individualAlreadyAddedMerit = false;
      }
      this.setAgeMap();
    } else {
      this.ageReadble = false;
      this.timeAndDistance = false;
    }
  }
  loadSubGameChange(subgame) {
    // this.selectedAge ='';
    // this.selectedGender='';
    this.selectedRank = "";
    //  this.genderReadble = false;
    this.addMeritDataArray = [];
    this.ageReadble = true;
    this.rankReadble = false;
    this.showMerit = false;
    this.isShowStudent = false;
    this.schoolReadble = true;
    this.printmeritData = false;
    this.selectedSchool = "";
    this.selectedStudent = "";
    this.indexVal = 5;
    // this.schoolOptions = [];
    const eventval = subgame.value;
    this.subgameArray = eventval.split(",");
    this.subGameId = this.subgameArray[0];
    console.log("DAAJBKKKKKKKKKKKKKKKKKKKK==>" + this.subGameId);
    this.subGameName = this.subgameArray[1];
    this.subGameType = this.subgameArray[2];
    if (this.subGameType == "Individual") {
      this.individualAlreadyAddedMerit = true;
    } else {
      this.individualAlreadyAddedMerit = false;
    }
    if (this.subGameId != "" && this.subGameId != "N") {
      console.log("Im subgame" + this.subGameId);
      this.addMeritDataArray.push(
        this.eventValue,
        this.gameId,
        this.subGameId,
        this.subGameType,
        this.selectedAge,
        this.genderVal
      );
      this.setSchoolData();
      if (this.isAddMerit) {
        this.checkAlreadyMeritData();
      }
    } else {
      this.selectedSchool = "";
      this.schoolReadble = false;
      this.timeAndDistance = false;
      this.isDataAvailble = false;
    }
  }
  loadGenderChange(gender) {
    this.addMeritDataArray = [];
    this.genderVal = gender.value;
    this.selectedSchool = "";
    this.selectedRank = "";
    this.isDataAvailble = false;
    this.rankReadble = false;
    this.isShowStudent = false;
    this.printmeritData = false;
    this.studentId = undefined;
    this.selectedSubGame = "";
    this.schoolReadble = false;
    this.showMerit = false;
    this.selectedStudent = "";
    if (this.genderVal !== "") {
      if (this.gameType == "Both") {
        // this.ageReadble =false;

        this.meritService
          .loadSubgameByGame(
            this.gameId,
            this.selectedAge,
            this.genderVal,
            this.isPrintMerit
          )
          .subscribe(
            (response) => {
              if (response !== "") {
                this.subGameList = response;
                if (this.subGameList.length > 0) {
                  this.isShowSubGame = true;
                  this.subgameOptions = [];
                  this.subgameOptions.push({
                    label: "Please Select",
                    value: "",
                  });
                  this.subGameList.forEach((element) => {
                    const subgameIdAndName =
                      element.id +
                      "," +
                      element.subGameName +
                      "," +
                      element.gameType;
                    this.subgameOptions.push({
                      label: element.subGameName,
                      value: subgameIdAndName,
                    });
                  });
                } else {
                  this.messageService.add({
                    key: "custom",
                    severity: "error",
                    summary: "Sub Game Not Found",
                  });
                  console.log("Im blank");
                  // this.ageReadble =true;
                  this.subGameId = "";
                  this.isShowSubGame = false;
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
      } else {
        // this.ageReadble =true;
        this.subgameArray = [];
        this.addMeritDataArray = [];
        this.isShowSubGame = false;
        this.subgameOptions = [];
        this.subGameId = "";
        this.subGameType = "";
        this.subGameName = "";
        this.subGameId = "N";
        console.log("Im not subgame");
        this.studentName = "";
        this.studentId = "";
        this.studentOptions = [];
        this.addMeritDataArray.push(
          this.eventValue,
          this.gameId,
          this.selectedAge,
          this.genderVal,
          this.gameType
        );
        this.setSchoolData();
        if (this.isAddMerit) {
          this.checkAlreadyMeritData();
        }
      }
    } else {
      this.selectedSubGame = "";
      this.isShowSubGame = false;
      this.timeAndDistance = false;
    }
  }
  setSchoolData() {
    const formData = new FormData();
    formData.append("meritDescription", JSON.stringify(this.addMeritDataArray));
    formData.append("meritFlag", JSON.stringify(this.isPrintMerit));
    this.meritService.loadSchoolByGame(formData).subscribe(
      (response) => {
        if (response !== "") {
          if (response.length > 0) {
            this.schoolIdForPrintMerit = response[0].schoolId;
            if (this.isAddMerit) {
              this.schoolReadble = true;
              this.schoolList = response;
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
              this.schoolList = response;
              console.log(this.schoolList);
              console.log("game Type" + this.schoolList[0].gameType);
              if (this.schoolList[0].gameType == "Individual") {
                console.log("im Individual" + this.schoolList[0].gameType);
                //   this.schoolList = response;
                this.individualMeritData = true;
                this.printmeritData = false;
              } else if (this.schoolList[0].gameType == "Both") {
                console.log("Im both");
                if (
                  this.schoolList[0].subgameType == "Individual" ||
                  this.schoolList[0] == "Individual"
                ) {
                  console.log("Im Individual");
                  console.log("im Individual" + this.schoolList[0].gameType);
                  //   this.schoolList = response;
                  this.individualMeritData = true;
                  this.printmeritData = false;
                }
                if (this.schoolList[0].subgameType == "Team") {
                  console.log("Im Team");

                  this.printmeritData = true;
                  this.individualMeritData = false;
                }
                if (
                  this.schoolList[0].subgameId == "" &&
                  this.schoolList[0].subgameId == ""
                ) {
                  console.log("Im both game alll balank");

                  this.printmeritData = true;
                  this.individualMeritData = false;
                }
              } else {
                this.printmeritData = true;
                this.individualMeritData = false;
              }
            }
          } else {
            this.schoolReadble = false;
            this.individualMeritData = false;
            this.printmeritData = false;
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
  checkAlreadyMeritData() {
    this.meritService
      .showAlreadyMeritData(
        this.eventValue,
        this.gameId,
        this.selectedAge,
        this.genderVal,
        this.subGameId
      )
      .subscribe(
        (res) => {
          console.log(res);
          if (res !== "") {
            this.showAlreadyMeritData = res;
            if (this.showAlreadyMeritData.length > 0) {
              this.showMerit = true;
              console.log("JJsdf");
              // this.showAlredatMeritResponse =
            } else {
              this.showMerit = false;
            }
          }
          // if (res.status === 'error') {
          //   console.log('error occured');
          //   this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
          // } else {
          //   this.messageService.add({key: 'custom', severity:'success', summary: 'Merit Data Added Successfully'});
          //   this.makeEmptyForm();
          // }
        },
        (error) => (this.error = error)
      );
  }

  deleteMerit(merit_id) {
    console.log(merit_id);
    this.confirmation.confirm({
      key: "confirm-add-merit",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete merit data?",
      accept: () => {
        this.deleteAddedMeritData(merit_id);
      },
    });
  }
  deleteTeamQr(eventId, schoolId, gameId, subgameId) {
    let subGameVal;
    if (subgameId == "") {
      console.log("hello Im blank submage");
      subGameVal = "N";
    } else {
      subGameVal = subgameId;
      console.log("hello Im not blank submage");
    }

    this.meritService
      .deleteTeamQr(eventId, schoolId, gameId, subGameVal)
      .subscribe(
        (res) => {
          // this.messageService.add({key: 'custom', severity:'success', summary: 'Merit Data Deleted Successfully'});
          //this.checkAlreadyMeritData();
        },
        (error) => (this.error = error)
      );
  }
  deleteIndividualQr(studentId) {
    this.meritService.deleteIndividualQr(studentId).subscribe(
      (res) => {
        // this.messageService.add({key: 'custom', severity:'success', summary: 'Merit Data Deleted Successfully'});
        //this.checkAlreadyMeritData();
      },
      (error) => (this.error = error)
    );
  }

  deleteAddedMeritData(merit_id: any) {
    this.meritService.deleteAddedMeritData(merit_id).subscribe(
      (res) => {
        this.messageService.add({
          key: "custom",
          severity: "success",
          summary: "Merit Data Deleted Successfully",
        });
        this.checkAlreadyMeritData();
      },
      (error) => (this.error = error)
    );
  }
  printIndividualCertificate(studentData: any) {
    console.log("data" + studentData);
    console.log("data" + studentData.schoolName);

    this.printIndividualMeritArray.push(
      studentData.schoolId,
      studentData.eventId,
      studentData.gameId,
      studentData.id,
      studentData.ageRange,
      studentData.gender,
      studentData.sId
    );
    const formData = new FormData();
    formData.append(
      "meritData",
      JSON.stringify(this.printIndividualMeritArray)
    );
    this.meritService
      .loadIndividualCertificate(formData)
      .subscribe((response) => {
        if (response !== "") {
          this.certificateData = response;
          this.downloadCertificatePdf(
            studentData.studentName,
            studentData.rank
          );
          this.printIndividualMeritArray = [];
        }
      });
  }
  printCertificate(schoolId: any, schoolName: any, rank: any) {
    this.meritService
      .loadCertificateData(
        this.selectedYearVal,
        1,
        this.eventValue,
        this.gameId,
        schoolId
      )
      .subscribe(
        (response) => {
          if (response !== "") {
            this.certificateData = response;
            console.log(JSON.stringify(this.certificateData));
            this.downloadCertificatePdf(schoolName, rank);
            //   if (this.reportValue == 0) {
            //     this.reportData = response;
            //     this.reportDataLength = this.reportData.length;
            //     this.school_Name=this.schooName;
            //     this.evetName = this.reportData[0].eventName;
            //     this.event_name= this.evetName
            //   } else if(this.reportValue == 1) {
            //     this.certificateData = response;
            //     this.reportDataLength = this.certificateData.length;
            //   }
            //  // this.showspinner = true;
            //   if(this.reportDataLength > 0) {
            //     this.isDataAvailble = true;
            //   //  this.showspinner = false;
            //   }
          } else {
            console.log("Data is blannk from service");
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }

  downloadCertificatePdf(schoolName, rank) {
    let content = [];
    let str: any;
    let str1: any;
    let str2: any;
    let str3: any;
    // let str4 : any;
    let str5: any;
    let str6: any;
    let winnerRank;
    if (rank == "1") {
      winnerRank = "FIRST";
    } else if (rank == "2") {
      winnerRank = "SECOND";
    } else {
      winnerRank = "THIRD";
    }
    let genderval;
    for (let i = 0; i < this.certificateData.length; i++) {
      if (this.certificateData[i].gender == "1") {
        genderval = " Boys";
      } else {
        genderval = " Girls";
      }
      let imageUrl = this.setPhotoYear + "/" + this.certificateData[i].photo;
      this.getBase64ImageFromURL(imageUrl).subscribe((base64data) => {
        this.base64Image = "data:image/jpg;base64," + base64data;
      });

      str = { text: "II ISSO Nationals Games - 2019", style: "header" };
      str1 = { text: "PHASE 2", style: "smallheader" };
      str6 = {
        style: "tableLocation",
        table: {
          widths: ["*"],
          body: [
            [
              "VENUE : " +
                this.certificateData[i].location +
                "\n" +
                this.datepipe.transform(
                  this.certificateData[i].startDate,
                  "d MMM, y"
                ) +
                " - " +
                this.datepipe.transform(
                  this.certificateData[i].endDate,
                  "d MMM, y"
                ),
            ],
          ],
        },
      };
      str2 = { text: "MERIT CERTIFICATE", style: "subheader" };
      str3 = {
        columns: [
          {
            style: "tableExample",
            table: {
              heights: 20,
              body: [
                ["AWARDED TO : ", this.certificateData[i].studentName],
                [
                  "FATHER’S/MOTHER’S NAME: ",
                  +this.certificateData[i].fatherName,
                ],
                [
                  "DATE OF BIRTH: ",
                  this.datepipe.transform(
                    this.certificateData[i].dateOfBirth,
                    "d MMM, y"
                  ),
                ],
                [
                  "CLASS: ",
                  this.certificateData[i].standardClass +
                    "                                                   " +
                    "ISSO/" +
                    this.certificateData[i].sId,
                ],
                ["SCHOOL NAME: ", this.certificateData[i].schoolName],
              ],
            },
            layout: "noBorders",
            alignment: "justify",
          },
          {
            image: this.base64Image,
            // width: 70
          },
        ],
      };
      // str4 = {
      //         alignment: 'justify',
      //         columns: [
      //           {
      //             width:160,
      //             text: 'SCHOOL NAME: '
      //           },
      //           {
      //             text: this.certificateData[i].schoolName,
      //             style: 'paddingLeft'
      //           }
      //         ]
      //       };
      if (
        this.certificateData[i].gameType == "Team" ||
        this.certificateData[i].gameType == "Individual"
      ) {
        console.log("Im team mertit");
        str5 = {
          alignment: "justify",
          margin: [0, 50, 0, 150],
          pageBreak: "after",
          text: [
            "HAS PARTICIPATED IN 2ND ISSO NATIONAL GAMES 2019-20 IN",
            { text: this.certificateData[i].gameName + " ", style: "boldText" },
            {
              text: "SUBGAME " + this.certificateData[i].subGameName,
              style: "boldText",
            },
            { text: " UNDER", style: "boldText" },
            {
              text: this.certificateData[i].ageRange + genderval,
              style: "boldText",
            },
            " HELD AT ",
            { text: this.certificateData[i].location, style: "boldText" },
            { text: " AND SECURED" + " " + winnerRank + " " + "POSITION" },
          ],
        };
      } else {
        str5 = {
          alignment: "justify",
          margin: [0, 50, 0, 150],
          pageBreak: "after",
          text: [
            "HAS PARTICIPATED IN 2ND ISSO NATIONAL GAMES 2019-20 IN",
            { text: this.certificateData[i].gameName, style: "boldText" },
            { text: " UNDER", style: "boldText" },
            {
              text: this.certificateData[i].ageRange + genderval,
              style: "boldText",
            },
            " HELD AT ",
            { text: this.certificateData[i].location, style: "boldText" },
            { text: " AND SECURED" + " " + winnerRank + " " + "POSITION" },
          ],
        };
      }
      content.push(str);
      content.push(str1);
      content.push(str6);
      content.push(str2);
      content.push(str3);
      // content.push(str4);
      content.push(str5);
    }

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
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 150, 0, 10],
        },
        subheader: {
          fontSize: 16,
          decoration: "underline",
          decorationStyle: "solid",
          decorationColor: "black",
          margin: [0, 10, 0, 50],
        },
        smallheader: {
          fontSize: 13,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          fontSize: 11,
          margin: [0, 0, 0, 0],
        },
        tableLocation: {
          margin: [0, 20, 0, 50],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
        boldText: {
          bold: true,
        },
        paddingLeft: {
          padding: [0, 0, 0, 20],
        },
      },
      defaultStyle: {
        alignment: "center",
        font: "DejaVuSerif",
      },
    };

    pdfMake.createPdf(dd).download(schoolName + ".pdf");
  }
  loadSchoolChange(schoolData) {
    this.studentOptions = [];
    this.selectedRank = "";
    this.isDataAvailble = false;
    this.printmeritData = false;
    const schoolval = schoolData.value;
    this.schoolArray = schoolval.split(",");
    this.schoolId = this.schoolArray[0];
    this.schoolName = this.schoolArray[1];
    if (this.schoolId !== "") {
      if (
        (this.subGameId != "" && this.subGameType == "Individual") ||
        this.gameType == "Individual"
      ) {
        this.addMeritDataArray = [];
        this.rankReadble = false;
        this.isDataAvailble = false;
        this.addMeritDataArray.push(
          this.eventValue,
          this.gameId,
          this.subGameId,
          this.subGameType,
          this.selectedAge,
          this.genderVal,
          this.schoolId
        );
        console.log("data==>" + this.addMeritDataArray);
        const formData = new FormData();
        formData.append("studentData", JSON.stringify(this.addMeritDataArray));

        this.meritService.loadStudentName(formData).subscribe(
          (response) => {
            if (response !== "") {
              this.studentList = response;

              if (this.studentList.length > 0) {
                this.isShowStudent = true;
                this.studentOptions = [];
                this.studentOptions.push({
                  label: "Please Select",
                  value: "",
                });
                this.studentList.forEach((element) => {
                  const studentIdAndName =
                    element.sId + "," + element.studentName;
                  this.studentOptions.push({
                    label: element.studentName,
                    value: studentIdAndName,
                  });
                });
              } else {
                this.isShowStudent = false;
                this.messageService.add({
                  key: "custom",
                  severity: "error",
                  summary: "Student not found",
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
      } else if (this.gameType == "Team") {
        this.checkNoMerti();
      } else if (this.subGameType == "Team") {
        this.checkNOsugameMerit();
      }
    } else {
      this.rankReadble = false;
      this.timeAndDistance = false;
      this.isShowStudent = false;
    }
  }
  checkNOsugameMerit() {
    this.meritService
      .checkNOsugameMerit(
        this.eventValue,
        this.gameId,
        this.subGameId,
        this.selectedAge,
        this.genderVal,
        this.schoolId
      )
      .subscribe(
        (response) => {
          console.log("test" + response);

          if (response !== "true") {
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: "No merit found for this school",
            });
            this.isShowStudent = false;
            this.selectedStudent = "";
            this.rankReadble = false;
          } else {
            this.isShowStudent = false;
            this.selectedStudent = "";
            this.rankReadble = true;
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }
  checkNoMerti() {
    this.meritService
      .loadStaffReport(
        this.yearvalue,
        0,
        this.eventValue,
        this.gameId,
        this.schoolId
      )
      .subscribe(
        (response) => {
          if (response == "") {
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: "No merit found for this game",
            });
            this.isShowStudent = false;
            this.selectedStudent = "";
            this.rankReadble = false;
          } else {
            this.isShowStudent = false;
            this.selectedStudent = "";
            this.rankReadble = true;
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }
  studentOnChange(studentData) {
    this.rankReadble = true;
    this.selectedRank = "";
    this.isDataAvailble = false;
    const studentval = studentData.value;
    this.studentArray = studentval.split(",");
    this.studentId = this.studentArray[0];
    this.studentName = this.studentArray[1];
    if (!this.studentId) {
      this.rankReadble = false;
      this.selectedRank = "";
      this.timeAndDistance = false;
    }
  }

  addMeritData() {
    this.isDuplicate = false;
    this.isAlreadyAddedMerit = false;
    if (this.showAlreadyMeritData.length > 0) {
      for (let i = 0; i < this.showAlreadyMeritData.length; i++) {
        if (this.subGameType == "Individual") {
          if (
            this.eventValue === this.showAlreadyMeritData[i].eventId &&
            this.gameId === this.showAlreadyMeritData[i].gameId &&
            this.subGameId === this.showAlreadyMeritData[i].subgameId &&
            this.selectedAge === this.showAlreadyMeritData[i].ageRange &&
            this.genderVal === this.showAlreadyMeritData[i].gender &&
            this.schoolId === this.showAlreadyMeritData[i].schoolId &&
            this.rankValue === this.showAlreadyMeritData[i].rank &&
            this.studentId === this.showAlreadyMeritData[i].studentID
          ) {
            this.isAlreadyAddedMerit = true;
          }
        }
        if (this.subGameType == "Team") {
          if (
            this.eventValue === this.showAlreadyMeritData[i].eventId &&
            this.gameId === this.showAlreadyMeritData[i].gameId &&
            this.subGameId === this.showAlreadyMeritData[i].subgameId &&
            this.selectedAge === this.showAlreadyMeritData[i].ageRange &&
            this.genderVal === this.showAlreadyMeritData[i].gender &&
            this.schoolId === this.showAlreadyMeritData[i].schoolId &&
            this.rankValue === this.showAlreadyMeritData[i].rank
          ) {
            this.isAlreadyAddedMerit = true;
          }
        }
        if (this.gameType == "Team") {
          if (
            this.eventValue === this.showAlreadyMeritData[i].eventId &&
            this.gameId === this.showAlreadyMeritData[i].gameId &&
            this.selectedAge === this.showAlreadyMeritData[i].ageRange &&
            this.genderVal === this.showAlreadyMeritData[i].gender &&
            this.schoolId === this.showAlreadyMeritData[i].schoolId
          ) {
            this.isAlreadyAddedMerit = true;
          }
        }
      }
    }
    if (this.teamMeritArray.length > 0) {
      for (let i = 0; i < this.teamMeritArray.length; i++) {
        if (
          this.eventValue === this.teamMeritArray[i].eventId &&
          this.gameId === this.teamMeritArray[i].gameId &&
          this.selectedAge === this.teamMeritArray[i].agerange &&
          this.genderVal === this.teamMeritArray[i].genderId &&
          this.schoolId === this.teamMeritArray[i].schoolId
        ) {
          this.isDuplicate = true;
        }
      }
    }
    if (this.individualMeritArray.length > 0) {
      for (let i = 0; i < this.individualMeritArray.length; i++) {
        if (
          this.eventValue === this.individualMeritArray[i].eventId &&
          this.gameId === this.individualMeritArray[i].gameId &&
          this.subGameId === this.individualMeritArray[i].subGameId &&
          this.selectedAge === this.individualMeritArray[i].agerange &&
          this.genderVal === this.individualMeritArray[i].genderId &&
          this.schoolId === this.individualMeritArray[i].schoolId &&
          this.rankValue === this.individualMeritArray[i].rank &&
          this.studentId === this.individualMeritArray[i].studentId
        ) {
          this.isDuplicate = true;
        }
      }
    }

    if (this.teamSubGameArray.length > 0) {
      for (let i = 0; i < this.teamSubGameArray.length; i++) {
        if (
          this.eventValue === this.teamSubGameArray[i].eventId &&
          this.gameId === this.teamSubGameArray[i].gameId &&
          this.subGameId === this.teamSubGameArray[i].subGameId &&
          this.selectedAge === this.teamSubGameArray[i].agerange &&
          this.genderVal === this.teamSubGameArray[i].genderId &&
          this.schoolId === this.teamSubGameArray[i].schoolId &&
          this.rankValue === this.teamSubGameArray[i].rank
        ) {
          this.isDuplicate = true;
        }
      }
    }

    this.checkAlreadyAddedIndividualMeritArray = [];
    this.checkAlreadyAddedteamMeritArray = [];
    this.checkAlreadyAddedteamSubGameMeritArray = [];

    if (this.isDuplicate) {
      this.messageService.add({
        key: "custom",
        severity: "error",
        summary: "This Record is already exists!",
      });
    }
    if (this.isAlreadyAddedMerit) {
      this.messageService.add({
        key: "custom",
        severity: "error",
        summary: "This Record is already exists in database!",
      });
    }
    this.saveIndividualMeritArray.length = 0;
    this.saveTeamSubGameMeritArray.length = 0;
    let gendeVal;
    this.isDataAvailble = true;
    if (this.genderVal == "1") {
      gendeVal = "Boys";
    } else {
      gendeVal = "Girls";
    }
    let studId;
    if (this.studentId !== undefined) {
      studId = this.studentId;
    } else {
      studId = "N";
    }
    if (this.studentId == "") {
      studId = "N";
    }
    // this.alredayExistRecored = false;

    // this.showAlreadyMeritData = [];
    // const formData = new FormData();
    // formData.append('individualMeritData', JSON.stringify(this.checkAlreadyAddedIndividualMeritArray));

    //   this.meritService.checkDuplicateMeritData(this.eventValue,this.gameId,this.selectedAge,this.genderVal,this.subGameId,this.schoolId,studId, this.rankValue).subscribe(
    //     res => {
    //       this.alredayAddedMeritData = res;
    //       if(this.alredayAddedMeritData.length > 0 ) {
    //         this.alredayExistRecored = true;
    //         this.messageService.add({key: 'custom', severity:'error',summary: 'This record alreday present in database'});
    //       } else {
    //         this.alredayExistRecored = false;
    //       }

    //      },
    //      error => this.error = error
    //     );

    // Old Imp codition

    //if(this.subGameType == 'Individual' || this.gameType == 'Individual') {
    if (
      (this.subGameType == "Individual" || this.gameType == "Individual") &&
      !this.isDuplicate &&
      !this.isAlreadyAddedMerit
    ) {
      console.log("Im student" + this.studentName);
      // this.teamSubGame = true;
      //   this.isMeritDataShow = false;
      this.individualMeritArray.push({
        studentId: this.studentId,
        studentName: this.studentName,
        eventId: this.eventValue,
        eventName: this.eventName,
        gameId: this.gameId,
        gameType: this.gameType,
        subGameType: this.subGameType,
        subGameId: this.subGameId,
        gameName: this.gameName,
        subGameName: this.subGameName,
        agerange: this.selectedAge,
        genderId: this.genderVal,
        gender: gendeVal,
        schoolId: this.schoolId,
        rank: this.rankValue,
        schoolName: this.schoolName,
        timeAndDistance: this.timeAndDistanceValue,
      });
    }
    if (
      this.subGameType == "Team" &&
      !this.isDuplicate &&
      !this.isAlreadyAddedMerit
    ) {
      this.teamSubGame = true;
      console.log("Merit subgame team");
      this.teamSubGameArray.push({
        eventId: this.eventValue,
        eventName: this.eventName,
        gameId: this.gameId,
        gameType: this.gameType,
        subGameType: this.subGameType,
        subGameId: this.subGameId,
        gameName: this.gameName,
        subGameName: this.subGameName,
        agerange: this.selectedAge,
        genderId: this.genderVal,
        gender: gendeVal,
        schoolId: this.schoolId,
        rank: this.rankValue,
        schoolName: this.schoolName,
        timeAndDistance: this.timeAndDistanceValue,
      });
    }
    if (
      this.gameType == "Team" &&
      !this.isDuplicate &&
      !this.isAlreadyAddedMerit
    ) {
      console.log("im team merit");
      this.showStudentList = false;

      this.teamMeritArray.push({
        eventId: this.eventValue,
        eventName: this.eventName,
        gameId: this.gameId,
        gameType: this.gameType,
        gameName: this.gameName,
        agerange: this.selectedAge,
        genderId: this.genderVal,
        gender: gendeVal,
        schoolId: this.schoolId,
        rank: this.rankValue,
        schoolName: this.schoolName,
        timeAndDistance: this.timeAndDistanceValue,
      });
      this.isMeritDataShow = true;
    }

    if (this.individualMeritArray.length > 0) {
      this.showStudentList = true;
    }
    if (this.teamSubGameArray.length > 0) {
      this.teamSubGame = true;
    }
  }
  rankChange(rankVal) {
    this.rankValue = rankVal.value;
    if (this.rankValue) {
      this.isDataAvailble = true;
      this.timeAndDistance = true;
      this.timeAndDistanceValue = " ";
    } else {
      this.isDataAvailble = false;
      this.timeAndDistance = false;
    }
    // this.timeAndDistance = true;
    // this.timeAndDistanceValue = ' ';
  }
  onKeypressEvent(userEnterValue, val) {
    let usrEnteredVal = userEnterValue.replace(/\s/g, "");
    let actualVal = this.showAlreadyMeritData[val].timeDistance.replace(
      /\s/g,
      ""
    );
    this.timeAndDistanceValue = usrEnteredVal;
    if (usrEnteredVal !== actualVal && userEnterValue !== "") {
      this.indexVal = val;
    } else {
      this.indexVal = 5;
    }
  }

  upDateTimeDistance(meritId) {
    const formData = new FormData();
    formData.append("meritId", JSON.stringify(meritId));
    formData.append(
      "timeDistance",
      JSON.stringify(this.timeAndDistanceValue).replace(/\s/g, "")
    );

    // formData.append('meritId', JSON.stringify(2275));
    // formData.append('timeDistance', JSON.stringify(456));

    this.meritService.updateMeritData(formData).subscribe((res) => {
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
          summary: "Merit Data Updated Successfully",
        });
        // this.makeEmptyForm();
      }
    });
  }
  deleteIndividualMeritData(i: number): void {
    this.individualMeritArray.splice(i, 1);
    if (this.individualMeritArray.length == 0) {
      console.log("array length" + this.teamMeritArray.length);
      this.showStudentList = false;
    }

    // this.addMeritArray.splice(i, 1);
  }
  deleteteamSubGameArraya(i: number): void {
    this.teamSubGameArray.splice(i, 1);
    if (this.teamSubGameArray.length == 0) {
      console.log("array length" + this.teamMeritArray.length);
      // this.showStudentList = false;
      this.teamSubGame = false;
    }

    // this.addMeritArray.splice(i, 1);
  }

  deleteMeritData(i: number): void {
    // console.log('dfg gd===>'+i);
    // console.log(this.teamMeritArray[i])
    // console.log(this.teamMeritArray[i].schoolName);
    this.teamMeritArray.splice(i, 1);
    if (this.teamMeritArray.length == 0) {
      console.log("array length");
      this.isMeritDataShow = false;
    }

    //   this.addMeritArray.splice(i, 1);
  }

  addmeritData() {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-add-merit",
      icon: "pi pi-info-circle",
      message: "Are you sure to add merit data?",
      accept: () => {
        this.saveMeritData();
      },
    });
  }
  saveMeritData() {
    for (let i = 0; i < this.individualMeritArray.length; i++) {
      this.saveIndividualMeritArray.push(
        this.individualMeritArray[i].eventId,
        this.individualMeritArray[i].gameId,
        this.individualMeritArray[i].gameType,
        this.individualMeritArray[i].subGameId,
        this.individualMeritArray[i].subGameType,
        this.individualMeritArray[i].agerange,
        this.individualMeritArray[i].genderId,
        this.individualMeritArray[i].schoolId,
        this.individualMeritArray[i].studentId,
        this.individualMeritArray[i].rank,
        this.individualMeritArray[i].timeAndDistance
      );
    }
    for (let i = 0; i < this.teamSubGameArray.length; i++) {
      this.saveTeamSubGameMeritArray.push(
        this.teamSubGameArray[i].eventId,
        this.teamSubGameArray[i].gameId,
        this.teamSubGameArray[i].gameType,
        this.teamSubGameArray[i].subGameId,
        this.teamSubGameArray[i].subGameType,
        this.teamSubGameArray[i].agerange,
        this.teamSubGameArray[i].genderId,
        this.teamSubGameArray[i].schoolId,
        this.teamSubGameArray[i].rank,
        this.teamSubGameArray[i].timeAndDistance
      );
    }
    for (let i = 0; i < this.teamMeritArray.length; i++) {
      this.saveTeamMeritArray.push(
        this.teamMeritArray[i].eventId,
        this.teamMeritArray[i].gameId,
        this.teamMeritArray[i].gameType,
        this.teamMeritArray[i].agerange,
        this.teamMeritArray[i].genderId,
        this.teamMeritArray[i].schoolId,
        this.teamMeritArray[i].rank,
        this.teamMeritArray[i].timeAndDistance
      );
    }
    const formData = new FormData();
    formData.append("eventYear", JSON.stringify(this.yearvalue));
    formData.append(
      "individualMeritData",
      JSON.stringify(this.saveIndividualMeritArray)
    );
    formData.append("teamMeritData", JSON.stringify(this.saveTeamMeritArray));
    formData.append(
      "teamSubGameArray",
      JSON.stringify(this.saveTeamSubGameMeritArray)
    );

    this.meritService.saveMeritData(formData).subscribe(
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
            summary: "Merit Data Added Successfully",
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
    this.saveTeamMeritArray = [];
    this.saveIndividualMeritArray = [];
    this.saveTeamSubGameMeritArray = [];
    this.individualMeritArray = [];
    this.teamSubGameArray = [];
    this.teamMeritArray = [];
    this.addMeritArray = [];
    this.schoolOptions = [];
    this.studentOptions = [];
    this.subgameOptions = [];
    this.showStudentList = false;
    this.isMeritDataShow = false;
    this.eventReadable = false;
    this.gameReadble = false;
    this.isShowSubGame = false;
    this.isShowStudent = false;
    this.ageReadble = false;
    this.genderReadble = false;
    this.rankReadble = false;
    this.schoolReadble = false;
    this.selectedYear = "";
    this.selectedEvent = "";
    this.selectedGame = "";
    this.selectedSubGame = "";
    this.selectedAge = "";
    this.selectedGender = "";
    this.selectedSchool = "";
    this.selectedStudent = "";
    this.selectedRank = "";
    this.isDataAvailble = false;
    this.printmeritData = false;
    this.individualMeritData = false;
    this.teamSubGame = false;
    this.showMerit = false;
    this.timeAndDistanceValue = " ";
    this.timeAndDistance = false;
  }
}
// export class Thing {
//   constructor(public id: number, public name: string) { }
// }

// const thingsWithDuplicates = [
//   new Thing(1, 'red'),
//   new Thing(2, 'yellow'),
//   new Thing(3, 'green'),
//   new Thing(4, 'blue'),
//   new Thing(5, 'jkg'),
//   new Thing(12, 'sdaf'),
//   new Thing(3, 'jgjkg')
// ];

// const distinctThings = thingsWithDuplicates.filter(
//   (thing, i, arr) => arr.findIndex(t => t.id === thing.id) === i
// );
// console.log(distinctThings)
