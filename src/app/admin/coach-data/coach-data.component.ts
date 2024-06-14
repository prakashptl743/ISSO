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
  loading: boolean;
  disable = false;
  schoolData: Student[];
  studentDataArray =[];
  schoolListArray =[];
  eventData: any;
  schoolList: any;
  schoolServiceData:any;
  showStudentCount: boolean = false;
  sortOptions: SelectItem[];
  yearOptions: SelectItem[];
  eventOptions: SelectItem[];
  schoolOptions: SelectItem[];
  gameOptions: SelectItem[];
  profileForm:FormGroup;
  ageRange;
  sortKey: string;
  sortField: string;
  sortOrder: number;
  eventIdForStudent:any;
  selectedSchool: Student;
  selected_School: string;
  
  displayDialog: boolean;
  eventReadable: boolean = false;
  eventReadableCoach: boolean = false;
  schoolReadble: boolean = false;
  studentCount: number;
  showDropDown: boolean;
  gameList: any;
  gameReadble: boolean;
  schoolListResponse:any;

  /* New */
  selectedYear: string;
  selected_School_list: string;
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  gameArray =[]; 
  ageReadble: boolean = false;
  genderReadble: boolean = false;
  selectedAge: string;
  selectedGame: string;
  selectedGender: string;
  gameId: any;
  gameName: any;
  gameType: any;
  eventName: any;
  schoolId: any;
  schoolName: any;
  selectSchool: string;
  genderVal: string; 
  showspinner: boolean;
  selectedEvent: string;
  studentId: any;
  studentName: string;
  newSchoolId: any;
  base64Image:any;
  student_Name: string;
  sId:any;
  country: any;
  filteredPages: any[];
  _radioDevicesList:any;
  father_Name: string;
  displaySearch: boolean;
  studentGrid: boolean;
  isCancelForm: boolean;
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
  today: string ;
  isAddNewStudent: boolean;
  setPhotoYear: string;
  studentPhoto: any;
  isValidFile: boolean = true;
  isFileUpload:boolean = false;
  isFileBig: boolean;  
  isEdit: any;
  isMessageshow: boolean;
  studentCapacity: boolean;
  editStudentPhoto: string;
  gameNameForEditStudent: any;
  isMoreDot: boolean;
  schoolEnter: boolean;
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
   }

ngOnInit() {
    this.studentGrid = true;
    this.showDropDown = true;
    this.initialForm();
    this.fileUpladForm();
    this.yearOptions = this.issoUtilService.setYear();
    this.genderOptions =this.issoUtilService.setGender();
    this.loading = true;
    this.setPhotoPath()
 }
setPhotoPath () { 
  this.setPhotoYear = this.issoUtilService.setCoachPhotoYear(); 
}
seCurrenttDate() {
  const now = new Date;
  this.today =now.toISOString();
}

cancelForm() {
   if(this.isCancelForm){
     this.displaySearch = true
     this.display = false;
   } else  {
     this.display = false;
     this.eventReadable = true;
     this.schoolReadble = true;
     this.showDropDown = true;
   }
}
 
onDialogHide() {
  this.selectedSchool = null;
}
 
