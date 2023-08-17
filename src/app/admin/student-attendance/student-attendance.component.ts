import { Component, createPlatform, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IssoUtilService } from 'src/app/services/isso-util.service';
import { ReportMeritService } from '../service/report-merit.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {
  yearOptions: SelectItem[];
  eventOptions: SelectItem[];
  gameOptions: SelectItem[];
  schoolOptions: SelectItem[];
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  studentAttendanceArray=[];
  studentAbsentArray=[];
  attendanceArray=[];

  gameIdList:any;
  gameNameList:any;
  myObjArray: any;

  eventValue:number;
  yearvalue:number;
  schoolvalue:number;
  eventData: any;
  schoolDataArray =[];
  eventReadable: boolean = false;
  gameReadble: boolean = false;
  schoolReadble: boolean = false;
  selectedEvent:string;
  schoolList: any;
  gameList: any;
  public gameID: number;
  public schoolID: any;
  certificateData: any;
  reportData: any;
  coachData: any;
  isCertificate: boolean = false;
  isDataAvailble: boolean = false;
  schooName:string;
 
  showspinner: boolean = false;
  reportDataLength: number;
  selectedGame: string;
  selectedSchool: string;
  selectedYear: string;
  imageData: any;
  isConsolited: boolean;
  genderReadble: boolean;
  ageValue: any;
  genderVal: any;
  consolidatedData: any;
  consoliDatedLength: any;
  checked1: boolean = true;
  consolateFileName: any;
  gameType: any;
  selectedYearVal: string;
  studentAttendance: boolean;

  selectedCities: string[] = [];

  selectedCategories: any[] = ['Technology', 'Sports'];

  categories: any[] = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];

  checked: boolean = false;
  gameArray= [];
  reportValue: any;
  reportLabel: string;

   constructor( private issoUtilService: IssoUtilService, private messageService: MessageService, private meritService: ReportMeritService) { }

    ngOnInit() {
       this.isDataAvailble = false;
      this.yearOptions = this.issoUtilService.setYear();
     // this.selectedCategories = this.categories.slice(1,3);
     this.reportLabel = 'attendance';
    }
    onyeareChange(event) {
      this.studentAttendanceArray = [];
      this.studentAbsentArray = [];
      this.yearvalue = event.value;
      this.meritService.loadEventByYearForReport(this.yearvalue,0).subscribe(
        response => {
          if(response!=="") {
            this.eventData =response;
            this.gameReadble =false;
            this.schoolReadble  = false;
            if(this.eventData.length > 0 ){
              this.eventOptions = [];
              this.eventReadable = true;
              this.isDataAvailble = false;
              this.eventOptions.push({
                label: "Please Select",
                value: ''
              });
              this.eventData.forEach(element => {
                this.eventOptions.push({
                  label: element.eventName,
                  value: element.eventId
                });
              })
            } else {
              this.isDataAvailble = false;
              this.eventReadable = false;
              this.gameReadble =false;
              this.schoolReadble = false;
              this.messageService.add({key: 'custom', severity:'error', summary: 'Event not found for this year'});
            }
          } else {
          console.log('Data is blannk from service')
          }
    
      } ,
      error => {
        //this.errorAlert =true;
        });
    }
    onEventChange(event) {
      this.studentAttendanceArray = [];
      this.studentAbsentArray = [];
      let yearVal = this.yearvalue.toString();
      let eventYear = yearVal.split("-");
      console.log('Hello'+eventYear[1]);
      this.selectedYearVal = eventYear[1];

      if (eventYear[1] > '2020')   {
        console.log('Immgretae')
        this.reportGreaterForNewYear(event)
      } else {
        console.log('im less')
      
      this.eventValue = event.value;
      this.gameOptions =[];
      this.selectedGame =''; 
      this.meritService.loadGameByEvent(this.eventValue, false).subscribe(
        response => {
          if(response!=="") {
            this.gameList =response;
            console.log(this.gameList)
            this.schoolReadble = false;
            if(this.gameList.length > 0 ) {
              this.gameOptions = [];
              this.gameReadble = true;
              this.isDataAvailble = false;
              this.gameList.forEach(element => {
                this.gameOptions.push({
                  label: element.gameName,
                  value: element.gameId
                });
            })
          } else {
            this.isDataAvailble = false;
            this.gameReadble = false;
            this.schoolReadble = false;
          }
          } else {
            console.log('Data is blannk from service')
          }
    
      } ,
      error => {
        //this.errorAlert =true;
      });
    }
    }
    reportGreaterForNewYear(event) {
      this.eventValue = event.value;
      this.studentAttendanceArray = [];
      this.studentAbsentArray = [];
      this.consolateFileName =event.originalEvent.currentTarget.ariaLabel

      this.gameOptions =[];
      this.selectedGame =''; 
      this.meritService.loadGameForStaff(this.eventValue).subscribe(
        response => {
          if(response!=="") {
            this.gameList =response;
            this.schoolReadble = false;
            if(this.gameList.length > 0 ) {
              console.log(this.gameList);
              this.gameIdList = this.gameList[0].gameId.split(',')
              this.gameNameList =  this.gameList[0].game_name.split(',')
              console.log('im game name'+this.gameNameList)
              this.myObjArray = [];
              
              for(let i=0;i<this.gameIdList.length;i++) {
                this.myObjArray.push({gameId: Number(this.gameIdList[i]), game_name: this.gameNameList[i] });
              } 
    
              this.gameOptions = [];
              this.gameReadble = true;
              this.isDataAvailble = false;
              this.gameOptions.push({
                label: "Please Select",
                value: '',
              });
             
              this.gameList.forEach(element => {
                const gameIdAndName = element.gameId +','+ element.game_name +','+ element.gameType;
                this.gameOptions.push({
                  label: element.game_name,
                  value: gameIdAndName
                });
              })
              console.log('Im game options===>'+JSON.stringify(this.gameOptions));
          } else {
            this.isDataAvailble = false;
            this.gameReadble = false;
            this.schoolReadble = false;
          }
          } else {
            console.log('Data is blannk from service')
          }
    
      } ,
      error => {
        //this.errorAlert =true;
      });
    }
    loadGameChange(gameData) {
      this.studentAttendanceArray = [];
      this.studentAbsentArray = [];
      this.gameID = gameData.value;
      this.selectedSchool =''; 


      const gameDataValues = gameData.value
      this.gameArray =  gameDataValues.split(","); 
      const gameId = this.gameArray[0];
     // this.eventName =  this.eventArray[1];

      this.meritService.checkGameType(this.gameID).subscribe( 
        response => {
          this.gameType = response;
          console.log('game Type'+JSON.stringify(this.gameType))
        },

        error => {
        //this.errorAlert =true;
      });

      this.meritService.loadSchoolByGameReport(this.eventValue, gameId).subscribe(
        response => {
          if(response!=="") {
            this.schoolList =response;
            if(this.schoolList.length > 0 ) {
              this.schoolOptions = [];
              this.schoolReadble = true;
              this.isDataAvailble = false;
              this.schoolOptions.push({
                label: "Please Select",
                value: ''
              });
              this.schoolList.forEach(element => {
                const  SchoolIdAndName = element.schoolId +','+ element.schoolName;
                this.schoolOptions.push({
                  label: element.schoolName,
                  value: SchoolIdAndName
                });
              })
          } else {
            this.messageService.add({key: 'custom', severity:'error', summary: 'School not found for this game'});
            this.isDataAvailble = false;
            this.schoolReadble = false;
          }
          } else {
            console.log('Data is blannk from service')
          }
    
      } ,
      error => {
        //this.errorAlert =true;
    });
    }
    
    loadschoolChange(schoolData) {
      this.studentAttendance = false;
      this.studentAttendanceArray = [];
      this.studentAbsentArray = [];
      this.attendanceArray  =[];
      this.schoolID = schoolData.value;
      this.schoolDataArray =  this.schoolID.split(","); 
      this.schooName =this.schoolDataArray[1];
      if(this.schoolID !=='') {
      this.meritService.getStudentData(this.eventValue,this.gameID,this.schoolDataArray[0]).subscribe(
      response => {
        if(response!=="") {
            this.reportData = response;
            this.reportDataLength = this.reportData.length;
         //   this.selectedCategories = this.reportData.filter(item => item !== this.reportData.isPresent);

            for (let i=0;i < this.reportData.length;i++) {
               if (this.reportData[i].isPresent === '1') {
                 console.log('Im present');
               //  this.studentAbsentArray.push(this.reportData[i].sId);
               //  console.log('Im array==>'+this.studentAbsentArray);
              //  this.selectedCategories = this.reportData.splice(i, 1); 

                //  console.log('Hello==>'+i)
                //  this.attendanceArray.push(i);
                //  let x= i+1;
                //  this.selectedCategories = this.reportData.slice(1,x);
                // this.studentAttendanceArray.push(this.reportData[i].sId);
                //  if(this.studentAttendanceArray.length > 0) {
                //   this.studentAttendance = true;
                // }
               }  else {
                 console.log('im absent')
               }
            }
                  //this.selectedCategories = this.categories.slice(1,3);

            // console.log('new===>'+this.attendanceArray);
            // this.selectedCategories = this.reportData.slice(1,3);
            // console.log('nasdasdasdew===>'+ this.selectedCategories);

          if(this.reportDataLength > 0) {
            this.isDataAvailble = true;
          //  this.showspinner = false;
          } 
        } else {
          console.log('Data is blannk from service')
        }

    } ,
    error => {
      //this.errorAlert =true;
      });
    } else {
      this.isDataAvailble = false;
    }
  }
  onloadMenu(index) {
    this.reportValue = index;
    if(index == '0') {
      this.isConsolited = false;
      this.reportLabel = "attendance"
    }
  }
  onStudentChange(event:any, studentId) {
    // if(event.target.checked==true){
    //   console.log('checkbox is checked');
    // }
    // else{
    //   console.log('checkbox is unchecked');
    // }
    if (event.target.checked==true) {
        if (this.studentAttendanceArray.indexOf(studentId) === -1) {
          this.studentAttendanceArray.push(studentId);
        }
    } else {
      if (this.studentAttendanceArray.length > 0) {
        console.log('Im if');
        for(let i=0;i < this.studentAttendanceArray.length;i++) {
          console.log('Im for');
          if (this.studentAttendanceArray[i] == studentId ) {
            this.studentAttendanceArray.splice(i, 1);
          }
        }
      } 
    }
    if(this.studentAttendanceArray.length > 0 ){
      this.studentAttendance = true;
    } else {
      this.studentAttendance = false;
    }
    console.log('studentAttendanceArray===>'+this.studentAttendanceArray)
   }
   onStudentAbsentChange(event:any, studentId) {
    // if (event) {
    //       if (this.studentAbsentArray.indexOf(studentId) === -1) {
    //         this.studentAbsentArray.push(studentId);
    //       }
    //   } else {
    //     if (this.studentAbsentArray.length > 0) {
    //       for(let i=0;i < this.studentAbsentArray.length;i++) {
    //         if (this.studentAbsentArray[i] == studentId ) {
    //           this.studentAbsentArray.splice(i, 1);
    //         }
    //       }
    //     } 
    //   }
    //   if(this.studentAbsentArray.length > 0 ){
    //     this.studentAttendance = true;
    //   } else {
    //     this.studentAttendance = false;
    //   }
    //   console.log('Id Arrray'+this.studentAbsentArray)



      if (event) {
        if (this.studentAttendanceArray.indexOf(studentId) === -1) {
          this.studentAttendanceArray.push(studentId);
        }
        if (this.studentAbsentArray.length > 0) {
          for(let i=0;i < this.studentAbsentArray.length;i++) {
            if (this.studentAbsentArray[i] == studentId ) {
              this.studentAbsentArray.splice(i, 1);
            }
          }
        } 


      } else {
          if (this.studentAbsentArray.indexOf(studentId) === -1) {
            this.studentAbsentArray.push(studentId);
          }
        // if (this.studentAttendanceArray.length > 0) {
        //   for(let i=0;i < this.studentAttendanceArray.length;i++) {
        //     if (this.studentAttendanceArray[i] == studentId ) {
        //       this.studentAttendanceArray.splice(i, 1);
        //     }
        //   }
        // } 
      }
      if(this.studentAttendanceArray.length > 0 || this.studentAbsentArray.length >0 ){
        this.studentAttendance = true;
      } else {
        this.studentAttendance = false;
      }
      console.log('student attendance Array====>'+this.studentAttendanceArray)
      console.log('studentAbsentArray====>'+this.studentAbsentArray)


  }
  saveAttendance() {
    const formData = new FormData();
    formData.append('studentData', JSON.stringify(this.studentAttendanceArray));
    formData.append('studentAbsentData', JSON.stringify(this.studentAbsentArray));

    this.meritService.saveStudentAttendance(formData).subscribe(
      response =>  {
        if (response.status === 'error') {
           this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
        } else {
          this.messageService.add({key: 'custom', severity:'success', summary: 'Student attendance added successfully'});
          this.showUpdatedPaymeData();
          this.studentAttendanceArray = [];
          this.studentAbsentArray = [];
        }
     },
    error => {
      //this.errorAlert =true;
      });
  }
  showUpdatedPaymeData() {
    this.meritService.getStudentData(this.eventValue,this.gameID,this.schoolDataArray[0]).subscribe(
      response => {
        if(response!=="") {
            this.reportData = response;
            this.reportDataLength = this.reportData.length;
            for (let i=0;i < this.reportData.length;i++) {
               if (this.reportData[i].isPresent === '1') {
                 console.log('Im present');
              
               }  else {
                 console.log('im absent')
               }
            }
     

          if(this.reportDataLength > 0) {
            this.isDataAvailble = true;
          //  this.showspinner = false;
          } 
        } else {
          console.log('Data is blannk from service')
        }

    } ,
    error => {
      //this.errorAlert =true;
      });
  }
}
