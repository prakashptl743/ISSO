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

@Injectable({
  providedIn: "root",
})
export class SgfiEntriesService {
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  getRootGameList() {
    return this.http
      .get(this.serverUrl + "SgfiEntries/gameList")
      .pipe(catchError(this.handleError));
  }
  getGameForStaff(schoolId) {
    return this.http
      .get(this.serverUrl + "staffadmin/SgfiEntries/gameList/" + schoolId)
      .pipe(catchError(this.handleError));
  }
  getSgfiAmount() {
    return this.http
      .get(this.serverUrl + "staffadmin/SgfiEntries/getSgfiAmount/")
      .pipe(catchError(this.handleError));
  }
  savePaymentData(studentInfo) {
    return this.http
      .post<any>(
        this.serverUrl + "staffadmin/SgfiEntries/savePaymentData",
        studentInfo
      )
      .pipe(catchError(this.handleError));
  }
  enrollStudent(userData) {
    return this.http
      .post<any>(
        this.serverUrl + "staffadmin/SgfiEntries/enrollStudent",
        userData
      )
      .pipe(catchError(this.handleError));
  }
  enrollStudentFile(fileData) {
    return this.http
      .post<any>(
        this.serverUrl + "staffadmin/SgfiEntries/enrollStudentFile",
        fileData
      )
      .pipe(catchError(this.handleError));
  }
  editEnrollStudentFile(fileData) {
    return this.http
      .post<any>(
        this.serverUrl + "staffadmin/SgfiEntries/editEnrollStudentFile",
        fileData
      )
      .pipe(catchError(this.handleError));
  }

  getStudentForStaff(schoolId, gameId) {
    return this.http
      .get(
        this.serverUrl +
          "staffadmin/SgfiEntries/studentlListForStaff/" +
          schoolId +
          "/" +
          gameId
      )
      .pipe(catchError(this.handleError));
  }
  getStudentDocStaff(studentId) {
    return this.http
      .get(
        this.serverUrl +
          "staffadmin/SgfiEntries/getStudentDocStaff/" +
          studentId
      )
      .pipe(catchError(this.handleError));
  }

  getEnrolledStudentDataForStaff(schoolId, gameId) {
    return this.http
      .get(
        this.serverUrl +
          "staffadmin/SgfiEntries/getEnrolledStudentDataForStaff/" +
          schoolId +
          "/" +
          gameId
      )
      .pipe(catchError(this.handleError));
  }
  getSubGameList(gameId) {
    let str = "SgfiEntries/subGameListById/" + gameId;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  loadSchoolByGame(gameData) {
    return this.http
      .post<any>(this.serverUrl + "SgfiEntries/schoolList/", gameData)
      .pipe(catchError(this.handleError));
  }
  getEnrolledStudentData(gameData) {
    return this.http
      .post<any>(
        this.serverUrl + "SgfiEntries/getEnrolledStudentData/",
        gameData
      )
      .pipe(catchError(this.handleError));
  }
  changeIssoStatus(id, eventData) {
    let str = "SgfiEntries/changeIssoStatus/" + id;
    return this.http
      .post<any>(this.serverUrl + str, eventData)
      .pipe(catchError(this.handleError));
  }
  getPaymentSheetData(yearVal, gameVal) {
    let str = "SgfiEntries/getPaymentSheetData/" + yearVal + "/" + gameVal;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  loadStudentData(studentData) {
    return this.http
      .post<any>(this.serverUrl + "SgfiEntries/studentlList/", studentData)
      .pipe(catchError(this.handleError));
  }
  saveSgfiStudentData(meritInfo) {
    return this.http
      .post<any>(this.serverUrl + "SgfiEntries/saveSgfiStudentData/", meritInfo)
      .pipe(catchError(this.handleError));
  }
  deleteStudent(id: number) {
    return this.http
      .delete(this.serverUrl + "SgfiEntries/deleteStudent/" + id)
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
      errorDesc: "Something bad happened. Please try again later.",
    };
    return throwError(this.errorData);
  }
}
