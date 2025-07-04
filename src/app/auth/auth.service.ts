import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  // private router = ActivatedRoute;
  serverUrl = environment.baseUrl;
  errorData: {};
  clearTimeout: any;
  constructor(private http: HttpClient, private router: Router) {}

  redirectUrl: string;

  login(username: string, password: string) {
    return this.http
      .post<any>(`${this.serverUrl}api/login`, {
        username: username,
        password: password,
      })
      .pipe(
        map((user) => {
          console.log("hiii===>" + JSON.stringify(user));
          if (user && user.email) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            localStorage.setItem("roleId", user.roleId);
            localStorage.setItem("userId", user.userId);
            localStorage.setItem("isAffiliate", user.isAffiliate);
            localStorage.setItem("schoolId", user.schoolId);
            localStorage.setItem("schoolName", user.schoolName);
            localStorage.setItem("isVoulnteer", user.isVoulnteer);
            localStorage.setItem("schoolZone", user.schoolZone);
            const adminredirect = "/admin/dashboard";
            const staffadminRedirect = "/staffadmin/event-dashboard";
            if (user.roleId === "1" || user.roleId === "3") {
              this.router.navigate([adminredirect]);
            } else {
              this.router.navigate([staffadminRedirect]);
            }

            // this.autoLogout(10);
          } else {
            this.loginFail();
          }
        }),
        catchError(this.handleError)
      );
  }
  autoLogout(expirationDate: number) {
    // setTimeout(() => {
    //    console.log('Im settimeout');
    // },100);
    // let x = 1,

    // setInterval(() =>
    //  x= x+1;
    //  console.log('Im interval'),

    // 1000);
    let x = 1;
    setInterval(() => {
      console.log("Im interval");
      x = x + 1;
      if (x == 10) {
        console.log("Im x val--->" + x);
        this.logout();
      }
    }, 1000);

    // console.log('Hello--->'+expirationDate);
    // this.clearTimeout = setTimeout(() => {
    //   this.logout();
    // }, expirationDate);
  }
  loginFail() {
    return true;
  }
  isLoggedIn() {
    if (localStorage.getItem("roleId")) {
      return true;
    }
    return false;
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser.token;
  }

  logout() {
    console.log("Im logout");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("roleId");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("roleId");
    // localStorage.removeItem('userId');
    localStorage.removeItem("isAffiliate");
    localStorage.removeItem("schoolId");
    localStorage.removeItem("schoolName");
    localStorage.removeItem("isVoulnteer");
    localStorage.removeItem("schoolZone");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("dateDiff");
    localStorage.removeItem("eventId");
    localStorage.removeItem("eventYear");

    // localStorage.clear();
    // this.router.navigate(['/','login']);
    // this.router.navigate(['/user_invitation'],
  }
  getCertificateData(eventId, gameId, schoolId, studentId, subGameId, rank) {
    //   let apiUrl = 'generateqr/getCertificateData/' + yearVal +'/' +eventId +'/' + gameId +'/' + schoolId;
    //   return this.http.get(this.serverUrl + apiUrl).pipe(
    //     catchError(this.handleError)
    //  );
    return this.http
      .get(
        this.serverUrl +
          "generateqr/getCertificateData/" +
          eventId +
          "/" +
          gameId +
          "/" +
          schoolId +
          "/" +
          studentId +
          "/" +
          subGameId +
          "/" +
          rank
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
      errorDesc: "Something bad happened. Please try again later.",
    };
    return throwError(this.errorData);
  }
}
