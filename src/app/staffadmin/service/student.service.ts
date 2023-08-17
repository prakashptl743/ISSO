import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { retry,map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

 @Injectable({
  providedIn: 'root'
})
export class StudentService {
 
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
}
 
getStudentList() {
   return this.http.get(this.serverUrl + 'student/studentlList').pipe(
        catchError(this.handleError)
  );
}
loadEventByYear(yearVal,schoolvalue){ 
  let str = 'staffadmin/enrollment/loadEventByYear/' + yearVal  +'/' +schoolvalue;;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
loadStudentDataByEvent(eventValue,schoolvalue ){
  let str = 'student/loadStaffadminStudentlList/' + eventValue +'/' +schoolvalue;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
loadSchoolByEvent(eventVal){
  let str = 'student/loadSchoolByEvent/' + eventVal;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
// loadGameByEvent(eventVal){
//   let str = 'student/loadGameByEvent/' + eventVal;
//   return this.http.get(this.serverUrl + str).pipe(
//     catchError(this.handleError)
//  );
// }

loadGameByEvent(eventVal, meritFlag){
  let str = 'student/loadGameByEvent/' + eventVal +'/' +meritFlag;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
loadSchoolByGame(evenId,gameId){
  let str = 'student/loadSchoolByGame/' + evenId +'/' +gameId;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
loadEventByYearForVolunteer(yearVal){ 
  let str = 'student/loadEventByYear/' + yearVal;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
saveSchoolData(schoolInfo) {
 // console.log('Data in service'+JSON.stringify(schoolInfo));
  return this.http.post<any>(this.serverUrl + 'school/addNewSchool',schoolInfo)
  .pipe(
    catchError(this.handleError)
  );

  // return this.http.post<any>(`${this.serverUrl}school/addNewSchool`, {username: username, password: password})
  // .pipe(map(user => {
  //     // if (user && user.token) {
  //     //   localStorage.setItem('currentUser', JSON.stringify(user));
  //     // } else {
  //     //   this.loginFail();
  //     // }
  //   }),
  //   catchError(this.handleError)
  // );
}

// updateEmployee(id, employee): Observable<Employee> {
//   return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
//   .pipe(
//     retry(1),
//     catchError(this.handleError)
//   )
// }

// editSchoolData(id, employee): Observable<School> {
//   return this.http.put<School>(this.serverUrl + 'school/updateSchoolData/' + id, JSON.stringify(employee), this.httpOptions)
//   .pipe(
//     retry(1),
//     catchError(this.handleError)
//   )
// }

// editSchoolData(schoolInfo,schoolID:number) {
//   return this.http.post<any>(this.serverUrl + 'school/updateSchoolData',{schoolID,schoolInfo,} )
//   .pipe(
//     catchError(this.handleError)
//   );

  // return this.http.post<any>(`${this.serverUrl}school/addNewSchool`, {username: username, password: password})
  // .pipe(map(user => {
  //     // if (user && user.token) {
  //     //   localStorage.setItem('currentUser', JSON.stringify(user));
  //     // } else {
  //     //   this.loginFail();
  //     // }
  //   }),
  //   catchError(this.handleError)
  // );
//}



deleteSchool(id: number) {
  return this.http.delete(this.serverUrl + 'school/deleteSchool/' + id).pipe(
    catchError(this.handleError)
  );
}

loginFail(){
  return true;
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
  this.errorData = {
    errorTitle: 'Oops! Request for document failed',
    errorDesc: 'Something bad happened. Please try again later.'
  };
  return throwError(this.errorData);
}
 
}
