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

@Component({
  selector: "app-upcoming-event",
  templateUrl: "./upcoming-event.component.html",
  styleUrls: ["./upcoming-event.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class UpcomingEventComponent implements OnInit {
  schoolForm: FormGroup;
  editForm: FormGroup;
  public errorAlert: boolean = false;
  errormessage: boolean;
  submitted = false;
  display: boolean = false;
  options: SelectItem[];
  schoolArray = [];
  control: FormControl;
  schoolServiceDATA: any;
  school: UpcomingEvent;
  error: string;
  datasource: any;
  //schoolForm: FormGroup;
  //schoolData:any;
  totalRecords: number;
  cols: any[];
  placeholderText = "Select Option";
  actions: string;
  loading: boolean;
  pageSizeOptions = [10, 25, 50, { showAll: "All" }];
  disable = false;
  cities1: SelectItem[];
  schoolData: UpcomingEvent[];

  schoolServiceData: any;
  expandedRows: number[];
  rowGroupMetadata = {};

  table: Table;
  sortKey: string;
  sortField: string;
  sortOrder: number;
  selectedSchool: UpcomingEvent;
  carDatavalue: any;
  carId: number;
  gridHeader: any;
  displayDialog: boolean;
  confirmDropDatabaseDialogVisible = false;
  showspinner: boolean;

  constructor(
    private confirmation: ConfirmationService,
    private eventService: EventService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private schoolService: SchoolService
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
    this.initialForm();
    this.loading = true;
    this.getUpcomingEvents();
  }

  loadData(event) {}

  editSchool(event: Event, car: UpcomingEvent) {
    let carData = JSON.stringify(car);
    this.carId = car.id;
    this.carDatavalue = car;
    this.displayDialog = true;
    event.preventDefault();
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

  getUpcomingEvents() {
    this.showspinner = true;
    this.eventService.getUpcomingEventlList().subscribe(
      (response) => {
        this.showspinner = false;
        if (response[0] && response[0].length !== 0) {
          // if (response !== undefined) {

          this.schoolServiceData = response;
          this.schoolData = this.schoolServiceData;
        } else {
          // alert("im blankl=");
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

  initialForm() {
    this.schoolForm = this.fb.group({
      id: [""],
      event_name: ["", Validators.required],
      event_desc: ["", Validators.required],
      // schoolBoard: ['', Validators.required],
      // schoolPassword: ['', Validators.required],
      // schoolInfra: ['', Validators.required],
      // schoolTelePhone: ['', Validators.required],
      // schoolAddress: ['', Validators.required],
    });
  }

  addNewEvent(event: Event, schoolData: UpcomingEvent, type: any) {
    if (type == "edit") {
      this.schoolForm.setValue({
        id: schoolData.id,
        event_name: schoolData.event_name,
        event_desc: schoolData.event_desc,
        // schoolBoard:  schoolData.board,
        // schoolPassword:  '',
        // schoolInfra:  schoolData.schoolInfrastructure,
        // schoolAddress: schoolData.address,
        // schoolTelePhone: schoolData.mobile,
        // schoolId:'edit'
      });
    } else {
      this.schoolForm.setValue({
        id: "",
        event_name: "",
        event_desc: "",
        // schoolBoard: ' ',
        // schoolPassword: ' ',
        // schoolInfra: ' ',
        // schoolAddress: ' ',
        // schoolTelePhone:' ',
        //  schoolId:'add'
      });
    }
    this.display = true;
  }

  onSubmit() {
    this.submitted = true;
    const formData = new FormData();
    let id = this.schoolForm.get("id").value;
    formData.append("event_name", this.schoolForm.get("event_name").value);
    formData.append("event_desc", this.schoolForm.get("event_desc").value);

    if (id == "") {
      this.eventService.saveUpcomingEventData(formData).subscribe(
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
              summary: "Upcoming event data added successfully",
            });
          }
          this.display = false;
          this.getUpcomingEvents();
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
    } else {
      this.eventService.editUpcomingEventData(id, formData).subscribe(
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
              summary: "Upcoming Event Data Updated Successfully",
            });
          }
          this.display = false;
          this.getUpcomingEvents();
        },
        (error) => (this.error = error)
      );
    }
  }

  deleteSchoolData(event: Event, schoolData: UpcomingEvent) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-delete-school",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete event data?",
      accept: () => {
        this.deleteSchool(schoolData);
      },
    });
  }

  private _deleteSchoolData() {
    this.messageService.add({
      key: "custom",
      severity: "success",
      summary: "Event Data Deleted Successfully",
    });
  }

  deleteSchool(School) {
    let eventId = School.id;
    this.eventService.deleteUpcomingEvent(eventId).subscribe(
      (res) => {
        //  if (res.status !== 'error') {
        //    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        //  } else {
        this.messageService.add({
          key: "custom",
          severity: "success",
          summary: "Event Data Deleted Successfully",
        });

        //  }

        this.display = false;
        this.getUpcomingEvents();
      },
      (error) => (this.error = error)
    );
  }

  private _dropDatabase() {
    console.log("Database dropped");
  }
}
