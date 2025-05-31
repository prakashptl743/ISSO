import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { StudentEnrollmentService } from "../../staffadmin/service/student-enrollment.service";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { IssoUtilService } from "../../services/isso-util.service";
import { MessageService, SelectItem, Message } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { Checkbox } from "primeng/checkbox";
import { HttpClient } from "@angular/common/http";
import { ViewChildren, QueryList } from "@angular/core";
import { element } from "protractor";
import { MenuItem } from "primeng/api";
import { ElementRef, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { environment } from "src/environments/environment";
import { EventService } from "../service/event.service";
@Component({
  selector: "app-student-enrollment",
  templateUrl: "./student-enrollment.component.html",
  styleUrls: ["./student-enrollment.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class StudentEnrollmentComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  profileForm: FormGroup;
  parentMessage = "message from parent";
  messages1: Message[] | undefined;

  categories1: any[] = [
    { name: "Accounting", key: "A" },
    { name: "sds", key: "M" },
    { name: "Production", key: "P" },
    { name: "Research", key: "R" },
  ];

  checked: boolean = false;
  display: boolean = false;
  gameList: any;
  studentListArray = [];
  studentDataArray = [];
  categories = [];
  noGameAvailable: boolean = false;
  submitted = false;
  error: string;
  studentEnroolForm: FormGroup;
  gameData: string;
  gameResponseData: any;
  subGameResponseData: any;
  gameResponseData1: Object;
  subGameoptions: SelectItem[];
  gameForm: FormGroup;
  ageRange;
  standardClass;
  tShirtSize;
  curriculum;
  contactNo;
  //gameCapacityArray= any;
  newGameArray = [];
  showStudentEnrollForm: boolean = false;
  panelHeading: string;
  gender: any;
  gameId: any;
  eventId: string;
  isStudentListShow: boolean;
  showIsNri: boolean;
  submitButtonLabel: string;
  isChecked: string;
  theCheckbox = false;
  marked = false;
  showNRI: boolean = false;
  showAadharTextBox: boolean = true;
  studentName: string;
  fatherName: string;
  admissionNo: string;
  subGameNames: any[];
  datOfBirth: string;
  selectedClass: string;
  selectedtShirtSize: string;
  selectedCurriculm: string;
  selectedSubGame: string;
  selectedProfile: string;
  studentId: string;
  editStudentPhoto: string;
  passport: string;
  aadhar: string;
  setCapacity: number;
  selectedFile: File = null;
  public updated = false;
  schoolId: any;
  stdNameReadable: boolean;
  aadharNumber: number;
  fatherNameReadable: boolean;
  showSubGameList: boolean;
  showGoBack: boolean;
  gameIdArray = [];
  subGameIdArray = [];
  mapGameArray = [];
  mapSubGameTeam = [];
  incompleteTeamSubGame = [];
  // selectedFeatures: any = [];
  checkSubGameCapacity: any = [];
  subGameNameArray = [];
  testBo: boolean;
  showSubGameErrorMsg: boolean;
  showSubGame: boolean;
  selectedCategories1: any[];
  url: any;
  fileName: number;
  fullFilename: string;
  blobName = [];
  subGameNameVal = [];
  subGame: any;
  arr = [];
  subGameCount = 0;
  files: any[];
  // photoUrl: any;
  //photoUrl='C:/xampp/htdocs/isso-php/isso-php/upload/Nirvan_Ritesh_Uttamchandani12504486156.jpg';
  photoUrl = "1566708197SHAINAAGARWAL.jpg";
  subGameButton: boolean;
  myString: any;
  addClass: boolean;
  subGameId: number;
  subGameCapacity: any;
  showMapData: boolean;
  isDuplicate: any;
  isSubGameSelected: boolean;
  newSubGameCapacity = [];
  testArray = [];
  studentEnrollData = [];
  studentSubgameData = [];
  selectedSubGame1: string;
  toalSubGameSelected: boolean;
  minCapcity: number;
  remainingCapacity: number;
  minDate: Date;
  eventBookForm: FormGroup;
  maxDate: Date;
  minDateOfBirth: Date;
  yearRange: string;
  isValidFile: boolean = true;
  isFileBig: boolean = false;
  gameType: any;
  isEdit: boolean;
  ageCategory: number = 0;
  subGameType: any;
  @ViewChild("studentNameText", { static: false }) studentNameText: ElementRef;
  studentPhoto: any;
  setPhotoYear: string;
  registerForm: FormGroup;
  isMoreDot: boolean;
  eventYear: string;
  serverUrl = environment.baseUrl;
  bookingId: Object;
  eventDayDiff: number;
  testvar: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer,
    private router: Router,
    private fb: FormBuilder,
    private pb: FormBuilder,
    private issoUtilService: IssoUtilService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private confirmation: ConfirmationService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private studentEnrollmentService: StudentEnrollmentService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.addClass = false;
    this.selectedCategories1 = this.categories1.slice(2, 4);
    this.showGoBack = true;
    // this.eventId = this.route.snapshot.paramMap.get('eventId');
    // this.eventYear = this.route.snapshot.paramMap.get('eventYear');

    this.eventId = localStorage.getItem("eventId");
    this.eventYear = localStorage.getItem("eventYear");
    console.log("eventID==>" + this.eventId);
    console.log("YEAR==>" + this.eventYear);
    this.schoolId = localStorage.getItem("schoolId");
    this.loadGameData(this.eventId);
    this.initialiseForm();
    this.initialForm();
    this.fileUpladForm();
    this.testfun1();
    // this.checkDateDiff();
    this.setPhotoPath();
    this.eventDayDiff = Number(localStorage.getItem("dateDiff"));
    console.log("Im localstorage-->" + this.eventDayDiff);
  }

  get f1() {
    return this.registerForm.controls;
  }
  setPhotoPath() {
    this.setPhotoYear = this.serverUrl + "upload/" + this.eventYear;
  }
  setFocus(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      this[id].nativeElement.focus();
    }
  }
  setDateOfBirth() {
    var date = new Date();
    var newdate = new Date(date);
    newdate.setDate(newdate.getDate() + 1);
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    if (dd === 1) {
      var dd1 = 1;
    } else {
      var dd1 = dd - (dd - 1);
    }
    if (mm === 1) {
      var mm1 = 1;
    } else {
      var mm1 = mm - (mm - 1);
    }
    var y = newdate.getFullYear() - 10;
    var someFormattedDate = dd1 + "/" + mm1 + "/" + y;
    console.log(someFormattedDate);
    this.minDate = new Date(someFormattedDate);
    this.yearRange = `${new Date().getFullYear() - 10}:${
      new Date().getFullYear() - 7
    }`;
  }
  testfun1() {
    var a = [],
      b = [],
      prev;

    // this.arr.sort();
    for (var i = 0; i < this.arr.length; i++) {
      if (this.arr[i] !== prev) {
        a.push(this.arr[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = this.arr[i];
    }
    console.log("Hello" + [a, b]);
    // return [a, b];
  }
  fileUpladForm() {
    this.profileForm = this.pb.group({
      name: [""],
      profile: [""],
    });
  }

  initialiseForm() {
    this.eventBookForm = this.fb.group({
      eventId: [""],
      schoolId: [""],
      gameId: [""],
      ageRange: [""],
      gender: [""],
    });
    this.gameForm = this.fb.group({
      gameDescription: [""],
    });
  }
  get f() {
    return this.studentEnroolForm.controls;
  }
  initialForm() {
    console.log("im called");
    this.url = "";
    this.isValidFile = true;
    this.ageRange = this.issoUtilService.setAge();
    this.standardClass = this.issoUtilService.setClass();
    this.tShirtSize = this.issoUtilService.setTshirtSize();
    this.studentEnroolForm = this.fb.group({
      schoolId: [""],
      studentId: [""],
      editStudentPhoto: [],
      studentName: ["", Validators.required],
      fatherName: ["", Validators.required],
      tShirtSize: ["", Validators.required],
      curriculum: ["", Validators.required],
      // dateOfBirth: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],

      dateOfBirth: ["", Validators.required],
      standardClass: ["", Validators.required],
      contactNo: [""],
      profile: ["", Validators.required],
      ageRange: [""],
      aadharNumber: [""],
      admissionNo: [""],
      passPort: [""],
      gameId: [""],
      subGameID: [""],
      subGameNames: [""],
      eventId: [""],
      schoolName: [""],
    });
    this.submitButtonLabel = "Submit";
  }
  checkDateofBirth(event) {
    console.log(event);
  }
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
      var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "");
      var ext = event.target.files[0].name.split(".").pop();
      this.fileName = Math.floor(Math.random() * 1000000000 + 1);
      this.fullFilename = removeSpecialChar + this.fileName + "." + ext;

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
        this.isValidFile = true;
      } else {
        this.isValidFile = false;
        this.selectedProfile = "";
        if (document.getElementById("my-input")) {
          let control2 = this.studentEnroolForm.get("profile");
          control2.setValue(null);
          control2.setValidators([Validators.required]);
          control2.updateValueAndValidity();
        }
      }
      if (profile.size > 102400) {
        this.isFileBig = true;
        this.selectedProfile = "";
        if (document.getElementById("my-input")) {
          let control2 = this.studentEnroolForm.get("profile");
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

  onSubmit1() {
    const formData = new FormData();
    formData.append("name", this.profileForm.get("name").value);
    formData.append(
      "profile",
      this.profileForm.get("profile").value,
      this.fullFilename
    );

    //formData.append('profile', this.profileForm.get('profile').value);

    this.studentEnrollmentService.upload(formData).subscribe(
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
            summary: "Photo upload Successfully",
          });
        }
      },
      (error) => (this.error = error)
    );
  }

  loadGameData(eventId) {
    this.studentEnrollmentService.loadGameByEvent(eventId).subscribe(
      (response) => {
        if (response !== "") {
          this.gameList = response;
          console.log("Hello===>" + JSON.stringify(this.gameList));
          if (this.gameList.length > 0) {
            this.noGameAvailable = false;
            this.getAgeCapacityForGame(this.gameList);
          } else {
            this.noGameAvailable = true;
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

  goBack() {
    this.studentEnroolForm.reset();
    this.router.navigateByUrl("/staffadmin/event-dashboard");
  }

  getAgeCapacityForGame(gameData: any) {
    gameData.forEach((element) => {
      this.gameIdArray.push(Number(element.gameId));
    });

    console.log("NEW====>" + JSON.stringify(this.gameIdArray));
    let gameobj = { ggg: [] };
    gameobj.ggg = this.newGameArray;

    gameobj.ggg = [134, 133];
    // console.log('saasss====>'+JSON.stringify(gameobj.ggg));
    const formData = new FormData();
    formData.append("eventId", this.eventId);
    formData.append("gameDescription", JSON.stringify(this.gameIdArray));
    this.studentEnrollmentService.getGameData(formData).subscribe(
      (response) => {
        if (response !== "") {
          this.gameResponseData = response;

          for (let i = 0; i <= this.gameResponseData.length; i++) {
            // this.gameResponseData.push(this.gameIdArray);
          }
          console.log("NEW DATA===>" + JSON.stringify(this.gameResponseData));
          // this.arrangeSubGame(this.gameResponseData);
        } else {
          alert("im blankl=");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }

  showDialog(eventData: any) {
    // this.initialForm();
    this.eventId = eventData.eventId;
    this.eventYear = eventData.event_year;

    this.display = true;
  }
  onEventConfirm() {
    this.display = false;
    const formData = new FormData();

    formData.append("eventId", this.eventId);
    formData.append("schoolId", this.schoolId);
    formData.append("gameId", this.gameId);
    formData.append("ageRange", this.ageRange);
    formData.append("gender", this.gender);

    this.studentEnrollmentService.bookEventData(formData).subscribe(
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
            summary: "Event Booked Successfully",
          });
        }
      },
      (error) => (this.error = error)
    );
  }
  onEventCancel() {
    // alert('sdgs')
    this.display = false;
  }
  onCencelEvent() {
    this.confirmation.confirm({
      key: "confirm-team-delete",
      icon: "pi pi-info-circle",
      message: "Are you sure to cancel this team confirmation?",
      accept: () => {
        this.makeEmptyForm();
        this.cancelBooking();
      },
    });
  }
  cancelBooking() {
    this.studentEnrollmentService
      .cancelBooking(Number(this.bookingId))
      .subscribe(
        (res) => {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Data Deleted Successfully",
          });
          this.showStudentEnrollForm = false;
          this.testBo = false;
          this.makeEmptyForm();
        },
        (error) => (this.error = error)
      );
  }
  testfun(eventData: any, capacity: any, minCapcity, gender: any, ageRange) {
    this.initialForm();
    this.studentEnrollData = [];
    this.studentSubgameData = [];
    this.ageRange = ageRange;
    this.gameId = eventData.gameId;
    if (capacity > 0 && gender == "boy") {
      this.panelHeading = eventData.gameName + " " + "Boys Under " + ageRange;
      this.gender = "1";
      this.setCapacity = capacity;
    }
    if (capacity > 0 && gender == "girl") {
      this.panelHeading = eventData.gameName + " " + "Girls Under " + ageRange;
      this.gender = "2";
      this.setCapacity = capacity;
    }
    this.studentEnrollData = [
      this.eventId,
      eventData.gameId,
      this.gender,
      ageRange,
      minCapcity,
      capacity,
      eventData.gameType,
    ];
    console.log("Im data-->" + this.studentEnrollData);
    if (eventData.gameType == "Team") {
      if (this.eventDayDiff >= 15) {
        this.studentEnrollmentService
          .getEventBookData(
            this.eventId,
            this.schoolId,
            eventData.gameId,
            this.ageRange,
            this.gender
          )
          .subscribe(
            (response) => {
              if (response !== "false") {
                this.bookingId = response;
                this.showStudentEnrollForm = true;
                this.display = false;
                this.testBo = true;
                this.gameType = eventData.gameType;
                this.showGoBack = false;
                this.showSubGameList = false;
                this.minDate =
                  this.issoUtilService.setDateOfBirthValidation(ageRange);
                this.yearRange = this.issoUtilService.setYearRange(ageRange);
                this.minCapcity = minCapcity;
                this.loadStudentData();
                this.makeEmptyForm();
              } else {
                this.display = true;
                this.showStudentEnrollForm = false;
              }
            },
            (error) => (this.error = error)
          );
      } else {
        this.studentEnrollmentService
          .getEventBookData(
            this.eventId,
            this.schoolId,
            eventData.gameId,
            this.ageRange,
            this.gender
          )
          .subscribe(
            (response) => {
              if (response !== "false") {
                this.bookingId = response;
                this.showStudentEnrollForm = true;
                this.display = false;
                this.testBo = true;
                this.gameType = eventData.gameType;
                this.showGoBack = false;
                this.showSubGameList = false;
                this.minDate =
                  this.issoUtilService.setDateOfBirthValidation(ageRange);
                this.yearRange = this.issoUtilService.setYearRange(ageRange);
                this.minCapcity = minCapcity;
                this.loadStudentData();
                this.makeEmptyForm();
              } else {
                this.messageService.add({
                  key: "custom",
                  severity: "error",
                  life: 3000,
                  summary: "Event is not booked ",
                });
              }
            },
            (error) => (this.error = error)
          );
      }
    } else {
      this.showStudentEnrollForm = true;
      this.display = false;
      this.testBo = true;
      this.gameType = eventData.gameType;
      this.showGoBack = false;
      this.showSubGameList = false;
      this.minDate = this.issoUtilService.setDateOfBirthValidation(ageRange);
      this.yearRange = this.issoUtilService.setYearRange(ageRange);
      this.minCapcity = minCapcity;
      this.loadStudentData();
      this.makeEmptyForm();
    }
  }
  enrollStudent(eventData: any, capacity: any, gender: any, ageRange) {
    this.showGoBack = false;
    console.log(eventData.subgameId);
    // if(eventData.subgameId !== ''){
    //   console.log('im subgame')
    //   this.loadSubGame(eventData.subgameId)
    // } else {
    //   console.log('imnot subgame')
    // }

    this.showStudentEnrollForm = true;
    this.initialForm();
    this.gameId = eventData.gameId;
    this.ageRange = ageRange;
    if (capacity > 0 && gender == "boy") {
      this.panelHeading =
        eventData.gameName + " " + "Boys Under " + this.ageRange;
      this.gender = "1";
      this.setCapacity = capacity;
    }
    if (capacity > 0 && gender == "girl") {
      this.panelHeading =
        eventData.gameName + " " + "Girls Under " + this.ageRange;
      this.gender = "2";
      this.setCapacity = capacity;
    }

    //   this.loadStudentData();
    this.makeEmptyForm();
  }
  onSubGameChange(event: any, subGameId, subGameName) {
    if (event) {
      if (this.subGameIdArray.indexOf(subGameId) === -1) {
        this.subGameIdArray.push(subGameId);
        this.subGameNameArray.push(subGameName);
      }
    } else {
      if (this.subGameIdArray.length > 0) {
        for (let i = 0; i < this.subGameIdArray.length; i++) {
          if (this.subGameIdArray[i] == subGameId) {
            this.subGameIdArray.splice(i, 1);
            this.subGameNameArray.splice(i, 1);
          }
        }
      }
    }
    if (this.subGameIdArray.length > 0) {
      this.subGameButton = true;
    } else {
      this.subGameButton = false;
    }
    // console.log('Id Arrray'+this.subGameIdArray)
    // console.log('Name Arrray'+this.subGameNameArray)
  }

  setSubGame(gameName, gameType, gameId, ageRange, gender, category) {
    // this.url = '';
    this.studentEnrollData = [];
    console.log("after empty");
    this.gameType = gameType;
    this.minDate = this.issoUtilService.setDateOfBirthValidation(ageRange);
    console.log("HELLO Im min Date==>" + this.minDate);
    this.yearRange = this.issoUtilService.setYearRange(ageRange);
    this.makeEmptyForm();
    this.addClass = false;
    this.subGameIdArray = [];
    this.subGameNameArray = [];
    this.checkSubGameCapacity = [];
    this.ageRange = ageRange;
    this.gameId = gameId;
    this.mapGameArray = [];
    this.isSubGameSelected = false;
    this.mapSubGameTeam = [];
    this.incompleteTeamSubGame = [];
    if (gender == "boy") {
      this.gender = "1";
      this.panelHeading = gameName + " " + "Boys Under " + ageRange;
    }
    if (gender == "girl") {
      this.gender = "2";
      this.panelHeading = gameName + " " + "Girls Under " + ageRange;
    }
    this.subGameoptions = [];
    this.studentEnrollData = [
      this.eventId,
      gameId,
      this.gender,
      ageRange,
      "min",
      "max",
      gameType,
    ];
    console.log("Subgamr Im data-->" + this.studentEnrollData);
    // const gameID = gameId.replace(/'/g, "")
    this.studentEnrollmentService
      .getSubGameData(this.gameId, ageRange, gender, "staffadmin")
      .subscribe(
        (response) => {
          if (response !== "") {
            this.subGameResponseData = response;

            this.studentSubgameData = this.subGameResponseData;
            this.subGameoptions = [];
            this.subGameoptions.push({
              label: "Please select",
              value: "",
            });

            this.subGameResponseData.forEach((element) => {
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
          }
          if (this.subGameResponseData.length > 0) {
            this.subGameCount = 0;
            for (let i = 0; i < this.subGameResponseData.length; i++) {
              // console.log('VALUE+++++++>'+this.subGameResponseData[i]['eleven_girls'])
              if (
                category == "eleven_boys" ||
                category == "eleven_girls" ||
                category == "fourteen_boys" ||
                category == "fourteen_girls" ||
                category == "sixteen_boys" ||
                category == "sixteen_girls" ||
                category == "seventeen_boys" ||
                category == "seventeen_girls" ||
                category == "ninteen_boys" ||
                category == "ninteen_girls"
              ) {
                if (
                  this.subGameResponseData[i]["eleven_boys"] === "0" ||
                  this.subGameResponseData[i]["eleven_girls"] === "0" ||
                  this.subGameResponseData[i]["fourteen_boys"] === "0" ||
                  this.subGameResponseData[i]["fourteen_girls"] === "0" ||
                  this.subGameResponseData[i]["sixteen_boys"] === "0" ||
                  this.subGameResponseData[i]["sixteen_girls"] === "0" ||
                  this.subGameResponseData[i]["seventeen_boys"] === "0" ||
                  this.subGameResponseData[i]["seventeen_girls"] === "0" ||
                  this.subGameResponseData[i]["ninteen_boys"] === "0" ||
                  this.subGameResponseData[i]["ninteen_girls"] === "0"
                ) {
                  this.subGameCount++;
                  console.log("imtrrew");
                  // break;
                } else {
                  console.log("im false");
                  // this.showSubGameErrorMsg =true;
                }
              }
            }
            if (this.subGameCount == this.subGameResponseData.length) {
              this.messageService.add({
                key: "custom",
                severity: "error",
                summary: "No subgame available",
              });
            } else {
              console.log("Im game count==>" + this.subGameCount);
              this.testBo = true;
              this.showStudentEnrollForm = true;
              this.showGoBack = false;
              this.showSubGameList = true;
              this.subGameResponseData;
              this.showSubGameErrorMsg = false;
            }
            this.loadStudentData();
          } else {
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
  loadGameChange(event) {
    const eventval = event.value;
    this.subGameNameVal = eventval.split(",");
    this.subGameId = this.subGameNameVal[0];
    this.subGame = this.subGameNameVal[1];
    this.subGameCapacity = this.subGameNameVal[2];
    this.subGameType = this.subGameNameVal[3];
    if (eventval !== "") {
      this.isSubGameSelected = true;
    } else {
      this.isSubGameSelected = false;
    }
    let capaCityCount;
    const subGameIDForCapcity = this.subGameId;
    if (this.subGameType == "Team") {
      capaCityCount = this.newSubGameCapacity.filter(
        (obj) => obj.subGameId === subGameIDForCapcity
      ).length;
      console.log("tesam==>" + capaCityCount);
      if (capaCityCount == this.subGameCapacity) {
        this.selectedSubGame1 = "";
        this.isSubGameSelected = false;
        this.messageService.add({
          key: "custom",
          severity: "error",
          summary: "Capacity is full 12",
        });
      }
      // for(let i=0;i <=this.incompleteTeamSubGame.length;i++) {
      //   if(this.incompleteTeamSubGame[i]['remainingCapacity'] == 0) {
      //     this.selectedSubGame1 = '';
      //     this.isSubGameSelected = false;
      //     this.messageService.add({key: 'custom', severity:'error', summary: 'Capacity is full'});
      //    }
      // }
    } else {
      console.log(
        "NEW newSubGameCapacity" + JSON.stringify(this.newSubGameCapacity)
      );
      capaCityCount = this.newSubGameCapacity.filter(
        (obj) => obj.subGameId === subGameIDForCapcity
      ).length;
      console.log("Im length-->" + capaCityCount);
      if (capaCityCount == this.subGameCapacity) {
        this.selectedSubGame1 = "";
        this.isSubGameSelected = false;
        this.messageService.add({
          key: "custom",
          severity: "error",
          summary: "Capacity is full 123",
        });
      }
    }
  }
  showError() {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Message Content",
    });
    this.messageService.add({
      key: "bc",
      severity: "error",
      summary: "Error",
      detail:
        "hahasfa asfafjasf afakjgagjhahasfa asfafjasf afakjgagjaghahasfa asfafjasf afakjgagjagag afasg Message Content",
    });
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
    if (!this.isDuplicate && this.mapGameArray.length < 3) {
      this.toalSubGameSelected = true;
      this.mapGameArray.push({
        subGameId: this.subGameId,
        subGameName: this.subGame,
        subGameCapacity: this.subGameCapacity,
        subGameType: this.subGameType,
      });
      this.subGameIdArray.push(this.subGameId);
      this.subGameNameArray.push(this.subGame);
    }
    console.log("mapGameArray===>" + JSON.stringify(this.mapGameArray));
    if (this.mapGameArray.length > 0) {
      this.showMapData = true;
    } else {
      this.showMapData = false;
    }

    console.log(" this.subGameIdArray===>" + this.subGameIdArray);
    console.log(" this.subGameNameArray===>" + this.subGameNameArray);
    if (this.subGameIdArray.length > 0) {
      this.subGameButton = true;
    } else {
      this.subGameButton = false;
    }
    if (this.mapGameArray.length >= 3) {
      this.messageService.add({
        key: "custom",
        severity: "error",
        summary: "You can select only 5 subgame",
      });
    } else {
      this.toalSubGameSelected = false;
    }
  }
  removeMappedData(i: number): void {
    this.mapGameArray.splice(i, 1);
    this.subGameIdArray.splice(i, 1);
    this.subGameNameArray.splice(i, 1);
    //this.saveEventMapArray.splice(i, 1);
    if (this.mapGameArray.length == 0) {
      this.showMapData = false;
      this.subGameButton = false;
    }
  }
  goBackToGameList() {
    this.showGoBack = true;
    this.testBo = false;

    this.showStudentEnrollForm = false;
    this.isStudentListShow = false;
  }
  loadSubGame(subgameId: any) {
    this.studentEnrollmentService.loadSubGameData(subgameId).subscribe(
      (response) => {
        if (response !== "") {
          this.showSubGameList = true;
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  loadStudentData() {
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
      this.eventId,
      this.gameId,
      this.ageRange,
      this.gender,
      this.schoolId
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
            this.isStudentListShow = true;
            if (this.showSubGameList) {
              for (let i = 0; i <= this.studentListArray.length - 1; i++) {
                this.checkSubGameCapacity.push(
                  this.studentListArray[i]["subgameId"]
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
                "HELLOO++++>" + JSON.stringify(this.newSubGameCapacity)
              );
              console.log(
                "MAP SUBGAME-->" + JSON.stringify(this.mapSubGameTeam)
              );
              let capaCityCount = 0;
              if (this.mapSubGameTeam.length > 0) {
                for (let i = 0; i <= this.mapSubGameTeam.length - 1; i++) {
                  if (this.mapSubGameTeam[i]["subGameType"] == "Team") {
                    console.log("I value===>" + i);
                    let remainingCapacity = 0;
                    capaCityCount = this.newSubGameCapacity.filter(
                      (obj) =>
                        obj.subGameId === this.mapSubGameTeam[i]["subGameId"]
                    ).length;

                    console.log("CAPCITY COUNT===>" + capaCityCount);
                    remainingCapacity =
                      this.mapSubGameTeam[i]["minCapacity"] - capaCityCount;
                    this.incompleteTeamSubGame.push({
                      subGameId: this.mapSubGameTeam[i]["subGameId"],
                      subGameName: this.mapSubGameTeam[i]["subGameName"],
                      remainingCapacity: remainingCapacity,
                      minCapacity: this.mapSubGameTeam[i]["minCapacity"],
                    });
                  }
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

  getData(numbers) {
    return numbers.reduce(function (obj, b) {
      obj[b] = ++obj[b] || 1;
      return obj;
    }, {});
  }

  editStudent(i: number): void {
    // const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
    // dataTransfer.items.add(new File(['my-file'], 'new-file-name'));
    // const inputElement: HTMLInputElement = document.getElementById('my-input') as HTMLInputElement

    // inputElement.files = dataTransfer.files;
    this.isEdit = true;
    this.isValidFile = true;
    this.isFileBig = false;
    this.mapGameArray = [];
    this.subGameIdArray = [];
    this.subGameNameArray = [];
    // this.newSubGameCapacity = [];
    this.subGameIdArray = [];
    this.subGameNameArray = [];
    //this.files =this.studentListArray[i].photo,
    //const inputElement: HTMLInputElement = document.getElementById('my-input') as HTMLInputElement

    // inputElement.files = dataTransfer.files;
    this.testBo = true;
    if (this.studentListArray[i].aadharNumber !== "") {
      //this.showAadharTextBox = true;
      this.aadharNumber = this.studentListArray[i].aadharNumber;
      this.showNRI = false;
    }
    if (this.studentListArray[i].passport !== "") {
      this.showNRI = true;
      this.passport = this.studentListArray[i].passport;
    }
    (this.studentPhoto = this.studentListArray[i].photo),
      this.studentEnroolForm.setValue({
        schoolId: this.schoolId,
        editStudentPhoto: this.studentListArray[i].photo,
        studentId: this.studentListArray[i].sId,
        studentName: this.studentListArray[i].studentName,
        fatherName: this.studentListArray[i].fatherName,
        dateOfBirth: new Date(this.studentListArray[i].dateOfBirth),
        standardClass: this.studentListArray[i].standardClass,
        tShirtSize: this.studentListArray[i].tShirtSize,
        curriculum: this.studentListArray[i].curruclm,
        contactNo: this.studentListArray[i].contactNo,

        // profile :this.studentListArray[i].photo,
        aadharNumber: this.studentListArray[i].aadharNumber,
        admissionNo: this.studentListArray[i].admissionNumber,
        passPort: this.studentListArray[i].passport,
        // selectedProfile:this.studentListArray[i].photo,
        profile: "",
        ageRange: this.studentListArray[i].ageRange,
        gameId: this.gameId,
        subGameID: this.studentListArray[i].subgameId,
        subGameNames: this.studentListArray[i].subGameName,
        schoolName: "",
        eventId: this.eventId,
      });
    console.log("Form==>" + this.studentEnroolForm);
    this.submitButtonLabel = "Update";
    // const arrGameId = eventInfo.gameId.split(',');
    if (this.studentListArray[i].subgameId !== "undefined") {
      const subGameIdArray = this.studentListArray[i].subgameId.split(",");
      const subGameNameArray = this.studentListArray[i].subGameName.split(",");
      for (let i = 0; i < subGameIdArray.length; i++) {
        this.mapGameArray.push({
          subGameId: subGameIdArray[i],
          subGameName: subGameNameArray[i],
        });
        this.subGameIdArray.push(subGameIdArray[i]);
        this.subGameNameArray.push(subGameNameArray[i]);
      }
      if (this.subGameIdArray.length > 0) {
        this.subGameButton = true;
      } else {
        this.subGameButton = false;
      }
      if (this.mapGameArray.length > 0) {
        this.showMapData = true;
      } else {
        this.showMapData = false;
      }
    }
    this.setFocus("studentNameText");
    let filePath = "https://issoindia.com/isso-php/upload/" + this.studentPhoto;
    this.changeFileName(filePath, this.studentPhoto);
  }
  changeFileName(filePath, fileName) {
    const dataTransfer =
      new ClipboardEvent("").clipboardData || new DataTransfer();
    dataTransfer.items.add(new File([filePath], fileName));
    const inputElement: HTMLInputElement = document.getElementById(
      "my-input"
    ) as HTMLInputElement;

    inputElement.files = dataTransfer.files;
    let control2 = this.studentEnroolForm.get("profile");
    control2.setValidators(null);
    control2.updateValueAndValidity();
  }
  deleteStudentData(event: Event, i) {
    const studentID = this.studentListArray[i].sId;
    console.log("Stud Id" + this.studentListArray[i].sId);
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-delete-student",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete student data?",
      accept: () => {
        this.deleteStudent(studentID);
        // this.studentListArray.splice(i, 1);
        this.makeEmptyForm();

        if (this.studentListArray.length > 0) {
          this.isStudentListShow = true;
        } else {
          this.isStudentListShow = false;
        }

        //this.deleteSchool(eventData);
      },
    });
  }
  deleteStudentList(i: number): void {
    this.addClass = false;
    const studentID = this.studentListArray[i].sId;
    console.log("Stud Id" + this.studentListArray[i].sId);
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-delete-student",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete student record?",
      accept: () => {
        this.deleteStudent(studentID);
        // this.studentListArray.splice(i, 1);
        this.makeEmptyForm();

        if (this.studentListArray.length > 0) {
          this.isStudentListShow = true;
        } else {
          this.isStudentListShow = false;
        }
      },
    });

    // console.log('dfg gd===>'+i);
    // console.log(this.printMeritArray[i])
    // console.log(this.printMeritArray[i].schoolName);

    //this.addMeritArray.splice(i, 1);
  }

  deleteStudent(studentID: any) {
    this.addClass = false;
    this.studentEnrollmentService.deleteStudent(studentID).subscribe(
      (res) => {
        this.messageService.add({
          key: "custom",
          severity: "success",
          summary: "Student Data Deleted Successfully",
        });
        this.loadStudentData();
      },
      (error) => (this.error = error)
    );
  }

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
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  onSubmit() {
    this.submitted = true;
    const formData = new FormData();
    const schoolId = localStorage.getItem("schoolId");
    let subGameId;
    let subGameName;
    let govtIdAadhar;
    let govtIdPassport;
    if (this.subGameIdArray.length > 0) {
      subGameId = this.subGameIdArray.toString();
      subGameName = this.subGameNameArray.toString();
    }
    if (this.showNRI) {
      govtIdPassport = this.studentEnroolForm.get("passPort").value;
      govtIdAadhar = "N/A";
    } else {
      govtIdAadhar = this.studentEnroolForm.get("aadharNumber").value;
      govtIdPassport = "N/A";
    }
    let event_endDate = this.studentEnroolForm.get("dateOfBirth").value;
    let formatted_end_date =
      event_endDate.getFullYear() +
      "-" +
      (event_endDate.getMonth() + 1) +
      "-" +
      event_endDate.getDate();

    formData.append("schoolId", schoolId);
    formData.append(
      "studentName",
      this.studentEnroolForm.get("studentName").value
    );
    formData.append("studentId", this.studentEnroolForm.get("studentId").value);
    formData.append(
      "editStudentPhoto",
      this.studentEnroolForm.get("editStudentPhoto").value
    );

    formData.append(
      "fatherName",
      this.studentEnroolForm.get("fatherName").value
    );
    formData.append("dateOfBirth", formatted_end_date);
    formData.append(
      "standardClass",
      this.studentEnroolForm.get("standardClass").value
    );
    formData.append(
      "tShirtSize",
      this.studentEnroolForm.get("tShirtSize").value
    );
    formData.append(
      "curriculum",
      this.studentEnroolForm.get("curriculum").value
    );
    formData.append("contactNo", this.studentEnroolForm.get("contactNo").value);
    // if(this.studentEnroolForm.get('profile').value == 'C:\\fakepath\\'+this.studentPhoto || this.studentEnroolForm.get('profile').value == this.studentPhoto) {
    if (
      this.studentEnroolForm.get("profile").value == "" ||
      this.studentEnroolForm.get("profile").value ==
        "C:\\fakepath\\" + this.studentPhoto ||
      this.studentEnroolForm.get("profile").value == this.studentPhoto
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

    // formData.append('profile', this.profileForm.get('profile').value, this.fullFilename);
    formData.append("ageRange", this.ageRange);
    formData.append("gender", this.gender);
    formData.append("gameId", this.gameId);
    formData.append("eventId", this.eventId);
    formData.append("aadharNumber", govtIdAadhar);
    formData.append(
      "admissionNo",
      this.studentEnroolForm.get("admissionNo").value
    );
    formData.append("passPort", govtIdPassport);

    formData.append("subGameID", subGameId);
    formData.append("subGameNames", subGameName);
    formData.append("eventYear", this.eventYear);

    console.log(this.studentListArray.length);
    console.log(JSON.stringify(formData));

    if (this.submitButtonLabel == "Submit") {
      if (this.setCapacity == this.studentListArray.length) {
        console.log("im true");
        this.messageService.add({
          key: "custom",
          severity: "error",
          summary: "No seat available for this game",
        });
      } else {
        this.studentEnrollmentService.saveStudentData(formData).subscribe(
          (res) => {
            if (res.status === "error") {
              this.messageService.add({
                severity: "error",
                summary: "Error Message",
                detail: "Validation failed",
              });
            } else {
              this.addClass = true;
              this.messageService.add({
                key: "custom",
                severity: "success",
                summary: "New Student Added Successfully",
              });
              this.studentEnroolForm.reset();
              this.loadStudentData();
              this.selectedSubGame1 = "";
              this.subGameButton = false;
            }
          },
          (error) => (this.error = error)
        );
      }
    }
    if (this.submitButtonLabel == "Update") {
      this.studentEnrollmentService.updateStudentData(formData).subscribe(
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
              summary: "Student Data updated Successfully",
            });
            this.studentEnroolForm.reset();
            this.loadStudentData();
            this.selectedSubGame1 = "";
            this.subGameButton = false;
          }
        },
        (error) => (this.error = error)
      );
    }

    this.makeEmptyForm();
    // formData.append('hiddentext', this.studentEnroolForm.get('hiddentext').value);
  }

  makeEmptyForm() {
    this.selectedSubGame1 = "";
    this.isFileBig = false;
    this.showMapData = false;
    this.mapGameArray = [];
    this.studentDataArray = [];
    this.mapGameArray = [];
    this.showMapData = false;
    this.subGameIdArray = [];
    this.subGameNameArray = [];
    // this.newSubGameCapacity = [];
    this.testArray = [];
    this.checkSubGameCapacity = [];
    this.isEdit = false;
    this.studentName = "";
    this.fatherName = "";
    this.selectedCurriculm = "";
    this.curriculum = "";
    this.datOfBirth = "";
    this.selectedClass = "";
    this.contactNo = "";
    this.selectedProfile = "";
    this.passport = "";
    this.aadhar = "";
    this.passport = "";
    this.studentId = "";
    this.editStudentPhoto = "";
    this.admissionNo = "";
    this.aadharNumber = null;
    this.submitButtonLabel = "Submit";
    this.isSubGameSelected = false;
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
      this.showAadharTextBox = true;
      this.showNRI = false;
    });
    this.url = "";
    if (document.getElementById("my-input")) {
      let control2 = this.studentEnroolForm.get("profile");
      control2.setValue(null);
      control2.setValidators([Validators.required]);
      control2.updateValueAndValidity();
    }
  }
}
