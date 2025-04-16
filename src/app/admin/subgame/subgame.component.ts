import { Component, OnInit } from "@angular/core";
import { GameService } from "../service/game.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { SelectItem } from "primeng/api";
import { FormControl } from "@angular/forms";
import { ConfirmationService } from "primeng/api";
import { SubGame } from "../admin-interfaces";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-subgame",
  templateUrl: "./subgame.component.html",
  styleUrls: ["./subgame.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class SubGameComponent implements OnInit {
  rootGame: SelectItem[];

  selectedCars1: string[] = [];

  selectedCars2: string[] = [];

  items: SelectItem[];

  item: string;

  subgameId: any;
  gameForm: FormGroup;
  editForm: FormGroup;
  public errorAlert: boolean = false;
  errormessage: boolean;
  submitted = false;
  display: boolean = false;
  options: SelectItem[];
  rootGameoptions: SelectItem[];
  schoolArray = [];
  control: FormControl;
  gameServiceDATA: any;
  rootGameServicData: any;
  game: SubGame;
  error: string;
  datasource: any;

  totalRecords: number;
  cols: any[];
  placeholderText = "Select Option";
  actions: string;
  loading: boolean;
  disable = false;
  cities1: SelectItem[];
  GameData: SubGame[];
  activeItem: MenuItem;
  gameDataById: SubGame[];
  gameServicedata: any;
  items1: MenuItem[];
  items2: MenuItem[];
  // cars: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  selectedSchool: SubGame;
  carDatavalue: any;
  carId: number;
  gridHeader: any;
  displayDialog: boolean;
  confirmDropDatabaseDialogVisible = false;
  isSubGame: boolean = false;
  isGame: boolean = true;
  eventResponseData: any;
  rootGameData: any;
  showspinner: boolean;
  eleven_boys: any;
  eleven_girls: any;
  fourteen_boys: any;
  fourteen_girls: any;
  sixteen_boys: any;
  sixteen_girls: any;
  seventeen_boys: any;
  seventeen_girls: any;
  ninteen_boys: any;
  ninteen_girls: any;
  gameType: string;
  subgame_name: string;
  rootGameName: any;
  isTeamGame: boolean;
  isIndividualGame: boolean;
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
  selectedGame: string;
  gameId: any;
  constructor(
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private gameService: GameService
  ) {}

  ngOnInit() {
    this.isSubGame = false;
    this.isGame = true;
    this.initialForm();
    this.loading = true;
    this.loadRootGame();
    //this.getGameData()
    this.options = [
      { label: "Please select", value: "" },
      { label: "Team", value: "Team" },
      { label: "Individual", value: "Individual" },
    ];
  }
  onloadMenu(index) {
    if (index == "0") {
      this.isSubGame = false;
      this.isGame = true;
    } else {
      this.isGame = false;
      this.isSubGame = true;
    }
  }

  onDialogHide() {
    this.selectedSchool = null;
  }

  onSortChange(event) {
    let value = event.value;
    if (value.indexOf("!") === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  getGameData() {
    this.showspinner = true;
    this.gameService.getSubGameList().subscribe(
      (response) => {
        if (response !== "") {
          this.showspinner = false;
          this.gameServiceDATA = response;
          this.GameData = this.gameServiceDATA;
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

  hideExtraView() {
    this.display = false;
  }
  loadGameChange(gameData) {
    const gameval = gameData.value;
    // this.gameArray =  gameval.split(",");
    this.gameId = gameData.value;
    // this.gameName =  this.gameArray[1];
    // this.gameType =  this.gameArray[2];
    console.log("Game Type" + gameval);

    //
    if (gameData.value != "") {
      this.showspinner = true;
      this.gameService.subGameListById(gameval).subscribe(
        (response) => {
          // this.gameService.getSubGameList().subscribe(response => {
          if (response !== "") {
            this.showspinner = false;
            this.gameServiceDATA = response;
            this.GameData = this.gameServiceDATA;
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
  initialForm() {
    this.gameForm = this.fb.group({
      gameId: [""],
      gameName: [""],
      subGameName: [""],
      gameType: [""],
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

    this.items = [];
    // for (let i = 0; i < 10000; i++) {
    //     this.items.push({label: 'Item ' + i, value: 'Item ' + i});
    // }
  }

  onGameChange(gameData: any) {
    const gameType = gameData.value;
    console.log("heello==>" + gameType);
    if (gameType == "Team") {
      this.isTeamGame = true;
      this.isIndividualGame = false;
    } else if (gameType == "Individual") {
      this.isTeamGame = true;
      this.isIndividualGame = true;
    }
  }

  editGame(game: Event, GameData: SubGame, type: any) {
    console.log("GameData==>" + JSON.stringify(GameData));
    console.log("Game ID==>" + GameData.gameId);
    this.gameServiceDATA = "";
    let gameId = GameData.subgameId;

    this.subgameId = GameData.subgameId;
    this.rootGameName = GameData.gameId;
    this.gameType = GameData.gameType;
    this.subgame_name = GameData.subGameName;

    if (GameData.gameType == "Individual") {
      this.isTeamGame = false;
      this.eleven_boys = GameData.eleven_boys;
      this.eleven_girls = GameData.eleven_girls;
      this.fourteen_boys = GameData.fourteen_boys;
      this.fourteen_girls = GameData.fourteen_girls;
      this.sixteen_boys = GameData.sixteen_boys;
      this.sixteen_girls = GameData.sixteen_girls;
      this.seventeen_boys = GameData.seventeen_boys;
      this.seventeen_girls = GameData.seventeen_girls;
      this.ninteen_boys = GameData.ninteen_boys;
      this.ninteen_girls = GameData.ninteen_girls;
    } else {
      console.log("Im subgame team");
      this.isTeamGame = true;
      this.eleven_boys = GameData.eleven_boys;
      this.eleven_girls = GameData.eleven_girls;
      this.fourteen_boys = GameData.fourteen_boys;
      this.fourteen_girls = GameData.fourteen_girls;
      this.sixteen_boys = GameData.sixteen_boys;
      this.sixteen_girls = GameData.sixteen_girls;
      this.seventeen_boys = GameData.seventeen_boys;
      this.seventeen_girls = GameData.seventeen_girls;
      this.ninteen_boys = GameData.ninteen_boys;
      this.ninteen_girls = GameData.ninteen_girls;

      this.minElevenboys = GameData.min_eleven_boys;
      this.minElevengirls = GameData.min_eleven_girls;
      this.minfourteenboys = GameData.min_fourteen_boys;
      this.minfourteengirls = GameData.min_fourteen_girls;
      this.minsixteenteenboys = GameData.min_sixteen_boys;
      this.minsixteengirls = GameData.min_sixteen_girls;
      this.minSeventeenboys = GameData.min_seventeen_boys;
      this.minSeventeengirls = GameData.min_seventeen_girls;
      this.minNinteenboys = GameData.min_ninteen_boys;
      this.minNinteengirls = GameData.min_ninteen_girls;
    }

    this.display = true;
  }

  addNewGame(event: Event, GameData: SubGame, type: any) {
    this.isTeamGame = false;
    if (type == "edit") {
      this.gameForm.setValue({
        // gameId:GameData.gameId,
        // gameName: GameData.subGameName,
        // subGameId: GameData.subgameId,
        // gameType: GameData.gameType,
        // selectedCities: '',
        // eleven_boys:'',
        // eleven_girls:'',
        // fourteen_boys:'',
        // fourteen_girls:'',
        // seventeen_boys:'',
        // seventeen_girls: '',
        // ninteen_boys:'',
        // ninteen_girls:''
      });
    } else {
      (this.subgameId = ""), (this.subgame_name = "");
      this.rootGameName = "";
      this.gameType = "";
      this.eleven_boys = "0";
      this.minElevenboys = "0";
      this.eleven_girls = "0";
      this.minElevengirls = "0";
      this.fourteen_boys = "0";
      this.minfourteenboys = "0";
      this.fourteen_girls = "0";
      this.minfourteengirls = "0";
      this.sixteen_boys = "0";
      this.sixteen_girls = "0";
      this.seventeen_boys = "0";
      this.seventeen_girls = "0";
      this.minsixteenteenboys = "0";
      this.minsixteengirls = "0";
      this.seventeen_boys = "0";
      this.minSeventeenboys = "0";
      this.seventeen_girls = "0";
      this.minSeventeengirls = "0";
      this.ninteen_boys = "0";
      this.minNinteenboys = "0";
      this.ninteen_girls = "0";
      this.minNinteengirls = "0";
    }
    this.display = true;
  }
  chekDuplicateGame(event) {
    const formData = new FormData();

    formData.append("gameName", event.target.value);
    formData.append("isGameId", this.gameForm.get("gameId").value);
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
      } else if (ageRangeVal == "sixteen_boys") {
        this.sixteen_boys = "0";
      } else if (ageRangeVal == "minsixteenteenboys") {
        this.minsixteenteenboys = "0";
      } else if (ageRangeVal == "sixteen_girls") {
        this.sixteen_girls = "0";
      } else if (ageRangeVal == "minsixteengirls") {
        this.minsixteengirls = "0";
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
  loadRootGame() {
    this.gameService.getRootGameList().subscribe(
      (response) => {
        if (response !== "") {
          this.rootGameServicData = response;
          this.rootGameData = this.rootGameServicData;
          this.rootGameoptions = [];
          this.rootGameoptions.push({
            label: "Please select",
            value: "",
          });
          this.rootGameData.forEach((element) => {
            this.rootGameoptions.push({
              label: element.gameName,
              value: element.gameId,
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

  onSubmit() {
    this.submitted = true;
    const formData = new FormData();
    //let subGameId =  this.gameForm.get('gameId').value;
    //  console.log('sfsdfsfsf'+subGameId);
    formData.append("gameId", this.gameForm.get("gameId").value);
    formData.append("gameName", this.gameForm.get("gameName").value);
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
      "minfourteengirls",
      this.gameForm.get("minfourteengirls").value
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
    console.log("dfsfsfsfsfd" + this.subgameId);
    if (this.subgameId === "") {
      console.log("Im add");
      this.gameService.saveSubGameData(formData).subscribe(
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
              summary: "New Sub Game Added Successfully",
            });
          }
          this.display = false;
          this.loadSubGameData();
        },
        (error) => (this.error = error)
      );
    } else {
      console.log("Im Edit");
      this.gameService.editSubGameData(this.subgameId, formData).subscribe(
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
              summary: "Sub Game Updated Successfully",
            });
            this.loadSubGameData();
          }
          this.display = false;
          //this.getGameData();
        },
        (error) => (this.error = error)
      );
    }
  }
  loadSubGameData() {
    this.GameData = [];
    this.gameServiceDATA = [];
    this.gameService.subGameListById(this.gameId).subscribe(
      (response) => {
        // this.gameService.getSubGameList().subscribe(response => {
        if (response !== "") {
          this.showspinner = false;
          this.gameServiceDATA = response;
          this.GameData = this.gameServiceDATA;
        } else {
          alert("im blankl=");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }

  deleteSubGameData(event: Event, subGameData: SubGame) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-delete-school",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete subgame data?",
      accept: () => {
        this.deleteGame(subGameData);
      },
    });
  }

  deleteGame(subGameData) {
    const subGameId = subGameData.subgameId;
    this.gameService.deleteSubGame(subGameId).subscribe(
      (res) => {
        //  if (res.status !== 'error') {
        //    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        //  } else {
        this.messageService.add({
          key: "custom",
          severity: "success",
          summary: "Sub Game Data Deleted Successfully",
        });

        //  }
        this.loadSubGameData();
        this.display = false;
        //this.getGameData();
      },
      (error) => (this.error = error)
    );
  }

  private _dropDatabase() {
    console.log("Database dropped");
  }
}