onyearChange(event) {
  this.yearvalue = event.value;
  this.isAddNewStudent = false;
  this.schoolEnter= false;
  this.selectedGender ='';
  this.selected_School_list = '';
  this.selectedAge = ''
  this.genderReadble = true;
  this.schoolOptions = [];
  this.gameOptions = [];
  this.schoolReadble = false; 
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
          this.eventReadableCoach = true;
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
          this.eventReadableCoach = false;
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
//  changeAge(event) {
//   const ageVal = event.value;
//   console.log('ageval--->'+ageVal);
//   this.selectedAge = ageVal;
// }
onEventChangeForStudent(event) {
  this.schoolEnter= false;
  this.gameReadble = true;
  this.schoolName = '';
  this.genderReadble = false;
  this.ageReadble = false;
  this.gameOptions = [];
  this.isAddNewStudent = false;
  this.selectedGender ='';
  this.selectedAge ='';
  this.schoolOptions = []; 
  const eventval = event.value
  this.eventIdForStudent =eventval


  this.meritService.loadGameByEvent(this.eventIdForStudent, false).subscribe(
    response => {
      if(response!=="") {
        this.gameList =response;
        this.schoolReadble = false;
        if(this.gameList.length > 0 ) {
          this.gameOptions = [];
          this.gameReadble = true;
          this.gameOptions.push({
            label: "Select Game",
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
loadGenerChange() {
  this.isAddNewStudent = true;
  this.schoolEnter= true;
  this.schoolName = '';
  this.schoolOptions = [];
  
}
loadGameChange(gameData) {
  this.ageReadble = true;
  this.schoolReadble = false;
  this.schoolOptions = [];
  const gameval = gameData.value
  this.gameArray =  gameval.split(","); 
  this.gameId = this.gameArray[0];
  this.gameName =  this.gameArray[1];
  this.gameType =  this.gameArray[2];
  this.checkAge(this.gameId);
}
 
checkAge(gameId){
  this.isAddNewStudent = false;
  this.selectedAge ='';
  this.selectedGender = '';
  this.schoolName ='';
  this.meritService.setAgeMapForMerit(this.eventIdForStudent,gameId).subscribe(
    response => {
    if(response[0].ageRange !== 'null' && response[0].girlsAgeRange !== 'null') {
    const ageList = response[0].ageRange + " " + response[0].girlsAgeRange;
    const ageMeritArray= ageList.split(" ");
    const x = Array.from(new Set(ageList.split(" "))).toString();
    
    var myarray = x.split(',');
    let ageArrayLength =  myarray.length;

    this.ageOptions =[];
    this.ageOptions.push({
      label: "Please Select",
      value: ''
    });

    for(var i = 0; i < ageArrayLength; i++) {
      if(myarray[i] !==''){
      this.ageOptions.push({
        label: myarray[i],
        value: myarray[i]
      });
    }
    }

  }
    } ,
    error => {
      //this.errorAlert =true;
   })
}

 
onEventChange(event) {
  this.selected_School = 'Please select'; 
  this.eventValue = event.value;
  this.schoolEnter= false;
  this.schoolvalue ='';
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
 
 

 
getCoachData () {
  if(this.eventValue && this.schoolvalue) {
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
            this.messageService.add({key: 'custom', severity:'error', summary: 'Data not found!'});
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
            this.messageService.add({key: 'custom', severity:'error', summary: 'Data not found!'});
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
    this.selectedYear = '';
    this.selectedAge = '';
    this.selectedGender = '';
    this.father_Name = '';
    this.student_Name='';
    this.editStudentPhoto = '';
    this.ageRange = this.issoUtilService.setAge();
    this.ageOptions = this.issoUtilService.setAge();
    this.schoolForm = this.fb.group({
      studentYear:[''],
      sId:[''],
      schoolId:[''],
      editStudentPhoto:[],
      studentEvent: ['', Validators.required],
      studentGame: ['', Validators.required],
      studentAge: ['', Validators.required],
      studentGender: ['', Validators.required],
      schoolName:  ['', Validators.required],
      studentName: ['', Validators.required],
      fatherName: ['', Validators.required],
      studentPhoto:[''], 
      profile :''
     
    }); 
 
}
 

loadAgeChange() {
  this.selectedGender ='';
  this.schoolEnter= false;
  this.selected_School_list = ''; 
  this.genderReadble = true;
  this.schoolOptions = [];
  this.schoolReadble = false;
  this.isAddNewStudent = false;
 
}
loadAllSchool() {
  this.studentService.loadAllSchool().subscribe(response => {
    if(response!=="") {
     this.schoolListResponse= response;
     this.schoolListArray =  this.schoolListResponse;
     this._radioDevicesList = this.schoolListArray 
     } else {
      console.log('Data is blannk from service')
    }

 } ,
 error => {
   //this.errorAlert =true;
});
}
addNewStudent(event: Event, studentData: coachData,type:any) {
    if(this.displaySearch){
      this.isCancelForm =true;
    } else {
      this.isCancelForm =false;
    }
    this.displaySearch = false;
    this.selectedEvent = '';
    this.selectedGame = '';
    this.gameReadble = false;
    this.ageReadble = false;
    this.genderReadble = false;
 
    this.schoolEnter= false;
    this.display = true;
    this.loadAllSchool();
    this.showStudentCount = false;
    this.showDropDown = false;
    this.url = false;
    if (type == 'edit') {
        this.newSchoolId = studentData.schoolId;
        this.isValidFile = true;
        this.isEditStudent = true;
        this.studentPhoto = studentData.coachPhoto,
        this.isAddNewStudent = true;
        this.eventName = studentData.eventName;
        this.ageValue = studentData.ageRange;
        this.editStudentPhoto = studentData.coachPhoto,
        this.selectedAge = this.ageValue;
        this.genderValue = studentData.coachGender;
        this.selectedGender = studentData.coachGender;
        if(studentData.coachGender == '1') {
          this.genderValue = 'Boy'; 
        } else {
          this.genderValue = 'Girl'; 
        }
 
        this.gameId =  studentData.game_id;
        this.selectedAge =this.ageValue;
       

      //  }
        this.sId =studentData.id,
        this.student_Name = studentData.coachName;
        this.father_Name  = studentData.coachFatherName;
        this.gameValue= studentData.game_id;
        this.gameNameForEditStudent = studentData.gameName;
 
        this.schoolName = studentData.schoolName;
        this.schoolForm.setValue({
         schoolId:studentData.schoolId,
         studentYear:'',
         sId:studentData.id,  
         studentEvent:studentData.coachName,
         studentGame: '', 
         studentAge:'',
         studentGender: '',
         schoolName: studentData.schoolName,
         studentName: studentData.coachName,
         fatherName: studentData.coachFatherName,
         studentPhoto:'',
         editStudentPhoto:[],        
         profile :''
        });  
 
   } else {
       this.isAddNewStudent = false;
       this.initialForm();
       this.eventReadable = false;
       // this.schoolReadble = false;
       this.isEditStudent = false;
       this.schoolForm.setValue({ 
        studentYear:'',
        sId:'',  
        schoolId:'',
        studentEvent: '',
        studentGame: '',
        studentAge:'',
        studentGender: '',
        schoolName: '',
        studentName: '',
        fatherName: '',
        studentPhoto: '',
        profile :'',
        
      }); 
 
    }
    this.display = true;
    
}
 
 
 
hideExtraView() {
  this.display = false;
  this.showDropDown = true;
  if(!this.eventIdForStudent) {
    this.eventIdForStudent ='';
  }
  if(!this.yearvalue) {
    this.yearvalue ='';
  }
  if(!this.schoolvalue) {
    this.schoolvalue ='';
  }
 
}

onTestSelect(evt:any){
  console.log(evt.id);
  this.newSchoolId = evt.id
}

onPageSelect(evt:any){
  this.newSchoolId = evt.id;
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
  if(filtered.length <= 0){
     this.schoolName ='';
  }
  return filtered;
}

onSubmit() {
      this.submitted = true;
      const formData = new FormData();
      formData.append('sId', this.schoolForm.get('sId').value);
      formData.append('studentData', JSON.stringify(this.studentDataArray));
      formData.append('studentName', this.schoolForm.get('studentName').value);
      formData.append('fatherName', this.schoolForm.get('fatherName').value);
      formData.append('editStudentPhoto', this.schoolForm.get('editStudentPhoto').value);

      
      if(this.schoolForm.get('profile').value == '' || this.schoolForm.get('profile').value == 'C:\\fakepath\\'+this.studentPhoto || this.schoolForm.get('profile').value == this.studentPhoto) {
        formData.append('fileNoChange', '1');
        formData.append('oldPhotoName', this.studentPhoto);
      } else {
         formData.append('fileNoChange', '0');
         formData.append('profile', this.profileForm.get('profile').value, this.fullFilename);
      }
      formData.append('schoolId', this.newSchoolId);  
      formData.append('ageRange', this.selectedAge);
      formData.append('gender', this.selectedGender);
      formData.append('gameId', this.gameId);
      formData.append('eventId', this.eventIdForStudent);
      if(!this.isEditStudent) {
      this.coachData.saveCoachData(formData).subscribe(
        res => {
            if (res.status === 'error') {
              this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
            } else {
              this.messageService.add({key: 'custom', severity:'success', summary: 'New Coach Added Successfully'});
            }
            this.showDropDown = true;
          this.display =false
          this.eventIdForStudent ='';
          this.schoolvalue ='';
          this.selectedYear = '';
         // this.getCoachData();
         this.studentCount =0;
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
              this.getCoachData();
              this.showDropDown = true;
            }
           this.display =false;
          //this.newStudentData();
          //this.getStudentData();
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
 
   if(!this.schoolForm.invalid) {
    console.log('immif')
    this.isFileUpload = true;
  } else {
    console.log('im else')
    this.isFileUpload = false;
  }
 } 
}
 
formChanged(event) {
  if(!this.schoolForm.invalid) {
     this.isFileUpload = true;
  } else {
    this.isFileUpload = false;
  }
}

deleteCoachData(event: Event, schoolData: Student) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: 'confirm-delete-school',
      icon: 'pi pi-info-circle',
      message: 'Are you sure to delete coach data?',
      accept: () => { this.deleteCoach(schoolData); },
    });
}

private _deleteSchoolData() {
    this.messageService.add({key: 'custom', severity:'success', summary: 'Student Data Deleted Successfully'});
}

deleteCoach(School) {
  let studentID=School.id
  this.studentEnrollmentService.deleteCoach(studentID).subscribe(
    res => {
         this.messageService.add({key: 'custom', severity:'success', summary: 'Coach Data Deleted Successfully'});
         this.getCoachData();
    },
    error => this.error = error
  );
 
}
 
}
