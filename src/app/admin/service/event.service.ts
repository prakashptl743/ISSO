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

@Injectable({
  providedIn: "root",
})
export class EventService {
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

  getEventlList() {
    return this.http
      .get(this.serverUrl + "event/eventList")
      .pipe(catchError(this.handleError));
  }
  getEventByYear(selecteYear) {
    let str = "event/getEventByYear/" + selecteYear;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  getActiveEventData(selecteYear) {
    let str = "Makeeventactive/getActiveEvent/" + selecteYear;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  getGamelList() {
    return this.http
      .get(this.serverUrl + "event/gameList")
      .pipe(catchError(this.handleError));
  }
  editEventData(id, eventData) {
    let str = "event/updateEventData/" + id;
    return this.http
      .post<any>(this.serverUrl + str, eventData)
      .pipe(catchError(this.handleError));
  }
  changeEventStatus(id, eventData) {
    let str = "event/changeEventStatus/" + id;
    return this.http
      .post<any>(this.serverUrl + str, eventData)
      .pipe(catchError(this.handleError));
  }
  changeReportStatus(id, eventData) {
    let str = "event/changeReportStatus/" + id;
    return this.http
      .post<any>(this.serverUrl + str, eventData)
      .pipe(catchError(this.handleError));
  }
  changeActiveEventStatus(id, eventData) {
    let str = "Makeeventactive/changeActiveEventStatus/" + id;
    return this.http
      .post<any>(this.serverUrl + str, eventData)
      .pipe(catchError(this.handleError));
  }
  deleteEventStatus(eventData) {
    let str = "Makeeventactive/deleteEventStatus/" + eventData;
    return this.http
      .post<any>(this.serverUrl + str, eventData)
      .pipe(catchError(this.handleError));
  }
  editUpcomingEventData(id, employee) {
    let str = "event/updateUpcomingEventData/" + id;
    return this.http
      .post<any>(this.serverUrl + str, employee)
      .pipe(catchError(this.handleError));
  }
  getUpcomingEventlList() {
    return this.http
      .get(this.serverUrl + "event/upcomingeventList")
      .pipe(catchError(this.handleError));
  }

  saveEventData(Blog) {
    return this.http
      .post<any>(this.serverUrl + "event/addNewEvent", Blog)
      .pipe(catchError(this.handleError));
  }
  makeActiveEvent(eventData) {
    return this.http
      .post<any>(this.serverUrl + "Makeeventactive/makeActiveEvent", eventData)
      .pipe(catchError(this.handleError));
  }
  saveUpcomingEventData(Blog) {
    return this.http
      .post<any>(this.serverUrl + "event/addUpcomingEvent", Blog)
      .pipe(catchError(this.handleError));
  }
  deleteEvent(id: number) {
    return this.http
      .delete(this.serverUrl + "event/deleteEvent/" + id)
      .pipe(catchError(this.handleError));
  }

  deleteUpcomingEvent(id: number) {
    return this.http
      .delete(this.serverUrl + "event/deleteUpcomingEvent/" + id)
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
