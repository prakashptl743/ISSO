import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { retry,map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { School } from './school';

 @Injectable({
  providedIn: 'root'
})
 
export class WebcalenderService {
 
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
}
 
getCalenderList() {
   return this.http.get(this.serverUrl + 'webcalender/calenderList').pipe(
        catchError(this.handleError)
  );
}
getEventByYear(selecteYear) { 
  let str = 'webcalender/getEventByYear/' + selecteYear;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
  );
}
getStudentList() {
  return this.http.get(this.serverUrl + 'student/studentlList').pipe(
       catchError(this.handleError)
 );
}
editCalenderData(id, employee) { 
  let str = 'webcalender/updateCalenderData/' + id;
  return this.http.post<any>(this.serverUrl + str, employee)
  .pipe(
  // retry(1),   
    catchError(this.handleError)
  )
}

 
saveCalenderData(schoolInfo) {
  return this.http.post<any>(this.serverUrl + 'webcalender/addNewCalender',schoolInfo)
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



 


deleteSchool(id: number) {
  return this.http.delete(this.serverUrl + 'webcalender/deleteCalender/' + id).pipe(
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
