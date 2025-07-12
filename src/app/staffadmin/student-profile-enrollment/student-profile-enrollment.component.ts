import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import * as moment from "moment";

import { MessageService, SelectItem, Message } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { PaymentService } from "../service/payment.service";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "src/environments/environment";
import { StudentProfileService } from "src/app/admin/service/student-profile.service";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { HttpBackend, HttpClient } from "@angular/common/http";

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: "app-student-profile-enrollment",
  templateUrl: "./student-profile-enrollment.component.html",
  styleUrls: ["./student-profile-enrollment.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class StudentProfileEnrollmentComponent implements OnInit, OnChanges {
  isLoading: boolean = false;
  filteredPages: any[];
  display: boolean = false;
  displaySubgameDialog: boolean = false;
  yearOptions: object;
  schoolId: string;
  studentProfileData: any;
  alreadyAddedStudentData: any;
  studentProfileArray = [];
  alreadyAddedStudentArray: any;
  saveEnrolledStudentArray = [];
  setPhotoYear: string;
  serverUrl = environment.baseUrl;
  studentDataLength: number;
  selectedIndex: any;
  selectedStudent: any = null;
  isFirstYear: boolean;
  selectedYearVal: any;
  approvalCount = 0;
  pendingCount = 0;
  schoolName: string;
  dropdownOptions = ["Math", "Science", "History"];
  @Input() studentEnrollData: any;
  @Input() studentSubgameData: any;
  subGameoptions: SelectItem[];
  studentId: any;
  studentDataArray = [];
  isSubgame: boolean;
  isSelectSubGame: boolean = false;
  subGameIdCounts: { [key: string]: number } = {};
  selectedSubgame: any = null; // bound to p-dropdown
  selectedSubgamesTable: any[] = [];
  extraTabDetailsTable: any[] = [];
  selectedStudentForSubgame: any;
  subGameIdArray = [];
  subGameNameArray = [];
  checkSubGameCapacity: any = [];
  isTeamComplete: boolean = false;
  private http: HttpClient;
  isMaxTeamComplete: boolean = false;
  subGameTableArray = [];
  addGameLabel: String;
  subgameStudentId: any;
  errorMessage: string;
  countMap: { [key: string]: number } = {};
  gameModifystatus: string;
  addSubGameLabel: string;
  isCustomDialogClicked: boolean;
  subGameIdCountsBackup: any;
  tabLabels = ""; // can be loaded from API
  tabNames: string[] = [];
  form: FormGroup;

  extraTabRequired: string;
  displayAddDetailsDialog: boolean;
  extraTabButtonLabel: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private messageService: MessageService,
    private studentProfileService: StudentProfileService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private issoUtilService: IssoUtilService,
    private renderer: Renderer2,

    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.studentEnrollData && changes.studentEnrollData) {
      this.schoolId = localStorage.getItem("schoolId");
      this.getStudentDataForEnroll();

      this.subGameoptions = [];
      this.gameModifystatus = "oninit";
      this.alreadyEnrolledStudent();
      if (this.studentSubgameData.length > 0) {
        console.log("im subgame");
        this.isSubgame = true;
        this.setSubGameData();
      } else {
        this.isSubgame = false;
      }
    }
  }
  get tabs(): FormArray {
    return this.form.get("tabs") as FormArray;
  }
  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
  editExtraInfo(student: any) {
    this.extraTabButtonLabel = "Save";
    console.log("Im edit form-->" + JSON.stringify(student));
    this.selectedStudentForSubgame = student;
    this.displayAddDetailsDialog = true;
    this.patchExtraInfoForm(student.extrInfo);
  }
  updateExtraInfo(student: any) {
    console.log("Im edit form-->" + JSON.stringify(student));
    this.extraTabButtonLabel = "Update";
    this.selectedStudentForSubgame = student;
    this.displayAddDetailsDialog = true;
    this.patchExtraInfoForm(student.extrInfo);
  }
  patchExtraInfoForm(extrInfo: any) {
    const tabsArray = this.form.get("tabs") as FormArray;
    tabsArray.clear(); // clear existing controls

    const infoObj = extrInfo[0]; // get the object from array
    this.tabNames = Object.keys(infoObj); // set labels

    Object.values(infoObj).forEach((value) => {
      tabsArray.push(this.fb.control(value, Validators.required));
    });
  }

  onSubmit() {
    this.extraTabDetailsTable = [];
    if (this.form.valid) {
      const formData = {};
      this.tabNames.forEach((label, index) => {
        formData[label] = this.tabs.at(index).value;
      });
      this.extraTabDetailsTable.push(formData);

      console.log("Final API Data:", this.extraTabDetailsTable);
      this.displayAddDetailsDialog = false;

      if (this.extraTabButtonLabel !== "Update") {
        if (
          this.selectedStudentForSubgame &&
          this.studentDataArray.find(
            (s) => s.sId === this.selectedStudentForSubgame.sId
          )
        ) {
          this.selectedStudentForSubgame.extrInfo = this.extraTabDetailsTable;
        }
        console.log("NEW DATA--->" + JSON.stringify(this.studentDataArray));
      } else {
        const formData = new FormData();
        formData.append("studentId", this.selectedStudentForSubgame.studentId);
        formData.append("eventId", this.selectedStudentForSubgame.eventId);
        formData.append("schoolId", this.selectedStudentForSubgame.schoolId);
        formData.append("extraInfo", JSON.stringify(this.extraTabDetailsTable));
        this.studentProfileService.updateStudentExtraInfo(formData).subscribe(
          (res) => {
            if (res.status === "success") {
              console.log("Im success");
              this.messageService.add({
                key: "custom",
                severity: "success",
                summary: "Data Updated Successfully",
              });
            }
            this.displaySubgameDialog = false;
            this.isCustomDialogClicked = false;
            this.alreadyEnrolledStudent();
          },
          (error) => {
            this.displaySubgameDialog = false;
            this.isCustomDialogClicked = false;
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: error.errorDesc,
            });
          }
        );
      }
    }
    this.form.reset();
  }
  submitUpdateExtraInfo() {
    const formData = new FormData();
    formData.append("studentId", this.subgameStudentId);
    formData.append("subgameIdArray", JSON.stringify(this.subGameIdArray));
    formData.append("subgameNameArray", JSON.stringify(this.subGameNameArray));
    this.studentProfileService
      .updateStudentSubgame(this.subgameStudentId, formData)
      .subscribe(
        (res) => {
          if (res.status === "success") {
            console.log("Im success");
            this.messageService.add({
              key: "custom",
              severity: "success",
              summary: "Updated Successfully",
            });
          }
          this.displaySubgameDialog = false;
          this.isCustomDialogClicked = false;
          this.alreadyEnrolledStudent();
        },
        (error) => {
          this.displaySubgameDialog = false;
          this.isCustomDialogClicked = false;
          this.messageService.add({
            key: "custom",
            severity: "error",
            summary: error.errorDesc,
          });
        }
      );
    this.selectedSubgame = null;
  }
  setSubGameData() {
    this.subGameoptions = [];
    this.subGameoptions = this.studentSubgameData
      .filter((element) => {
        const keys = Object.keys(element);
        const maxKey = keys.find(
          (k) =>
            !k.startsWith("min_") &&
            /^[a-z_]+[0-9]*$/i.test(k) &&
            !["id", "subGameName", "gameId", "gameType"].includes(k)
        );
        return maxKey && parseInt(element[maxKey], 10) > 0;
      })
      .map((element) => {
        const keys = Object.keys(element);
        const maxKey = keys.find(
          (k) =>
            !k.startsWith("min_") &&
            /^[a-z_]+[0-9]*$/i.test(k) &&
            !["id", "subGameName", "gameId", "gameType"].includes(k)
        );
        const minKey = `min_${maxKey}`;

        return {
          label: element.subGameName,
          value: {
            id: element.id,
            name: element.subGameName,
            max: +element[maxKey],
            min: +element[minKey],
          },
        };
      });

    this.subGameoptions.unshift({
      label: "Please select",
      value: null,
    });
  }
  ngOnInit(): void {
    this.errorMessage = "";
    this.addSubGameLabel = "Add Subgame";
    this.addGameLabel = "Assign Subgame";
    this.selectedSubgamesTable = [];
    this.subGameIdCounts = null;
    this.checkSubGameCapacity = [];
    this.yearOptions = this.issoUtilService.setYearToStaffadmin();
    this.setPhotoPath();

    this.extraTabRequired = localStorage.getItem("extraTabRequired");
    if (this.extraTabRequired == "Yes") {
      // console.log("Im not empty" + localStorage.getItem("extraTabValues"));
      // this.tabLabels = localStorage.getItem("extraTabValues");
      // this.tabNames = this.tabLabels.split(",").map((t) => t.trim());
      // this.form = this.fb.group({
      //   tabs: this.fb.array([]),
      // });

      // this.tabNames.forEach(() => {
      //   this.tabs.push(this.fb.control("", Validators.required));
      // });

      this.buildExtraTabsForm();
    }
  }
  closeDetailDialog() {
    console.log("Im close");
    this.displayAddDetailsDialog = false;
    this.form.reset();
  }
  buildExtraTabsForm() {
    this.tabLabels = localStorage.getItem("extraTabValues") || "";
    this.tabNames = this.tabLabels.split(",").map((t) => t.trim());

    this.form = this.fb.group({
      tabs: this.fb.array([]),
    });

    this.tabNames.forEach(() => {
      this.tabs.push(this.fb.control("", Validators.required));
    });
  }
  addSubgame() {
    this.countMap = {};
    const newCountMap: { [key: string]: number } = {};
    this.errorMessage = "";
    if (!this.selectedSubgame) {
      this.errorMessage = "Please select a subgame";
      this.selectedSubgame = null;
      return;
    }

    const alreadyAdded = this.selectedSubgamesTable.some(
      (s) => s.id === this.selectedSubgame.id
    );

    if (alreadyAdded) {
      this.errorMessage = "Subgame already added";
      this.selectedSubgame = null;
      return;
    }

    if (this.selectedSubgamesTable.length >= 3) {
      this.errorMessage = "You can add a maximum of 3 subgames";
      this.selectedSubgame = null;
      return;
    }

    this.checkSubGameCapacity.push(this.selectedSubgame.id);
    const id = this.selectedSubgame.id.toString();
    this.countMap[id] = (this.countMap[id] || 0) + 1;
    this.subGameIdCounts[id] = (this.subGameIdCounts[id] || 0) + 1;
    // this.checkSubGameCapacity.forEach((id) => {
    //   if (String(this.countMap[id]) !== id) {
    //     this.countMap[id] = (this.countMap[id] || 0) + 1;
    //     this.subGameIdCounts[id] = (this.subGameIdCounts[id] || 0) + 1;
    //   }
    // });
    //console.log("AAAA_----->" + JSON.stringify(this.subGameIdCounts));
    // this.checkSubGameCapacity.forEach((id) => {
    //   const idStr = String(id);
    //   if (!this.countMap.hasOwnProperty(idStr)) {
    //     console.log("Adding new id to countMap ---> " + idStr);
    //     this.countMap[idStr] = 1;
    //   }
    //   newCountMap[idStr] = (newCountMap[idStr] || 0) + 1;
    //   // this.countMap[idStr] = (this.countMap[idStr] || 0) + 1;
    // });
    // console.log("New CountMap-->" + JSON.stringify(newCountMap));
    // if (!this.hasDuplicates(this.checkSubGameCapacity)) {
    //   this.countMap = {}; // clear before rebuild
    //   this.checkSubGameCapacity.forEach((id) => {
    //     console.log("Im forloop");
    //     this.countMap[id] = (this.countMap[id] || 0) + 1;
    //   });

    //   console.log("countMap -->", this.countMap);
    // } else {
    //   console.warn("Duplicate IDs found. countMap not updated.");
    // }
    // console.log("COOO---->" + JSON.stringify(this.countMap));

    const currentCount = this.subGameIdCounts[this.selectedSubgame.id];
    const maxAllowed = this.selectedSubgame.max;

    if (currentCount > maxAllowed) {
      this.checkSubGameCapacity.pop();
      // const idStr = String(this.selectedSubgame.id);
      // if (this.subGameIdCounts[idStr]) {
      //   this.subGameIdCounts[idStr]--;
      //   if (this.subGameIdCounts[idStr] === 0) {
      //     delete this.subGameIdCounts[idStr];
      //   }
      // }
      if (this.subGameIdCounts[this.selectedSubgame.id] !== undefined) {
        this.subGameIdCounts[this.selectedSubgame.id] =
          this.selectedSubgame.max;
      }
      console.log(
        "Check sUBGAME----->" + JSON.stringify(this.checkSubGameCapacity)
      );
      console.log("BBBB----->" + JSON.stringify(this.subGameIdCounts));
      this.errorMessage = `Capacity is full for <b>${this.selectedSubgame.name}</b>`;
      this.selectedSubgame = null;
      return;
    }

    this.subGameIdArray.push(this.selectedSubgame.id);
    this.subGameNameArray.push(this.selectedSubgame.name);

    this.selectedSubgamesTable.push(this.selectedSubgame);

    this.selectedSubgame = null;
  }
  hasDuplicates(arr: (string | number)[]): boolean {
    const seen = new Set();
    for (const id of arr) {
      if (seen.has(id)) {
        return true;
      }
      seen.add(id);
    }
    return false;
  }
  changeSubgame(student) {
    this.errorMessage = "";
    this.subGameIdCountsBackup = JSON.parse(
      JSON.stringify(this.subGameIdCounts)
    );
    this.selectedStudentForSubgame = student;
    this.addGameLabel = "Assign Subgame";

    this.subGameTableArray = [];
    const subgameArray = student.subGameId.split(",").map((id) => +id); // converts to [18, 19]
    this.subgameStudentId = student.sId;
    for (let i = 0; i < subgameArray.length; i++) {
      this.studentSubgameData.map((element) => {
        const keys = Object.keys(element);
        if (subgameArray[i] == element.id) {
          const maxKey = keys.find(
            (k) =>
              !k.startsWith("min_") &&
              /^[a-z_]+[0-9]*$/i.test(k) &&
              !["id", "subGameName", "gameId", "gameType"].includes(k)
          );
          const minKey = `min_${maxKey}`;

          this.subGameTableArray.push({
            id: String(subgameArray[i]),
            max: Number(element[maxKey]),
            min: Number(element[minKey]),
            name: element.subGameName,
          });
          this.subGameIdArray.push(element.id);
          this.subGameNameArray.push(element.subGameName);
        }
      });
    }

    this.selectedSubgamesTable.push(...this.subGameTableArray);
    this.displaySubgameDialog = true;
  }

  editSubgame(student) {
    this.addGameLabel = "Update Subgame";
    console.log("edtut" + JSON.stringify(student));

    this.subGameTableArray = [];
    const subgameArray = student.subgameId.split(",").map((id) => +id); // converts to [18, 19]
    this.subgameStudentId = student.sId;
    for (let i = 0; i < subgameArray.length; i++) {
      this.studentSubgameData.map((element) => {
        const keys = Object.keys(element);
        if (subgameArray[i] == element.id) {
          const maxKey = keys.find(
            (k) =>
              !k.startsWith("min_") &&
              /^[a-z_]+[0-9]*$/i.test(k) &&
              !["id", "subGameName", "gameId", "gameType"].includes(k)
          );
          const minKey = `min_${maxKey}`;

          this.subGameTableArray.push({
            id: String(subgameArray[i]),
            max: Number(element[maxKey]),
            min: Number(element[minKey]),
            name: element.subGameName,
          });
          this.subGameIdArray.push(element.id);
          this.subGameNameArray.push(element.subGameName);
        }
      });
    }
    this.subGameIdCountsBackup = JSON.parse(
      JSON.stringify(this.subGameIdCounts)
    );
    this.selectedSubgamesTable.push(...this.subGameTableArray);
    this.displaySubgameDialog = true;
  }

  // isSaveDisabled(): boolean {
  //   if (this.studentEnrollData[6] == "Both") {
  //     const result = this.studentDataArray.some((student) => {
  //       const val = student.subGameId;
  //       return (
  //         val === undefined ||
  //         val === null ||
  //         (typeof val === "string" && val.trim() === "")
  //       );
  //     });
  //     return result;
  //   } else {
  //     return false;
  //   }
  // }
  isSaveDisabled(): boolean {
    if (this.studentEnrollData[6] === "Both") {
      const result = this.studentDataArray.some((student) => {
        const subGameInvalid =
          student.subGameId === undefined ||
          student.subGameId === null ||
          (typeof student.subGameId === "string" &&
            student.subGameId.trim() === "");

        const extraInfoInvalid =
          this.extraTabRequired === "Yes" &&
          (!student.extrInfo || student.extrInfo.length === 0);

        return subGameInvalid || extraInfoInvalid;
      });

      return result;
    } else {
      return false;
    }
  }

  onCustomXClicked() {
    // this.dialogClosedByX = true; // set when X is clicked
    console.log("I clieck close");
    this.displaySubgameDialog = false;
    this.isCustomDialogClicked = true;
  }
  onDialogClose() {
    console.log("I clieck HIDE12");
    this.errorMessage = "";
    this.subGameIdArray = [];
    this.subGameNameArray = [];
    this.selectedSubgame = null;
    if (!this.isCustomDialogClicked) {
      if (this.gameModifystatus == "Add Subgame") {
        this.isCustomDialogClicked = false;
        console.log("Custom dialog not cliecked");
        const selectedIds = this.selectedSubgamesTable.map((item) => item.id); // already strings
        this.subGameIdCounts = Object.entries(this.subGameIdCounts)
          .filter(([key]) => !selectedIds.includes(key))
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {} as { [key: string]: number });
      }
    } else {
      this.subGameIdCounts = JSON.parse(
        JSON.stringify(this.subGameIdCountsBackup)
      );

      // this.subGameIdCounts = this.subGameIdCounts;
      console.log("Custom dialog cliecked");
    }
    this.subGameIdCountsBackup = null;
    this.selectedSubgamesTable = [];
    console.log(
      "Filtered subGameIdCounts",
      JSON.stringify(this.subGameIdCounts)
    );
  }
  removeSubgame(sub) {
    this.selectedSubgamesTable = this.selectedSubgamesTable.filter(
      (s) => s.id !== sub.id
    );
    const index = this.checkSubGameCapacity.findIndex((id) => id == sub.id);
    if (index !== -1) {
      this.checkSubGameCapacity.splice(index, 1);
    }

    console.log("BEFORE COUNTMAP-->" + JSON.stringify(this.countMap));
    const idStr = String(sub.id);

    if (this.subGameIdCounts[idStr]) {
      this.subGameIdCounts[idStr]--;
      if (this.subGameIdCounts[idStr] === 0) {
        console.log("Im if countMap-->" + idStr);
        delete this.subGameIdCounts[idStr];
      }
    }
    console.log(
      "subGameIdCounts- IN REMOVING->" + JSON.stringify(this.subGameIdCounts)
    );
    this.subGameIdArray = this.subGameIdArray.filter((item) => item !== sub.id);
    this.subGameNameArray = this.subGameNameArray.filter(
      (item) => item !== sub.name
    );
    console.log(
      "checkSubGameCapacity REMOVINVG-->" +
        JSON.stringify(this.checkSubGameCapacity)
    );
  }
  saveSubgames() {
    if (this.addGameLabel !== "Update Subgame") {
      if (this.selectedSubgamesTable.length === 0) {
        // alert("Please add at least one subgame");
        this.errorMessage = "Please add at least one subgame";
        return;
      }
      // this.studentDataArray.push(...this.selectedSubgamesTable);
      // Optionally clear selections after saving
      console.log(
        "IM selectedStudentForSubgame-->" +
          JSON.stringify(this.selectedStudentForSubgame)
      );
      if (
        this.selectedStudentForSubgame &&
        this.studentDataArray.find(
          (s) => s.sId === this.selectedStudentForSubgame.sId
        )
      ) {
        //this.checkSubGameCapacity.push(this.selectedSubgamesTable.id);
        this.selectedStudentForSubgame.subGameId =
          this.subGameIdArray.join(",");
        this.selectedStudentForSubgame.subGameName =
          this.subGameNameArray.join(",");

        // this.studentDataArray.push(enrichedStudent);
      }
      this.subGameIdArray = [];
      this.subGameNameArray = [];
      console.log(this.studentDataArray);
      this.selectedSubgamesTable = [];
      this.displaySubgameDialog = false;
      this.isCustomDialogClicked = false;
    } else if (this.selectedSubgamesTable.length === 0) {
      // alert("Please add at least one subgame");
      this.errorMessage = "Please add at least one subgame";
      return;
    } else {
      this.updateSubgame();
    }
    // alert("Subgames saved!");
  }
  // getSubgames(subgames: string | null): string[] {
  //   if (!subgames || subgames === "undefined") return [];
  //   return subgames.split(",").map((s) => s.trim());
  // }
  updateSubgame() {
    this.gameModifystatus = "update";
    console.log("Upate" + this.subgameStudentId);
    console.log("Onsubmt ID" + this.subGameIdArray);
    console.log("Onsubmt A" + this.subGameNameArray);

    const formData = new FormData();
    formData.append("studentId", this.subgameStudentId);
    formData.append("subgameIdArray", JSON.stringify(this.subGameIdArray));
    formData.append("subgameNameArray", JSON.stringify(this.subGameNameArray));
    this.studentProfileService
      .updateStudentSubgame(this.subgameStudentId, formData)
      .subscribe(
        (res) => {
          if (res.status === "success") {
            console.log("Im success");
            this.messageService.add({
              key: "custom",
              severity: "success",
              summary: "Updated Successfully",
            });
          }
          this.displaySubgameDialog = false;
          this.isCustomDialogClicked = false;
          this.alreadyEnrolledStudent();
        },
        (error) => {
          this.displaySubgameDialog = false;
          this.isCustomDialogClicked = false;
          this.messageService.add({
            key: "custom",
            severity: "error",
            summary: error.errorDesc,
          });
        }
      );
    this.selectedSubgame = null;
  }
  //loadGameChange(event) {
  //   const eventval = event.value;
  // }
  async alreadyEnrolledStudent() {
    this.isLoading = true;
    console.log("Im this.subGameIdArray-->" + this.subGameIdArray);
    try {
      const response = await this.http
        .get(
          environment.baseUrl +
            "staffadmin/studentProfile/studentProfileForStaff/alreadyEnrolledStudent/" +
            this.studentEnrollData +
            "/" +
            this.schoolId
        )
        .toPromise();

      // console.log("API Response:", response);
      this.alreadyAddedStudentData = response;
      this.alreadyAddedStudentArray = response;
      this.isLoading = false;
      //console.log("Im data-->" + JSON.stringify(this.alreadyAddedStudentArray));

      const subgameCount: { [key: string]: number } = {};
      if (this.gameModifystatus == "oninit") {
        console.log("Im Onint" + this.subGameIdArray);
        this.alreadyAddedStudentArray.forEach((item) => {
          const subIds = item.subgameId.split(",");
          subIds.forEach((id) => {
            if (subgameCount[id]) {
              subgameCount[id]++;
            } else {
              subgameCount[id] = 1;
            }
          });
        });
        this.subGameIdCounts = subgameCount;
      }
      console.log("Im FINAL subgamecount--->" + JSON.stringify(subgameCount));

      if (
        this.studentEnrollData[6] !== "Both" &&
        this.studentEnrollData[6] !== "Individual"
      ) {
        if (
          this.alreadyAddedStudentData.length >=
          Number(this.studentEnrollData[4])
        ) {
          this.isTeamComplete = true;
        } else {
          this.isTeamComplete = false;
        }
        if (
          this.alreadyAddedStudentData.length >=
          Number(this.studentEnrollData[5])
        ) {
          this.isMaxTeamComplete = true;
        } else {
          this.isMaxTeamComplete = false;
        }
      }
      // ✅ Continue logic here
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  deleteenrolledStudentData(student) {
    this.gameModifystatus = "delete";
    // this.subGameIdArray = student.subgameId;
    const selectedIds = student.subgameId.split(","); // ["20", "21"] subgame.subGameId.split(",");

    console.log("IM FDELETING--->" + JSON.stringify(this.subGameIdCounts));
    this.studentProfileService
      .deleteenrolledStudentData(student.id, this.extraTabRequired)
      .subscribe(
        (res) => {
          this.messageService.add({
            key: "custom",
            severity: "success",
            detail: "Student Data Deleted  successfully!",
          });
          const updatedCounts: { [key: string]: number } = {};

          for (const key in this.subGameIdCounts) {
            let newCount = this.subGameIdCounts[key];
            if (selectedIds.includes(key)) {
              newCount = newCount - 1;
            }

            if (newCount > 0) {
              updatedCounts[key] = newCount;
            }
          }

          this.subGameIdCounts = updatedCounts;
          //  }

          this.display = false;
          this.alreadyEnrolledStudent();
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            detail: error.errorDesc,
          });
        }
      );
  }
  getAgeCutoffDate(ageCategory: number): string {
    const currentDate = new Date();
    const currentYear =
      currentDate.getMonth() + 1 >= 6
        ? currentDate.getFullYear()
        : currentDate.getFullYear() - 1;
    const cutoffYear = currentYear + 1 - ageCategory;
    const cutoffDate = new Date(cutoffYear, 0, 1); // January 1st

    return cutoffDate.toISOString().split("T")[0]; // format: 'YYYY-MM-DD'
  }
  setPhotoPath() {
    this.setPhotoYear =
      this.serverUrl +
      "upload/" +
      this.issoUtilService.getAcademicYearForPhoto();
  }
  removeSelectedStudentData(subgame, i: number): void {
    //  const subgameIds = subgame.subGameId.split(","); // ["20", "21"]

    // subgameIds.forEach((id) => {
    //   delete this.subGameIdCounts[id];
    // });
    // console.log("AFTER REMOVING--->" + JSON.stringify(this.subGameIdCounts));

    const selectedIds = subgame.subGameId.split(","); // ["20", "21"]
    const updatedCounts: { [key: string]: number } = {};

    for (const key in this.subGameIdCounts) {
      let newCount = this.subGameIdCounts[key];
      if (selectedIds.includes(key)) {
        newCount = newCount - 1;
      }

      if (newCount > 0) {
        updatedCounts[key] = newCount;
      }
    }
    this.subGameIdCounts = updatedCounts;
    console.log(
      "Updated subGameIdCounts",
      JSON.stringify(this.subGameIdCounts)
    );

    this.studentDataArray.splice(i, 1);
  }

  onPageSelect(evt: any) {
    this.studentId = evt.sId;
    const student = this.studentProfileData.find(
      (s) => s.sId === this.studentId
    );
    // if (student && !this.studentDataArray.find((s) => s.sId === evt.sId)) {
    this.isSelectSubGame = true;
    if (
      student &&
      !this.studentDataArray.find((s) => s.sId === evt.sId) &&
      !this.alreadyAddedStudentArray.find((s) => s.sId === evt.sId)
    ) {
      const enrichedStudent = {
        ...student,
        eventId: this.studentEnrollData[0],
        gameId: this.studentEnrollData[1],
        gender: this.studentEnrollData[2],
        ageRange: this.studentEnrollData[3],
        minCapacity: this.studentEnrollData[4],
        subGameId: "",
        subGameName: "",
      };
      this.studentDataArray.push(enrichedStudent);
    } else {
      this.messageService.add({
        severity: "error",
        detail: "This student is already exist",
      });
    }
    this.schoolName = null;
  }
  filterPages(event) {
    const query = event.query.toLowerCase();
    this.filteredPages = this.studentProfileArray.filter((student) =>
      student.studentName.toLowerCase().includes(query)
    );
    // this.schoolName = "";
  }
  filterCountry(query, countries: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.studentName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    if (filtered.length <= 0) {
      this.schoolName = "";
    }

    return filtered;
  }
  saveStudentEnroll() {
    this.confirmation.confirm({
      key: "confirm-save-enroll",
      icon: "pi pi-info-circle",
      message: "Are you sure to save student  data?",
      accept: () => {
        this.saveStudentEnrollData();
      },
    });
  }
  deleteStudentEnroll(student) {
    this.confirmation.confirm({
      key: "confirm-delete-enroll",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete student data ?",
      accept: () => {
        this.deleteenrolledStudentData(student);
      },
    });
  }
  saveStudentEnrollData() {
    const formData = new FormData();
    this.gameModifystatus = "save";
    let extraInfo;
    if (this.extraTabRequired == "Yes") {
      extraInfo = "Yes";
    } else {
      extraInfo = "No";
    }
    formData.append("studentData", JSON.stringify(this.studentDataArray));
    formData.append("extraInfo", extraInfo);
    this.studentProfileService.saveEnrolledStudentData(formData).subscribe(
      (res) => {
        if (res.status === "success") {
          this.messageService.add({
            key: "custom",
            severity: "success",
            detail: "Student Data saved Successfully",
          });
        }
        this.studentDataArray = [];
        this.alreadyEnrolledStudent();
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          detail: error.errorDesc,
        });
      }
    );
  }
  getStudentDataForEnroll() {
    this.studentProfileService
      .getStudenteDataForEnroll(
        this.studentEnrollData[2],
        this.studentEnrollData[3],
        this.schoolId
      )
      .subscribe(
        (response: any[]) => {
          //if (response !== "") {

          this.studentProfileData = response;
          this.studentProfileArray = response;
          console.log("Data-->" + this.studentProfileData);
          this.studentDataLength = Object.keys(this.studentProfileData).length;
        },
        (error) => {
          console.log("this is error-->" + JSON.stringify(error.errorDesc));
          this.messageService.add({
            severity: "error",
            detail: error.errorDesc,
          });
        }
      );
  }
  showDialog(student: any) {
    this.display = true;
    this.selectedStudent = student;
  }
  showSubgameDialog(student: any) {
    this.addGameLabel = "Assign Subgame";
    this.displaySubgameDialog = true;
    this.selectedStudentForSubgame = student;
    this.subGameIdCountsBackup = JSON.parse(
      JSON.stringify(this.subGameIdCounts)
    );
  }
  showAddDetailsDialog(student: any) {
    this.extraTabButtonLabel = "Save";
    this.selectedStudentForSubgame = student;
    this.displayAddDetailsDialog = true;
  }
  onImageError(event: any) {
    event.target.src = "assets/images/default-user.png";
  }
}
