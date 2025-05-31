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
export class StudentProfileService {
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  studentRegistration(studentInfo) {
    return this.http
      .post<any>(
        this.serverUrl +
          "staffadmin/studentProfile/studentRegistration/addNewStudent",
        studentInfo
      )
      .pipe(catchError(this.handleError));
  }
  checkStudentEnroll(studentInfo) {
    return this.http
      .post<any>(
        this.serverUrl +
          "staffadmin/studentProfile/studentRegistration/checkStudentEnroll",
        studentInfo
      )
      .pipe(catchError(this.handleError));
  }

  getStudentProfileData(yearVal, schoolId) {
    let str =
      "staffadmin/studentProfile/studentProfileForStaff/getStudentProfileData/" +
      yearVal +
      "/" +
      schoolId;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }

  getStudenteDataForEnroll(gender, selectedAgeCategory, schoolId) {
    let str =
      "staffadmin/studentProfile/studentProfileForStaff/getStudenteDataForEnroll/" +
      gender +
      "/" +
      selectedAgeCategory +
      "/" +
      schoolId;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  alreadyEnrolledStudent(enrolledData, schoolId) {
    let str =
      "staffadmin/studentProfile/studentProfileForStaff/alreadyEnrolledStudent/" +
      enrolledData +
      "/" +
      schoolId;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  saveEnrolledStudentData(formData) {
    let str =
      "staffadmin/studentProfile/studentProfileForStaff/saveEnrolledStudentData/";
    return this.http
      .post<any>(this.serverUrl + str, formData)
      .pipe(catchError(this.handleError));
  }

  changeApprovalStatus(id, formData) {
    let str =
      "staffadmin/studentProfile/studentProfileForStaff/changeApprovalStatus/" +
      id;
    return this.http
      .post<any>(this.serverUrl + str, formData)
      .pipe(catchError(this.handleError));
  }
  deleteStudentData(id: number) {
    return this.http
      .delete(
        this.serverUrl +
          "staffadmin/studentProfile/studentProfileForStaff/deleteStudentData/" +
          id
      )
      .pipe(catchError(this.handleError));
  }

  deleteenrolledStudentData(id: number) {
    return this.http
      .delete(
        this.serverUrl +
          "staffadmin/studentProfile/studentProfileForStaff/deleteenrolledStudentData/" +
          id
      )
      .pipe(catchError(this.handleError));
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
      errorDesc: "Something went wrong. Please try again later.",
    };
    return throwError(this.errorData);
  }
}
