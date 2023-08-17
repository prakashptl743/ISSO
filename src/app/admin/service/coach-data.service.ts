import { Injectable } from '@angular/core';
import { HttpClient,HttpEvent, HttpEventType, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { retry,map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

 @Injectable({
  providedIn: 'root'
})
export class CoachDataService {
 
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
}
 
// loadGameByEvent(eventVal){
//   let str = 'student/loadGameByEvent/' + eventVal;
//   return this.http.get(this.serverUrl + str).pipe(
//     catchError(this.handleError)
//  );
// }
upload(formData) {
  // return this.http.post(this.serverUrl + 'api/createBlog', blog)
  return this.http.post<any>(this.serverUrl + 'staffadmin/enrollment/uploadPhoto/',formData)
  .pipe(
    catchError(this.handleError)
  );

}
loadGameByEvent(eventVal){
  let str = 'student/loadGameByEventForStaff/' + eventVal;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
} 

 
loadCoachData(eventValue,schoolvalue){
  let str = 'coachData/getCoachData/' + eventValue +'/' +schoolvalue;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
saveCoachData(studentInfo) {
  return this.http.post<any>(this.serverUrl + 'coachData/saveCoachData',studentInfo)
  .pipe(
    catchError(this.handleError)
  );
}
updateCoachData (studentInfo) {
  return this.http.post<any>(this.serverUrl + 'coachData/updateCoachData',studentInfo)
  .pipe(
    catchError(this.handleError)
  );
}
 
















fileUpload(fd){
  return this.http.post<any>('http://localhost:4200/assets/images/general',fd)
  .pipe(
    catchError(this.handleError)
  );
}
loadSchoolByGame(evenId,gameId){
  let str = 'student/loadSchoolByGame/' + evenId +'/' +gameId;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
loadSubGameData(subgameid){
  let str = 'staffadmin/enrollment/getSubGameList/' + subgameid ;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
// getSubGameData(gameid, ageRange, gender){
//   let str = 'staffadmin/enrollment/getSubGames/' + gameid +'/' +ageRange +'/' +gender;
//   return this.http.get(this.serverUrl + str).pipe(
//     catchError(this.handleError)
//  );
// }

loadStudentData(studentInfo){
//   let str = 'student/loadSchoolByGame/' + evenId +'/' +gameId;
//   return this.http.get(this.serverUrl + str).pipe(
//     catchError(this.handleError)
//  );
 return this.http.post<any>(this.serverUrl + 'staffadmin/enrollment/getStudentList/',studentInfo)
 .pipe(
   catchError(this.handleError)
 );

}

 

saveStudentData(studentInfo) {
  return this.http.post<any>(this.serverUrl + 'staffadmin/enrollment/enrollStudent',studentInfo)
  .pipe(
    catchError(this.handleError)
  );
}

// updateCoachData (studentInfo) {
//   return this.http.post<any>(this.serverUrl + 'staffadmin/coach/updateCoachData',studentInfo)
//   .pipe(
//     catchError(this.handleError)
//   );
// }
deleteStudent(id: number) {
  return this.http.delete(this.serverUrl + 'staffadmin/enrollment/deleteStudent/' + id).pipe(
    catchError(this.handleError)
  );
}
deleteCoach(id: number) {
  return this.http.delete(this.serverUrl + 'staffadmin/coach/deleteCoach/' + id).pipe(
    catchError(this.handleError)
  );
}
getGameData(gameInfo) {
  return this.http.post<any>(this.serverUrl + 'staffadmin/enrollment/getGameData',gameInfo)
  .pipe(
    catchError(this.handleError)
  );


//   console.log(gameInfo);
//   let str = 'staffadmin/enrollment/getGameData/', gameInfo;
//   return this.http.get(this.serverUrl + str).pipe(
//     catchError(this.handleError)
//  );
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

// private handleError(error: HttpErrorResponse) {
//   if (error.error instanceof ErrorEvent) {
//     // A client-side or network error occurred. Handle it accordingly.
//     console.error('An error occurred:', error.error.message);
//   } else {
//     // The backend returned an unsuccessful response code.
//     // The response body may contain clues as to what went wrong,
//     console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
//   }
//   // return an observable with a user-facing error message
//   return throwError('Something bad happened. Please try again later.');
// }
  // getBlog(id: number) {
  //   return this.http.get<Blog>(this.serverUrl + 'api/adminBlog/' + id).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // createBlog(blog) {
  //   return this.http.post<any>(this.serverUrl + 'api/createBlog', blog)
  //   .pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // updateBlog(blog, id: number) {
  //   return this.http.post<any>(this.serverUrl + 'api/updateBlog/' + id, blog)
  //   .pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // deleteBlog(id: number) {
  //   return this.http.delete(this.serverUrl + 'api/deleteBlog/' + id).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError('Something bad happened. Please try again later.');
  // }
}
