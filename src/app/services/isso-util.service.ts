import { Blog } from '../models/blog';
import { SelectItem } from 'primeng/api';
import { ThrowStmt } from '@angular/compiler';


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';
import { throwError } from 'rxjs';
// import { Blog } from '../../models/blog';
import { environment } from '../../environments/environment';
import { retry,map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StudentService } from '../admin/service/student.service';
 
@Injectable({
  providedIn: 'root'
}) 
export class IssoUtilService {
  minDate: Date;
  yearRange: string;
  serverUrl = environment.baseUrl;
  errorData: {};
  setPhotoPath: string;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private http: HttpClient;
  constructor(
    handler: HttpBackend,
    private studentService: StudentService) {
    this.http = new HttpClient(handler);
}

 // serverUrl = environment.baseUrl;
  yearOptions:SelectItem[];
  staffadminYearOptions:SelectItem[];
  yearArray: any = [];
  ageOptions: { label: string; value: string; }[];
  feeType: { label: string; value: string; }[];  
  schoolZone: { label: string; value: string; }[];  
  eventZone: { label: string; value: string; }[];  
  genderOptions: { label: string; value: string; }[];
  gameOptions: { label: string; value: string; }[];
  standardClass: { label: string; value: string; }[];

  // constructor(private http: HttpClient) { }

  
  setYear() {
    let setYearVal = 2021;
    let currYear = new Date().getFullYear();
    let yearCount = currYear - setYearVal + 2
    this.yearArray.length = 0; 
    for(let i=1;i< yearCount; i++) {
      let nextYear = setYearVal + 1;
      let currYearString = setYearVal+'-'+nextYear;
      this.yearArray.push({year:currYearString});
        this.yearOptions = [];
        this.yearOptions.push({
          label: "Select year",
          value: ''
        });
        this.yearArray.forEach(element => {
          this.yearOptions.push({
            label: element.year,
            value: element.year
          });
        })
        setYearVal= nextYear;
    }
    return this.yearOptions;
}
setAgeMap(eventValue) {
  console.log('im service')
  this.studentService.setAgeMap(eventValue).subscribe(
    response => {
     const myArray = response[0].ageRange.split(" ");
     const ageList = response[0].ageRange;
     var spaceCount = (ageList.split(" ").length - 1);
     console.log(spaceCount);
     this.ageOptions =[];
     for(let i=0;i<=spaceCount;i++) {
        this.ageOptions.push({
          label: myArray[i],
          value: myArray[i]
        });
      } 
    } ,
    error => {
      //this.errorAlert =true;
   });
   //console.log('im service'+this.ageOptions)
   return this.ageOptions;
}
setYearForStaffadmin() {
  const yearArray =[];
  let currYear = new Date().getFullYear();
  let prevYear = currYear - 1;
  let nextYear = currYear + 1;
  let currYearString = prevYear+'-'+currYear;
  let nextYearString = currYear+'-'+nextYear;
  this.yearArray = [{year:currYearString}, {year:nextYearString}];
  this.staffadminYearOptions = [];
  this.staffadminYearOptions.push({
    label: "Select year",
    value: ''
  });
   
  this.yearArray.forEach(element => {
      this.staffadminYearOptions.push({
        label: element.year,
        value: element.year
      });
    })
    return this.staffadminYearOptions;
}
setAge() {
  console.log('Im serveice ageRange');
    this.ageOptions = [
      {label: "Select Age", value: ''},
      {label: '11', value: '11'},
      {label: '14', value: '14'},
      {label: '16', value: '16'},
      {label: '17', value: '17'},
      {label: '19', value: '19'}
    ];
    return this.ageOptions;
}

setFeeType() {
  this.feeType = [
    {label: "Select Type", value: ''},
    {label: 'Affilation Fee', value: '1'},
    {label: 'Participation Fee', value: '2'},
 
  ];
  return this.feeType;
}
setSchoolZone() {
  this.schoolZone = [
    {label: "Please select", value: ''},
    {label: "EAST", value: 'EAST'},
    {label: "WEST", value: 'WEST'},
    {label: "NORTH", value: 'NORTH'},
    {label: "SOUTH", value: 'SOUTH'},
  ];
  return this.schoolZone;
}
setEventZone() {
  this.eventZone = [
    {label: "EAST", value: 'EAST'},
    {label: "WEST", value: 'WEST'},
    {label: "NORTH", value: 'NORTH'},
    {label: "SOUTH", value: 'SOUTH'},
  ];
  return this.eventZone;
}
setGameType() {
  this.gameOptions = [
    {label: "Select Game", value: ''},
    {label: "Team", value: 'Team'},
    {label: "Individual", value: 'Individual'},
    {label: "Both", value: 'Both'},
  ];
  return this.gameOptions;
}
setGender() {
      this.genderOptions = [
      {label: "Select Gender", value: ''},
      {label: 'Boys', value: '1'},
      {label: 'Girls', value: '2'}
    ];
    return this.genderOptions;
}
setDateOfBirthValidation(ageRange) {
  var date = new Date();
  var newdate = new Date(date);
    let setYear;
    if (ageRange === 11) {
      setYear = newdate.getFullYear() - 11; 
      console.log('Im true'+setYear)
    } else if(ageRange === 14) {
      setYear = newdate.getFullYear() - 14; 
    }  else if(ageRange === 16) {
      setYear = newdate.getFullYear() - 16; 
    } else if(ageRange === 17) {
      setYear = newdate.getFullYear() - 17; 
    }  else if(ageRange === 19) {
      setYear = newdate.getFullYear() - 20; 
    }
    var newdate = new Date(date);
    newdate.setDate(newdate.getDate() + 1);
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
  
    if (dd === 1) {
      var dd1 = 1;
    } else {
      var dd1 = dd - (dd - 1);
    }
    if (mm === 1) {
      var mm1 = 1;
    } else {
      var mm1 = mm - (mm - 1);
    }
    
    var someFormattedDate = dd1 + '/' + mm1 + '/' + setYear;
    console.log(someFormattedDate);
    this.minDate = new Date(someFormattedDate);
    return  this.minDate
    
} 
setPhotoYear() {
  var date = new Date();
  var newdate = new Date(date);
  var month = newdate.getMonth()
  let photoPath;
  if (month >= 6) {
    photoPath = newdate.getFullYear() +"-"+ (newdate.getFullYear() + 1);
   } else {
    photoPath = (newdate.getFullYear() - 1) + "-" + newdate.getFullYear();
  } 
  this.setPhotoPath = this.serverUrl+'upload/'+photoPath;
  return this.setPhotoPath;
}
setCoachPhotoYear() {
  var date = new Date();
  var newdate = new Date(date);
  var month = newdate.getMonth()
  let photoPath;
  if (month >= 6) {
    photoPath = newdate.getFullYear() +"-"+ (newdate.getFullYear() + 1);
   } else {
    photoPath = (newdate.getFullYear() - 1) + "-" + newdate.getFullYear();
  } 
  this.setPhotoPath = this.serverUrl+'upload/'+photoPath+'/coach';
  return this.setPhotoPath;
}

setYearRange(ageRange) {
  let setMinYear;
  let setMaxYear;
  var date = new Date();
  var newdate = new Date(date);
  var month = newdate.getMonth();
  if (month >= 6) {
    if (ageRange === 11) {
      setMinYear = 10; 
      setMaxYear = 0
    } else if(ageRange === 14) {
      setMinYear = 13; 
      setMaxYear = 0
    } else if(ageRange === 16) {
      setMinYear = 15; 
      setMaxYear = 0
    } else if(ageRange === 17) {
      setMinYear = 16; 
      setMaxYear = 0
    }  else if(ageRange === 19) {
      setMinYear = 18; 
      setMaxYear = 0 
    }
  } else {
    if (ageRange === 11) {
      setMinYear = 11; 
      setMaxYear = 0
    } else if(ageRange === 14) {
      setMinYear = 14; 
      setMaxYear = 0
    } else if(ageRange === 17) {
      setMinYear = 17; 
      setMaxYear = 0
    }  else if(ageRange === 19) {
      setMinYear = 19; 
      setMaxYear = 0 
    }
 }
  this.yearRange = `${new Date().getFullYear() - setMinYear}:${new Date().getFullYear() - setMaxYear}`;
  return  this.yearRange;
}
setRank() {
  this.genderOptions = [
  {label: "Select Rank", value: ''},
  {label: '1', value: '1'},
  {label: '2', value: '2'},
  {label: '3', value: '3'}
];
return this.genderOptions;
}
getSchoolInfo(schoolId) {
  let str = 'staffadmin/userprofile/profileData/' + schoolId;
  console.log('lsff'+str);
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );


//  return this.http.get(this.serverUrl + 'staffadmin/event/eventList').pipe(
//   catchError(this.handleError)
// );


}
updateSchoolData(schoolInfo) {
  return this.http.post<any>(this.serverUrl + 'staffadmin/userprofile/updateSchoolInfo/',schoolInfo)
  .pipe(
    catchError(this.handleError)
  );
}
updateSchoolPassword(userInfo) {
  return this.http.post<any>(this.serverUrl + 'staffadmin/userprofile/updateSchoolPassword/',userInfo)
  .pipe(
    catchError(this.handleError)
  );
} 
setClass() {
      this.standardClass = [
        {label: "Please select", value: ''},
        {label: '1st', value: '1st'},
        {label: '2nd', value: '2nd'},
        {label: '3rd', value: '3rd'},
        {label: '4th', value: '4th'},
        {label: '5th', value: '5th'},
        {label: '6th', value: '6th'},
        {label: '7th', value: '7th'},
        {label: '8th', value: '8th'},
        {label: '9th', value: '9th'},
        {label: '10th', value: '10th'},
        {label: '11th', value: '11th'},
        {label: '12th', value: '12th'},
    ];
    return this.standardClass;
}
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
