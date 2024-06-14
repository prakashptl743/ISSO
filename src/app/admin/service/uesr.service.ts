import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { retry,map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

 @Injectable({
  providedIn: 'root'
})

export class UserService {
 
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }
 
getMenuData(userType) {
   return this.http.get(this.serverUrl + 'user/getMenuData/'+userType).pipe(
        catchError(this.handleError)
  );
}
 
getUserData(userType) {
  return this.http.get(this.serverUrl + 'user/getUserData/'+userType).pipe(
       catchError(this.handleError)
 );
}

getIssoUsers() {
  return this.http.get(this.serverUrl + 'user/getIssoUsers/').pipe(
       catchError(this.handleError)
 );
}
editUserData(id, userData) { 
  let str = 'user/editUserData/' + id;
  return this.http.post<any>(this.serverUrl + str, userData)
  .pipe(
    catchError(this.handleError)
  )
}
deleteUser(id: number) {
  return this.http.delete(this.serverUrl + 'user/deleteUser/' + id).pipe(
    catchError(this.handleError)
  );
}
changeMenuStatus(id, menuData) { 
  let str = 'user/changeMenuStatus/' + id;
  return this.http.post<any>(this.serverUrl + str, menuData)
  .pipe(
    catchError(this.handleError)
  )
}
changeUserStatus(id, menuData) { 
  let str = 'user/changeUserStatus/' + id;
  return this.http.post<any>(this.serverUrl + str, menuData)
  .pipe(
    catchError(this.handleError)
  )
}
saveUserData(userData) { 
  return this.http.post<any>(this.serverUrl + 'user/addNewUser',userData)
  .pipe(
    catchError(this.handleError)
  );
}
changePassword(userData) { 
  return this.http.post<any>(this.serverUrl + 'user/changePassword',userData)
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
