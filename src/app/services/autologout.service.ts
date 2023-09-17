import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
//import { School } from './school';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router'
const MINUTES_UNITL_AUTO_LOGOUT = 10 // in mins
const CHECK_INTERVAL = 5000 // in ms
const STORE_KEY =  'lastAction';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  val: any;
  public getLastAction() {
     return parseInt(localStorage.getItem(STORE_KEY));
   }
  public setLastAction(lastAction: number) {
     localStorage.setItem(STORE_KEY, lastAction.toString());
   }
 
   constructor(private router: Router) {
     this.check();
     this.initListener();
     this.initInterval();
     localStorage.setItem(STORE_KEY,Date.now().toString());
   }
 
   initListener() {
     document.body.addEventListener('clicvcvck', () => this.reset());
     document.body.addEventListener('mouseover',()=> this.reset());
     document.body.addEventListener('mouseout',() => this.reset());
     document.body.addEventListener('keydown',() => this.reset());
     document.body.addEventListener('keyup',() => this.reset());
     document.body.addEventListener('keypress',() => this.reset());
      window.addEventListener("storage",() => this.storageEvt());
 
   }
 
   reset() {
 
     //console.log('date got by using events',Date.now());
     this.setLastAction(Date.now());
     //console.log('store key',localStorage.getItem(STORE_KEY));
 
   }
 
   initInterval() {
     setInterval(() => {
       this.check();
     }, CHECK_INTERVAL);
   }
 
   check() {
     const now = Date.now();
     const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
     //console.log('HEllo-->',timeleft)
     const diff = timeleft - now;
     //console.log('difference',diff)
     const isTimeout = diff < 0;
 
     if (isTimeout)  {
       localStorage.clear();
       this.router.navigate(['./login']);
     }
   }
   storageEvt(){
   //console.log("storage");
   this.val = localStorage.getItem(STORE_KEY);
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
