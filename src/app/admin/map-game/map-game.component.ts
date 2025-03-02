import { Component, OnInit } from "@angular/core";
import { EventService } from "../service/event.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { SelectItem } from "primeng/api";
import { FormControl } from "@angular/forms";
import * as moment from "moment";
import { DatePipe, JsonPipe } from "@angular/common";
import { Event, Game } from "../admin-interfaces";
import { ConfirmationService } from "primeng/api";
import { MenuItem } from "primeng/api";
import { GameService } from "../service/game.service";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { element } from "protractor";

@Component({
  selector: "app-map-game",
  templateUrl: "./map-game.component.html",
  styleUrls: ["./map-game.component.css"],
})
export class MapGameComponent implements OnInit {
  receivedData = [
    { id: 1, name: "ABCD,2330,Test,1" },
    { id: 2, name: "ABCD,2330,Test, 2" },
  ];
  gameOptions: SelectItem[];
  yearOptions: SelectItem[];
  selectedCars1: string[] = [];

  selectedCars2: string[] = [];

  saveGameMapArray = [];

  text2: string;

  options: SelectItem[];
  checked1: boolean = true;
  es: any;
  error: string;
  errormessage: boolean;
  submitted = false;
  eventForm: FormGroup;
  eventServiceData: any;
  disable = false;
  display: boolean = false;
  checked2: boolean = true;
  eventInfo: Event[];
  gameInfo: Game[];

  sortOptions: SelectItem[];
  actions: string;
  control: FormControl;
  items: MenuItem[];
  activeItem: MenuItem;
  isUpcomingEvent: boolean = false;
  currentEvent: boolean = true;
  selectedYear: string;
  minDate: Date;
  maxDate: Date;
  endDate: Date;
  today: string;
  eventList: any;
  showspinner: boolean;
  mapEvent: boolean;
  gameResponseData: any;
  eventResponseData: any;
  magGameResponse: any;
  mappedList: any;
  gameList = [];
  boysCapacityArray = [];
  girlsCapacityArray = [];
  finalBoysRange: string;
  finalGirlsRange: string;

  newfinalBoysRange: string;
  newfinalGirlsRange: string;

  mapGameInfo: any;
  seletectedGameList: any;
  someVal: any[];
  submitLabel: string;
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  gameMapArray = [];
  eventArray = [];
  gameArray = [];
  eventValue: number;
  eventName: any;
  mapEventArray = [];
  saveEventArray = [];
  saveEventMapArray = [];
  ageReadble: boolean;
  isGameShow: boolean;
  gameType: any;
  isMapBothGame: boolean = false;
  gameId: any;
  ageValue: any;
  genderValue: any;
  gameName: any;
  showMapData: boolean;
  mapEventResponse: any[];
  isUpdate: boolean;
  isDuplicate: boolean = false;
  yearvalue: string;
  list: any[];
  selected: boolean;

  constructor(
    public datepipe: DatePipe,
    private issoUtilService: IssoUtilService,
    private confirmation: ConfirmationService,
    private eventService: EventService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.seCurrenttDate();
    this.initialiseForm();
    this.getEventData();
    this.getGameData();
    this.getMappedGameData();
    this.mapList();
  }

