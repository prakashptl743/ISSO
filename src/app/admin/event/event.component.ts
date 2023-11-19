import { Component, OnInit } from '@angular/core';
import { EventService } from '../service/event.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Event } from '../admin-interfaces';
import { ConfirmationService } from 'primeng/api';
import { MenuItem} from 'primeng/api';
import { IssoUtilService  } from '../../services/isso-util.service'

 
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [MessageService,ConfirmationService,DatePipe]
  
})
export class EventComponent implements OnInit {
  text2: string;
  zoneOptions: SelectItem[];
  options: SelectItem[];
  checked1: boolean = true;
  es: any;
  error: string;
  errormessage: boolean;
  submitted = false;
 public eventForm: FormGroup;
  event_enabled: FormGroup;
  eventServiceData:any;
  checkEvent_stats:boolean;
  totalRecords: number;
  disable = false;
  display: boolean = false;
  checked2: boolean = true;
  eventInfo: Event[];
  actions: string;
  control: FormControl;
  items: MenuItem[];
  items1: MenuItem[];
  items2: MenuItem[];
  activeItem: MenuItem;
  isUpcomingEvent:boolean = false;
  currentEvent:boolean = true;
  neeText:any;
  minDate: Date;
  maxDate: Date;
  endDate:Date;
  subViewTitle: string;
  today: string ;
  startDate: any;
  endMinDate: any;
  showspinner: boolean;
  mapEvent: boolean;
  selectedYear: string;
  yearOptions: SelectItem[];
  yearvalue:number;
  eventYear: string;
  manageReport: boolean;
  zoneValue: any;
  //eventZoneVal: [];
 
  public form: FormGroup;
   eventZoneVal: any[];
  eventType: string;
  teamEventReport: boolean;
  //eventZoneVal: void;
  // eventZoneVal: string;
  constructor(
    public datepipe: DatePipe,
    private confirmation: ConfirmationService,
    private eventService: EventService,
    private messageService: MessageService,
    private issoUtilService: IssoUtilService, 
    private fb: FormBuilder,
  )  {
    setTimeout(()=>{this.disable = true}, 5000)
  }

