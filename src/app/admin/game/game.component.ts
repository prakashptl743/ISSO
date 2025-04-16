import { Component, OnInit } from "@angular/core";
import { GameService } from "../service/game.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { SelectItem } from "primeng/api";
import { FormControl } from "@angular/forms";
import { ConfirmationService } from "primeng/api";
import { Game } from "../admin-interfaces";
import { MenuItem } from "primeng/api";
import { IssoUtilService } from "../../services/isso-util.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class GameComponent implements OnInit {
  eventOptions: SelectItem[];
  items: SelectItem[];
  item: string;
  gameForm: FormGroup;
  editForm: FormGroup;
  public errorAlert: boolean = false;
  errormessage: boolean;
  submitted = false;
  display: boolean = false;
  options: SelectItem[];
  schoolArray = [];
  control: FormControl;
  gameServiceData: any;
  newGameData: any;
  game: Game;
  error: string;
  datasource: any;

  totalRecords: number;
  cols: any[];
  placeholderText = "Select Option";
  actions: string;
  loading: boolean;
  disable = false;
  cities1: SelectItem[];
  schoolData: Game[];
  activeItem: MenuItem;
  gameDataById: Game[];
  gameData: any;
  items2: MenuItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  selectedSchool: Game;
  carDatavalue: any;
  carId: number;
  gridHeader: any;
  displayDialog: boolean;
  confirmDropDatabaseDialogVisible = false;
  isSubGame: boolean = false;
  isGame: boolean = true;
  eventResponseData: any;
  showspinner: boolean;
  isTeamGame: boolean;

  eleven_boys: any;
  eleven_girls: any;
  fourteen_boys: any;
  sixteen_boys: any;
  sixteen_girls: any;
  fourteen_girls: any;
  seventeen_boys: any;
  seventeen_girls: any;
  ninteen_boys: any;
  ninteen_girls: any;

  minElevenboys: any;
  minElevengirls: any;
  minfourteenboys: any;
  minfourteengirls: any;
  minsixteenteenboys: any;
  minsixteengirls: any;
  minSeventeenboys: any;
  minSeventeengirls: any;
  minNinteenboys: any;
  minNinteengirls: any;

  gameType: any;
  edit_eleven_boys: any;
  edit_eleven_girls: any;
  edit_fourteen_boys: any;
  edit_fourteen_girls: any;
  edit_sixteen_boys: any;
  edit_sixteen_girls: any;
  edit_seventeen_boys: any;
  edit_seventeen_girls: any;
  edit_ninteen_boys: any;
  edit_ninteen_girls: any;

  ageRangeArray = [];
  gameDataArray: any;
  isEditTeamGame: boolean;
  isBothGameReadble: boolean;
  gameName: any;
  gameDescription: any;
  gameId: any;
  isIndividualGame: boolean;
  gameFiletrType: string;
  filertGameType: any;
  constructor(
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private issoUtilService: IssoUtilService,
    private fb: FormBuilder,
    private router: Router,
    private gameService: GameService
  ) {
    setTimeout(() => {
      this.disable = true;
    }, 5000);
    this.options = [
      { label: "jan 1 2001", value: new Date(2001, 0, 1) },
      { label: "jan 1 2002", value: new Date(2002, 0, 1) },
      { label: "jan 1 2003", value: new Date(2003, 0, 1) },
    ];
    this.control = new FormControl(this.options[2].value);
  }

  ngOnInit() {
    this.getEventData();
    this.isSubGame = false;
    this.isGame = true;
    this.loading = true;
    setTimeout(() => {
      this.placeholderText = "It has changed";
    }, 5000);
    this.filterGame("Team", 0);
    // this.getGameData()
    this.initialForm();
    this.items2 = [
      { label: "Game", icon: "pi pi-list" },
      { label: "Subgame", icon: "fa fa-fw fa-calendar" },
    ];
    this.activeItem = this.items2[0];
  }
  onloadMenu(index) {
    if (index == "0") {
      this.isSubGame = false;
      this.isGame = true;
    } else {
      this.isGame = false;
      this.isSubGame = true;
    }
    this.display = false;
  }

  onDialogHide() {
    this.selectedSchool = null;
  }

  filterGame(gameData, callFrom) {
    if (callFrom === 0) {
      this.gameFiletrType = gameData;
    } else {
      // gameFiletrType
      this.gameFiletrType = gameData.value;
    }
    console.log("Hello===>" + gameData);
    // const gameType = gameData.value
    if (this.gameFiletrType !== "") {
      this.showspinner = true;
      this.gameService.getGamesByType(this.gameFiletrType).subscribe(
        (response) => {
          console.log(response);
          if (response !== "") {
            this.showspinner = false;
            this.gameData = response;
            this.schoolData = this.gameData;
          } else {
            alert("im blankl=");
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
    }
  }

  onGameChange(gameData: any) {
    const gameType = gameData.value;

    if (gameType == "Team") {
      this.isTeamGame = true;
      this.isIndividualGame = false;
      this.minElevenboys = "0";
      this.minElevengirls = "0";
      this.minfourteenboys = "0";
      this.minfourteengirls = "0";
      this.minsixteenteenboys = "0";
      this.minsixteengirls = "0";
      this.minSeventeenboys = "0";
      this.minSeventeengirls = "0";
      this.minNinteenboys = "0";
      this.minNinteengirls = "0";
      if (this.isEditTeamGame) {
        this.eleven_boys = this.edit_eleven_boys;
        this.eleven_girls = this.edit_eleven_girls;
        this.fourteen_boys = this.edit_fourteen_boys;
        this.fourteen_girls = this.edit_fourteen_girls;
        this.sixteen_boys = this.edit_sixteen_boys;
        this.sixteen_girls = this.edit_sixteen_girls;
        this.seventeen_boys = this.edit_seventeen_boys;
        this.ninteen_boys = this.edit_ninteen_boys;
        this.ninteen_girls = this.edit_ninteen_girls;
      }
    } else if (gameType == "Individual") {
      this.isTeamGame = true;
      this.isIndividualGame = true;
      this.eleven_boys = "0";
      this.eleven_girls = "0";
      this.fourteen_boys = "0";
      this.fourteen_girls = "0";
      this.sixteen_boys = "0";
      this.sixteen_girls = "0";
      this.seventeen_boys = "0";
      this.seventeen_girls = "0";
      this.ninteen_boys = "0";
      this.ninteen_girls = "0";
    } else {
      this.isTeamGame = false;
      this.isIndividualGame = false;
      this.eleven_boys = "0";
      this.eleven_girls = "0";
      this.fourteen_boys = "0";
      this.fourteen_girls = "0";
      this.sixteen_boys = "0";
      this.sixteen_girls = "0";
      this.seventeen_boys = "0";
      this.seventeen_girls = "0";
      this.ninteen_boys = "0";
      this.ninteen_girls = "0";
    }
  }

  // minNinteenboys:any;
  // minNinteengirls:any;

  chkZeroVal(inputTextVal: any, ageRangeVal: any) {
    if (inputTextVal.target.value < 0 || inputTextVal.target.value == "") {
      if (ageRangeVal == "eleven_boys") {
        this.eleven_boys = "0";
      } else if (ageRangeVal == "minElevenboys") {
        this.minElevenboys = "0";
      } else if (ageRangeVal == "eleven_girls") {
        this.eleven_girls = "0";
      } else if (ageRangeVal == "minElevengirls") {
        this.minElevengirls = "0";
      } else if (ageRangeVal == "fourteen_boys") {
        this.fourteen_boys = "0";
      } else if (ageRangeVal == "minfourteenboys") {
        this.minfourteenboys = "0";
      } else if (ageRangeVal == "fourteen_girls") {
        this.fourteen_girls = "0";
      } else if (ageRangeVal == "minfourteengirls") {
        this.minfourteengirls = "0";
      } else if (ageRangeVal == "seventeen_boys") {
        this.seventeen_boys = "0";
      } else if (ageRangeVal == "minSeventeenboys") {
        this.minSeventeenboys = "0";
      } else if (ageRangeVal == "seventeen_girls") {
        this.seventeen_girls = "0";
      } else if (ageRangeVal == "minSeventeengirls") {
        this.minSeventeengirls = "0";
      } else if (ageRangeVal == "ninteen_boys") {
        this.ninteen_boys = "0";
      } else if (ageRangeVal == "minNinteenboys") {
        this.minNinteenboys = "0";
      } else if (ageRangeVal == "ninteen_girls") {
        this.ninteen_girls = "0";
      } else this.minNinteengirls = "0";
    }
  }

  getGameData() {
    this.showspinner = true;
    this.gameService.getGameList().subscribe(
      (response) => {
        if (response !== "") {
          this.showspinner = false;
          this.gameData = response;
          this.schoolData = this.gameData;
        } else {
          alert("im blankl=");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }

  showDialog(rowid: number) {
    this.display = true;
  }

  initialForm() {
    this.gameFiletrType = "Team";
    this.options = this.issoUtilService.setGameType();
    this.eleven_boys = "0";
    this.eleven_girls = "0";
    this.fourteen_boys = "0";
    this.fourteen_girls = "0";
    this.sixteen_boys = "0";
    this.sixteen_girls = "0";
    this.seventeen_boys = "0";
    this.seventeen_girls = "0";
    this.ninteen_boys = "0";
    this.ninteen_girls = "0";
    this.minElevenboys = "0";
    this.minElevengirls = "0";
    this.minfourteenboys = "0";
    this.minsixteenteenboys = "0";
    this.minsixteengirls = "0";
    this.minfourteengirls = "0";
    this.minSeventeenboys = "0";
    this.minSeventeengirls = "0";
    this.minNinteenboys = "0";
    this.minNinteengirls = "0";

    this.gameForm = this.fb.group({
      gameId: [""],
      gameName: ["", Validators.required],
      gameDescription: ["", Validators.required],
      gameType: ["", Validators.required],
      eleven_boys: "0",
      minElevenboys: "0",
      eleven_girls: "0",
      minElevengirls: "0",
      fourteen_boys: "0",
      minfourteenboys: "0",
      fourteen_girls: "0",
      minfourteengirls: "0",
      sixteen_boys: "0",
      minsixteenteenboys: "0",
      sixteen_girls: "0",
      minsixteengirls: "0",
      seventeen_boys: "0",
      minSeventeenboys: "0",
      seventeen_girls: "0",
      minSeventeengirls: "0",
      ninteen_boys: "0",
      minNinteenboys: "0",
      ninteen_girls: "0",
      minNinteengirls: "0",
    });
  }
  editGame(game: Event, gameData: Game, type: any) {
    this.gameId = gameData.gameId;
    this.gameType = gameData.gameType;
    this.gameName = gameData.gameName;
    this.gameDescription = gameData.gameDescription;
    this.isBothGameReadble = true;
    console.log(gameData);
    if (gameData.gameType == "Individual") {
      console.log("im gameData" + JSON.stringify(gameData));
      console.log("im individual" + this.eleven_boys);
      this.isTeamGame = false;
      this.eleven_boys = gameData.eleven_boys;
      this.eleven_girls = gameData.eleven_girls;
      this.fourteen_boys = gameData.fourteen_boys;
      this.fourteen_girls = gameData.fourteen_girls;
      this.sixteen_boys = gameData.sixteen_boys;
      this.sixteen_girls = gameData.sixteen_girls;
      this.seventeen_boys = gameData.seventeen_boys;
      this.seventeen_girls = gameData.seventeen_girls;
      this.ninteen_boys = gameData.ninteen_boys;
      this.ninteen_girls = gameData.ninteen_girls;
    }
    if (gameData.gameType == "Team") {
      this.isTeamGame = true;
      this.eleven_boys = gameData.eleven_boys;
      this.eleven_girls = gameData.eleven_girls;
      this.fourteen_boys = gameData.fourteen_boys;
      this.fourteen_girls = gameData.fourteen_girls;
      this.sixteen_boys = gameData.sixteen_boys;
      this.sixteen_girls = gameData.sixteen_girls;
      this.seventeen_boys = gameData.seventeen_boys;
      this.seventeen_girls = gameData.seventeen_girls;
      this.ninteen_boys = gameData.ninteen_boys;
      this.ninteen_girls = gameData.ninteen_girls;

      this.minElevenboys = gameData.min_eleven_boys;
      this.minElevengirls = gameData.min_eleven_girls;
      this.minfourteenboys = gameData.min_fourteen_boys;
      this.minfourteengirls = gameData.min_fourteen_girls;
      this.minsixteenteenboys = gameData.min_sixteen_boys;
      this.minsixteengirls = gameData.min_sixteen_girls;
      this.minSeventeenboys = gameData.min_seventeen_boys;
      this.minSeventeengirls = gameData.min_seventeen_girls;
      this.minNinteenboys = gameData.min_ninteen_boys;
      this.minNinteengirls = gameData.min_ninteen_girls;
    }
    console.log("DATAA----->" + this.minsixteengirls);
    if (gameData.gameType == "Both") {
      console.log("im both game");
      this.isTeamGame = true;
    }

    this.display = true;
  }
  getEventData() {
    this.gameService.getEventData().subscribe(
      (response) => {
        if (response !== "") {
          this.eventResponseData = response;
          this.eventOptions = [];
          this.eventResponseData.forEach((element) => {
            this.eventOptions.push({
              label: element.eventName,
              value: element.eventId,
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
  addNewGame(event: Event, schoolData: Game, type: any) {
    this.isBothGameReadble = false;
    if (type == "edit") {
      this.gameForm.setValue({
        gameId: schoolData.gameId,
        gameName: schoolData.gameName,
        gameDescription: schoolData.gameDescription,
        gameType: schoolData.gameType,
        selectedCities: "",
        eleven_boys: "",
        eleven_girls: "",
        fourteen_boys: "",
        fourteen_girls: "",
        sixteen_boys: "",
        sixteen_girls: "",
        seventeen_boys: "",
        seventeen_girls: "",
        ninteen_boys: "",
        ninteen_girls: "",
      });
    } else {
      this.isTeamGame = false;
      this.gameName = "";
      this.gameId = "";
      this.gameDescription = "";
      this.gameType = "";
      this.eleven_boys = "0";
      this.eleven_girls = "0";
      this.fourteen_boys = "0";
      this.fourteen_girls = "0";
      this.sixteen_boys = "0";
      this.sixteen_girls = "0";
      this.seventeen_boys = "0";
      this.seventeen_girls = "0";
      this.ninteen_boys = "0";
      this.ninteen_girls = "0";
      this.display = true;
    }
  }

  onSubmit() {
    this.submitted = true;
    const formData = new FormData();
    let gameId = this.gameForm.get("gameId").value;

    formData.append("gameName", this.gameForm.get("gameName").value);
    formData.append(
      "gameDescription",
      this.gameForm.get("gameDescription").value
    );
    formData.append("gameType", this.gameForm.get("gameType").value);
    formData.append("eleven_boys", this.gameForm.get("eleven_boys").value);
    formData.append("minElevenboys", this.gameForm.get("minElevenboys").value);
    formData.append("eleven_girls", this.gameForm.get("eleven_girls").value);
    formData.append(
      "minElevengirls",
      this.gameForm.get("minElevengirls").value
    );
    formData.append("fourteen_boys", this.gameForm.get("fourteen_boys").value);
    formData.append(
      "minfourteenboys",
      this.gameForm.get("minfourteenboys").value
    );
    formData.append(
      "fourteen_girls",
      this.gameForm.get("fourteen_girls").value
    );
    formData.append(
      "minfourteengirls",
      this.gameForm.get("minfourteengirls").value
    );
    formData.append("sixteen_boys", this.gameForm.get("sixteen_boys").value);
    formData.append(
      "minsixteenboys",
      this.gameForm.get("minsixteenteenboys").value
    ); //minsixteenteenboys
    formData.append("sixteen_girls", this.gameForm.get("sixteen_girls").value);
    formData.append(
      "minsixteengirls",
      this.gameForm.get("minsixteengirls").value
    );
    formData.append(
      "seventeen_boys",
      this.gameForm.get("seventeen_boys").value
    );
    formData.append(
      "minSeventeenboys",
      this.gameForm.get("minSeventeenboys").value
    );
    formData.append(
      "seventeen_girls",
      this.gameForm.get("seventeen_girls").value
    );
    formData.append(
      "minSeventeengirls",
      this.gameForm.get("minSeventeengirls").value
    );
    formData.append("ninteen_boys", this.gameForm.get("ninteen_boys").value);
    formData.append(
      "minNinteenboys",
      this.gameForm.get("minNinteenboys").value
    );
    formData.append("ninteen_girls", this.gameForm.get("ninteen_girls").value);
    formData.append(
      "minNinteengirls",
      this.gameForm.get("minNinteengirls").value
    );

    if (gameId == "") {
      this.gameService.saveGameData(formData).subscribe(
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
              summary: "New Game data Added Successfully",
            });
          }
          this.display = false;
          this.filterGame(this.gameFiletrType, 0);
          this.initialForm();
        },
        (error) => (this.error = error)
      );
    } else {
      this.gameService.editGameData(gameId, formData).subscribe(
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
              summary: "Game Data Updated Successfully",
            });
          }
          this.display = false;
          this.filterGame(this.gameFiletrType, 0);
          // this.getGameData();
        },
        (error) => (this.error = error)
      );
    }
  }

  hideExtraView() {
    this.display = false;
  }

  deleteSchoolData(event: Event, schoolData: Game) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-delete-school",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete game data?",
      accept: () => {
        this.deleteGame(schoolData);
      },
    });
  }

  chekDuplicateGame(event) {
    const formData = new FormData();
    formData.append("gameName", event.target.value);
    formData.append("isGameId", "false");
    this.gameService.chekDuplicateGame(formData).subscribe(
      (res) => {
        if (res) {
          this.messageService.add({
            key: "custom",
            severity: "error",
            summary: "This Game is already exist",
          });
          this.gameForm.patchValue({ gameName: "" });
        }
      },
      (error) => (this.error = error)
    );
  }

  deleteGame(School) {
    let gameId = School.gameId;
    this.gameService.deleteGame(gameId).subscribe(
      (res) => {
        //  if (res.status !== 'error') {
        //    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        //  } else {
        this.messageService.add({
          key: "custom",
          severity: "success",
          summary: "Game Data Deleted Successfully",
        });

        //  }

        this.display = false;
        this.filterGame(this.gameFiletrType, 0);
      },
      (error) => (this.error = error)
    );
  }

  private _dropDatabase() {
    console.log("Database dropped");
  }
}