  mapList() {
    this.list = [
      {
        id: "9B",
        title: "9 Boys",
      },
      {
        id: "11B",
        title: "11 Boys",
      },
      {
        id: "14B",
        title: "14 Boys",
      },

      {
        id: "17B",
        title: "17 Boys",
      },
      {
        id: "19B",
        title: "19 Boys",
      },
      {
        id: "9G",
        title: "9 Girls",
      },
      {
        id: "11G",
        title: "11 Girls",
      },

      {
        id: "14G",
        title: "14 Girls",
      },

      {
        id: "17G",
        title: "17 Girls",
      },
      {
        id: "19G",
        title: "19 Girls",
      },
    ];
  }
  getGameData() {
    this.showspinner = true;
    this.eventService.getGamelList().subscribe(
      (response) => {
        if (response !== "") {
          this.showspinner = false;
          this.gameResponseData = response;
          this.gameOptions = [];
          this.gameOptions.push({
            label: "Select Game",
            value: "",
          });
          this.gameResponseData.forEach((element) => {
            const gameIdndName =
              element.gameId + "," + element.gameName + "," + element.gameType;
            this.gameOptions.push({
              label: element.gameName,
              value: gameIdndName,
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
  loadGameChange(event) {
    this.ageValue = event.value;
  }
  onGenderChange(event) {
    this.genderValue = event.value;
  }
  loadEventChange(event) {
    const eventval = event.value;
    this.eventArray = eventval.split(",");
    this.eventValue = this.eventArray[0];
    console.log(this.eventValue);
    this.eventName = this.eventArray[1];
  }
  mapGameChange(event) {
    const eventval = event.value;
    this.gameArray = eventval.split(",");
    this.gameId = this.gameArray[0];
    this.gameName = this.gameArray[1];
    this.gameType = this.gameArray[2];
    console.log(this.gameType);
    if (this.gameType == "Both") {
      this.isMapBothGame = true;
      this.ageReadble = true;
      this.ageValue = "";
    } else {
      this.ageValue = "";
      this.ageReadble = false;
      this.isMapBothGame = false;
    }
  }
  getEventData() {
    this.gameService.getEventData().subscribe(
      (response) => {
        if (response !== "") {
          this.eventResponseData = response;
          this.options = [];
          this.options.push({
            label: "Please Select",
            value: "",
          });
          this.eventResponseData.forEach((element) => {
            const eventIdAndName = element.eventId + "," + element.eventName;
            this.options.push({
              label: element.eventName,
              value: eventIdAndName,
            });
            console.log("Hello==>" + this.options);

            // this.options.push({
            //   label: element.eventName,
            //   value: element.eventId
            // });
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
  getMappedGameData() {
    // const month = new Date().getMonth();
    // const year = new Date().getFullYear();

    // console.log('month==>'+month)
    // console.log('Year==>'+year)
    // if(month >= 5) {
    //   this.yearvalue = year +'-'+ (year + 1)
    //   console.log('im if'+ this.yearvalue)
    // } else {
    //   this.yearvalue =(year - 1)  +'-'+ year
    // }
    this.gameService.getMappedEventData(this.yearvalue).subscribe(
      (response) => {
        if (response !== "") {
          this.magGameResponse = response;
          // this.schoolData = this.schoolServiceData;
          this.mapEventResponse = [];
          console.log(JSON.stringify(this.magGameResponse));
          const receivedData = [
            { id: 1, name: "ABCD,2330,Test,1" },
            { id: 2, name: "ABCD,2330,Test, 2" },
          ];

          for (let i = 0; i <= this.magGameResponse.length - 1; i++) {
            var gameStr = this.magGameResponse[i].game_name;
            var ageStr = this.magGameResponse[i].ageRange;
            var ch = ",";
            var gameCommaCount = gameStr.split(",").length - 1;
            var ageCommaCount = ageStr.split(",").length - 1;
            this.mapEventResponse.push({
              eventId: this.magGameResponse[i].eventId,
              game_name: this.magGameResponse[i].game_name,
              ageRange: this.magGameResponse[i].ageRange,
              girlsageRange: this.magGameResponse[i].girlsageRange,
              gameComma: gameCommaCount,
              ageComma: ageCommaCount,
            });
          }
          console.log("DATA===>" + JSON.stringify(this.mapEventResponse));
        } else {
          alert("im blankl=");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }

  onyeareChange(event) {
    this.yearvalue = event.value;
    this.getMappedGameData();
  }
  initialiseForm() {
    this.yearOptions = this.issoUtilService.setYear();
    this.ageOptions = [
      { label: "11", value: "11" },
      { label: "14", value: "14" },
      { label: "16", value: "16" },
      { label: "17", value: "17" },
      { label: "19", value: "19" },
    ];
    this.genderOptions = [
      { label: "Boys", value: "Boys" },
      { label: "Girls", value: "Girls" },
    ];
    this.eventForm = this.fb.group({
      eventId: [""],
      eventList: ["", Validators.required],
      gameList: ["", Validators.required],
      // eventStartDate: ['', Validators.required],
      // eventEndDate: ['', Validators.required],
      // eventLocation: ['', Validators.required],
      // eventType: ['', Validators.required],
      // eventDesc: ['', Validators.required],
      // eventNote: ['', Validators.required]
    });
  }
  showDialog() {
    this.display = true;
  }
  onChange(event, id) {
    // console.log(event)
    let characters = id.split(/[\W\d]+/).join("");
    let numbers = id.split(/[^\d]+/).join("");

    console.log(event.currentTarget.checked);
    if (event.currentTarget.checked) {
      if (characters == "B") {
        this.boysCapacityArray.push(numbers);
        let boyRange = this.boysCapacityArray.toString();
        this.finalBoysRange = boyRange.replace(/\,/g, " ");
      } else {
        this.girlsCapacityArray.push(numbers);
        let girlRange = this.girlsCapacityArray.toString();
        this.finalGirlsRange = girlRange.replace(/\,/g, " ");
      }
    } else {
      if (characters == "B") {
        for (let i = 0; i < this.boysCapacityArray.length; i++) {
          if (this.boysCapacityArray[i] == numbers) {
            this.boysCapacityArray.splice(i, 1);
            let bRange = this.boysCapacityArray.toString();
            this.finalBoysRange = bRange.replace(/\,/g, " ");
          }
        }
      } else {
        for (let i = 0; i < this.girlsCapacityArray.length; i++) {
          if (this.girlsCapacityArray[i] == numbers) {
            this.girlsCapacityArray.splice(i, 1);
            let gRange = this.girlsCapacityArray.toString();
            this.finalGirlsRange = gRange.replace(/\,/g, " ");
          }
        }
      }
    }
    console.log(this.finalBoysRange);
    console.log(this.finalGirlsRange);
  }
  addMapEvent() {
    this.isDuplicate = false;
    document.querySelectorAll(".chk").forEach((_checkbox) => {
      (<HTMLInputElement>_checkbox).checked = false;
    });
    // const ageValue = this.ageValue.toString();
    // const genderValue = this.genderValue.toString();
    // let res,genderRes;
    // if(ageValue!=='') {
    //   res = ageValue.replace(/^[, ]+|[, ]+$|[, ]+/g, " ").trim();
    // } else {
    //   res ='N/A';
    // }

    // if(genderValue!=='') {
    //   genderRes = genderValue.replace(/^[, ]+|[, ]+$|[, ]+/g, " ").trim();
    // } else {
    //   genderRes ='N/A';
    // }
    this.eventList = "";
    this.seletectedGameList = "";
    if (this.mapEventArray.length > 0) {
      for (let i = 0; i < this.mapEventArray.length; i++) {
        if (
          this.eventValue === this.mapEventArray[i].eventId &&
          this.gameId === this.mapEventArray[i].gameId
        ) {
          this.isDuplicate = true;
          this.messageService.add({
            key: "custom",
            severity: "error",
            summary: "This event data already exists!",
          });
        }
      }
    }
    if (!this.isDuplicate || this.mapEventArray.length === 0) {
      this.newfinalBoysRange = this.finalBoysRange;
      this.newfinalGirlsRange = this.finalGirlsRange;
      this.mapEventArray.push({
        eventId: this.eventValue,
        eventName: this.eventName,
        gameId: this.gameId,
        gameType: this.gameType,
        gameName: this.gameName,
        ageRange: this.newfinalBoysRange,
        genderVal: this.newfinalGirlsRange,
      });
    }
    this.newfinalBoysRange = "";
    this.newfinalGirlsRange = "";
    this.boysCapacityArray = [];
    this.girlsCapacityArray = [];
    if (this.mapEventArray.length > 0) {
      this.showMapData = true;
      this.selected = false;
    } else {
      this.showMapData = false;
    }
  }
  removeMappedData(i: number): void {
    this.mapEventArray.splice(i, 1);
    this.saveEventMapArray.splice(i, 1);
    console.log("mapEventArray AFTER===>" + JSON.stringify(this.mapEventArray));
    console.log(
      "saveEventMapArray AFTER===>" + JSON.stringify(this.saveEventMapArray)
    );
    if (this.mapEventArray.length == 0) {
      this.showMapData = false;
    }
  }
  addNewEvent(eventInfo: Event, type: any) {
    if (type == "edit") {
      this.seletectedGameList = [];
      this.showMapData = true;
      this.isUpdate = true;
      this.eventList = eventInfo.eventId;
      this.mapEventArray = [];

      var gameStr = eventInfo.game_name;
      var ch = ",";
      var gameCommaCount = gameStr.split(",").length - 1;
      console.log("gameCommaCount===>" + gameCommaCount);
      const arrGameId = eventInfo.gameId.split(",");
      const arrGameName = eventInfo.game_name.split(",");
      const arrGameType = eventInfo.gameType.split(",");
      const arrAgeRange = eventInfo.ageRange.split(",");
      const arrgirlsAgeRange = eventInfo.girlsageRange.split(",");

      for (let i = 0; i < arrGameId.length; i++) {
        this.mapEventArray.push({
          eventId: eventInfo.eventId,
          eventName: eventInfo.eventName,
          gameId: arrGameId[i],
          gameType: arrGameType[i],
          gameName: arrGameName[i],
          ageRange: arrAgeRange[i],
          genderVal: arrgirlsAgeRange[i],
        });
      }

      console.log("HELLO===>" + JSON.stringify(this.saveEventArray));
      // this.seletectedGameList = eventInfo.gameId;
      // let neWd = this.cars.map(x => {
      //   if (x == eventInfo.eventId)
      //       return x; // unchanged

      // }).reverse().join(' ')

      // this.seletectedGameList =  this.cars.map((item) => {
      //    if(item== eventInfo.gameId) {
      //     this.someVal.push(item.value)
      //    }
      // });
      this.gameOptions.map((item) => this.seletectedGameList.push(item.value));
      // this.eventForm.setValue({
      //     eventId: eventInfo.eventId,
      //     eventName: eventInfo.eventName,
      //     registrationCharge:  eventInfo.price,
      //     eventStartDate: new Date(eventInfo.startDate),
      //     eventEndDate: new Date(eventInfo.endDate),
      //     eventLocation: eventInfo.location,
      //     eventType:  eventInfo.eventType,
      //     eventDesc: eventInfo.eventDesc,
      //     eventNote:  eventInfo.eventNote,
      //    // event_status:  eventInfo.event_status

      //    // schoolId:'edit'
      // });

      this.submitLabel = "Update";
    } else {
      this.mapEventArray = [];
      this.showMapData = false;
      this.submitLabel = "Submit";
      // this.eventForm.setValue({
      //   eventId:'',
      //   eventName: '',
      //   registrationCharge: '',
      //   eventType: ' ',
      //   eventStartDate: ' ',
      //   eventEndDate: ' ',
      //   eventLocation: ' ',
      //   eventDesc:' ',
      //   eventNote:''
      // //  schoolId:'add'
      // });
    }
    this.display = true;
  }

  hideExtraView() {
    this.display = false;
  }

  onGameChange(event) {
    console.log(event);
  }
  seCurrenttDate() {
    const now = new Date();
    this.today = now.toISOString();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    console.log("month==>" + month);
    console.log("Year==>" + year);
    if (month >= 5) {
      this.yearvalue = year + "-" + (year + 1);
      console.log("im if" + this.yearvalue);
    } else {
      this.yearvalue = year - 1 + "-" + year;
    }
    this.selectedYear = this.yearvalue;
  }
  onSubmit() {
    this.saveEventMapArray = [];
    this.submitted = true;
    const formData = new FormData();
    let eventId = this.eventForm.get("eventId").value;

    formData.append("eventList", this.eventForm.get("eventList").value);
    formData.append("gameList", this.eventForm.get("gameList").value);

    console.log("Form data===>" + JSON.stringify(formData));
    this.gameMapArray.push({
      eventId: this.eventValue,
      eventName: this.eventName,
    });
    if (this.gameMapArray.length > 1) {
      this.isGameShow = true;
    } else {
      this.isGameShow = false;
    }
    //if(!this.isUpdate) {
    for (let i = 0; i < this.mapEventArray.length; i++) {
      this.saveEventMapArray.push(
        this.mapEventArray[i].eventId,
        this.mapEventArray[i].gameId,
        this.mapEventArray[i].gameName,
        this.mapEventArray[i].gameType,
        this.mapEventArray[i].ageRange,
        this.mapEventArray[i].genderVal
      );
    }
    // }

    console.log(JSON.stringify(this.saveEventMapArray));
    formData.append("mapEventData", JSON.stringify(this.saveEventMapArray));

    this.gameService.saveGameMapData(formData).subscribe(
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
            summary: "Event mapped to game successfully",
          });
        }
        this.display = false;
        this.getMappedGameData();
        this.boysCapacityArray = [];
        this.girlsCapacityArray = [];
      },
      (error) => (this.error = error)
    );

    // if(eventId == '') {
    //     this.eventService.saveEventData(formData).subscribe(
    //     res => {
    //         if (res.status === 'error') {
    //           this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
    //         } else {
    //           this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Added Successfully'});

    //         }
    //       this.display =false
    //       this.getEventData();
    //     },
    //     error => this.error = error

    //     );
    // } else {
    //   this.eventService.editEventData(eventId,formData).subscribe(
    //     res => {
    //         if (res.status === 'success') {
    //           this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Updated Successfully'});
    //           //this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
    //        }
    //       else {
    //          this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Updated Successfully'});

    //         }
    //       this.display =false
    //       this.getEventData();
    //     },
    //     error => this.error = error
    //   );
    // }
  }

  deleteMapEvent(event: Event, eventData: Event) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-map-event",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete event data?",
      accept: () => {
        this.deletMapedGameInfo(eventData);
      },
    });
  }

  private _deleteeventInfo() {
    this.messageService.add({
      key: "custom",
      severity: "success",
      summary: "Event Data Deleted Successfully",
    });
  }
  deletMapedGameInfo(eventData) {
    let eventId = eventData.eventId;
    this.gameService.deleteMapEventData(eventId).subscribe(
      (res) => {
        //  if (res.status !== 'error') {
        //    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        //  } else {
        this.messageService.add({
          key: "custom",
          severity: "success",
          summary: "Game mapped data Deleted Successfully",
        });

        //  }

        this.display = false;
        this.getMappedGameData();
      },
      (error) => (this.error = error)
    );
  }
}
