import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpBackend,
} from "@angular/common/http";
import { of, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { retry, map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { School } from "./school";
import { Student } from "../../auth/models/student.model";
import { Subgame } from "../../auth/models/subgame.model";
import { Assignment } from "../../auth/models/assignment.model";
@Injectable({
  providedIn: "root",
})
export class StudentProfileService {
  private students: Student[] = [
    { id: 1, name: "Alice Smith" },
    { id: 2, name: "Bob Johnson" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "Diana Prince" },
    { id: 5, name: "Eve Adams" },
    { id: 6, name: "Frank White" },
    { id: 7, name: "Grace Lee" },
    { id: 8, name: "Henry King" },
    { id: 9, name: "Ivy Green" },
    { id: 10, name: "Jack Taylor" },
  ];
  private subgames: Subgame[] = [
    { id: 101, name: "50M Freestyle", minCapacity: 2, assignedCount: 0 },
    { id: 102, name: "100M Freestyle", minCapacity: 3, assignedCount: 0 },
    { id: 103, name: "800M Butterfly", minCapacity: 1, assignedCount: 0 },
    { id: 104, name: "200M IND Relay", minCapacity: 4, assignedCount: 0 },
  ];
  private savedAssignments: Assignment[] = [];

  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
    this.loadInitialAssignments();
  }
  private loadInitialAssignments() {
    // Example: Simulate some assignments from yesterday
    // In a real app, you'd fetch this from your backend
    this.savedAssignments = [
      { studentId: 1, subgameId: 101, assignmentDate: new Date() }, // Alice in 50M
      { studentId: 2, subgameId: 101, assignmentDate: new Date() }, // Bob in 50M
      { studentId: 3, subgameId: 102, assignmentDate: new Date() }, // Charlie in 100M
      { studentId: 4, subgameId: 102, assignmentDate: new Date() }, // Diana in 100M
      { studentId: 5, subgameId: 104, assignmentDate: new Date() }, // Eve in Relay
    ];
    console.log(
      "Initial (Yesterday's) assignments loaded:",
      this.savedAssignments
    );
  }

  getStudents(): Observable<Student[]> {
    return of(this.students);
  }

  getSubgames(): Observable<Subgame[]> {
    // Return a deep copy to prevent direct modification outside the service
    return of(JSON.parse(JSON.stringify(this.subgames)));
  }

  // Simulate fetching previously saved assignments
  getPreviousAssignments(): Observable<Assignment[]> {
    return of(JSON.parse(JSON.stringify(this.savedAssignments)));
  }

  // Simulate saving current assignments to DB
  saveAssignments(assignments: Assignment[]): Observable<boolean> {
    console.log('Saving assignments to "DB":', assignments);
    this.savedAssignments = JSON.parse(JSON.stringify(assignments)); // Deep copy
    // In a real app, this would be an HTTP POST/PUT request
    return of(true); // Simulate success
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
  sendInfoToOtp(studentInfo) {
    return this.http
      .post<any>(
        this.serverUrl +
          "staffadmin/studentProfile/studentRegistration/sendInfoToOtp",
        studentInfo,
        { withCredentials: true }
      )
      .pipe(catchError(this.handleError));
  }
  verifyOtp(studentInfo) {
    return this.http
      .post<any>(
        this.serverUrl +
          "staffadmin/studentProfile/studentRegistration/verifyOtp",
        studentInfo,
        { withCredentials: true }
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
  updateStudentSubgame(id, formData) {
    let str =
      "staffadmin/studentProfile/studentProfileForStaff/updateStudentSubgame/" +
      id;
    return this.http
      .post<any>(this.serverUrl + str, formData)
      .pipe(catchError(this.handleError));
  }
  updateStudentExtraInfo(formData) {
    let str =
      "staffadmin/studentProfile/studentProfileForStaff/updateStudentExtraInfo/";
    return this.http
      .post<any>(this.serverUrl + str, formData)
      .pipe(catchError(this.handleError));
  }
  checkMobileNumber(formData) {
    let str =
      "staffadmin/studentProfile/studentRegistration/checkMobileNumber/";
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

  deleteenrolledStudentData(id: number, extraTabRequired) {
    return this.http
      .delete(
        this.serverUrl +
          "staffadmin/studentProfile/studentProfileForStaff/deleteenrolledStudentData/" +
          id +
          "/" +
          extraTabRequired
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
