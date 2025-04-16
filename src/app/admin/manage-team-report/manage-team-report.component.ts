import { Component, OnInit } from "@angular/core";
import { SchoolService } from "../service/school.service";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { EventService } from "../service/event.service";
import { SelectItem } from "primeng/api";
import { FormControl } from "@angular/forms";
import { PageNotFoundComponent } from "src/app/page-not-found/page-not-found.component";
import { ChangeDetectionStrategy, HostListener } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { UpcomingEvent } from "../admin-interfaces";

import { Table } from "primeng/components/table/table";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { ReportMeritService } from "../service/report-merit.service";
import { StudentEnrollmentService } from "src/app/staffadmin/service/student-enrollment.service";

@Component({
  selector: "app-manage-team-report",
  templateUrl: "./manage-team-report.component.html",
  styleUrls: ["./manage-team-report.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class ManageTeamReport implements OnInit {
  gameOptions: SelectItem[];
  schoolOptions: SelectItem[];
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  gameList: any;
  eventYear: string;
  loading: boolean;
  showspinner: boolean;
  selectedYear: string;
  eventServiceData: any;
  eventInfo: Event[];
  display: boolean;
  error: any;
  yearOptions: SelectItem[];
  yearvalue: number;
  showTable: boolean;
  eventData: any;
  gameReadble: boolean;
  schoolReadble: boolean;
  eventOptions: any[];
  eventReadable: boolean;
  isDataAvailble: boolean;
  selectedYearVal: string;
  eventValue: any;
  selectedGame: string;
  ageReadble: boolean;
  genderReadble: boolean;
  gameVal: any;
  ageVal: any;
  genderval: any;
  eventId: any;
  schoolListResponse: any;
  schoolListArray = [];
  filteredPages: any[];
  schoolName: string;
  schoolId: string;
  selectedAge: string;
  selectedGender: string;
  schoolEnter: boolean;
  selectedSchool: string;
  ageArray: string[];
  constructor(
    private confirmation: ConfirmationService,
    private eventService: EventService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private studentEnrollmentService: StudentEnrollmentService,
    private meritService: ReportMeritService,
    private issoUtilService: IssoUtilService,
    private schoolService: SchoolService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.loadInitialData();
    this.loadAllSchool();
  }

  onPageSelect(evt: any) {
    console.log(evt.id);
    // this.schoolId = evt.id;
    this.schoolId = evt.id;
    console.log("Value" + JSON.stringify(evt));
  }
  filterPages(event) {
    this.filteredPages = this.filterCountry(event.query, this.schoolListArray);
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
  loadInitialData() {
    this.yearOptions = this.issoUtilService.setYear();
    //this.ageOptions = this.issoUtilService.setAge();
    // this.genderOptions = this.issoUtilService.setGender();
  }
  onyeareChange(event) {
    this.yearvalue = event.value;
    this.gameOptions = [];
    this.selectedGame = "";
    this.selectedGender = "";
    this.selectedAge = "";
    this.ageReadble = false;
    this.gameReadble = false;
    this.genderReadble = false;
    this.schoolEnter = false;
    this.selectedSchool = "";
    this.meritService.loadEventByYearForReport(this.yearvalue, 3).subscribe(
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
    let yearVal = this.yearvalue.toString();
    let eventYear = yearVal.split("-");
    this.selectedYearVal = eventYear[1];
    this.eventValue = event.value;
    this.selectedSchool = "";
    this.gameOptions = [];
    this.selectedGame = "";
    this.selectedGender = "";
    this.selectedAge = "";
    this.ageReadble = false;
    this.gameReadble = false;
    this.genderReadble = false;
    this.schoolEnter = false;
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
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  loadGameChange(event) {
    console.log(event.value);
    this.schoolEnter = false;
    this.gameVal = event.value;
    this.selectedSchool = "";
    if (event.value !== "") {
      this.meritService
        .setAgeMapForMerit(this.eventValue, this.gameVal)
        .subscribe(
          (response) => {
            this.ageReadble = true;
            this.selectedAge = "";
            this.selectedGender = "";
            this.genderReadble = false;
            let ageList;
            if (
              response[0].ageRange !== "null" ||
              response[0].girlsAgeRange !== "null"
            ) {
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

              if (response[0].ageRange == "null") {
                ageList = response[0].girlsAgeRange;
              } else if (response[0].girlsAgeRange !== "null") {
                ageList = response[0].ageRange;
              } else {
                ageList =
                  response[0].ageRange + " " + response[0].girlsAgeRange;
              }
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
            }
          },
          (error) => {
            //this.errorAlert =true;
          }
        );
    } else {
      this.ageReadble = false;
    }
    // if()
  }
  loadAgeChange(event) {
    this.ageVal = event.value;
    this.schoolEnter = false;
    this.selectedSchool = "";

    if (event.value !== "") {
      this.genderReadble = true;
    } else {
      this.genderReadble = false;
      this.selectedGender = "";
    }
  }
  loadGenderChange(event) {
    this.genderval = event.value;
    if (event.value !== "") {
      this.schoolEnter = true;
    } else {
      this.schoolEnter = false;
      this.selectedSchool = "";
    }
  }
  bookEvent() {
    this.display = false;
    const formData = new FormData();
    formData.append("eventId", this.eventValue);
    formData.append("schoolId", this.schoolId);
    formData.append("gameId", this.gameVal);
    formData.append("ageRange", this.ageVal);
    formData.append("gender", this.genderval);
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
  loadAllSchool() {
    this.meritService.loadAllSchool().subscribe(
      (response) => {
        if (response !== "") {
          this.schoolListResponse = response;
          this.schoolListArray = this.schoolListResponse;
          //this._radioDevicesList = this.schoolListArray
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
