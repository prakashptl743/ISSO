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
 
export class IfsSchoolService {
 
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
}
getIfsSchoolAmount() {
  return this.http.get(this.serverUrl + 'IfsSchool/getIfsSchoolAmount/').pipe(
    catchError(this.handleError)
  );
} 
uploadDoc(docInfo) {
  return this.http.post<any>(this.serverUrl + 'IfsSchool/uploadDoc',docInfo)
  .pipe(
    catchError(this.handleError)
  );
}
verifyMobNo(eventValue) {
  return this.http.post<any>(`${this.serverUrl}IfsSchool/verifyMobNo`, {mobNo: eventValue})
   .pipe(map(user => {
    return user; 
    }),
     catchError(this.handleError)
  );
}
checkRegisteredMobNo(eventValue) {
  return this.http.post<any>(`${this.serverUrl}IfsSchool/checkRegisteredMobNo`, {mobNo: eventValue})
   .pipe(map(user => {
    return user; 
    }),
     catchError(this.handleError)
  );
}
savePaymentData(paymentInfo) {
  return this.http.post<any>(this.serverUrl + 'IfsSchool/savePaymentData',paymentInfo)
  .pipe(
    catchError(this.handleError)
  );
}
getSchoolData() {
  return this.http.get(this.serverUrl + 'IfsSchool/getIfsSchoolData').pipe(
    catchError(this.handleError)
 );
 
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
