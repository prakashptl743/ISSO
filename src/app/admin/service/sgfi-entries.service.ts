import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { retry,map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

 @Injectable({
  providedIn: 'root'
})

export class SgfiEntriesService {
 
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }
 
getRootGameList(){
  return this.http.get(this.serverUrl + 'SgfiEntries/gameList').pipe(
    catchError(this.handleError)
  );
}
 
getSubGameList(gameId){
  let str = 'SgfiEntries/subGameListById/' + gameId;
  return this.http.get(this.serverUrl + str).pipe(
   catchError(this.handleError));
}
loadSchoolByGame(gameData){
  return this.http.post<any>(this.serverUrl + 'SgfiEntries/schoolList/',gameData)
  .pipe(
    catchError(this.handleError)
  );
}
loadStudentData(studentData){
  return this.http.post<any>(this.serverUrl + 'SgfiEntries/studentlList/',studentData)
  .pipe(
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
