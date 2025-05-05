import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpBackend,
} from "@angular/common/http";
import { throwError } from "rxjs";
// import { Blog } from '../../models/blog';
import { environment } from "../../../environments/environment";
import { retry, map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { Student } from "./school";
export interface Customer {
  sId: number;
  studentName: string;
  fatherName: string;
  dateOfBirth: string;
  standardClass: string;
  ageRange: string;
  aadharNumber: string;
  gameId: number;
  gameName: string;
  subgameId: number;
  subGameName: string;
  eventName: string;
  schoolName: string;
  createdDate: string;
  photo: string;
}
@Injectable({
  providedIn: "root",
})
export class StudentService {
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  getStudentList() {
    return this.http
      .get(this.serverUrl + "student/studentlList")
      .pipe(catchError(this.handleError));
  }
  loadEventByYear(yearVal) {
    let str = "student/loadEventByYear/" + yearVal;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  subGameListById(gameId) {
    let str = "game/subGameListById/" + gameId;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  loadGloballySchool(yearVal) {
    let str = "student/loadGloballySchool/" + yearVal;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  getCustomersLarge(eventValue, schoolvalue) {
    //let str =this.serverUrl+'student/loadStudentlList/' + 5 +'/' +45;
    let str =
      this.serverUrl +
      "student/loadStudentlList/" +
      eventValue +
      "/" +
      schoolvalue;

    return this.http
      .get<any>(str)
      .toPromise()
      .then((res) => <Customer[]>res);
    // .then(data => { return data; });
  }
  loadStudentDataByEvent(eventValue, schoolvalue) {
    let str = "student/loadStudentlList/" + eventValue + "/" + schoolvalue;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  loadGloablStudentData(formData) {
    //   let str = 'student/loadGlobalStudentlList/' +formData;
    //   return this.http.get(this.serverUrl + str).pipe(
    //     catchError(this.handleError)
    //  );

    return this.http
      .post<any>(this.serverUrl + "student/loadGlobalStudentlList/", formData)
      .pipe(catchError(this.handleError));
  }

  loadSchoolByEvent(eventVal) {
    let str = "student/loadSchoolByEvent/" + eventVal;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  setAgeMap(eventVal) {
    let str = "student/setAgeMap/" + eventVal;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  // loadGameByEvent(eventVal){
  //   let str = 'student/loadGameByEvent/' + eventVal;
  //   return this.http.get(this.serverUrl + str).pipe(
  //     catchError(this.handleError)
  //  );
  // }
  loadGameByEvent(eventVal, meritFlag) {
    let str = "student/loadGameByEvent/" + eventVal + "/" + meritFlag;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }

  loadSchoolByGame(evenId, gameId) {
    let str = "student/loadSchoolByGame/" + evenId + "/" + gameId;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }

  loadAllSchool() {
    let str = "student/loadSchoolList/";
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }

  saveStudentData(studentInfo) {
    return this.http
      .post<any>(this.serverUrl + "student/addNewStudent/", studentInfo)
      .pipe(catchError(this.handleError));
  }
  updateStudentData(studentInfo) {
    return this.http
      .post<any>(this.serverUrl + "student/updateStudent", studentInfo)
      .pipe(catchError(this.handleError));
  }

  deleteSchool(id: number) {
    return this.http
      .delete(this.serverUrl + "school/deleteSchool/" + id)
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