  ngOnInit() {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.isUpcomingEvent = false;
    this.initialiseForm();
    this.getEventData()
    this.seCurrenttDate();
    this.loadInitialData()
}
loadInitialData() {
  this.yearOptions = this.issoUtilService.setYear();
}
resetform() {
  console.log('Im reset')
  this.eventForm.reset();
}
patchForm() {
  this.eventForm.patchValue({ eventZone: [ { name: "NORTH", code: "NORTH" },{ name: "EAST", code: "EAST" }] });
}
onyeareChange(event) {
  this.yearvalue = event.value;
  this.eventService.getEventByYear(this.yearvalue).subscribe(response => {
    if(response!=="") {
      this.showspinner = false;
      this.eventServiceData =response;
      this.eventInfo = this.eventServiceData;
    } else {
      alert('im blankl=')
    }

  } ,
  error => {
    //this.errorAlert =true;
  });
}
seCurrenttDate() {
  const now = new Date;
  this.today =now.toISOString();
}
changeEndDate(event: any){
    console.log(event);
    var date = new Date(event);
    var newdate = new Date(date);
    newdate.setDate(newdate.getDate() + 1);
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var y = newdate.getFullYear();
    var someFormattedDate = mm + '/' + dd + '/' + y;
    console.log(someFormattedDate);
    console.log(new Date(someFormattedDate));
    this.endMinDate = new Date(someFormattedDate);
}
 
onloadMenu(index){
  if(index == '0'){
    this.isUpcomingEvent = false;
    this.currentEvent =true;
    this.mapEvent = false;
    this.manageReport = false;
    this.teamEventReport = false;
  } else if(index =='1') {
    this.currentEvent =false;
    this.isUpcomingEvent = true;
    this.manageReport = false;
    this.teamEventReport = false;
    this.mapEvent = false;
  } else if(index =='2') {
    this.isUpcomingEvent = false;
    this.currentEvent =false;
    this.manageReport = false;
    this.teamEventReport = false;
    this.mapEvent = true;
  } else if(index =='3'){
    this.isUpcomingEvent = false;
    this.currentEvent =false;
    this.mapEvent = false;
    this.manageReport = true;
    this.teamEventReport = false;
  } else {
    this.isUpcomingEvent = false;
    this.currentEvent =false;
    this.manageReport = false;
    this.mapEvent = false;
    this.teamEventReport = true;
  }
  this.display = false;
}

zoneChange(event) {
  this.zoneValue = event.value
}
getEventData() {
  this.showspinner = true;
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  
  console.log('month==>'+month)
  console.log('Year==>'+year)
  if(month >= 5) {
    this.eventYear = year +'-'+ (year + 1)
    console.log('im if'+ this.eventYear)
  } else {
    this.eventYear =(year - 1)  +'-'+ year
  }
  this.selectedYear = this.eventYear;
  this.eventService.getEventByYear(this.eventYear).subscribe(response => {
    if(response!=="") {
      this.showspinner = false;
      this.eventServiceData =response;
      this.eventInfo = this.eventServiceData;
      const currentDate = new Date();
      if(new Date(this.eventInfo[1].startDate) > currentDate) {
          console.log('true');
      } else {
        console.log('false');
      }
    } else {
      alert('im blankl=')
    }

  } ,
 error => {
   //this.errorAlert =true;
  });
}

initialiseForm() {
   this.zoneOptions =this.issoUtilService.setEventZone();
   this.event_enabled = this.fb.group({
    checkEvent_stats: [''],
    checked2: ['']
  });
  this.eventForm = this.fb.group({
    eventId:[''],
    eventName: ['', Validators.required],
    registrationCharge: ['', Validators.required],
    eventStartDate: ['', Validators.required],
    eventEndDate: ['', Validators.required],
    eventLocation: ['', Validators.required],
    eventType: ['', Validators.required],
    eventZone: ['', Validators.required],
    eventDesc: ['', Validators.required],
    eventNote: ['', Validators.required],
    certificateHeaderContent: ['', Validators.required],
    certificateMainContent: ['', Validators.required],
  });
  this.options = [
    {label: "Please select", value: ''},
    {label: "International", value: "International"},
    {label: "Domestic", value: "Domestic"},
  ];
this.control = new FormControl(this.options[2].value);
}
showDialog() {
  this.display = true;
}
testFun() {

}
addNewEvent(event: Event, eventInfo: Event,type:any) {

  if(type == 'edit') {
    this.eventType =  eventInfo.eventType;
    let myString = eventInfo.eventZone;
    console.log(myString);
    let commaCount = myString.split(",").length
    console.log("Count : ",commaCount);
    const testFun = (myString) => {
     console.log('Im testfun',myString);
     let str='EAST,WEST,NORTH';
      return str; //'num' here, is the value of the array.
    }
    if (commaCount == 4) {
      this.eventZoneVal = (this.zoneOptions.slice(0).map(a => a.value));
    }
    if (commaCount == 1) {
       if (myString == 'EAST') {
         this.eventZoneVal = (this.zoneOptions.slice(0,1).map(a => a.value));
       } else if(myString == 'WEST') {
        this.eventZoneVal = (this.zoneOptions.slice(1,2).map(a => a.value));
       } else if (myString == 'NORTH') { 
        this.eventZoneVal = (this.zoneOptions.slice(2,3).map(a => a.value));
       } else {
        this.eventZoneVal = (this.zoneOptions.slice(-1).map(a => a.value));
       }
    }
    if (commaCount == 3) {

      var hiddenString = myString;
      var strB = 'EAST,WEST,NORTH,SOUTH';
      var temp1 = hiddenString.split(',');
      var temp2 = strB.split(',');
      var varFinalHiddenString = temp2.filter(function(s){
        return temp1.indexOf(s) > -1;
      }).join(',');
      console.log('IM VAR--->',varFinalHiddenString);

     if (myString == 'EAST,WEST,NORTH' || myString == 'WEST,EAST,NORTH' || myString == 'WEST,NORTH,EAST' ||  myString == 'NORTH,EAST,WEST' || myString == 'NORTH,WEST,EAST' || myString == 'EAST,NORTH,WEST' ) {
      console.log('Im') 
      this.eventZoneVal = (this.zoneOptions.slice(0,3).map(a => a.value));
     } else if (myString == 'WEST,NORTH,SOUTH' || myString == 'WEST,SOUTH,NORTH' || myString == 'WEST,NORTH,SOUTH' ||  myString == 'NORTH,SOUTH,WEST' || myString == 'NORTH,WEST,SOUTH' || myString == 'SOUTH,NORTH,WEST') {
      this.eventZoneVal = (this.zoneOptions.slice(1,4).map(a => a.value));
     } else if (myString == 'EAST,NORTH,SOUTH' || myString == 'EAST,SOUTH,NORTH' || myString == 'EAST,NORTH,SOUTH' ||  myString == 'NORTH,SOUTH,EAST' || myString == 'NORTH,EAST,SOUTH' || myString == 'SOUTH,NORTH,EAST') {
      const index = myString.indexOf('WEST');
        if (index > -1) { // only splice array when item is found
          this.eventZoneVal= this.zoneOptions.splice(index, 1); // 2nd parameter means remove one item only
        }
     } else if (myString == 'WEST,EAST,SOUTH' || myString == 'WEST,SOUTH,EAST' || myString == 'WEST,EAST,SOUTH' ||  myString == 'EAST,SOUTH,WEST' || myString == 'EAST,WEST,SOUTH' || myString == 'SOUTH,EAST,WEST') {
      const index = myString.indexOf('NORTH');
      if (index > -1) { // only splice array when item is found
        this.eventZoneVal= this.zoneOptions.splice(index, 1); // 2nd parameter means remove one item only
      }
     }
    //  else if (myString == 'EAST,NORTH,SOUTH') {
    //   this.eventZoneVal = (this.zoneOptions.slice(1,4).map(a => a.value));
    //  }
      // this.eventZoneVal = (this.zoneOptions.slice(0).map(a => a.value));
    }
 
 
 
      this.eventForm.setValue({ 
          eventId: eventInfo.eventId,  
          eventName: eventInfo.eventName,
          registrationCharge:  eventInfo.price,
          eventStartDate: new Date(eventInfo.startDate),
          eventEndDate: new Date(eventInfo.endDate),
          eventLocation: eventInfo.location,
          eventType:  eventInfo.eventType,
          eventZone:  eventInfo.eventZone,
          eventDesc: eventInfo.description,
          eventNote:  eventInfo.note,
          certificateHeaderContent: eventInfo.certifiacteHeaderContent,
          certificateMainContent:  eventInfo.certifiacteMainContent
        });  
      this.subViewTitle = 'Edit Event';
 } else {
        this.eventForm.setValue({ 
          eventId:'',   
          eventName: '',
          registrationCharge: '',
          eventType: ' ',
          eventZone: ' ',
          eventStartDate: ' ',
          eventEndDate: ' ',
          eventLocation: ' ',
          eventDesc:' ',
          eventNote:'',
          certificateHeaderContent: 'ISSO NATIONAL GAMES  2023-24',
          certificateMainContent: 'ISSO NATIONAL GAMES  2023-24'
        }); 
  }
  this.display = true;
  this.subViewTitle = 'Add New Event';
  
}

hideExtraView() {
  this.display = false;
}


changeEventStatus(eventData: Event) {
  const eventStatus =  eventData.event_status
  const eventId = eventData.eventId
  const formData = new FormData();
  if(eventStatus == '1') {
    formData.append('event_status', '0');
  } else {
    formData.append('event_status', '1');
  }

  this.eventService.changeEventStatus(eventId, formData).subscribe(
    res => {
        if (res.status === 'success') { 
          this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Updated Successfully'});
       } 
      else {
         this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Updated Successfully'});
        }
      this.display =false
      this.getEventData();
    },
    error => this.error = error
  );

}
onSubmit() {
  this.submitted = true;
  const formData = new FormData();
  //let startDate;

 // startDate= this.eventForm.get('eventStartDate').value
  let event_startDate = this.eventForm.get('eventStartDate').value
  let formatted_start_date = event_startDate.getFullYear()+ "-" + (event_startDate.getMonth() + 1)+ "-"+event_startDate.getDate() 
 
  let event_endDate = this.eventForm.get('eventEndDate').value
  let formatted_end_date = event_endDate.getFullYear()+ "-" + (event_endDate.getMonth() + 1)+ "-"+event_endDate.getDate() 
 
  let eventId =  this.eventForm.get('eventId').value;
  formData.append('eventName', this.eventForm.get('eventName').value);
  formData.append('registrationCharge', this.eventForm.get('registrationCharge').value);
  formData.append('eventStartDate', formatted_start_date);
  formData.append('eventEndDate', formatted_end_date);
  formData.append('eventLocation', this.eventForm.get('eventLocation').value);
  formData.append('eventType', this.eventForm.get('eventType').value);
  formData.append('eventZone', this.zoneValue);
  formData.append('eventNote', this.eventForm.get('eventNote').value);
  formData.append('eventDesc', this.eventForm.get('eventDesc').value);
  formData.append('certificateHeaderContent', this.eventForm.get('certificateHeaderContent').value);
  formData.append('certificateMainContent', this.eventForm.get('certificateMainContent').value);

  if(eventId == '') {
      this.eventService.saveEventData(formData).subscribe(
      res => {
          if (res.status === 'error') {
            this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
          } else {
            this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Added Successfully'});
           // this.eventForm.reset();
          }
        this.display =false
        this.getEventData();
      },
      error => this.error = error

      );
  } else {
    this.eventService.editEventData(eventId,formData).subscribe(
      res => {
          if (res.status === 'success') { 
            this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Updated Successfully'});
            //this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
         } 
        else {
           this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Updated Successfully'});

          }
        this.display =false
        this.getEventData();
      },
      error => this.error = error
    );
  }



}
handleChange(e) {
  let isChecked = e.checked;
  console.log('hiii'+isChecked);
}
deleteEvent(event: Event, eventData: Event) {
  if (event.defaultPrevented) return;
  event.preventDefault();
  this.confirmation.confirm({
    key: 'confirm-delete-event',
    icon: 'pi pi-info-circle',
    message: 'Are you sure to delete event data?',
    accept: () => { this.deleteMappedEvent(eventData); },
  });
}

private _deleteeventInfo() {
  this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Deleted Successfully'});
}
deleteMappedEvent(eventData) {
   let eventId=eventData.eventId
   this.eventService.deleteEvent(eventId).subscribe(
   res => {
     //  if (res.status !== 'error') {
     //    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
     //  } else {
         this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Deleted Successfully'});

     //  }

     this.display =false
     this.getEventData();
   },
   error => this.error = error
 );
}
 

}
