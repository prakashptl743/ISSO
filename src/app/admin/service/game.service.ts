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
export class GameService {
  serverUrl = environment.baseUrl;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  getGameList() {
    return this.http
      .get(this.serverUrl + "game/gameList")
      .pipe(catchError(this.handleError));
  }

  getGamesByType(gameId) {
    let str = "game/getGamesByType/" + gameId;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  getSubGameList() {
    return this.http
      .get(this.serverUrl + "game/subGameList")
      .pipe(catchError(this.handleError));
  }

  subGameListById(gameId) {
    let str = "game/subGameListById/" + gameId;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }

  getRootGameList() {
    return this.http
      .get(this.serverUrl + "game/rootGameList")
      .pipe(catchError(this.handleError));
  }
  getEventData() {
    return this.http
      .get(this.serverUrl + "game/getEventData")
      .pipe(catchError(this.handleError));
  }
  // getMappedEventData() {
  //   return this.http.get(this.serverUrl + 'game/getMappedEventData').pipe(
  //        catchError(this.handleError)
  //  );
  // }
  getMappedEventData(selecteYear) {
    let str = "game/getMappedEventData/" + selecteYear;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }

  saveGameData(gameInfo) {
    return this.http
      .post<any>(this.serverUrl + "game/addNewGame", gameInfo)
      .pipe(catchError(this.handleError));
  }
  saveGameMapData(gameInfo) {
    return this.http
      .post<any>(this.serverUrl + "game/addGameMap", gameInfo)
      .pipe(catchError(this.handleError));
  }

  saveSubGameData(gameInfo) {
    return this.http
      .post<any>(this.serverUrl + "game/addNewSubGame", gameInfo)
      .pipe(catchError(this.handleError));
  }
  editGame(id) {
    let str = "game/editGame/" + id;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }
  editSubGame(id) {
    let str = "game/editSubGame/" + id;
    return this.http
      .get(this.serverUrl + str)
      .pipe(catchError(this.handleError));
  }

  editGameData(id, gameData) {
    let str = "game/updateGameData/" + id;
    return this.http.post<any>(this.serverUrl + str, gameData).pipe(
      // retry(1),
      catchError(this.handleError)
    );
  }
  editSubGameData(id, subGameData) {
    let str = "game/updateSubGameData/" + id;
    return this.http.post<any>(this.serverUrl + str, subGameData).pipe(
      // retry(1),
      catchError(this.handleError)
    );
  }

  deleteGame(id: number) {
    return this.http
      .delete(this.serverUrl + "game/deleteGame/" + id)
      .pipe(catchError(this.handleError));
  }
  chekDuplicateGame(gameInfo) {
    return this.http
      .post<any>(this.serverUrl + "game/chekDuplicateGame", gameInfo)
      .pipe(catchError(this.handleError));
  }

  deleteMapEventData(id: number) {
    return this.http
      .delete(this.serverUrl + "game/deletMappedeGame/" + id)
      .pipe(catchError(this.handleError));
  }

  deleteSubGame(id: number) {
    return this.http
      .delete(this.serverUrl + "game/deleteSubGame/" + id)
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
