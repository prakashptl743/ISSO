import { Component, OnInit, ViewChild } from "@angular/core";
//import { SchoolService } from '../service/school.service';
import { StudentService } from "../service/student.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { SelectItem } from "primeng/api";
import { FormControl } from "@angular/forms";
import { PageNotFoundComponent } from "src/app/page-not-found/page-not-found.component";
import { ChangeDetectionStrategy, HostListener } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { Student } from "../admin-interfaces";
import { IssoUtilService } from "../../services/isso-util.service";
import { ReportMeritService } from "../service/report-merit.service";
import { StudentEnrollmentService } from "src/app/staffadmin/service/student-enrollment.service";
import { environment } from "../../../environments/environment";
import { Table } from "primeng/table";
import { forkJoin } from "rxjs";
export class ageInterFace {
  ageRange: string;
  name: string;
}
export interface Representative {
  name?: string;
  image?: string;
}
export interface Customer {
  sId: number;
  studentName: string;
  fatherName: string;
  dateOfBirth: string;
  standardClass: string;
  ageRange: string;
  aadharNumber: string;
  gameId: number;
  gameName: string;
  subgameId: number;
  subGameName: string;
  eventName: string;
  schoolName: string;
  createdDate: string;
  photo: string;
}
@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class StudentComponent implements OnInit {
  // P data table Code
  customers: Customer[];
  school1: Customer;
  //school: Student;
  selectedCustomers: Customer[];
  representatives: Representative[];
  statuses: any[];
  filterSubGameList: any[];
  // loading: boolean = true;

  @ViewChild("dt", { static: false }) table: Table;
  // End P data table code

  strIntoObj: ageInterFace[];
  serverUrl = environment.baseUrl;
  selectedGame: string;
  studentFilterForm: FormGroup;
  schoolForm: FormGroup;
  searchForm: FormGroup;
  editForm: FormGroup;
  errormessage: boolean;
  submitted = false;
  display: boolean = false;
  options: SelectItem[];
  schoolArray = [];
  control: FormControl;
  schoolServiceDATA: any;
  school: Student;
  error: string;
  eventValue: any;
  yearvalue: any;
  schoolvalue: any;
  cols: any[];
  placeholderText = "Select Option";
  actions: string;
  loading: boolean;
  disable = false;
  schoolData: Student[];
  studentListArray = [];
  studentDataArray = [];
  schoolListArray = [];
  checkSubGameCapacity: any = [];
  eventData: any;
  globalSchoolData: any;
  schoolList: any;
  schoolServiceData: any;
  showStudentCount: boolean = false;

  yearOptions: SelectItem[];
  eventOptions: SelectItem[];
  globalSchoolOption: SelectItem[];
  schoolOptions: SelectItem[];
  gameOptions: SelectItem[];
  profileForm: FormGroup;
  ageRange;
  standardClass;
  tShirtSize: any;
  curriculum;
  selectedtShirtSize: string;
  sortKey: string;
  sortKey1: string;
  eventIdForStudent: number;
  selectedSchool: Student;
  selected_School: string;
  carDatavalue: any;
  carId: number;
  displayDialog: boolean;
  eventReadable: boolean = false;
  schoolReadble: boolean = false;
  studentCount: number;
  subViewTitle: string;
  showDropDown: boolean;
  gameList: any;
  gameReadble: boolean;
  schoolListResponse: any;

  /* New */
  selectedYear: string;
  selected_School_list: string;
  selectedSubGame: string;
  studentOptions: SelectItem[];
  subgameOptions: SelectItem[];
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  rankOptions: SelectItem[];
  gameArray = [];
  // schoolArray=[];
  studentArray = [];
  addMeritArray = [];
  teamMeritArray = [];
  saveTeamMeritArray = [];
  minCapcity: number;
  eventArray = [];
  subgameArray = [];
  addMeritDataArray = [];
  subGameIdArray = [];
  subGameNameArray = [];
  eventValue1: number;

  schoolvalue1: number;

  eventData1: any;
  ageRange1;
  // eventReadable: boolean = false;
  isDataAvailble: boolean = false;
  // gameReadble: boolean = false;
  //  schoolReadble: boolean = false;
  ageReadble: boolean = false;
  genderReadble: boolean = false;
  rankReadble: boolean = false;
  isShowStudent: boolean = false;
  selectedAge: string;
  selectedEventGame: string;
  selectedGender: string;
  // schoolList: any;
  studentList: any;
  // gameList: any;
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
  // selectedYear: string;
  selectedSchool1: string;
  selectSchool: string;
  // selectedSubGame: string;
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
  studentName: string;
  showStudentList: boolean;
  newSchoolId: any;
  base64Image: any;
  printmeritData: boolean;
  individualMeritData: boolean;
  student_Name: string;
  sId: any;
  country: any;
  globalSchoolvalue: any;
  globalSelectedSchool: string;
  mapGameArray = [];
  globalSelectedYear: string;
  minDate: Date;
  yearRange: string;
  newSubGameCapacity = [];
  list: any[] = [
    { name: "001", page: "Central", url: "bsp/create-customer" },
    { name: "002", page: "Gold Loan", url: "goldloan/ticket" },
    { name: "003", page: "Gold Loan", url: "auction/buyer-price" },
    { name: "004", page: "Gold Loan", url: "settings/gold-market" },
    { name: "005", page: "Central", url: "bsp/edit-bsp" },
  ];

  filteredPages: any[];
  remainingCapacity: number;

  /* end New*/

  radioDeviceItem;
  _radioDevicesList: any;
  // _radioDevicesList = [
  //   { id: 11, text: 'one' },
  //   { id: 22, text: 'two' },
  //   { id: 33, text: 'three' },
  //   { id: 44, text: 'four' },
  //   { id: 55, text: 'five' }
  // ];
  radioDevicesList;
  father_Name: string;
  dateOf_Birth: Date;
  admission_Number: string;
  selectedClass: any;
  aadharNumber: string;
  displaySearch: boolean;
  studentGrid: boolean;
  goBackBUtton: boolean;
  globalSchoolReadble: boolean;
  showSearchResult: boolean;
  searchResult: any;
  searchResultData: any;
  noSearchData: boolean;
  isDuplicate: boolean;
  toalSubGameSelected: boolean;
  showMapData: boolean;
  subGameButton: boolean;
  isSubGameSelected: boolean;
  subGameoptions = [];
  subGameCount: number;
  url: any;
  fileName: number;
  fullFilename: string;
  selectedProfile: string;
  isEditStudent: boolean;
  eventYear: any;
  ageValue: any;
  genderValue: any;
  gameValue: any;
  newGameArray = [];
  newSubGameArray = [];
  today: string;
  subGameCapacity: any;
  isAddNewStudent: boolean;
  setPhotoYear: string;
  studentPhoto: any;
  isValidFile: boolean = true;
  isFileBig: boolean;
  genderForSubGame: any;
  marked: any;
  passport: string;
  isEdit: any;
  aadhar: string;
  showNRI: boolean;
  isMessageshow: boolean;
  studentCapacity: boolean;
  editStudentPhoto: string;
  gameNameForEditStudent: any;
  isMoreDot: boolean;
  testArray = [];
  mapSubGameTeam = [];
  incompleteTeamSubGame = [];
  showSubGameList: boolean;
  schoolEnter: boolean;
  brands: SelectItem[];

  colors: SelectItem[];
  showFilterSubGame: boolean;
  showIdBox: boolean;
  nameBox: boolean;
  showAgeFilter: boolean;
  showGameFilter: boolean;
  genderForSubGameFilter: boolean;
  genderGameFilter: boolean;
  search_Id: string;
  search_Name: string;
  filter_age: string;
  filter_Gender: string;
  filter_game: string;
  filter_sub_game: string;
  isCancelForm: boolean;
  constructor(
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private issoUtilService: IssoUtilService,
    private studentService: StudentService,
    private meritService: ReportMeritService,
    private pb: FormBuilder,
    private studentEnrollmentService: StudentEnrollmentService
  ) {
    setTimeout(() => {
      this.disable = true;
    }, 5000);
    this.options = [
      { label: "jan 1 2001", value: new Date(2001, 0, 1) },
      { label: "jan 1 2002", value: new Date(2002, 0, 1) },
      { label: "jan 1 2003", value: new Date(2003, 0, 1) },
    ];
    this.options = [
      { label: "jan 1 2001", value: new Date(2001, 0, 1) },
      { label: "jan 1 2002", value: new Date(2002, 0, 1) },
      { label: "jan 1 2003", value: new Date(2003, 0, 1) },
    ];
    this.control = new FormControl(this.options[2].value);
  }

  ngOnInit() {
    this.studentGrid = true;
    this.showDropDown = true;
    this.initialForm();
    this.fileUpladForm();
    this.yearOptions = this.issoUtilService.setYear();
    this.genderOptions = this.issoUtilService.setGender();
    console.log(this.yearOptions);
    this.loading = true;
    setTimeout(() => {
      this.placeholderText = "It has changed";
    }, 5000);
    // this.setFiletr();
  }
  setFiletr() {
    this.table.reset();
    this.filter_sub_game = "";
    this.filter_game = "";
    this.filter_age = "";
    this.filter_Gender = "";
    this.search_Name = "";
    this.search_Id = "";
    this.eventValue, this.schoolvalue;
    this.studentService
      .getCustomersLarge(this.eventValue, this.schoolvalue)
      .then((customers) => {
        this.customers = customers;
        this.loading = false;
      });
  }
  checkAge(gameId) {
    this.isAddNewStudent = false;
    this.selectedAge = "";
    this.selectedGender = "";
    this.schoolName = "";
    this.meritService
      .setAgeMapForMerit(this.eventIdForStudent, gameId)
      .subscribe(
        (response) => {
          this.showAgeFilter = true;
          if (
            response[0].ageRange !== "null" &&
            response[0].girlsAgeRange !== "null"
          ) {
            const ageList =
              response[0].ageRange + " " + response[0].girlsAgeRange;
            const ageMeritArray = ageList.split(" ");
            const x = Array.from(new Set(ageList.split(" "))).toString();

            var myarray = x.split(",");
            let ageArrayLength = myarray.length;

            this.ageOptions = [];
            this.ageOptions.push({
              label: "Please Select",
              value: "",
            });

            for (var i = 0; i < ageArrayLength; i++) {
              if (myarray[i] !== "") {
                this.ageOptions.push({
                  label: myarray[i],
                  value: myarray[i],
                });
              }
            }
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }
  filterStudent() {
    this.display = true;
  }
  setPhotoPath() {
    // this.setPhotoYear = this.issoUtilService.setPhotoYear();
    let photoPath = this.yearvalue;
    console.log(photoPath);
    this.setPhotoYear = this.serverUrl + "upload/" + photoPath;
  }
  seCurrenttDate() {
    const now = new Date();
    this.today = now.toISOString();
  }
  loadData(event) {}

  editSchool(event: Event, car: Student) {
    let carData = JSON.stringify(car);
    this.carId = car.sId;
    this.carDatavalue = car;
    this.displayDialog = true;
    event.preventDefault();
  }

  onDialogHide() {
    this.selectedSchool = null;
  }
  onLoadSchool() {
    this.showSearchResult = false;
  }
  onLoadSchoolData(event) {
    this.yearvalue = event.value;
    this.showSearchResult = false;
    console.log("im onload==>+" + this.yearvalue);
    this.setPhotoPath();
    if (this.yearvalue !== "") {
      this.studentService.loadGloballySchool(this.yearvalue).subscribe(
        (response) => {
          if (response !== "") {
            this.globalSchoolData = response;
            if (this.globalSchoolData.length > 0) {
              this.globalSchoolReadble = true;
              this.globalSchoolOption = [];
              this.eventReadable = true;
              this.globalSchoolOption.push({
                label: "Please Select",
                value: "",
              });
              this.globalSchoolData.forEach((element) => {
                this.globalSchoolOption.push({
                  label: element.schoolName,
                  value: element.schoolId,
                });
              });
            } else {
              this.eventReadable = false;
              this.schoolReadble = false;
              this.globalSchoolOption = [];
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
    }
  }
  onyeareChange(event) {
    this.yearvalue = event.value;
    this.customers = [];
    if (!this.studentGrid) {
      this.hideFilterTextBox();
    }
    console.log(" this.yearvalue" + this.yearvalue);
    this.setPhotoPath();
    // this.initialForm();
    this.isAddNewStudent = false;

    this.schoolEnter = false;
    this.schoolName = "";
    this.selectedGender = "";
    this.selected_School_list = "";
    this.selectedAge = "";
    this.selectedRank = "";
    this.genderReadble = true;
    this.schoolOptions = [];
    this.gameOptions = [];
    this.subGameoptions = [];
    this.showMapData = false;
    this.mapGameArray = [];
    this.schoolReadble = false;
    this.isShowSubGame = false;
    this.ageReadble = false;
    this.genderReadble = false;
    this.gameReadble = false;

    this.hideFilterTextBox();

    if (this.yearvalue !== "") {
      this.studentService.loadEventByYear(this.yearvalue).subscribe(
        (response) => {
          if (response !== "") {
            this.eventData = response;
            if (this.eventData.length > 0) {
              this.eventOptions = [];
              this.eventReadable = true;
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
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "Event not found!",
              });
              this.eventReadable = false;
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
      this.eventOptions = [];
      this.eventReadable = false;
      this.schoolOptions = [];
      this.schoolReadble = false;
    }
  }

  cancelForm() {
    // this.display = false;
    // this.showDropDown = true;
    if (this.isCancelForm) {
      this.displaySearch = true;
      this.display = false;
      this.goBackBUtton = true;
    } else {
      this.display = false;
      this.eventReadable = true;
      this.schoolReadble = true;
      this.showDropDown = true;
    }
  }
  onEventChangeForStudent(event) {
    // this.ageReadble =true;
    //this.genderReadble =true;
    this.schoolEnter = false;
    this.gameReadble = true;
    this.schoolName = "";
    this.genderReadble = false;
    this.ageReadble = false;
    this.gameOptions = [];
    this.isAddNewStudent = false;
    this.selectedGender = "";
    this.selectedAge = "";
    this.selectedRank = "";
    this.schoolOptions = [];
    this.subgameArray = [];
    this.selectedSubGame = "";
    this.subgameOptions = [];
    this.isShowSubGame = false;
    this.showMapData = false;
    this.mapGameArray = [];

    const eventval = event.value;
    this.eventIdForStudent = eventval;
    // this.setAgeMap(eventval);
    this.meritService.loadGameByEvent(this.eventIdForStudent, false).subscribe(
      (response) => {
        if (response !== "") {
          this.gameList = response;
          this.schoolReadble = false;
          if (this.gameList.length > 0) {
            this.gameOptions = [];
            this.gameReadble = true;
            this.gameOptions.push({
              label: "Select Game",
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
  }
  loadGenerChange() {
    this.isAddNewStudent = false;
    this.schoolEnter = true;
    // this.gameReadble = false;
    // this.selectedGame = '';
    this.schoolName = "";
    this.showMapData = false;
    this.mapGameArray = [];
    this.isShowSubGame = false;
    this.schoolOptions = [];
    if (this.gameType == "Both") {
      this.setSubGame();
      this.loadStudentDataForSubGame();
    } else {
      //this.checkCapacity();
      //this.ageReadble =true;
      this.subgameArray = [];
      this.addMeritDataArray = [];
      this.isShowSubGame = false;
      this.subgameOptions = [];
      this.subGameId = "";
      this.subGameType = "";
      this.subGameName = "";
    }

    // this.gameOptions = [];
    // this.subGameoptions = [];
  }
  studentGameFilter() {
    this.ageReadble = true;
  }

  loadGameChange(gameData) {
    this.makeEmptyForm();
    this.ageReadble = true;
    this.schoolReadble = false;
    this.showMapData = false;
    this.selectedRank = "";
    this.selectedSubGame = "";
    this.schoolOptions = [];
    this.rankReadble = false;
    const gameval = gameData.value;
    this.gameArray = gameval.split(",");
    this.gameId = this.gameArray[0];
    this.gameName = this.gameArray[1];
    this.gameType = this.gameArray[2];
    this.checkAge(this.gameId);
  }

  checkCapacity() {
    if (this.gameId) {
      this.meritService.checkGameCapacity(this.gameId).subscribe(
        (response) => {
          if (response !== "") {
            if (response[0].fourteen_boys > 0) {
              console.log("im if");
            } else {
              console.log("im else");
            }

            if (this.selectedAge == "14") {
              console.log("im i12131f" + this.selectedAge);
            } else {
              console.log("im e 313134lse");
            }

            if (response[0].eleven_boys > 0 && this.selectedAge == "11") {
              this.studentCapacity = response[0].eleven_boys;
              this.isMessageshow = true;
            } else if (
              response[0].eleven_girls > 0 &&
              this.selectedAge == "11"
            ) {
              this.studentCapacity = response[0].eleven_girls;
              this.isMessageshow = true;
            } else if (
              Number(response[0].fourteen_boys) > 0 &&
              this.selectedAge === "14"
            ) {
              this.studentCapacity = response[0].fourteen_boys;
              this.isMessageshow = true;
            } else if (
              response[0].fourteen_girls > 0 &&
              this.selectedAge == "14"
            ) {
              this.studentCapacity = response[0].fourteen_girls;
              this.isMessageshow = true;
            } else if (
              response[0].sixteen_boys > 0 &&
              this.selectedAge == "9"
            ) {
              this.studentCapacity = response[0].sixteen_boys;
              this.isMessageshow = true;
            } else if (
              response[0].sixteen_girls > 0 &&
              this.selectedAge == "9"
            ) {
              this.studentCapacity = response[0].sixteen_girls;
              this.isMessageshow = true;
            } else if (
              response[0].seventeen_boys > 0 &&
              this.selectedAge == "17"
            ) {
              this.studentCapacity = response[0].seventeen_boys;
              this.isMessageshow = true;
            } else if (
              response[0].seventeen_girls > 0 &&
              this.selectedAge == "17"
            ) {
              this.studentCapacity = response[0].seventeen_girls;
              this.isMessageshow = true;
            } else if (
              response[0].ninteen_boys > 0 &&
              this.selectedAge == "19"
            ) {
              this.studentCapacity = response[0].ninteen_boys;
              this.isMessageshow = true;
            } else if (
              response[0].ninteen_girls > 0 &&
              this.selectedAge == "19"
            ) {
              this.studentCapacity = response[0].ninteen_girls;
              this.isMessageshow = true;
            } else {
              this.isMessageshow = false;
            }
            console.log("capacaity-->" + this.studentCapacity);

            if (this.isMessageshow) {
              //this.isAddNewStudent = true;
              this.meritService
                .checkGameCapacityForStudent(
                  this.eventIdForStudent,
                  this.selectedAge,
                  this.selectedGender,
                  this.gameId,
                  this.newSchoolId
                )
                .subscribe(
                  (response) => {
                    console.log("im resp-->" + JSON.stringify(response));
                    if (response !== "") {
                      if (response == this.studentCapacity) {
                        this.messageService.add({
                          key: "custom",
                          severity: "error",
                          summary: "Capacity is full!",
                        });
                        this.isAddNewStudent = false;
                      } else {
                        if (this.gameType != "Both")
                          this.isAddNewStudent = true;
                      }
                    } else {
                      // console.log('Data is blannk from service')
                    }
                  },
                  (error) => {
                    //this.errorAlert =true;
                  }
                );
            } else {
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "No seat available!",
              });
              // this.isAddNewStudent = false;
            }
          } else {
            // console.log('Data is blannk from service')
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
    }
  }
  checkStudentcapacity() {}

  toggleVisibility(e, Idtype: string) {
    this.marked = e.target.checked;
    if (!this.isEdit) {
      this.passport = "";
      this.aadhar = "";
    }
    if (Idtype === "aadhar") {
      this.showNRI = true;
    } else {
      this.showNRI = false;
    }
  }
  hideFilterTextBox() {
    this.showIdBox = false;
    this.nameBox = false;
    this.showFilterSubGame = false;
    this.showAgeFilter = false;
    this.showGameFilter = false;
    this.genderGameFilter = false;
    this.statuses = [];
    this.filterSubGameList = [];
    this.search_Id = "";
    this.search_Name = "";

    if (!this.studentGrid) {
      this.table.reset();
    }
  }
  onEventChange(event) {
    this.schoolvalue = "";
    this.schoolEnter = false;
    this.customers = [];
    this.hideFilterTextBox();
    this.schoolName = "";
    this.filterSubGameList = [];
    this.showFilterSubGame = false;
    this.gameReadble = false;
    this.selectedSchool = null;
    this.selected_School = "Please select";
    this.eventValue = event.value;
    this.isAddNewStudent = false;

    if (this.eventValue !== "") {
      // forkJoin([this.studentService.loadSchoolByEvent(this.eventValue), this.issoUtilService.setAgeMap(this.eventValue)])
      // .subscribe(res => {
      //   //this.data = res;
      //   console.log ('User and Post', res);
      // });

      this.studentService.loadSchoolByEvent(this.eventValue).subscribe(
        (response) => {
          if (response !== "") {
            this.setAgeMap(this.eventValue);
            this.ageOptions = this.issoUtilService.setAgeMap(this.eventValue);
            this.schoolList = response;
            if (this.schoolList.length > 0) {
              this.schoolOptions = [];
              this.schoolReadble = true;
              this.schoolOptions.push({
                label: "Please Select",
                value: "",
              });
              this.schoolList.forEach((element) => {
                this.schoolOptions.push({
                  label: element.schoolName,
                  value: element.schoolId,
                });
              });
              this.setGamesForfilter();
            } else {
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "School not found!",
              });
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
      this.schoolReadble = false;
      this.schoolOptions = [];
    }
  }
  setAgeMap(evenVal) {
    this.studentService.setAgeMap(evenVal).subscribe(
      (response) => {
        const myArray = response[0].ageRange.split(" ");
        const ageList = response[0].ageRange;
        var spaceCount = ageList.split(" ").length - 1;
        console.log(spaceCount);
        this.ageOptions = [];
        this.ageOptions.push({
          label: "Select Age",
          value: "",
        });
        for (let i = 0; i <= spaceCount; i++) {
          this.ageOptions.push({
            label: myArray[i],
            value: myArray[i],
          });
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  setGamesForfilter() {
    this.meritService.loadGameByEvent(this.eventValue, false).subscribe(
      (response) => {
        if (response !== "") {
          this.gameList = response;
          if (this.gameList.length > 0) {
            this.statuses = [];
            this.statuses.push({
              label: "Select Game",
              value: "",
            });
            this.gameList.forEach((element) => {
              const gameIdAndName = element.gameId + "," + element.gameName;
              this.statuses.push({
                label: element.gameName,
                value: element.gameId,
              });
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

  getStudentData() {
    this.displaySearch = false;
    this.studentGrid = true;
    this.showDropDown = true;
    this.studentService.getStudentList().subscribe(
      (response) => {
        if (response !== "") {
          this.schoolServiceData = response;
          this.schoolData = this.schoolServiceData;
          if (this.schoolData.length > 0) {
            this.showStudentCount = true;
            this.showDropDown = true;
            this.studentCount = this.schoolData.length;
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

  searchData() {
    const formData = new FormData();

    formData.append(
      "globalSelectedYear",
      this.searchForm.get("globalSelectedYear").value
    );
    formData.append(
      "globalSelectedSchool",
      this.searchForm.get("globalSelectedSchool").value
    );
    formData.append("search_text", this.searchForm.get("search_text").value);

    this.studentService.loadGloablStudentData(formData).subscribe(
      (response) => {
        if (response !== "") {
          this.searchResult = response;
          this.searchResultData = this.searchResult;
          if (this.searchResultData.length > 0) {
            this.showSearchResult = true;
            this.noSearchData = false;
          } else {
            this.noSearchData = true;
            console.log("record not");
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
  loadStudentDataForSubGame() {
    this.studentDataArray = [];
    this.mapGameArray = [];
    this.showMapData = false;
    this.subGameIdArray = [];
    this.subGameNameArray = [];
    this.newSubGameCapacity = [];
    this.testArray = [];
    this.checkSubGameCapacity = [];
    this.incompleteTeamSubGame = [];
    // const gameID = this.gameId.replace(/'/g, "")

    this.studentDataArray.push(
      this.eventIdForStudent,
      this.gameId,
      this.selectedAge,
      this.selectedGender,
      this.newSchoolId
    );
    const formData = new FormData();
    formData.append("studentData", JSON.stringify(this.studentDataArray));
    this.studentEnrollmentService.loadStudentData(formData).subscribe(
      (response) => {
        if (response !== "") {
          console.log(response);
          this.studentListArray = response;
          if (this.studentListArray.length > 0) {
            this.remainingCapacity =
              this.minCapcity - this.studentListArray.length;
            // this.isStudentListShow = true;
            if (this.showSubGameList) {
              for (let i = 0; i <= this.studentListArray.length - 1; i++) {
                this.checkSubGameCapacity.push(
                  this.studentListArray[i]["subgameId"]
                );
              }
              var commaSeperatedString = this.checkSubGameCapacity.toString();
              this.testArray = commaSeperatedString.split(",");
              for (let i = 0; i <= this.testArray.length - 1; i++) {
                // if (this.newSubGameCapacity.indexOf(this.testArray[i]) === -1) {
                this.newSubGameCapacity.push({
                  subGameId: this.testArray[i],
                });
                // }
              }
              console.log(
                "HELLOO++++>" + JSON.stringify(this.newSubGameCapacity)
              );
              let capaCityCount = 0;
              console.log(
                "this.mapSubGameTeam.length---->" + this.mapSubGameTeam.length
              );
              if (this.mapSubGameTeam.length > 0) {
                for (let i = 0; i <= this.mapSubGameTeam.length - 1; i++) {
                  console.log("I value===>" + i);

                  let remainingCapacity = 0;
                  capaCityCount = this.newSubGameCapacity.filter(
                    (obj) =>
                      obj.subGameId === this.mapSubGameTeam[i]["subGameId"]
                  ).length;
                  console.log("CAPCITY COUNT===>" + capaCityCount);
                  //if (capaCityCount < this.mapSubGameTeam[i]['minCapacity'] ) {
                  remainingCapacity =
                    this.mapSubGameTeam[i]["subGameCapacity"] - capaCityCount;
                  this.incompleteTeamSubGame.push({
                    subGameId: this.mapSubGameTeam[i]["subGameId"],
                    subGameName: this.mapSubGameTeam[i]["subGameName"],
                    remainingCapacity: remainingCapacity,
                  });
                  //}
                }
              }
              console.log(
                "incompleteTeamSubGame===>",
                JSON.stringify(this.incompleteTeamSubGame)
              );
            }
          }
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }

  checkSubGameCapacityForStudent(event) {
    // const eventval = event.value
    // this.subGameNameVal =  eventval.split(",");
    // this.subGameId = this.subGameNameVal[0];
    // this.subGame = this.subGameNameVal[1];
    // this.subGameCapacity =  this.subGameNameVal[2];
    // this.subGameType = this.subGameNameVal[3];
    // if (eventval !== '') {
    //   this.isSubGameSelected = true;
    // } else {
    //   this.isSubGameSelected = false;
    // }
    //  let capaCityCount;
    //  const subGameIDForCapcity =  this.subGameId;
    //  if(this.subGameType == "Team") {
    //   capaCityCount = this.newSubGameCapacity.filter((obj) => obj.subGameId === subGameIDForCapcity).length;
    //   console.log('tesam==>'+capaCityCount);
    //   if (capaCityCount == this.subGameCapacity) {
    //     this.selectedSubGame1 = '';
    //     this.isSubGameSelected = false;
    //     this.messageService.add({key: 'custom', severity:'error', summary: 'Capacity is full'});
    //   }
    //   // for(let i=0;i <=this.incompleteTeamSubGame.length;i++) {
    //   //   if(this.incompleteTeamSubGame[i]['remainingCapacity'] == 0) {
    //   //     this.selectedSubGame1 = '';
    //   //     this.isSubGameSelected = false;
    //   //     this.messageService.add({key: 'custom', severity:'error', summary: 'Capacity is full'});
    //   //    }
    //   // }
    //  } else {
    //     capaCityCount = this.newSubGameCapacity.filter((obj) => obj.subGameId === subGameIDForCapcity).length;
    //     if (capaCityCount == this.subGameCapacity) {
    //       this.selectedSubGame1 = '';
    //       this.isSubGameSelected = false;
    //       this.messageService.add({key: 'custom', severity:'error', summary: 'Capacity is full'});
    //     }
    //  }
  }
  setGender() {
    this.genderGameFilter = true;
  }
  filters: any = {};

  // Capture and save filter state
  onTableFilter(event: any) {
    this.filters = event.filters;
  }

  // Handle dropdown change without resetting filters
  onDropdownChange(event: any) {
    // You can handle the dropdown change here
    // The filters are retained and not reset
    // console.log('Dropdown changed to:', this.selectedOption);
  }
  loadStudentData(event) {
    this.newSubGameCapacity = [];
    this.schoolvalue = event.value;
    // this.hideFilterTextBox();
    this.filter_game = "";
    this.showAgeFilter = false;
    this.filter_age = "";
    this.filter_sub_game = "";
    this.filter_Gender = "";
    this.genderGameFilter = false;
    if (this.schoolvalue !== "") {
      this.studentService
        .loadStudentDataByEvent(this.eventValue, this.schoolvalue)
        .subscribe(
          (response) => {
            if (response !== "") {
              this.showIdBox = true;
              this.nameBox = true;
              this.showGameFilter = true;
              this.schoolServiceData = response;
              this.schoolData = this.schoolServiceData;
              if (response[0].gameType == "Both") {
                this.showSubGameList = true;
              } else {
                this.showSubGameList = false;
              }
              if (this.schoolData.length > 0) {
                this.showStudentCount = true;
                this.studentCount = this.schoolData.length;
              } else {
                this.studentCount = 0;
              }

              if (this.showSubGameList) {
                for (let i = 0; i <= this.schoolServiceData.length - 1; i++) {
                  this.checkSubGameCapacity.push(
                    this.schoolServiceData[i]["subgameId"]
                  );
                }
                var commaSeperatedString = this.checkSubGameCapacity.toString();
                this.testArray = commaSeperatedString.split(",");
                for (let i = 0; i <= this.testArray.length - 1; i++) {
                  this.newSubGameCapacity.push({
                    subGameId: this.testArray[i],
                  });
                }
                console.log(
                  "DATA===>" + JSON.stringify(this.newSubGameCapacity)
                );
                if (this.mapSubGameTeam.length > 0) {
                  for (let i = 0; i <= this.mapSubGameTeam.length - 1; i++) {
                    console.log("I value===>" + i);
                    let capaCityCount = 0;
                    let remainingCapacity = 0;
                    capaCityCount = this.newSubGameCapacity.filter(
                      (obj) =>
                        obj.subGameId === this.mapSubGameTeam[i]["subGameId"]
                    ).length;
                    if (capaCityCount < this.mapSubGameTeam[i]["minCapacity"]) {
                      remainingCapacity =
                        this.mapSubGameTeam[i]["minCapacity"] - capaCityCount;
                      this.incompleteTeamSubGame.push({
                        subGameId: this.mapSubGameTeam[i]["subGameId"],
                        subGameName: this.mapSubGameTeam[i]["subGameName"],
                        remainingCapacity: remainingCapacity,
                      });
                    }
                  }
                }
                console.log(
                  "incompleteTeamSubGame===>",
                  JSON.stringify(this.incompleteTeamSubGame)
                );
              }
            } else {
              console.log("Data is blannk from service");
            }
          },
          (error) => {
            // this.errorAlert =true;
          }
        );
    } else {
    }
  }

  showDialog(rowid: number) {
    this.display = true;
  }
  fileUpladForm() {
    this.profileForm = this.pb.group({
      name: [""],
      profile: [""],
    });
  }
  initialForm() {
    this.selectedProfile = "";
    this.schoolName = "";
    this.dateOf_Birth = null;
    this.selectedYear = "";
    this.selectedAge = "";
    this.selectedGender = "";
    this.showMapData = false;
    this.mapGameArray = [];
    this.father_Name = "";
    this.admission_Number = "";
    this.selectedClass = "";
    this.aadharNumber = "";
    this.student_Name = "";
    // this.dateOf_Birth  = new Date();
    this.isShowSubGame = false;
    this.editStudentPhoto = "";
    // this.ageRange = this.issoUtilService.setAge();
    // this.ageOptions = this.issoUtilService.setAge();
    this.tShirtSize = this.issoUtilService.setTshirtSize();
    this.standardClass = this.issoUtilService.setClass();
    //   this.genderOptions =this.issoUtilService.setGender();
    this.schoolForm = this.fb.group({
      studentYear: [""],
      sId: [""],
      schoolId: [""],
      editStudentPhoto: [],
      studentEvent: ["", Validators.required],
      studentGame: ["", Validators.required],
      studentSubGame: [""],
      studentAge: ["", Validators.required],
      studentGender: ["", Validators.required],
      schoolName: ["", Validators.required],
      studentName: ["", Validators.required],
      fatherName: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      admissionNumber: ["", Validators.required],
      standardClass: ["", Validators.required],
      aadharNumber: ["", Validators.required],
      tShirtSize: ["", Validators.required],
      curriculum: ["", Validators.required],
      studentPhoto: [""],
      subGameID: [""],
      subGameNames: [""],
      profile: "",
    });
    this.searchForm = this.fb.group({
      globalSelectedYear: ["", Validators.required],
      globalSelectedSchool: [""],
      search_text: ["", Validators.required],
    });
    this.studentFilterForm = this.fb.group({
      termsCondition: ["", Validators.required],
    });
  }
  loadSubGameChange(subgame) {
    //this.selectedAge ='';
    //this.selectedGender='';
    this.selectedRank = "";
    // this.genderReadble = false;
    // this.ageReadble = true;
    this.isShowStudent = false;
    this.schoolReadble = false;
    this.schoolOptions = [];
    const eventval = subgame.value;
    this.subgameArray = eventval.split(",");
    this.subGameId = this.subgameArray[0];
    this.subGameName = this.subgameArray[1];
    this.subGameCapacity = this.subgameArray[2];
    this.subGameType = this.subgameArray[3];

    if (eventval !== "") {
      this.isSubGameSelected = true;
    } else {
      this.isSubGameSelected = false;
    }
    console.log("THIS>SCHSUB===>" + JSON.stringify(this.newSubGameCapacity));
    const subGameIDForCapcity = this.subGameId;
    const capaCityCount = this.newSubGameCapacity.filter(
      (obj) => obj.subGameId === subGameIDForCapcity
    ).length;
    console.log(capaCityCount);
    if (capaCityCount == this.subGameCapacity) {
      // this.selectedSubGame1 = '';
      this.isSubGameSelected = false;
      this.messageService.add({
        key: "custom",
        severity: "error",
        summary: "Capacity is full",
      });
    }
  }

  addMapSubGame() {
    this.isDuplicate = false;
    // const ageValue = this.ageValue.toString();
    // let res;
    // if(ageValue!=='') {
    //   res = ageValue.replace(/^[, ]+|[, ]+$|[, ]+/g, " ").trim();
    // } else {
    //   res ='N/A';
    // }

    // this.eventList ='';
    // this.seletectedGameList ='';
    if (this.mapGameArray.length > 0) {
      for (let i = 0; i < this.mapGameArray.length; i++) {
        if (this.subGameId === this.mapGameArray[i].subGameId) {
          console.log("Im if");
          this.isDuplicate = true;
          this.messageService.add({
            key: "custom",
            severity: "error",
            summary: "This subgame already exists!",
          });
        } else {
          console.log("im else");
        }
      }
    }
    if (!this.isDuplicate && this.mapGameArray.length < 5) {
      this.toalSubGameSelected = true;
      this.mapGameArray.push({
        subGameId: this.subGameId,
        subGameName: this.subGameName,
        subGameCapacity: this.subGameType,
      });
      this.subGameIdArray.push(this.subGameId);
      this.subGameNameArray.push(this.subGameName);
    }
    console.log("IM ID--->" + this.newSchoolId);
    if (this.mapGameArray.length > 0 && this.newSchoolId !== undefined) {
      this.isAddNewStudent = true;
      this.showMapData = true;
    } else {
      this.showMapData = false;
    }

    if (this.subGameIdArray.length > 0) {
      this.subGameButton = true;
    } else {
      this.subGameButton = false;
    }
    if (this.mapGameArray.length == 5) {
      this.messageService.add({
        key: "custom",
        severity: "error",
        summary: "You can select only 5 subgame",
      });
    } else {
      this.toalSubGameSelected = false;
    }
  }
  changeAge(event) {
    const ageVal = event.value;
    console.log("ageval--->" + ageVal);
    this.selectedAge = ageVal;
    if (this.isEditStudent) {
      if (this.gameType == "Both") {
        this.setSubGame();
        this.loadStudentDataForSubGame();
      }
    }
  }

  loadAgeChange() {
    this.selectedGender = "";
    //this.gameReadble = false;
    this.schoolEnter = false;
    this.selected_School_list = "";
    this.selectedRank = "";
    this.rankReadble = false;
    this.isDataAvailble = false;
    this.genderReadble = true;
    this.schoolOptions = [];
    // this.gameOptions = [];
    this.subGameoptions = [];
    this.showMapData = false;
    this.mapGameArray = [];
    this.schoolReadble = false;
    this.isShowSubGame = false;
    this.isShowStudent = false;
    this.printmeritData = false;
    this.isAddNewStudent = false;
    // this.minDate = this.issoUtilService.setDateOfBirthValidation(Number(this.selectedAge));
    this.minDate = this.issoUtilService.setDateOfBirthValidationForAdmin(
      Number(this.selectedAge),
      this.yearvalue
    );
    this.yearRange = this.issoUtilService.setYearRangeForAdmin(
      this.selectedAge,
      this.yearvalue
    );
    console.log("Im raeayrabge--->" + this.yearRange);
  }
  setFiletrSubGame(event) {
    if (event !== null) {
      this.studentService.subGameListById(event).subscribe(
        (response) => {
          if (response !== "") {
            this.subGameList = response;
            if (this.subGameList.length > 0) {
              this.showFilterSubGame = true;
              //   this.isShowSubGame = true;
              this.filterSubGameList = [];
              this.filterSubGameList.push({
                label: "Select Subgame",
                value: "",
              });
              this.subGameList.forEach((element) => {
                this.filterSubGameList.push({
                  label: element.subGameName,
                  value: element.subgameId,
                });
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
  addNewStudent(event: Event, studentData: Student, type: any) {
    if (this.displaySearch) {
      this.isCancelForm = true;
    } else {
      this.isCancelForm = false;
    }
    this.displaySearch = false;
    this.selectedEvent = "";
    this.selectedGame = "";
    this.gameReadble = false;
    this.ageReadble = false;
    this.genderReadble = false;
    this.eventReadable = false;
    this.schoolReadble = false;
    this.schoolEnter = false;
    this.display = true;
    this.loadAllSchool();
    this.goBackBUtton = false;
    this.showSearchResult = false;
    console.log("Stydent data" + JSON.stringify(studentData));
    this.showStudentCount = false;
    this.showDropDown = false;

    this.url = false;
    if (type == "edit") {
      //   this.isEdit = true;
      this.newSchoolId = studentData.schoolId;
      console.log("EDItthis.newSchoolId------------------>" + this.newSchoolId);
      this.isValidFile = true;
      this.isEditStudent = true;
      (this.studentPhoto = studentData.photo),
        (this.minDate = this.issoUtilService.setDateOfBirthValidationForAdmin(
          Number(studentData.ageRange),
          this.yearvalue
        ));
      this.yearRange = this.issoUtilService.setYearRangeForAdmin(
        studentData.ageRange,
        this.yearvalue
      );
      this.isAddNewStudent = true;
      this.isShowSubGame = false;
      this.mapGameArray = [];
      this.eventIdForStudent = studentData.eventId;
      this.eventYear = studentData.event_year;
      console.log("Im year--->" + this.eventYear);
      this.eventName = studentData.eventName;
      this.ageValue = studentData.ageRange;
      (this.editStudentPhoto = studentData.photo),
        (this.selectedAge = this.ageValue);
      this.genderValue = studentData.gender;
      //  this.tShirtSize: studentData.tShirtSize,
      // this.curriculum: studentData.curruclm;
      this.selectedGender = studentData.gender;
      this.gameType = studentData.gameType;
      if (studentData.gender == "1") {
        this.genderValue = "Boy";
        this.genderForSubGame = "boy";
      } else {
        this.genderValue = "Girl";
        this.genderForSubGame = "girl";
      }

      if (
        studentData.gameType == "Team" ||
        studentData.gameType == "Individual"
      ) {
        this.showMapData = false;
        this.mapGameArray = [];
      } else {
        this.showMapData = true;
      }
      this.gameId = studentData.gameId;
      this.selectedAge = this.ageValue;

      if (studentData.subgameId !== "undefined") {
        this.subGameIdArray = [];
        this.subGameNameArray = [];
        this.setSubGameForEdit();

        const subGameIdArray = studentData.subgameId.split(",");
        const subGameNameArray = studentData.subGameName.split(",");
        this.mapGameArray = [];
        this.isShowSubGame = true;
        const gameArry = studentData.subgameId;
        const subGameName = studentData.subGameName;
        this.newGameArray = gameArry.split(",");
        this.newSubGameArray = subGameName.split(",");

        for (let i = 0; i < this.newGameArray.length; i++) {
          this.mapGameArray.push({
            subGameId: this.newGameArray[i],
            subGameName: this.newSubGameArray[i],
          });
          this.subGameIdArray.push(subGameIdArray[i]);
          this.subGameNameArray.push(subGameNameArray[i]);
        }

        if (
          studentData.gameType == "Team" ||
          studentData.gameType == "Individual"
        ) {
          if (this.mapGameArray.length > 0) {
            this.showMapData = true;
          } else {
            this.showMapData = false;
          }
          this.mapGameArray.splice(
            this.newGameArray.length,
            this.mapGameArray.length
          );
        }

        //  this.setSubGame();
      }
      (this.sId = studentData.sId),
        (this.student_Name = studentData.studentName);
      this.father_Name = studentData.fatherName;
      this.gameValue = studentData.gameId;
      this.gameNameForEditStudent = studentData.gameName;
      this.dateOf_Birth = new Date(studentData.dateOfBirth);
      this.admission_Number = studentData.admissionNumber;
      this.selectedClass = studentData.standardClass;
      this.aadharNumber = studentData.aadharNumber;
      this.schoolName = studentData.schoolName;
      (this.selectedtShirtSize = studentData.tShirtSize),
        (this.curriculum = studentData.curruclm),
        this.schoolForm.setValue({
          schoolId: studentData.schoolId,
          studentYear: "",
          sId: studentData.sId,
          studentEvent: studentData.studentName,
          studentGame: "",
          studentSubGame: "",
          studentAge: "",
          studentGender: "",
          schoolName: studentData.schoolName,
          studentName: studentData.studentName,
          fatherName: studentData.fatherName,
          dateOfBirth: new Date(studentData.dateOfBirth),
          admissionNumber: "",
          standardClass: studentData.standardClass,
          aadharNumber: studentData.aadharNumber,
          tShirtSize: studentData.tShirtSize,
          curriculum: studentData.curruclm,
          studentPhoto: "",
          editStudentPhoto: [],
          subGameID: [""],
          subGameNames: [""],
          profile: "",
        });
      this.subViewTitle = "Edit Student";
    } else {
      this.isAddNewStudent = false;
      this.initialForm();

      this.isEditStudent = false;
      this.schoolForm.setValue({
        studentYear: "",
        sId: "",
        schoolId: "",
        studentEvent: "",
        studentGame: "",
        studentSubGame: "",
        studentAge: "",
        studentGender: "",
        schoolName: "",
        studentName: "",
        fatherName: "",
        dateOfBirth: "",
        admissionNumber: "",
        standardClass: "",
        aadharNumber: "",
        studentPhoto: "",
        subGameID: [""],
        subGameNames: [""],
        profile: "",
      });
      this.subViewTitle = "Add New Student";
    }
    this.display = true;
  }
  searchGlobal() {
    this.displaySearch = true;
    this.display = false;
    this.showDropDown = false;
    this.studentGrid = false;
    this.showStudentCount = false;
    this.goBackBUtton = true;
    this.globalSchoolOption = [];
    this.globalSchoolReadble = false;
    this.searchForm.setValue({
      search_text: "",
    });
  }
  goBack() {
    this.noSearchData = false;
    this.studentGrid = true;
    this.showDropDown = true;
    this.displaySearch = false;
    this.showSearchResult = false;
    this.eventReadable = true;
    this.schoolReadble = true;
  }
  removeMappedData(i: number): void {
    this.mapGameArray.splice(i, 1);
    this.subGameIdArray.splice(i, 1);
    this.subGameNameArray.splice(i, 1);
    //this.saveEventMapArray.splice(i, 1);
    if (this.mapGameArray.length == 0) {
      this.showMapData = false;
      this.isAddNewStudent = false;
    }
  }
  makeEmptyForm() {
    this.showMapData = false;
    this.mapGameArray = [];
    this.url = "";
    this.dateOf_Birth = null;
    this.father_Name = "";
    this.admission_Number = "";
    this.selectedClass = "";
    this.aadharNumber = "";
    this.student_Name = "";
    // this.dateOf_Birth  = new Date();
    this.isShowSubGame = false;
    this.editStudentPhoto = "";
    this.ageRange = this.issoUtilService.setAge();
    this.ageOptions = this.issoUtilService.setAge();
    this.standardClass = this.issoUtilService.setClass();
  }
  getRowClass(rowData: any): string {
    //console.log()
    return rowData.isPresent === "1" ? "row-warning" : "";
  }
  setSubGame() {
    // this.makeEmptyForm()
    //  this.addClass = false;
    this.subGameIdArray = [];
    this.subGameNameArray = [];
    this.checkSubGameCapacity = [];
    // this.ageRange = ageRange;
    // this.gameId = gameId;
    this.mapGameArray = [];
    this.isSubGameSelected = false;

    if (this.selectedGender == "1") {
      this.genderForSubGame = "boy";
      this.genderValue = "boy";
    }
    if (this.selectedGender == "2") {
      this.genderForSubGame = "girl";
      this.genderValue = "girl";
    }
    // this.genderForSubGame = this.selectedGender;
    this.isShowSubGame = true;
    this.subGameoptions = [];
    // const gameID = gameId.replace(/'/g, "")
    this.studentEnrollmentService
      .getSubGameData(
        this.gameId,
        this.selectedAge,
        this.genderForSubGame,
        "admin"
      )
      .subscribe(
        (response) => {
          if (response !== "") {
            this.subGameList = response;
            this.subGameoptions = [];
            this.subGameoptions.push({
              label: "select subgame",
              value: "",
            });
            this.subGameList.forEach((element) => {
              if (element.gameType === "Team" && element.eleven_boys > 0) {
                this.mapSubGameTeam.push({
                  subGameId: element.id,
                  subGameName: element.subGameName,
                  subGameCapacity: element.eleven_boys,
                  minCapacity: element.min_eleven_boys,
                  subGameType: element.gameType,
                });
              } else if (
                element.gameType === "Team" &&
                element.eleven_girls > 0
              ) {
                this.mapSubGameTeam.push({
                  subGameId: element.id,
                  subGameName: element.subGameName,
                  subGameCapacity: element.eleven_girls,
                  minCapacity: element.min_eleven_boys,
                  subGameType: element.gameType,
                });
              } else if (
                element.gameType === "Team" &&
                element.fourteen_boys > 0
              ) {
                this.mapSubGameTeam.push({
                  subGameId: element.id,
                  subGameName: element.subGameName,
                  subGameCapacity: element.fourteen_boys,
                  minCapacity: element.min_fourteen_boys,
                  subGameType: element.gameType,
                });
              } else if (
                element.gameType === "Team" &&
                element.fourteen_girls > 0
              ) {
                this.mapSubGameTeam.push({
                  subGameId: element.id,
                  subGameName: element.subGameName,
                  subGameCapacity: element.fourteen_girls,
                  minCapacity: element.min_fourteen_girls,
                  subGameType: element.gameType,
                });
              } else if (
                element.gameType === "Team" &&
                element.sixteen_boys > 0
              ) {
                this.mapSubGameTeam.push({
                  subGameId: element.id,
                  subGameName: element.subGameName,
                  subGameCapacity: element.sixteen_boys,
                  minCapacity: element.min_sixteen_boys,
                  subGameType: element.gameType,
                });
              } else if (
                element.gameType === "Team" &&
                element.sixteen_girls > 0
              ) {
                this.mapSubGameTeam.push({
                  subGameId: element.id,
                  subGameName: element.subGameName,
                  subGameCapacity: element.sixteen_girls,
                  minCapacity: element.min_sixteen_girls,
                  subGameType: element.gameType,
                });
              } else if (
                element.gameType === "Team" &&
                element.seventeen_boys > 0
              ) {
                this.mapSubGameTeam.push({
                  subGameId: element.id,
                  subGameName: element.subGameName,
                  subGameCapacity: element.seventeen_boys,
                  minCapacity: element.min_seventeen_boys,
                  subGameType: element.gameType,
                });
              } else if (
                element.gameType === "Team" &&
                element.seventeen_girls > 0
              ) {
                this.mapSubGameTeam.push({
                  subGameId: element.id,
                  subGameName: element.subGameName,
                  subGameCapacity: element.seventeen_girls,
                  minCapacity: element.min_seventeen_girls,
                  subGameType: element.gameType,
                });
              } else if (
                element.gameType === "Team" &&
                element.ninteen_boys > 0
              ) {
                this.mapSubGameTeam.push({
                  subGameId: element.id,
                  subGameName: element.subGameName,
                  subGameCapacity: element.ninteen_boys,
                  minCapacity: element.min_ninteen_boys,
                  subGameType: element.gameType,
                });
              } else if (
                element.gameType === "Team" &&
                element.ninteen_girls > 0
              ) {
                this.mapSubGameTeam.push({
                  subGameId: element.id,
                  subGameName: element.subGameName,
                  subGameCapacity: element.ninteen_girls,
                  minCapacity: element.min_ninteen_girls,
                  subGameType: element.gameType,
                });
              }
              if (element.eleven_boys > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.eleven_boys +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.eleven_girls > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.eleven_girls +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.fourteen_boys > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.fourteen_boys +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.fourteen_girls > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.fourteen_girls +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.sixteen_boys > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.sixteen_boys +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.sixteen_girls > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.sixteen_girls +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.seventeen_boys > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.seventeen_boys +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.seventeen_girls > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.seventeen_girls +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.ninteen_boys > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.ninteen_boys +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.ninteen_girls > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.ninteen_girls +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              }
            });

            console.log("Im subgame" + JSON.stringify(this.subGameoptions));
          }
          if (this.subGameList.length > 0) {
            this.isShowSubGame = true;
            this.subGameCount = 0;
            for (let i = 0; i < this.subGameList.length; i++) {
              // console.log('VALUE+++++++>'+this.subGameResponseData[i]['eleven_girls'])
              //  if (category == 'eleven_boys' || category == 'eleven_girls' || category == 'fourteen_boys' || category == 'fourteen_girls' ||category == 'seventeen_boys' ||category == 'seventeen_girls' ||category == 'ninteen_boys' ||category == 'ninteen_girls') {
              if (
                this.subGameList[i]["eleven_boys"] === "0" ||
                this.subGameList[i]["eleven_girls"] === "0" ||
                this.subGameList[i]["fourteen_boys"] === "0" ||
                this.subGameList[i]["fourteen_girls"] === "0" ||
                this.subGameList[i]["seventeen_boys"] === "0" ||
                this.subGameList[i]["seventeen_girls"] === "0" ||
                this.subGameList[i]["ninteen_boys"] === "0" ||
                this.subGameList[i]["ninteen_girls"] === "0"
              ) {
                this.subGameCount++;
                console.log("imtrrew");
                // break;
              } else {
                console.log("im false");
                // this.showSubGameErrorMsg =true;
              }
              //  }
            }
            if (this.subGameCount == this.subGameList.length) {
              this.isShowSubGame = false;
              this.isAddNewStudent = false;
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "No subgame available",
              });
            } else {
              this.isAddNewStudent = false;
              console.log("Im game count==>" + this.subGameCount);
              // this.testBo= true
              // this.showStudentEnrollForm = true;
              // this.showGoBack = false
              this.showSubGameList = true;
              // this.subGameResponseData;
              // this.showSubGameErrorMsg = false;
            }
          } else {
            this.isAddNewStudent = false;
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: "No subgame available",
            });
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }
  setSubGameForEdit() {
    this.studentEnrollmentService
      .getSubGameData(
        this.gameId,
        this.selectedAge,
        this.genderForSubGame,
        "admin"
      )
      .subscribe(
        (response) => {
          if (response !== "") {
            this.subGameList = response;
            this.subGameoptions = [];
            this.subGameoptions.push({
              label: "Select subgame",
              value: "",
            });
            this.subGameList.forEach((element) => {
              if (element.eleven_boys > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.eleven_boys +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.eleven_girls > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.eleven_girls +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.fourteen_boys > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.fourteen_boys +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.fourteen_girls > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.fourteen_girls +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.seventeen_boys > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.seventeen_boys +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.seventeen_girls > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.seventeen_girls +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.ninteen_boys > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.ninteen_boys +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              } else if (element.ninteen_girls > 0) {
                const gameIdAndName =
                  element.id +
                  "," +
                  element.subGameName +
                  "," +
                  element.ninteen_girls +
                  "," +
                  element.gameType;
                this.subGameoptions.push({
                  label: element.subGameName,
                  value: gameIdAndName,
                });
              }
            });

            console.log("Im subgame" + JSON.stringify(this.subGameoptions));
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }
  loadAllSchool() {
    this.studentService.loadAllSchool().subscribe(
      (response) => {
        if (response !== "") {
          this.schoolListResponse = response;
          this.schoolListArray = this.schoolListResponse;
          this._radioDevicesList = this.schoolListArray;
        } else {
          console.log("Data is blannk from service");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  hideExtraView() {
    this.display = false;
    this.showDropDown = true;
  }

  searchAvailableRadioList(selected): void {
    console.log("Selected value" + selected);
    let upperCase = selected.toUpperCase();
    let schoolIdVal;
    // console.log(selected.toUpperCase( ));
    this.radioDevicesList = this._radioDevicesList.filter((r) =>
      r.text.includes(selected)
    );
    console.log("schoolName" + JSON.stringify(this.radioDevicesList));
    schoolIdVal = this._radioDevicesList.find((r) =>
      r.id.includes(this.radioDevicesList)
    );
    console.log("schoolIdVal" + schoolIdVal);
  }

  // onPageSelect(evt:any){
  //   console.log(evt.url);
  // }

  // filterPages(event) {
  //   this.filteredPages = this.filterCountry(event.query, this.list);
  // }

  // filterCountry(query, countries: any[]): any[] {
  //   //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  //   let filtered: any[] = [];
  //   for (let i = 0; i < countries.length; i++) {
  //     let country = countries[i];
  //     if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
  //       filtered.push(country);
  //     }
  //   }
  //   return filtered;
  // }

  onTestSelect(evt: any) {
    console.log(evt.id);
    this.newSchoolId = evt.id;
  }

  onPageSelect(evt: any) {
    console.log(evt.id);
    // this.schoolId = evt.id;
    this.newSchoolId = evt.id;
    console.log("Value" + JSON.stringify(evt));
    this.isAddNewStudent = false;
    // this.selectedGame = '';
    this.checkCapacity();
  }

  filterPages(event) {
    this.filteredPages = this.filterCountry(event.query, this.schoolListArray);
  }
  chkZeroVal(event: any) {
    console.log("hiiiii==>" + event);
  }
  filterCountry(query, countries: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.text.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    if (filtered.length <= 0) {
      this.schoolName = "";
    }
    return filtered;
  }

  onSubmit() {
    console.log("this.newSchoolId------------------>" + this.newSchoolId);
    this.submitted = true;
    this.studentDataArray = [];
    console.log(this.eventValue);
    this.eventValue = this.eventIdForStudent;
    let subGameId;
    let subGameName;
    if (this.subGameIdArray.length > 0) {
      subGameId = this.subGameIdArray.toString();
      subGameName = this.subGameNameArray.toString();
    }
    this.studentDataArray.push(
      this.eventValue,
      this.gameId,
      this.subGameId,
      this.selectedAge,
      this.selectedGender,
      this.newSchoolId
    );
    console.log(this.studentDataArray);
    let eventId = this.eventValue;
    const formData = new FormData();
    let schoolID = this.newSchoolId;
    let datOfbirth = this.schoolForm.get("dateOfBirth").value;
    let formatted_DOB =
      datOfbirth.getFullYear() +
      "-" +
      (datOfbirth.getMonth() + 1) +
      "-" +
      datOfbirth.getDate();

    formData.append("sId", this.schoolForm.get("sId").value);
    formData.append("studentData", JSON.stringify(this.studentDataArray));
    formData.append("studentName", this.schoolForm.get("studentName").value);
    formData.append("fatherName", this.schoolForm.get("fatherName").value);
    formData.append("dateOfBirth", formatted_DOB);
    formData.append(
      "editStudentPhoto",
      this.schoolForm.get("editStudentPhoto").value
    );
    formData.append("tShirtSize", this.schoolForm.get("tShirtSize").value);
    formData.append("curriculum", this.schoolForm.get("curriculum").value);

    if (
      this.schoolForm.get("profile").value == "" ||
      this.schoolForm.get("profile").value ==
        "C:\\fakepath\\" + this.studentPhoto ||
      this.schoolForm.get("profile").value == this.studentPhoto
    ) {
      formData.append("fileNoChange", "1");
      formData.append("oldPhotoName", this.studentPhoto);
    } else {
      formData.append("fileNoChange", "0");
      formData.append(
        "profile",
        this.profileForm.get("profile").value,
        this.fullFilename
      );
    }
    //formData.append('profile', this.profileForm.get('profile').value, this.fullFilename);
    formData.append(
      "admissionNumber",
      this.schoolForm.get("admissionNumber").value
    );
    formData.append(
      "standardClass",
      this.schoolForm.get("standardClass").value
    );
    // formData.append('studentPhoto', this.schoolForm.get('studentPhoto').value);
    formData.append("aadharNumber", this.schoolForm.get("aadharNumber").value);
    formData.append("schoolId", this.newSchoolId);
    // formData.append('subGameID', subGameId);
    // formData.append('subGameNames', subGameName);

    formData.append("ageRange", this.selectedAge);
    formData.append("gender", this.selectedGender);
    formData.append("gameId", this.gameValue);
    formData.append("eventId", this.eventValue);
    formData.append("eventYear", this.yearvalue);
    //   formData.append('passPort',govtIdPassport);

    formData.append("subGameID", subGameId);
    formData.append("subGameNames", subGameName);

    if (!this.isEditStudent) {
      this.studentService.saveStudentData(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.messageService.add({
              severity: "error",
              summary: "Error Message",
              detail: "Validation failed",
            });
          } else {
            this.messageService.add({
              key: "custom",
              severity: "success",
              summary: "New Student Added Successfully",
            });
          }
          this.display = false;
          this.getStudentData();
        },
        (error) => (this.error = error)
      );
    } else {
      this.studentService.updateStudentData(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.messageService.add({
              severity: "error",
              summary: "Error Message",
              detail: "Validation failed",
            });
          } else {
            this.messageService.add({
              key: "custom",
              severity: "success",
              summary: "Student Data Updated Successfully",
            });
            // this.newStudentData();
            // this.setFiletr();
            this.studentService
              .getCustomersLarge(this.eventValue, this.schoolvalue)
              .then((customers) => {
                this.customers = customers;
                this.loading = false;
                this.eventReadable = true;
                this.schoolReadble = true;
              });
            this.studentGrid = true;
            this.showDropDown = true;
          }
          this.display = false;

          // this.getStudentData();
        },
        (error) => (this.error = error)
      );
    }
  }
  newStudentData() {
    this.displaySearch = false;
    this.studentGrid = true;
    this.showDropDown = true;
    this.studentService
      .loadStudentDataByEvent(this.eventValue, this.schoolvalue)
      .subscribe(
        (response) => {
          if (response !== "") {
            this.schoolServiceData = response;
            this.schoolData = this.schoolServiceData;
            if (this.schoolData.length > 0) {
              this.showStudentCount = true;
              this.studentCount = this.schoolData.length;
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
  // onFileSelected(event) {
  //   // this.selectedFile = <File>event.target.files[0];
  //   if(event.target.files) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload=(event:any)=>{
  //       this.url=event.target.result;
  //     }
  //     var newName=(event.target.files[0].name).split('.').slice(0, -1).join('.')
  //     var removeSpace = newName.replace(/\s/g, "");
  //     var ext = (event.target.files[0].name).split('.').pop();
  //     this.fileName= Math.floor((Math.random() * 1000000000) + 1);
  //     this.fullFilename= removeSpace+this.fileName+'.'+ext;
  //    // this.blobName = this.fullFilename
  //     const profile = event.target.files[0];
  //     this.profileForm.get('profile').setValue(profile);

  //   }
  //  }

  onFileSelected(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      var newName = event.target.files[0].name
        .split(".")
        .slice(0, -1)
        .join(".");
      if (newName.indexOf(".") !== -1) {
        this.isMoreDot = true;
      } else {
        this.isMoreDot = false;
      }
      var removeSpace = newName.replace(/\s/g, "");
      var ext = event.target.files[0].name.split(".").pop();
      this.fileName = Math.floor(Math.random() * 1000000000 + 1);
      this.fullFilename = removeSpace + this.fileName + "." + ext;
      // this.blobName = this.fullFilename
      const profile = event.target.files[0];
      const fileType = profile.type;
      if (
        (ext == "png" ||
          ext == "PNG" ||
          ext == "jpeg" ||
          ext == "JPEG" ||
          ext == "JPG" ||
          ext == "jpg") &&
        !this.isMoreDot
      ) {
        //   if ((fileType == 'image/png' || fileType == 'image/jpeg' || fileType == 'image/PNG' || fileType == 'image/JPG' || fileType == 'image/JPG') && !this.isMoreDot) {
        this.isValidFile = true;
      } else {
        this.isValidFile = false;
        this.selectedProfile = "";
        if (document.getElementById("my-input")) {
          let control2 = this.schoolForm.get("profile");
          control2.setValue(null);
          control2.setValidators([Validators.required]);
          control2.updateValueAndValidity();
        }
      }
      if (profile.size > 102400) {
        this.isFileBig = true;
        this.selectedProfile = "";
        if (document.getElementById("my-input")) {
          let control2 = this.schoolForm.get("profile");
          control2.setValue(null);
          control2.setValidators([Validators.required]);
          control2.updateValueAndValidity();
        }
      } else {
        this.isFileBig = false;
      }
      this.profileForm.get("profile").setValue(profile);
    }
  }

  deleteSchoolData(event: Event, schoolData: Student) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-delete-school",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete student data?",
      accept: () => {
        this.deleteSchool(schoolData);
      },
    });
  }

  private _deleteSchoolData() {
    this.messageService.add({
      key: "custom",
      severity: "success",
      summary: "Student Data Deleted Successfully",
    });
  }

  deleteSchool(School) {
    let studentID = School.sId;

    this.studentEnrollmentService.deleteStudent(studentID).subscribe(
      (res) => {
        this.messageService.add({
          key: "custom",
          severity: "success",
          summary: "Student Data Deleted Successfully",
        });
        this.studentService
          .getCustomersLarge(this.eventValue, this.schoolvalue)
          .then((customers) => {
            this.customers = customers;
            this.loading = false;
            this.eventReadable = true;
            this.schoolReadble = true;
          });
      },
      (error) => (this.error = error)
    );

    //   this.studentService.deleteSchool(schoolId).subscribe(
    //    res => {
    //      //  if (res.status !== 'error') {
    //      //    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
    //      //  } else {
    //          this.messageService.add({key: 'custom', severity:'success', summary: 'Student Data Deleted Successfully'});

    //      //  }

    //      this.display =false
    //      this.getStudentData();
    //    },
    //    error => this.error = error
    //  );
  }

  private _dropDatabase() {
    console.log("Database dropped");
  }
}
