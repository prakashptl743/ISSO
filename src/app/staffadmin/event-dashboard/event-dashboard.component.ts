import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { EventService } from "../service/event.service";
import { LoadeService } from "../service/loader.service";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { TermsConditionComponent } from '../terms-condition/terms-condition.component';

@Component({
  selector: "app-event-dashboard",
  templateUrl: "./event-dashboard.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./event-dashboard.component.css"],
})
export class EventDashboardComponent implements OnInit {
  selectedValues: string[] = [];
  eventForm: FormGroup;
  eventServiceData: any;
  showspinner: boolean;
  showNoEvent: boolean;
  eventInfo: Event[];
  display: boolean = false;
  eventNote: any;
  eventId: any;
  eventYear: any;
  isAffilated: string;
  schoolType: string;
  registerFee: number;
  schoolZone: string;
  eventStartDate: any;
  eventEndDate: any;
  num1: number;
  dateDiff: any;
  schoolId: string;
  today: string;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    //  private modalService: NgbModal,
    private loadeService: LoadeService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.schoolZone = localStorage.getItem("schoolZone");
    this.schoolId = localStorage.getItem("schoolId");
    console.log("TTTdsfasT==>", this.schoolId);

    const now = new Date();
    this.today = now.toISOString();
    console.log("dsdg-->" + this.today);
    if (this.schoolZone) {
      console.log("Im if");
      // this.schoolZone =  'NoSchoolZone';
      this.getEventData();
    } else {
      console.log("Im else");
      this.showNoEvent = true;
    }

    this.initialForm();
    this.setPaymentType();
    localStorage.removeItem("eventId");
    localStorage.removeItem("eventYear");
  }
  setPaymentType() {
    this.schoolType = localStorage.getItem("isAffiliate");
    if (this.schoolType == "Yes") {
      this.registerFee = 1;
    } else {
      this.registerFee = 2;
    }
  }
  getEventData() {
    this.showspinner = true;
    this.eventService.getEventlList(this.schoolId, this.schoolZone).subscribe(
      (response) => {
        // this.eventService.getEventlList().subscribe(response => {
        if (response !== "") {
          this.eventServiceData = response;
          if (this.eventServiceData.length > 0) {
          } else {
            this.showNoEvent = true;
            this.showspinner = false;
          }
          this.showspinner = false;
          this.eventInfo = this.eventServiceData;
        } else {
          alert("im blankl=");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  // sendTextValue(){
  //   this.eventService.passValue(this.eventEndDate);
  // }
  showDialog(eventData: any) {
    this.initialForm();
    this.eventId = eventData.eventId;
    this.eventYear = eventData.event_year;
    this.eventNote = eventData.note;
    this.display = true;
    this.eventStartDate = eventData.startDate;
    this.eventEndDate = eventData.endDate;
    localStorage.setItem("extraTabRequired", eventData.extraTabRequired);
    localStorage.setItem("extraTabValues", eventData.extraTabValues);
    this.dateDiff = this.getDiffDays(new Date(), new Date(this.eventStartDate));
    console.log("Im date diff-->" + this.dateDiff);
    //this.sendTextValue();
  }
  initialForm() {
    this.eventForm = this.fb.group({
      termsCondition: ["", Validators.required],
    });
  }
  onSubmit() {
    localStorage.setItem("dateDiff", this.dateDiff);
    localStorage.setItem("eventId", this.eventId);
    localStorage.setItem("eventYear", this.eventYear);

    this.router.navigate(["/staffadmin/student-enrollment"]);
    // this.router.navigate(['/staffadmin/student-enrollment/'+ this.eventId,this.eventYear]);
  }

  // getDiffDays() {

  //   this.num1 = Math.ceil(Math.abs(this.eventStartDate - this.eventEndDate) / (1000 * 60 * 60 * 24));
  //   console.log(this.num1)
  // }
  getDiffDays(startDate, endDate) {
    return Math.ceil(Math.abs(startDate - endDate) / (1000 * 60 * 60 * 24));
  }
}
