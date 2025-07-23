import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpBackend,
} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
  providedIn: "root",
})
export class AdminStudentProfileService {
  deleteSchool(schoolId: any) {
    throw new Error("Method not implemented.");
  }

  serverUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  getSchoolData(yearvalue) {
    let str =
      "adminStudentProfile/StudentProfile/getStudentProfileData/" + yearvalue;
    return this.http
      .get(this.serverUrl + str)
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
  updateStudentDataYearWise(studentInfo) {
    return this.http
      .post<any>(
        this.serverUrl +
          "adminStudentProfile/StudentProfile/updateStudentDataYearWise/",
        studentInfo
      )
      .pipe(catchError(this.handleError));
  }
  updateGlobalStudentProfile(studentInfo) {
    return this.http
      .post<any>(
        this.serverUrl +
          "adminStudentProfile/StudentProfile/updateGlobalStudentProfile/",
        studentInfo
      )
      .pipe(catchError(this.handleError));
  }

  loadGloablStudentData(formData) {
    return this.http
      .post<any>(
        this.serverUrl +
          "adminStudentProfile/StudentProfile/loadGlobalStudentlList/",
        formData
      )
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
  getStudentYearWiseProfile(yearVal, studentUniqueId) {
    let str =
      "adminStudentProfile/StudentProfile/getStudentYearWiseProfile/" +
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
    return throwError("Something bad happened. Please try again later.");
  }
}
