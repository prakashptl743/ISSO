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
export class ParentDashboardService {
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  getStudentDetails(studentId, schoolId) {
    let str =
      "staffadmin/studentProfile/parentDashboard/getStudentDetails/" +
      studentId +
      "/" +
      schoolId;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  studentDataUpdate(studentInfo) {
    return this.http
      .post<any>(
        this.serverUrl +
          "adminStudentProfile/StudentProfile/updateStudentProfileData/",
        studentInfo
      )
      .pipe(catchError(this.handleError));
  }
  updatePaymentStatus(formData) {
    let str = "staffadmin/studentProfile/parentDashboard/updatePaymentStatus/";
    return this.http
      .post<any>(this.serverUrl + str, formData)
      .pipe(catchError(this.handleError));
  }

  copyStudentData(id, gameId, eventId, ageRange, gender) {
    let test = "";
    let str =
      "staffadmin/studentProfile/parentDashboard/copyStudentData/" +
      id +
      "/" +
      gameId +
      "/" +
      eventId +
      "/" +
      ageRange +
      "/" +
      gender;
    return this.http
      .post<any>(this.serverUrl + str, test)
      .pipe(catchError(this.handleError));
  }
  getStudentDataForCertificate(yearVal, studentUniqueId) {
    let str =
      "staffadmin/studentProfile/parentDashboard/getStudentDataForCertificate/" +
      yearVal +
      "/" +
      studentUniqueId;

    return this.http
      .get(this.serverUrl + str)
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
