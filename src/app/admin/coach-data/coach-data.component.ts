import { Component, OnInit } from '@angular/core';
//import { SchoolService } from '../service/school.service';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { PageNotFoundComponent} from 'src/app/page-not-found/page-not-found.component'
import { ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { coachData, Student } from '../admin-interfaces';
import { IssoUtilService  } from '../../services/isso-util.service'
import { ReportMeritService } from '../service/report-merit.service';
import { StudentEnrollmentService } from 'src/app/staffadmin/service/student-enrollment.service';
import { CoachDataService } from '../service/coach-data.service';


@Component({
  selector: 'app-coach-data',
  templateUrl: './coach-data.component.html',
  styleUrls: ['./coach-data.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class CoachDataComponent implements OnInit {
  schoolForm: FormGroup;
  searchForm: FormGroup;
  editForm: FormGroup;
  errormessage: boolean;
  submitted = false;
  display: boolean = false;
  options: SelectItem[];
  schoolArray =[];
  control: FormControl;
  schoolServiceDATA:any;
  school: Student;
  error: string;
  eventValue: any;
  yearvalue: any;
  schoolvalue: any;
  cols: any[];
  placeholderText = "Select Option"
  actions: string;
  loading: boolean;
  disable = false;
  schoolData: Student[];
  studentDataArray =[];
  schoolListArray =[];
  checkSubGameCapacity: any = [];
  eventData: any;
  globalSchoolData: any;
  schoolList: any;
  schoolServiceData:any;
  showStudentCount: boolean = false;
  sortOptions: SelectItem[];
  yearOptions: SelectItem[];
  eventOptions: SelectItem[];
  globalSchoolOption: SelectItem[];
  schoolOptions: SelectItem[];
  gameOptions: SelectItem[];
  profileForm:FormGroup;
  ageRange;
  standardClass;
  sortKey: string;
  sortField: string;
  sortOrder: number;
  eventIdForStudent:number;
  selectedSchool: Student;
  selected_School: string;
  carDatavalue:any;
  carId:number
  displayDialog: boolean;
  eventReadable: boolean = false;
  schoolReadble: boolean = false;
  studentCount: number;
  subViewTitle: string;
  showDropDown: boolean;
  gameList: any;
  gameReadble: boolean;
  schoolListResponse:any;

  /* New */
  selectedYear: string;
  selected_School_list: string;
  selectedSubGame: string;
  studentOptions: SelectItem[];
  subgameOptions: SelectItem[];
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  rankOptions: SelectItem[];
  gameArray =[];
 // schoolArray=[];
  studentArray=[];
  addMeritArray =[];
  teamMeritArray =[];
  saveTeamMeritArray =[];
  
  eventArray =[];
  subgameArray=[];
  addMeritDataArray =[];
  subGameIdArray =[];
  subGameNameArray=[];
  eventValue1:number;
 
  schoolvalue1:number;
 
  eventData1: any;
  ageRange1;
 // eventReadable: boolean = false;
  isDataAvailble: boolean = false;
 // gameReadble: boolean = false;
//  schoolReadble: boolean = false;
  ageReadble: boolean = false;
  genderReadble: boolean = false;
  rankReadble: boolean = false;
  isShowStudent: boolean = false;
  selectedAge: string;
  selectedGame: string;
  selectedGender: string;
 // schoolList: any;
  studentList: any;
 // gameList: any;
  subGameList: any;
  gameId: number
  seleedgameData: any;
  gameName: any;
  gameType: any;
  eventName: any;
  schoolId: any;
  schoolName: any;
  meritList: any;
  isMeritDataShow: boolean;
 // selectedYear: string;
  selectedSchool1: string;
  selectSchool: string;
 // selectedSubGame: string;
  genderVal: string;
  isShowSubGame: boolean;
  showspinner: boolean;
  subGameId: any;
  subGameType: any;
  subGameName: any;
  selectedRank: string;
  selectedStudent: string;
  selectedEvent: string;
  studentId: any;
  studentName: string;
  showStudentList: boolean;
  newSchoolId: any;
  base64Image:any;
  printmeritData: boolean;
  individualMeritData: boolean;
  student_Name: string;
  sId:any;
  country: any;
  globalSchoolvalue: any;
  globalSelectedSchool:string;
  mapGameArray = [];
  globalSelectedYear:string;
  minDate: Date;
  yearRange: string;
  list: any[] = [
    { name: '001', page: 'Central', url: 'bsp/create-customer'},
    { name: '002', page: 'Gold Loan', url: 'goldloan/ticket' },
    { name: '003', page: 'Gold Loan', url: 'auction/buyer-price'  },
    { name: '004', page: 'Gold Loan', url: 'settings/gold-market' },
    { name: '005', page: 'Central', url: 'bsp/edit-bsp' }
  ];

  filteredPages: any[];


  /* end New*/
 
  radioDeviceItem;
  _radioDevicesList:any;
  // _radioDevicesList = [
  //   { id: 11, text: 'one' },
  //   { id: 22, text: 'two' },
  //   { id: 33, text: 'three' },
  //   { id: 44, text: 'four' },
  //   { id: 55, text: 'five' }
  // ];
  radioDevicesList;
  father_Name: string;
  dateOf_Birth: Date;
  admission_Number: string;
  selectedClass: any;
  aadharNumber: string;
  displaySearch: boolean;
  studentGrid: boolean;
  goBackBUtton: boolean;
  globalSchoolReadble: boolean;
  showSearchResult: boolean;
  searchResult: any;
  searchResultData: any;
  noSearchData: boolean;
  isDuplicate: boolean;
  toalSubGameSelected: boolean;
  showMapData: boolean;
  subGameButton: boolean;
  isSubGameSelected: boolean;
  subGameoptions=[];
  subGameCount: number;
  url: any;
  fileName: number;
  fullFilename: string;
  selectedProfile: string;
  isEditStudent: boolean;
  eventYear: any;
  ageValue: any;
  genderValue: any;
  gameValue: any;
  newGameArray =[];
  newSubGameArray = [];
  today: string ;
  subGameCapacity: any;
  isAddNewStudent: boolean;
  setPhotoYear: string;
  studentPhoto: any;
  isValidFile: boolean = true;
  isFileBig: boolean;
  genderForSubGame: any;
  marked: any;
  passport: string;
  isEdit: any;
  aadhar: string;
  showNRI: boolean;
  isMessageshow: boolean;
  studentCapacity: boolean;
  editStudentPhoto: string;
  gameNameForEditStudent: any;
  isMoreDot: boolean;
  constructor(
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private issoUtilService: IssoUtilService,
    private studentService: StudentService,
    private meritService: ReportMeritService,
    private coachData: CoachDataService,
    private pb:FormBuilder,
    private studentEnrollmentService: StudentEnrollmentService
  ) {
    setTimeout(()=>{this.disable = true}, 5000)
    this.options = [
      {label: "jan 1 2001", value: new Date(2001,0,1)},
      {label: "jan 1 2002", value: new Date(2002,0,1)},
      {label: "jan 1 2003", value: new Date(2003,0,1)},
    ];
    this.options = [
      {label: "jan 1 2001", value: new Date(2001,0,1)},
      {label: "jan 1 2002", value: new Date(2002,0,1)},
      {label: "jan 1 2003", value: new Date(2003,0,1)},
    ];
this.control = new FormControl(this.options[2].value);
   }

ngOnInit() {
    this.studentGrid = true;
    this.showDropDown = true;
    this.initialForm();
    this.fileUpladForm();
    this.yearOptions = this.issoUtilService.setYear();
    this.genderOptions =this.issoUtilService.setGender();
    console.log(this.yearOptions);
    this.loading = true;
    setTimeout(()=> {this.placeholderText = 'It has changed'}, 5000)
   this.setPhotoPath()
 }
setPhotoPath () { 
  this.setPhotoYear = this.issoUtilService.setCoachPhotoYear(); 
}
seCurrenttDate() {
  const now = new Date;
  this.today =now.toISOString();
}
loadData(event) {
} 

editSchool(event: Event, car: Student) {
  let carData=  JSON.stringify(car);
  this.carId =car.sId;
  this.carDatavalue = car;
  this.displayDialog = true;
  event.preventDefault();
}

onDialogHide() {
  this.selectedSchool = null;
}
onLoadSchoolData(event) {
  this.yearvalue = event.value;
  if(this.yearvalue !== '') {
  this.studentService.loadGloballySchool(this.yearvalue).subscribe(
    response => {
      if(response!=="") {
        this.globalSchoolData =response;
        if(this.globalSchoolData.length > 0 ){
          this.globalSchoolReadble = true;
          this.globalSchoolOption = [];
          this.eventReadable = true;
          this.globalSchoolOption.push({
            label: "Please Select",
            value: ''
          });
          this.globalSchoolData.forEach(element => {
            this.globalSchoolOption.push({
              label: element.schoolName,
              value: element.schoolId
            });
          })
        } else {
          this.eventReadable = false;
          this.schoolReadble =false;
          this.globalSchoolOption = [];
          this.schoolOptions = [];
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
onyeareChange(event) {
  this.yearvalue = event.value;
 // this.initialForm();
  this.isAddNewStudent = false;



  this.selectedGender ='';
  this.selected_School_list = '';
  this.selectedAge = ''
  this.selectedRank ='';
  this.genderReadble = true;
  this.schoolOptions = [];
  this.gameOptions = [];
  this.subGameoptions = [];
  this.showMapData = false;
  this.mapGameArray = [];
  this.schoolReadble = false;
  this.isShowSubGame = false;
  this.ageReadble =false;
  this.genderReadble = false;
  this.gameReadble = false;
 





  if(this.yearvalue !== '') {
  this.studentService.loadEventByYear(this.yearvalue).subscribe(
    response => {
      if(response!=="") {
        this.eventData =response;
        if(this.eventData.length > 0 ){
          this.eventOptions = [];
          this.eventReadable = true;
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
          this.messageService.add({key: 'custom', severity:'error', summary: 'Event not found!'});
          this.eventReadable = false;
          this.schoolReadble =false;
          this.eventOptions = [];
          this.schoolOptions = [];
        }
      } else {
       console.log('Data is blannk from service')
      }

   } ,
   error => {
     //this.errorAlert =true;
    });
  } else {
    this.eventOptions = [];
    this.eventReadable = false;
    this.schoolOptions =[];
    this.schoolReadble = false;
  }
}

cancelForm() {
  this.display = false;
  this.showDropDown = true;
  if (this.displaySearch) {
    this.showDropDown = false;
    this.goBackBUtton = true;
  } else {
    this.showDropDown = true;
  }
}
onEventChangeForStudent(event) {
  // this.ageReadble =true;
  this.genderReadble =true;
  this.genderReadble = false;
  this.ageReadble = true;
  this.gameOptions = [];
  this.isAddNewStudent = false;
  this.selectedGender ='';
  this.selectedAge ='';
  this.selectedRank ='';
  this.schoolOptions = [];
  this.subgameArray =[];
  this.selectedSubGame = '';
  this.subgameOptions = [];
  this.isShowSubGame = false;
  this.showMapData = false;
  this.mapGameArray = [];
 
  const eventval = event.value
  this.eventIdForStudent =eventval

}
loadGenerChange() {
  this.isAddNewStudent = false;
  this.showMapData = false;
  this.mapGameArray = [];
  this.isShowSubGame = false; 
  this.schoolOptions = [];
  this.gameOptions = [];
  this.subGameoptions = [];
  this.meritService.loadGameByEvent(this.eventIdForStudent, false).subscribe(
    response => {
      if(response!=="") {
        this.gameList =response;
        this.schoolReadble = false;
        if(this.gameList.length > 0 ) {
          this.gameOptions = [];
          this.gameReadble = true;
          this.gameOptions.push({
            label: "Please Select",
            value: ''
          });
          this.gameList.forEach(element => {
            const gameIdAndName = element.gameId +','+ element.gameName +','+ element.gameType;
            this.gameOptions.push({
              label: element.gameName,
              value: gameIdAndName
            });
        })
       } else {
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
 
  // this.genderReadble = false;
  this.schoolReadble = false;
  this.showMapData = false;
 // this.selectedGender ='';
 // this.selectedAge ='';
  this.selectedRank ='';
  this.schoolOptions = [];
  this.rankReadble = false;
  const gameval = gameData.value
  this.gameArray =  gameval.split(","); 
  // this.ageOptions =[];
  // this.genderOptions = [];
  // this.selectedGender ='';
  this.gameId = this.gameArray[0];
  this.gameName =  this.gameArray[1];
  this.gameType =  this.gameArray[2];
 
  

 if(this.gameType == 'Both' || this.gameType =='Individual') {
 //  this.ageReadble =false;

   // this.setSubGame();

  //  this.meritService.loadSubgameByGame(this.gameId, false).subscribe(
  //   response => {
  //     if(response!=="") {
  //       this.subGameList =response;
  //       if(this.subGameList.length > 0 ) {
  //         this.isShowSubGame = true;
  //         this.subgameOptions = [];
  //         this.subGameList.forEach(element => {
  //           const subgameIdAndName = element.id +','+ element.subGameName +','+ element.gameType;
  //           this.subgameOptions.push({
  //             label: element.subGameName,
  //             value: subgameIdAndName
  //           });
  //         })
  //      } else {
  //        console.log('Im blank')
  //       this.ageReadble =true;
  //       this.subGameId = '';
  //       this.isShowSubGame = false;
  //       this.schoolReadble = false;
  //      }
  //     } else {
  //       console.log('Data is blannk from service')
  //     }

  //  } ,
  //  error => {
  //    //this.errorAlert =true;
  //   });
  } else {
    this.checkCapacity();
    //  if (this.gameId) {
    //   this.isAddNewStudent = true
    //  } else {
    //     this.isAddNewStudent = false;
    //  }
   // this.isAddNewStudent = true
    this.ageReadble =true;
    this.subgameArray =[];
    this.addMeritDataArray= [];
    this.isShowSubGame = false;
    this.subgameOptions = [];
    this.subGameId = '';
    this.subGameType = '';
    this.subGameName = '';
  }
}
checkCapacity() {
  if(this.gameId) {
  this.meritService.checkGameCapacity(this.gameId).subscribe(
    response => {
      if(response!=="") {
       
        if (response[0].eleven_boys > 0 && this.selectedAge == '11' ) {
           this.studentCapacity = response[0].eleven_boys;
           this.isMessageshow = true
        } else if (response[0].eleven_girls > 0 && this.selectedAge == '11') {
           this.studentCapacity = response[0].eleven_girls;
           this.isMessageshow = true;
        } else if (response[0].fourteen_boys > 0 && this.selectedAge == '14') {
          this.studentCapacity = response[0].fourteen_boys;
          this.isMessageshow = true;
        } else if (response[0].fourteen_girls > 0 && this.selectedAge == '14') {
          this.studentCapacity = response[0].fourteen_girls;
          this.isMessageshow = true;
        } else if (response[0].seventeen_boys > 0 && this.selectedAge == '17') {
          this.studentCapacity = response[0].seventeen_boys;
          this.isMessageshow = true;
        } else if (response[0].seventeen_girls > 0 && this.selectedAge == '17') {
          this.studentCapacity = response[0].seventeen_girls;
          this.isMessageshow = true;
        } else if (response[0].ninteen_boys > 0 && this.selectedAge == '19') {
          this.studentCapacity = response[0].ninteen_boys;
          this.isMessageshow = true;
        } else if (response[0].ninteen_girls > 0 && this.selectedAge == '19') {
          this.studentCapacity = response[0].ninteen_girls;
          this.isMessageshow = true;
        } else {
          this.isMessageshow = false;
        }
        
        
        if (this.isMessageshow) {
          //this.isAddNewStudent = true;
          this.meritService.checkStudentcapacity(this.eventIdForStudent,this.selectedAge,this.selectedGender,this.gameId).subscribe(
            response => {
              if (response!=="") {
                 if (response == this.studentCapacity ) {
                   this.messageService.add({key: 'custom', severity:'error', summary: 'Capacity is full!'});
                 } else {
                  this.isAddNewStudent = true;
                 }
                 
              } else {
                // console.log('Data is blannk from service')
               }
         
            } ,
            error => {
              //this.errorAlert =true;
             });
        } else {
          this.messageService.add({key: 'custom', severity:'error', summary: 'No seat available!'});
          // this.isAddNewStudent = false;
        }
  
      } else {
       // console.log('Data is blannk from service')
      }

   } ,
   error => {
     //this.errorAlert =true;
    });
  }
}
checkStudentcapacity() {

   
}

toggleVisibility(e,Idtype: string){
  this.marked= e.target.checked;
  if (!this.isEdit) {
    this.passport = '';
    this.aadhar= '';
  }
   if(Idtype === 'aadhar') {
    this.showNRI = true;
   } else {
     this.showNRI = false;
   }  
}
onEventChange(event) {
  this.selected_School = 'Please select'; 
  this.eventValue = event.value;
  this.isAddNewStudent = false;
  if(this.eventValue !== '') {
  this.studentService.loadSchoolByEvent(this.eventValue).subscribe(
    response => {
      if(response!=="") {
        this.schoolList =response;
        if(this.schoolList.length > 0 ) {
          this.schoolOptions = [];
          this.schoolReadble = true;
          this.schoolOptions.push({
            label: "Please Select",
            value: ''
          });
          this.schoolList.forEach(element => {
            this.schoolOptions.push({
              label: element.schoolName,
              value: element.schoolId
            });
          })
       } else {
        this.messageService.add({key: 'custom', severity:'error', summary: 'School not found!'});
        this.schoolReadble = false;
       }
      } else {
        console.log('Data is blannk from service')
      }

   } ,
   error => {
     //this.errorAlert =true;
  });
 } else {
  this.schoolReadble = false;
  this.schoolOptions = [];
 }
}
onSortChange(event) {
  let value = event.value;
  if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
  }
  else {
      this.sortOrder = 1;
      this.sortField = value;
  }
}
 
getStudentData(){
    this.displaySearch = false;
    this.studentGrid = true;
  this.showDropDown = true;
    this.studentService.getStudentList().subscribe(response => {
        if (response!=="") {
          this.schoolServiceData =response;
          this.schoolData = this.schoolServiceData;
          if(this.schoolData.length > 0) {
            this.showStudentCount = true;
            this.showDropDown = true;
            this.studentCount = this.schoolData.length;
          }
        } else {
          console.log('Data is blannk from service')
        }
     } ,
     error => {
       //this.errorAlert =true;
   });
} 

searchData() { 
  const formData = new FormData();

  formData.append('globalSelectedYear', this.searchForm.get('globalSelectedYear').value);
  formData.append('globalSelectedSchool', this.searchForm.get('globalSelectedSchool').value);
  formData.append('search_text', this.searchForm.get('search_text').value);

  this.studentService.loadGloablStudentData(formData).subscribe(response => {
      if(response!=="") {
        this.searchResult =response;
        this.searchResultData = this.searchResult;
        if(this.searchResultData.length > 0) {
         this.showSearchResult = true;
         this.noSearchData = false;
        } else {
          this.noSearchData = true;
          console.log('record not')
        }
      } else {
        console.log('Data is blannk from service')
      }

  } ,
  error => {
    //this.errorAlert =true;
});

}
loadStudentData(event) {
    this.schoolvalue = event.value;
  if(this.schoolvalue !== '') {
    this.coachData.loadCoachData(this.eventValue,this.schoolvalue).subscribe(response => {
        if(response!=="") {
          console.log(response);
          this.schoolServiceData =response;
          this.schoolData = this.schoolServiceData;
          if(this.schoolData.length > 0) {
            this.showStudentCount = true;
            this.studentCount = this.schoolData.length;
          } else {
            this.studentCount = 0;
          }
        } else {
          console.log('Data is blannk from service')
        }

    } ,
    error => {
      //this.errorAlert =true;
  });
} else {

}


// this.coachDataArray = [];
// this.coachDataArray.push(
//   this.eventValue, this.gameID, this.ageRange,this.schoolId
// );
// const formData = new FormData();
// formData.append('coachInfo', JSON.stringify(this.coachDataArray));
// this.coachData.loadCoachData(this.schoolvalue).subscribe(
//   response => {
//     console.log(response);
//    // this.coachListArray = response;
//    // if(response!=="") {
//       // if(response.length > 0) {
//       //   this.studentId = this.coachListArray[0].id;
//       //   this.coachDataAvailable = false;
//       //   this.submitButtonLabel= 'Update';
//       // } else {
//       //   this.submitButtonLabel = 'Submit';
//       //   this.studentEnroolForm.reset();
//       //   this.coachDataAvailable = false;
//       // }
//       console.log(response);
    
//   //  }
//   },
//  error => {
//    //this.errorAlert =true;
//   });


} 

showDialog(rowid:number) {
  this.display = true;
}
fileUpladForm() {
  this.profileForm= this.pb.group({
    name:[''],
    profile:['']
  })
}
initialForm() {
    this.selectedProfile ='';
    this.schoolName = '';
    this.dateOf_Birth = null;
    this.selectedYear = '';
    this.selectedAge = '';
    this.selectedGender = '';
    this.showMapData = false;
    this.mapGameArray = [];
    this.father_Name = '';
    this.admission_Number = '';
    this.selectedClass = '';
    this.aadharNumber = '';
    this.student_Name='';
   // this.dateOf_Birth  = new Date();
    this.isShowSubGame = false;
    this.editStudentPhoto = '';
    this.ageRange = this.issoUtilService.setAge();
    this.ageOptions = this.issoUtilService.setAge();
    this.standardClass = this.issoUtilService.setClass();
 //   this.genderOptions =this.issoUtilService.setGender();
    this.schoolForm = this.fb.group({
      studentYear:[''],
      sId:[''],
      schoolId:[''],
      editStudentPhoto:[],
      studentEvent: ['', Validators.required],
      studentGame: ['', Validators.required],
      studentSubGame: ['',],
      studentAge: ['', Validators.required],
      studentGender: ['', Validators.required],
      schoolName:  ['', Validators.required],
      studentName: ['', Validators.required],
      fatherName: ['', Validators.required],
     //// dateOfBirth: ['', Validators.required],
     // admissionNumber: ['', Validators.required],
     // standardClass: ['', Validators.required],
     // aadharNumber: ['', Validators.required],
      studentPhoto:[''],
     // subGameID: [''],
      subGameNames:[''],
      profile :''
     
    }); 
    this.searchForm = this.fb.group({
      globalSelectedYear:[''],
      globalSelectedSchool:['', Validators.required],
      search_text: ['', Validators.required],
     
    }); 
}
loadSubGameChange(subgame) {
  //this.selectedAge ='';
  //this.selectedGender='';
  this.selectedRank ='';
 // this.genderReadble = false;
 // this.ageReadble = true;
  this.isShowStudent = false;
  this.schoolReadble = false;
  this.schoolOptions = [];
  const eventval = subgame.value;
  this.subgameArray =  eventval.split(","); 
  this.subGameId = this.subgameArray[0];
  this.subGameName =  this.subgameArray[1];
  this.subGameType =  this.subgameArray[2];
  this.subGameCapacity = this.subgameArray[3];
  if (eventval !== '') {
     this.isSubGameSelected = true;
    } else {
     this.isSubGameSelected = false;
 }
}

addMapSubGame() {
  this.isDuplicate = false;
 // const ageValue = this.ageValue.toString();
 // let res;
 // if(ageValue!=='') {
 //   res = ageValue.replace(/^[, ]+|[, ]+$|[, ]+/g, " ").trim();
 // } else {
 //   res ='N/A';
 // }

 // this.eventList ='';
 // this.seletectedGameList ='';
 if (this.mapGameArray.length > 0 ) {
  
   for (let i=0;i< this.mapGameArray.length;i++) {
     if (this.subGameId === this.mapGameArray[i].subGameId) {
        console.log('Im if')
        this.isDuplicate = true;
        this.messageService.add({key: 'custom', severity:'error', summary: 'This subgame already exists!'});
     } else {
       console.log('im else')
     }
   }
 }  
  if (!this.isDuplicate && this.mapGameArray.length < 5) {
   this.toalSubGameSelected = true;
   this.mapGameArray.push({
     'subGameId':this.subGameId,
     'subGameName':this.subGameName,
     'subGameCapacity':this.subGameType,
   });
 }  
 console.log('mapGameArray===>'+ JSON.stringify(this.mapGameArray))
   if (this.mapGameArray.length > 0 ) {
     this.isAddNewStudent = true;
     this.showMapData = true;
   } else {
     this.showMapData = false;
   }
   this.subGameIdArray.push(this.subGameId);
   this.subGameNameArray.push(this.subGameName);
   console.log(' this.subGameIdArray===>'+ this.subGameIdArray)
   console.log(' this.subGameNameArray===>'+ this.subGameNameArray)
   if (this.subGameIdArray.length > 0 ){
     this.subGameButton = true;
   } else {
     this.subGameButton = false;
   }
   if (this.mapGameArray.length == 5) {
     this.messageService.add({key: 'custom', severity:'error', summary: 'You can select only 5 subgame'});
   } else {
     this.toalSubGameSelected = false;
   }
}


loadAgeChange() {
  this.selectedGender ='';
  this.selected_School_list = '';
  this.selectedRank ='';
  this.rankReadble = false
  this.isDataAvailble = false;
  this.genderReadble = true;
  this.schoolOptions = [];
  this.gameOptions = [];
  this.subGameoptions = [];
  this.showMapData = false;
  this.mapGameArray = [];
  this.schoolReadble = false;
  this.isShowSubGame = false;
  this.isShowStudent = false;
  this.printmeritData = false;
  this.isAddNewStudent = false;
  this.minDate = this.issoUtilService.setDateOfBirthValidation(Number(this.selectedAge));
  this.yearRange = this.issoUtilService.setYearRange(Number(this.selectedAge));
}
addNewStudent(event: Event, studentData: coachData,type:any) {
  this.display = true;
  this.goBackBUtton = false;
  this.showSearchResult = false;
  console.log('Stydent data'+JSON.stringify(studentData))
    this.showStudentCount = false;
    this.showDropDown = false;
   
    this.url = false;
    if (type == 'edit') {
    //   this.isEdit = true;
        this.isValidFile = true;
        this.isEditStudent = true;
        this.studentPhoto = studentData.coachPhoto,
        this.minDate = this.issoUtilService.setDateOfBirthValidation(Number(studentData.ageRange));
        this.yearRange = this.issoUtilService.setYearRange(Number(studentData.ageRange));
        this.isAddNewStudent = true;
        this.isShowSubGame = false;
        this.mapGameArray =[];
     
       // this.eventYear = studentData.event_year;
        this.eventName = studentData.eventName;
        this.ageValue = studentData.ageRange;
        this.editStudentPhoto = studentData.coachPhoto,
        this.selectedAge = this.ageValue;
        this.genderValue = studentData.coachGender;
        this.selectedGender = studentData.coachGender;
        if(studentData.coachGender == '1') {
          this.genderValue = 'Boy';
          this.genderForSubGame = 'boy';
        } else {
          this.genderValue = 'Girl';
          this.genderForSubGame =  'girl';
        }

        // if (studentData.gameType == 'Team' || studentData.gameType == 'Individual' )  {
        //   this.showMapData = false;
        //   this.mapGameArray = [];
        // } else {
        //   this.showMapData = true;
        // }
        this.gameId =  studentData.game_id;
        this.selectedAge =this.ageValue;
       
      //  if (studentData.subgameId !=='undefined') {
      //   this.subGameIdArray = [];
      //   this.subGameNameArray = [];
      //   this.setSubGameForEdit();
        
      //   const subGameIdArray = studentData.subgameId.split(',');
      //   const subGameNameArray = studentData.subGameName.split(',');
      //     this.mapGameArray = [];
      //     this.isShowSubGame = true;
      //     const gameArry = studentData.subgameId;  
      //     const subGameName = studentData.subGameName;
      //     this.newGameArray = gameArry.split(',');
      //     this.newSubGameArray = subGameName.split(',');

      //     for (let i=0;i< this.newGameArray.length;i++) {
      //       this.mapGameArray.push({
      //         'subGameId':this.newGameArray[i],
      //         'subGameName':this.newSubGameArray[i],
      //       });
      //       this.subGameIdArray.push(subGameIdArray[i]);
      //       this.subGameNameArray.push(subGameNameArray[i]);
      //      }

      //     // for(let i=0; i<this.newGameArray.length;i++) {
      //     //     for(let j=0; j< this.newSubGameArray.length;j++) {
      //     //       if (this.newSubGameArray.indexOf(this.newSubGameArray['subGameId'])==-1)  {
      //     //         this.mapGameArray.push({
      //     //           'subGameId': Number(this.newGameArray[i]),
      //     //           'subGameName': this.newSubGameArray[j],
      //     //         });
      //     //      }
      //     //     }
      //     // }
      //     console.log("DATE=====>",this.mapGameArray);
      //     if (studentData.gameType == 'Team' || studentData.gameType == 'Individual' )  {
      //         if (this.mapGameArray.length > 0 ) {
      //           this.showMapData = true;
      //         } else {
      //           this.showMapData = false;
      //         }
      //     this.mapGameArray.splice(this.newGameArray.length, this.mapGameArray.length);
         
      //    }
       
      //   //  this.setSubGame();
      //  }
        this.sId =studentData.id,
        this.student_Name = studentData.coachName;
        this.father_Name  = studentData.coachFatherName;
        this.gameValue= studentData.game_id;
        this.gameNameForEditStudent = studentData.gameName;
      //  this.dateOf_Birth  = new Date(studentData.dateOfBirth);
      //  this.admission_Number = studentData.admissionNumber;
     //   this.selectedClass = studentData.standardClass;
        //this.aadharNumber = studentData.aadharNumber;
        this.schoolName = studentData.schoolName;
        this.schoolForm.setValue({
          // sId:studentData.sId,  
          // studentYear:'',  
          // studentName: studentData.studentName,
          // fatherName:  studentData.fatherName,
          // studentEvent:  '',
          // dateOfBirth: new Date(studentData.dateOfBirth),
          // standardClass:  studentData.standardClass,
          // ageRange:  studentData.ageRange,
          // aadharNumber: studentData.aadharNumber,
          // studentGame: studentData.studentGame,
          // studentSubGame:  studentData.studentSubGame,
          // eventName: studentData.studentEvent,
          // schoolName: studentData.schoolName 
         schoolId:studentData.schoolId,
         studentYear:'',
         sId:studentData.id,  
         studentEvent:studentData.coachName,
         studentGame: '',
         studentSubGame:'',
         studentAge:'',
         studentGender: '',
         schoolName: studentData.schoolName,
         studentName: studentData.coachName,
         fatherName: studentData.coachFatherName,
       //  dateOfBirth: new Date(studentData.dateOfBirth),
         admissionNumber:  '',
         //standardClass: studentData.standardClass,
        // aadharNumber:studentData.aadharNumber,
         studentPhoto:'',
         editStudentPhoto:[],
         subGameID: [''],
         subGameNames:[''],
         profile :''
        });  
        console.log('Printing school Form'+JSON.stringify(this.schoolForm));
        this.subViewTitle = 'Edit Student';
   } else {
       this.isAddNewStudent = false;
       this.initialForm();
      
       this.isEditStudent = false;
       this.schoolForm.setValue({ 
        studentYear:'',
        sId:'',  
        schoolId:'',
        studentEvent: '',
        studentGame: '',
        studentSubGame: '',
        studentAge:'',
        studentGender: '',
        schoolName: '',
        studentName: '',
        fatherName: '',
       // dateOfBirth: '',
      //  admissionNumber: '',
     //   standardClass: '',
      //  aadharNumber: '',
        studentPhoto: '',
       // subGameID: [''],
       // subGameNames:[''],
        profile :'',
        
      }); 
      this.subViewTitle = 'Add New Student';
    }
    this.display = true;
    
}
searchGlobal() {
  this.displaySearch = true;
  this.display = false;
  this.showDropDown = false;
  this.studentGrid = false;
  this.showStudentCount = false;
  this.goBackBUtton = true;
  this.globalSchoolOption = [];
  this.globalSchoolReadble = false;
  this.searchForm.setValue({ 
    search_text:''
  });
 
}
goBack() {
  this.studentGrid = true;
  this.showDropDown = true;
  this.displaySearch = false;
  this.showSearchResult = false;
}
removeMappedData(i: number): void {
  this.mapGameArray.splice(i, 1);
  this.subGameIdArray.splice(i, 1);
  this.subGameNameArray.splice(i, 1);
  //this.saveEventMapArray.splice(i, 1); 
  if (this.mapGameArray.length == 0) {
    this.showMapData = false;
    this.isAddNewStudent = false;
  }
}
 
// setSubGame() {
 
//   this.subGameIdArray = []
//   this.subGameNameArray = []
//   this.checkSubGameCapacity =[]
 
//   this.mapGameArray = [];
//   this.isSubGameSelected = false;
 
//   if (this.selectedGender == '1' ) {
//     this.genderForSubGame = 'boy';
//     this.genderValue = 'boy';
//   } 
//   if(this.selectedGender == '2' ) {
//     this.genderForSubGame = 'girl';
//      this.genderValue = 'girl';
//   } 
 
//   this.isShowSubGame = true;
//   this.subGameoptions = [];
 
//   this.studentEnrollmentService.getSubGameData(this.gameId, this.selectedAge,this.genderForSubGame).subscribe(
//     response => {
//       if(response!=="") {
//         this.subGameList = response;
//         this.subGameoptions = [];
//         this.subGameoptions.push({
//           label:"Please select",
//           value: ''
//         });
//          this.subGameList.forEach(element => {
//           if (element.eleven_boys > 0) {
//             const gameIdAndName = element.id +','+ element.subGameName +','+ element.eleven_boys +','+ element.gameType;
//             this.subGameoptions.push({
//               label: element.subGameName,
//               value:gameIdAndName
//             });
//           } else if(element.eleven_girls > 0) {
//             const gameIdAndName = element.id +','+ element.subGameName  +','+ element.eleven_girls +','+ element.gameType;
//             this.subGameoptions.push({
//               label: element.subGameName,
//               value:gameIdAndName
//             });
//           } else if(element.fourteen_boys > 0) {
//             const gameIdAndName = element.id  +','+ element.subGameName  +','+ element.fourteen_boys +','+ element.gameType;
//             this.subGameoptions.push({
//               label: element.subGameName,
//               value:gameIdAndName
//             });
//           }  else if(element.fourteen_girls > 0) {
//             const gameIdAndName = element.id  +','+ element.subGameName  +','+ element.fourteen_girls +','+ element.gameType;
//             this.subGameoptions.push({
//               label: element.subGameName,
//               value:gameIdAndName
//             });
//           }  else if(element.seventeen_boys > 0) {
//             const gameIdAndName = element.id  +','+ element.subGameName  +','+ element.seventeen_boys +','+ element.gameType;
//             this.subGameoptions.push({
//               label: element.subGameName,
//               value:gameIdAndName
//             });
//           }  else if(element.seventeen_girls > 0) {
//             const gameIdAndName = element.id  +','+ element.subGameName  +','+ element.seventeen_girls +','+ element.gameType;
//             this.subGameoptions.push({
//               label: element.subGameName,
//               value:gameIdAndName
//             });
//           }  else if(element.ninteen_boys > 0) {
//             const gameIdAndName = element.id  +','+ element.subGameName  +','+ element.ninteen_boys +','+ element.gameType;
//             this.subGameoptions.push({
//               label: element.subGameName,
//               value:gameIdAndName
//             });
//           }  else if(element.ninteen_girls > 0) {
//             const gameIdAndName = element.id  +','+ element.subGameName  +','+ element.ninteen_girls +','+ element.gameType;
//             this.subGameoptions.push({
//               label: element.subGameName,
//               value:gameIdAndName
//             });
//           }
//         })
      
  
 
//        console.log('Im subgame'+JSON.stringify(this.subGameoptions));
//        }
//       if(this.subGameList.length > 0) { 
//         this.isShowSubGame = true;
//           this.subGameCount = 0;
//           for(let i=0;i<this.subGameList.length;i++) {
//                    if ( (this.subGameList[i]['eleven_boys'] === '0') || (this.subGameList[i]['eleven_girls'] === '0') || (this.subGameList[i]['fourteen_boys'] === '0') || (this.subGameList[i]['fourteen_girls'] === '0') || (this.subGameList[i]['seventeen_boys'] === '0') || (this.subGameList[i]['seventeen_girls'] === '0') || (this.subGameList[i]['ninteen_boys'] === '0') || (this.subGameList[i]['ninteen_girls'] === '0')) {
//                     this.subGameCount++;
//                     console.log('imtrrew')
//                    }  else  {
//                     console.log('im false')
//                    }
      
//           }
//           if((this.subGameCount == this.subGameList.length) ) {
//               this.isShowSubGame = false;
//               this.isAddNewStudent = false;
//               this.messageService.add({key: 'custom', severity:'error', summary: 'No subgame available'});
//           } else {
//               this.isAddNewStudent = false;
//               console.log('Im game count==>'+this.subGameCount);
       
//          }
//       } else {
//         this.isAddNewStudent = false;
//          this.messageService.add({key: 'custom', severity:'error', summary: 'No subgame available'});
//       }
     
//     },
//    error => {
 
//  });
  
// }
 
 
hideExtraView() {
  this.display = false;
  this.showDropDown = true;
}

searchAvailableRadioList(selected): void {
  console.log('Selected value'+selected)
  let upperCase =  selected.toUpperCase( );
  let schoolIdVal;
  // console.log(selected.toUpperCase( ));
  this.radioDevicesList = this._radioDevicesList.filter(r =>  r.text.includes(selected) );
  console.log('schoolName'+JSON.stringify(this.radioDevicesList))
   schoolIdVal = this._radioDevicesList.find(r =>  r.id.includes(this.radioDevicesList) );
   console.log('schoolIdVal'+schoolIdVal)
}

// onPageSelect(evt:any){
//   console.log(evt.url);
// }
 
// filterPages(event) {
//   this.filteredPages = this.filterCountry(event.query, this.list);
// }

// filterCountry(query, countries: any[]): any[] {
//   //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
//   let filtered: any[] = [];
//   for (let i = 0; i < countries.length; i++) {
//     let country = countries[i];
//     if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
//       filtered.push(country);
//     }
//   }
//   return filtered;
// }

onTestSelect(evt:any){
  console.log(evt.id);
  this.newSchoolId = evt.id
}

onPageSelect(evt:any){
  console.log(evt.id);
 // this.schoolId = evt.id;
  this.newSchoolId = evt.id
  console.log('Value'+JSON.stringify(evt));
}

filterPages(event) {
  this.filteredPages = this.filterCountry(event.query, this.schoolListArray);
}
chkZeroVal(event:any){
  console.log('hiiiii==>'+event);
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
  if(filtered.length <= 0){
     this.schoolName ='';
  }
  return filtered;
}

onSubmit() {
   this.submitted = true;
   console.log(this.eventValue);
   let subGameId;
   let subGameName;
   if (this.subGameIdArray.length > 0) {
        subGameId = this.subGameIdArray.toString();
        subGameName = this.subGameNameArray.toString();
    }
      this.studentDataArray.push(
          this.eventIdForStudent,
          this.gameId,
          this.subGameId,
          this.selectedAge,
          this.selectedGender,
          this.newSchoolId,
      );
      let eventId = this.eventValue
      const formData = new FormData();
      let schoolID =  this.newSchoolId;
     // let datOfbirth = this.schoolForm.get('dateOfBirth').value
    //  let formatted_DOB = datOfbirth.getFullYear()+ "-" + (datOfbirth.getMonth() + 1)+ "-"+datOfbirth.getDate() 
    
      
      formData.append('sId', this.schoolForm.get('sId').value);
      formData.append('studentData', JSON.stringify(this.studentDataArray));
      formData.append('studentName', this.schoolForm.get('studentName').value);
      formData.append('fatherName', this.schoolForm.get('fatherName').value);
      
     // formData.append('dateOfBirth', formatted_DOB);
      formData.append('editStudentPhoto', this.schoolForm.get('editStudentPhoto').value);

      
      if(this.schoolForm.get('profile').value == '' || this.schoolForm.get('profile').value == 'C:\\fakepath\\'+this.studentPhoto || this.schoolForm.get('profile').value == this.studentPhoto) {
        formData.append('fileNoChange', '1');
        formData.append('oldPhotoName', this.studentPhoto);
      } else {
         formData.append('fileNoChange', '0');
         formData.append('profile', this.profileForm.get('profile').value, this.fullFilename);
      }
      //formData.append('profile', this.profileForm.get('profile').value, this.fullFilename);
     // formData.append('admissionNumber', this.schoolForm.get('admissionNumber').value);
    //  formData.append('standardClass', this.schoolForm.get('standardClass').value);
      // formData.append('studentPhoto', this.schoolForm.get('studentPhoto').value);
    //  formData.append('aadharNumber', this.schoolForm.get('aadharNumber').value);
      formData.append('schoolId', this.schoolForm.get('schoolId').value);
      // formData.append('subGameID', subGameId);
      // formData.append('subGameNames', subGameName);



      formData.append('ageRange', this.ageValue);
      formData.append('gender', this.selectedGender);
      formData.append('gameId', this.gameValue);
      formData.append('eventId', this.eventValue);
      
    //   formData.append('passPort',govtIdPassport);
       
      formData.append('subGameID', subGameId);
      formData.append('subGameNames', subGameName);



      
     if(!this.isEditStudent) {
      this.coachData.saveCoachData(formData).subscribe(
        res => {
            if (res.status === 'error') {
              this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
            } else {
              this.messageService.add({key: 'custom', severity:'success', summary: 'New Coach Added Successfully'});

            }
          this.display =false
          this.getStudentData();
        },
        error => this.error = error
     );

    } else  {
       this.coachData.updateCoachData(formData).subscribe(
        res => {
            if (res.status === 'error') { 
              this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
            } else {
              this.messageService.add({key: 'custom', severity:'success', summary: 'Coach Data Updated Successfully'});

            }
          this.display =false;
          this.newStudentData();
         // this.getStudentData();
        },
        error => this.error = error
      );

    }
 
}
newStudentData() {
  this.displaySearch = false;
  this.studentGrid = true;
  this.showDropDown = true;
  this.studentService.loadStudentDataByEvent(this.eventValue,this.schoolvalue).subscribe(response => {
    if(response!=="") {
      this.schoolServiceData =response;
      this.schoolData = this.schoolServiceData;
      if(this.schoolData.length > 0) {
        this.showStudentCount = true;
        this.studentCount = this.schoolData.length;
      }
    } else {
      console.log('Data is blannk from service')
    }

} ,
error => {
  //this.errorAlert =true;
});
}
// onFileSelected(event) {
//   // this.selectedFile = <File>event.target.files[0];
//   if(event.target.files) {
//     var reader = new FileReader();
//     reader.readAsDataURL(event.target.files[0]);
//     reader.onload=(event:any)=>{
//       this.url=event.target.result;
//     }
//     var newName=(event.target.files[0].name).split('.').slice(0, -1).join('.')
//     var removeSpace = newName.replace(/\s/g, "");
//     var ext = (event.target.files[0].name).split('.').pop(); 
//     this.fileName= Math.floor((Math.random() * 1000000000) + 1);
//     this.fullFilename= removeSpace+this.fileName+'.'+ext;
//    // this.blobName = this.fullFilename
//     const profile = event.target.files[0];
//     this.profileForm.get('profile').setValue(profile);
 
//   } 
//  }

 onFileSelected(event) {    
  if(event.target.files) { 
   var reader = new FileReader();
   reader.readAsDataURL(event.target.files[0]);
   reader.onload=(event:any)=>{
     this.url=event.target.result;
   }
   var newName=(event.target.files[0].name).split('.').slice(0, -1).join('.')
   if(newName.indexOf('.') !== -1)
   {
     this.isMoreDot = true;
   } else {
      this.isMoreDot = false;
   }
   var removeSpace = newName.replace(/\s/g, "");
   var ext = (event.target.files[0].name).split('.').pop(); 
   this.fileName= Math.floor((Math.random() * 1000000000) + 1);
   this.fullFilename= removeSpace+this.fileName+'.'+ext;
  // this.blobName = this.fullFilename
   const profile = event.target.files[0];
   const fileType = profile.type
   if ((fileType == 'image/png' || fileType == 'image/jpeg' || fileType == 'image/PNG' || fileType == 'image/JPG' || fileType == 'image/JPG') && !this.isMoreDot) {
     this.isValidFile = true;
   } else {
     this.isValidFile = false;
     this.selectedProfile = '';
     if(document.getElementById('my-input')) {
         let control2 = this.schoolForm.get('profile');
         control2.setValue(null);
         control2.setValidators([Validators.required]);
         control2.updateValueAndValidity();
     }
   }
   if (profile.size > 102400) { 
      this.isFileBig = true;
     this.selectedProfile = '';
     if(document.getElementById('my-input')) {
      let control2 = this.schoolForm.get('profile');
      control2.setValue(null);
      control2.setValidators([Validators.required]);
      control2.updateValueAndValidity();
    }
   } else {
     this.isFileBig = false;
   }
   this.profileForm.get('profile').setValue(profile);
   
 } 
}


deleteSchoolData(event: Event, schoolData: Student) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: 'confirm-delete-school',
      icon: 'pi pi-info-circle',
      message: 'Are you sure to delete student data?',
      accept: () => { this.deleteSchool(schoolData); },
    });
}

private _deleteSchoolData() {
    this.messageService.add({key: 'custom', severity:'success', summary: 'Student Data Deleted Successfully'});
}

deleteSchool(School) {
  let studentID=School.sId

  this.studentEnrollmentService.deleteStudent(studentID).subscribe(
    res => {
         this.messageService.add({key: 'custom', severity:'success', summary: 'Student Data Deleted Successfully'});
        // this.display =false
         this.newStudentData();
        // this.getStudentData();
    },
    error => this.error = error
  );



//   this.studentService.deleteSchool(schoolId).subscribe(
//    res => {
//      //  if (res.status !== 'error') {
//      //    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
//      //  } else {
//          this.messageService.add({key: 'custom', severity:'success', summary: 'Student Data Deleted Successfully'});

//      //  }

//      this.display =false
//      this.getStudentData();
//    },
//    error => this.error = error
//  );
}



private _dropDatabase() {
  console.log('Database dropped');
}
}
