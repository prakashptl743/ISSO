import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpBackend } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
 import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class PaymentInvoiceService {
  deleteSchool(schoolId: any) {
    throw new Error("Method not implemented.");
  }

  serverUrl = environment.baseUrl;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
}

getPaymentData(feeType,yearVal){ 
  let str = 'paymentInvoice/getPaymentData/' + feeType +'/'+ yearVal;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
getPaymentDataMonthWise(monthVal){ 
  let str = 'paymentInvoice/getPaymentDataMonthWise/' + monthVal +'/';
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}

public exportAsExcelFile(json: any[], excelFileName: string): void {
    
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}

private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
  }); 
  FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
}
 

getSchoolList(evenId){
  let str = 'paymentInvoice/getSchoolList/' + evenId;
 return this.http.get(this.serverUrl + str).pipe(
   catchError(this.handleError)
);
} 
downloadInvoicePdf(yearVal,reportval,schoolID){ 
  let str = 'paymentInvoice/downloadInvoice/' + yearVal +'/' + reportval+'/' + schoolID;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
downloadReceiptPdf(yearVal,reportval,schoolID){ 
  let str = 'paymentInvoice/downloadReceipt/' + yearVal +'/' + reportval+'/' + schoolID;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
saveStudentAttendance(studentInfo){
  return this.http.post<any>(this.serverUrl + 'paymentInvoice/saveAttendance/',studentInfo)
  .pipe(
    catchError(this.handleError)
  );
}

getStudentData(evenId,gameId,gameType){
  let str = 'payment/getStudentData/' + evenId +'/' +gameId +'/' +gameType;
 return this.http.get(this.serverUrl + str).pipe(
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
