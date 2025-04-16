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

@Component({
  selector: "app-manage-event-report",
  templateUrl: "./manage-event-report.component.html",
  styleUrls: ["./manage-event-report.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class ManageEventReport implements OnInit {
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
  constructor(
    private confirmation: ConfirmationService,
    private eventService: EventService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private issoUtilService: IssoUtilService,
    private schoolService: SchoolService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.setYear();
    this.getEventData();

    this.loadInitialData();
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
  getEventData() {
    this.showspinner = true;

    this.eventService.getEventByYear(this.selectedYear).subscribe(
      (response) => {
        if (response !== "") {
          this.showspinner = false;
          this.eventServiceData = response;
          this.showTable = true;
          this.eventInfo = this.eventServiceData;
          const currentDate = new Date();
        } else {
          alert("im blankl=");
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
  changeEventStatus(eventId, isStatus, type) {
    console.log(eventId, isStatus, type);
    const formData = new FormData();
    if (type == "certifiacate") {
      if (isStatus == "0") {
        formData.append("statusVal", "1");
        formData.append("certificateType", type);
      } else {
        formData.append("statusVal", "0");
        formData.append("certificateType", type);
      }
    }
    if (type == "merit") {
      if (isStatus == "0") {
        formData.append("statusVal", "1");
        formData.append("certificateType", type);
      } else {
        formData.append("statusVal", "0");
        formData.append("certificateType", type);
      }
    }
    if (type == "coachCertificate") {
      if (isStatus == "0") {
        formData.append("statusVal", "1");
        formData.append("certificateType", type);
      } else {
        formData.append("statusVal", "0");
        formData.append("certificateType", type);
      }
    }
    this.eventService.changeReportStatus(eventId, formData).subscribe(
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
}
