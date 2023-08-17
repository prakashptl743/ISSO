import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
//import { School } from './school';
import { map, catchError } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  serverUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getBlogs() {
    return this.http.get<Blog>(this.serverUrl + 'api/adminBlogs').pipe(
      catchError(this.handleError)
    );
  }
  getSchoolList() {
    //  return this.http.get('https://jsonplaceholder.typicode.com/posts/1/comments');
    //    return this.http.get(this.ServerUrl + 'api/schoolList');
      console.log('hiiii====>'+this.http.get(this.serverUrl + 'api/schoolList'));
      return this.http.get(this.serverUrl + 'api/schoolList').pipe(
        catchError(this.handleError)
  );
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.serverUrl}api/login`, {username: username, password: password})
    .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          this.loginFail();
        }
      }),
      catchError(this.handleError)
    );
  }

  loginFail(){
    return true;
  }
  getMoxtraAccessToken(payload, path: string) {
    // return this.http.post<any>(path + payload)
    // .pipe(
    //   catchError(this.handleError)
    // );
    let httpHandlerService;
    return httpHandlerService.Post((path), payload);
}
  getBlog(id: number) {
    return this.http.get<Blog>(this.serverUrl + 'api/adminBlog/' + id).pipe(
      catchError(this.handleError)
    );
  }

  createBlog(blog) {
    return this.http.post<any>(this.serverUrl + 'api/createBlog', blog)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateBlog(blog, id: number) {
    return this.http.post<any>(this.serverUrl + 'api/updateBlog/' + id, blog)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteBlog(id: number) {
    return this.http.delete(this.serverUrl + 'api/deleteBlog/' + id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
