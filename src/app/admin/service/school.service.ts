import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpBackend,
} from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { retry, map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { School } from "./school";

@Injectable({
  providedIn: "root",
})
export class SchoolService {
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  getSchoolList(zoneVal) {
    return this.http
      .get(this.serverUrl + "school/schoolList/" + zoneVal)
      .pipe(catchError(this.handleError));
  }
  getSchoolByZoes(zoneVal) {
    let str = "school/getSchoolByZoes/" + zoneVal;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  getRegisterSchoolList() {
    return this.http
      .get(this.serverUrl + "school/getRegisterSchoolList")
      .pipe(catchError(this.handleError));
  }
  changeApprovedStatus(id, eventData) {
    let str = "school/changeApprovedStatus/" + id;
    return this.http
      .post<any>(this.serverUrl + str, eventData)
      .pipe(catchError(this.handleError));
  }

  changeWebStatus(id, webData) {
    let str = "school/changeWebStatus/" + id;
    return this.http
      .post<any>(this.serverUrl + str, webData)
      .pipe(catchError(this.handleError));
  }

  getStudentList() {
    return this.http
      .get(this.serverUrl + "student/studentlList")
      .pipe(catchError(this.handleError));
  }
  editSchoolData(id, employee) {
    let str = "school/updateSchoolData/" + id;
    return this.http.post<any>(this.serverUrl + str, employee).pipe(
      // retry(1),
      catchError(this.handleError)
    );
  }

  saveSchoolData(schoolInfo) {
    console.log("Data in service" + JSON.stringify(schoolInfo));
    return this.http
      .post<any>(this.serverUrl + "school/addNewSchool", schoolInfo)
      .pipe(catchError(this.handleError));
  }

  saveSchoolZone(schoolId, zoneVal) {
    let str = "schoolRegistration/saveSchoolZone/" + schoolId + "/" + zoneVal;
    return this.http
      .post<any>(this.serverUrl + str, zoneVal)
      .pipe(catchError(this.handleError));
  }

  schoolRegistration(schoolInfo) {
    return this.http
      .post<any>(this.serverUrl + "schoolRegistration/addNewSchool", schoolInfo)
      .pipe(catchError(this.handleError));
  }

  uploadDoc(docInfo) {
    return this.http
      .post<any>(this.serverUrl + "schoolRegistration/uploadDoc", docInfo)
      .pipe(catchError(this.handleError));
  }
  verifyEmail(eventValue) {
    //   let apiUrl = 'schoolRegistration/verifyEmail/' + eventValue;
    //   return this.http.get(this.serverUrl + apiUrl).pipe(
    //     catchError(this.handleError)
    //  );

    return this.http
      .post<any>(`${this.serverUrl}school/verifyEmail`, { email: eventValue })
      .pipe(
        map((user) => {
          return user;
          // console.log('hiii===>'+JSON.stringify(user));
          //  if (user && user.email) {
          //    localStorage.setItem('currentUser', JSON.stringify(user));
          //    localStorage.setItem('roleId', (user.roleId));
          //    localStorage.setItem('isAffiliate', (user.isAffiliate));
          //    localStorage.setItem('schoolId', (user.schoolId));
          //    localStorage.setItem('schoolName', (user.schoolName));
          //    localStorage.setItem('isVoulnteer', (user.isVoulnteer));
          //  } else {
          //    this.loginFail();
          //  }
        }),
        catchError(this.handleError)
      );
  }

  deleteSchool(id: number) {
    return this.http
      .delete(this.serverUrl + "school/deleteSchool/" + id)
      .pipe(catchError(this.handleError));
  }
  deleteRegisteredSchool(id: number) {
    return this.http
      .delete(
        this.serverUrl + "schoolRegistration/deleteRegisteredSchool/" + id
      )
      .pipe(catchError(this.handleError));
  }
  loginFail() {
    return true;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    this.errorData = {
      errorTitle: "Oops! Request for document failed",
      errorDesc: "Something bad happened. Please try again later.",
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
