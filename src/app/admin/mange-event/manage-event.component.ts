import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { EventService } from "../service/event.service";
import { SelectItem } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { StudentService } from "../service/student.service";

@Component({
  selector: "app-manage-event",
  templateUrl: "./manage-event.component.html",
  styleUrls: ["./manage-event.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class ManageEvent implements OnInit {
  eventOptions: SelectItem[];
  eventYear: string;
  loading: boolean;
  showspinner: boolean;
  selectedYear: string;
  eventServiceData: any;
  eventInfo: Event[];
  activeEventInfo: Event[];
  display: boolean;
  error: any;
  yearOptions: SelectItem[];
  yearvalue: number;
  showTable: boolean;
  schoolListResponse: any;
  schoolListArray = [];
  private _radioDevicesList: any;
  filteredPages: any[];
  schoolName: string;
  schoolId: any;
  selectedEvent: string;
  isEmpty: boolean;
  eventId: any;
  selectedSchoolVal: boolean;
  minDate: Date;
  selectedEventDate: any;
  changeDateVal: boolean = false;
  constructor(
    private eventService: EventService,
    private messageService: MessageService,
    private issoUtilService: IssoUtilService,
    private studentService: StudentService,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    this.loading = true;
    //  this.minDate = new Date();
    const today = new Date();
    this.minDate = new Date(today.getFullYear(), today.getMonth(), 1);

    console.log(this.minDate);
    this.setYear();
    this.getEventData();
    this.getEventByYear();
    this.loadInitialData();
    this.loadAllSchool();
  }
  addNewEvent() {
    this.display = true;
    this.schoolName = " ";
    this.selectedEvent = " ";
    this.schoolId = " ";
    this.selectedEventDate = " ";
    this.selectedSchoolVal = false;
    this.changeDateVal = false;
    this.eventId = "";
  }

  setYear() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    if (month >= 6) {
      this.selectedYear = year + "-" + (year + 1);
      console.log("im if" + this.eventYear);
    } else {
      this.selectedYear = year - 1 + "-" + year;
    }
  }
  filterPages(event) {
    this.filteredPages = this.filterCountry(event.query, this.schoolListArray);
  }
  onEventChange(event) {
    let test = event.value.split(",");
    this.eventId = test[0];
  }
  onSchoolSelect(evt: any) {
    this.schoolId = evt.id;
    this.selectedSchoolVal = true;
  }

  filterCountry(query, countries: any[]): any[] {
    console.log("im filter");
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.text.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    console.log("im filter value" + filtered);
    if (filtered.length <= 0) {
      this.schoolName = " ";
      this.schoolId = " ";
      this.selectedSchoolVal = false;
    } else if (this.schoolId !== " " && this.schoolId !== undefined) {
      this.selectedSchoolVal = true;
    }
    return filtered;
  }
  changeEndDate(event: any) {
    this.changeDateVal = true;
  }
  onSubmitEvent() {
    const formData = new FormData();
    let event_startDate = this.selectedEventDate;
    let formatted_start_date =
      event_startDate.getFullYear() +
      "-" +
      (event_startDate.getMonth() + 1) +
      "-" +
      event_startDate.getDate();

    formData.append("eventStartDate", formatted_start_date);
    formData.append("eventId", this.eventId);
    formData.append("schoolId", this.schoolId);
    this.eventService.makeActiveEvent(formData).subscribe(
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
            summary: "Event Data Added Successfully",
          });
          // this.eventForm.reset();
        }
        this.display = false;
        this.getEventData();
      },
      (error) => (this.error = error)
    );
  }
  getEventByYear() {
    this.showspinner = true;

    this.eventService.getEventByYear(this.selectedYear).subscribe(
      (response) => {
        if (response !== "") {
          this.showspinner = false;
          this.eventServiceData = response;
          this.showTable = true;
          this.eventInfo = this.eventServiceData;
          const currentDate = new Date();

          this.showspinner = false;
          this.eventOptions = [];

          this.eventOptions.push({
            label: "Please Select",
            value: "",
          });
          this.eventServiceData.forEach((element) => {
            const eventIdAndName = element.eventId + "," + element.eventName;
            this.eventOptions.push({
              label: element.eventName,
              value: eventIdAndName,
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
  getEventData() {
    this.showspinner = true;

    this.eventService.getActiveEventData(this.selectedYear).subscribe(
      (response) => {
        if (response !== "") {
          this.showspinner = false;
          this.eventServiceData = response;
          this.showTable = true;
          this.activeEventInfo = this.eventServiceData;
          const currentDate = new Date();

          this.showspinner = false;
        } else {
          alert("im blankl=");
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
  loadInitialData() {
    this.yearOptions = this.issoUtilService.setYear();
  }
  onyeareChange(event) {
    this.yearvalue = event.value;
    this.selectedYear = event.value;
    this.eventService.getEventByYear(this.yearvalue).subscribe(
      (response) => {
        if (response !== "") {
          this.showspinner = false;
          this.eventServiceData = response;
          this.eventInfo = this.eventServiceData;
          if (this.eventServiceData.length > 0) {
            this.eventInfo = this.eventServiceData;
            this.showTable = true;
          } else {
            this.showTable = false;
            // this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: "Event not found",
            });
            //  alert('im blankl=')
          }
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }

  changeEventStatus(eventId, isStatus) {
    const formData = new FormData();
    if (isStatus == "0") {
      formData.append("status", "1");
    } else {
      formData.append("status", "0");
    }

    this.eventService.changeActiveEventStatus(eventId, formData).subscribe(
      (res) => {
        if (res.status === "success") {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Event Data Updated Successfully",
          });
        } else {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Event Data Updated Successfully",
          });
        }
        this.display = false;
        this.getEventData();
      },
      (error) => (this.error = error)
    );
  }
  deleteActiveEvent(eventId, schoolId) {
    const formData = new FormData();
    formData.append("eventId", eventId);
    formData.append("schoolId", schoolId);

    this.eventService.deleteEventStatus(formData).subscribe(
      (res) => {
        if (res.status === "success") {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Event Data Deleted Successfully",
          });
        } else {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Event Data Updated Successfully",
          });
        }
        this.display = false;
        this.getEventData();
      },
      (error) => (this.error = error)
    );
  }
  deleteEventStatus(eventId, schoolId) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-delete-event",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete event data?",
      accept: () => {
        this.deleteActiveEvent(eventId, schoolId);
      },
    });
  }
}
