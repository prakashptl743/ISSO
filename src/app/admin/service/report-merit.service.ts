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
export class ReportMeritService {
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


loadEventByYear(yearVal, meritFlag){ 
    let str = 'merit/loadEventByYear/' + yearVal +'/' +meritFlag;
    return this.http.get(this.serverUrl + str).pipe(
      catchError(this.handleError)
   );
}

loadEventByYearForReport(yearVal,reportval){ 
  let str = 'merit/loadEventByYearForReport/' + yearVal +'/' + reportval;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}

getCertificateData(){ 
  let str = 'merit/getCertificateData/';
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
getAmountData(){ 
  let str = 'merit/getAmountData/';
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
loadAllSchool() {
  let str = 'student/loadSchoolList/';
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
} 

updateCertificateData(id, employee) { 
  let str = 'merit/updateCertificateData/' + id;
  return this.http.post<any>(this.serverUrl + str, employee)
  .pipe(
    catchError(this.handleError)
  )
}
updateSgfilAmount(id, employee) { 
  let str = 'merit/updateSgfilAmount/' + id;
  return this.http.post<any>(this.serverUrl + str, employee)
  .pipe(
    catchError(this.handleError)
  )
}
saveMeritData(meritInfo) {
  return this.http.post<any>(this.serverUrl + 'merit/addMerit/',meritInfo)
  .pipe(
    catchError(this.handleError)
  );
}
updateMeritData(meritInfo) {
  return this.http.post<any>(this.serverUrl + 'merit/updateMeritData/',meritInfo)
  .pipe(
    catchError(this.handleError)
  );
}


checkDuplicateMeritData(eventValue,gameId,selectedAge,genderVal,subGameId,schoolId,studentId,rankValue) {
  // return this.http.post<any>(this.serverUrl + 'merit/checkDuplicateMeritData/',meritInfo)
  // .pipe(
  //   catchError(this.handleError)
  // );

  let apiUrl = 'merit/checkDuplicateMeritData/' + eventValue +'/' +gameId +'/' + selectedAge +'/' + genderVal+'/'+subGameId  +'/' +schoolId +'/' + studentId+'/'+rankValue;
  return this.http.get(this.serverUrl + apiUrl).pipe(
    catchError(this.handleError)
 );

}
deleteAddedMeritData(id){
    return this.http.delete(this.serverUrl + 'merit/deleteAddedMeritData/' + id).pipe(
      catchError(this.handleError)
    );
}
deleteTeamQr(eventId,schoolId,gameId,subGameVal){
  return this.http.delete(this.serverUrl + 'merit/deleteTeamQr/' + eventId  +'/' + schoolId +'/' + gameId +'/' + subGameVal).pipe(
    catchError(this.handleError)
  );
}

deleteIndividualQr(studentId){
  return this.http.delete(this.serverUrl + 'merit/deleteIndividualQr/' + studentId).pipe(
    catchError(this.handleError)
  );
}

showAlreadyMeritData(eventValue,gameId,selectedAge,genderVal,subGameId) {
  let apiUrl = 'merit/showAlreadyMeritData/' + eventValue +'/' +gameId +'/' + selectedAge +'/' + genderVal+'/'+subGameId;
  return this.http.get(this.serverUrl + apiUrl).pipe(
    catchError(this.handleError)
 );
}

loadStudentDataByEvent(eventValue,schoolvalue){
    let str = 'student/loadStudentlList/' + eventValue +'/' +schoolvalue;
    return this.http.get(this.serverUrl + str).pipe(
      catchError(this.handleError)
   );
}
loadSchoolByEvent(eventVal){
    let str = 'student/loadSchoolByEvent/' + eventVal;
    return this.http.get(this.serverUrl + str).pipe(
      catchError(this.handleError)
   );
}
loadGameByEvent(eventVal, meritFlag){
    let str = 'student/loadGameByEvent/' + eventVal +'/' +meritFlag;
    return this.http.get(this.serverUrl + str).pipe(
      catchError(this.handleError)
   );
}
checkGameCapacity(gameId){
  let str = 'student/checkGameCapacity/' + gameId;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}

checkStudentcapacity(eventVal, ageRange, gender, gameId){
  let str = 'student/checkStudentcapacity/' + eventVal +'/' +ageRange +'/'+ gender +'/' +gameId;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
checkGameCapacityForStudent(eventVal, ageRange, gender, gameId, newSchoolId) {
  let str = 'student/checkGameCapacityForStudent/' + eventVal +'/' +ageRange +'/'+ gender +'/' +gameId+'/' +newSchoolId;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
setAgeMapForMerit(eventVal,gameId){
  let str = 'student/setAgeMapForMerit/' + eventVal +'/' +gameId;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
setAgeMap(eventVal){
  let str = 'student/setAgeMap/' + eventVal;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
loadGameForStaff(eventVal) {
  let str = 'student/loadGameByEventForStaff/' + eventVal;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
loadSchoolByGameReport(evenId,gameId){
     let str = 'student/loadSchoolByGame/' + evenId +'/' +gameId;
    return this.http.get(this.serverUrl + str).pipe(
      catchError(this.handleError)
   );
}
loadSchoolForVolunteer(evenId){
  let str = 'merit/getSchoolListForVolunteer/' + evenId;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
  );
}
checkAlredayPayment(evenId,gameId){
  let str = 'student/checkAlredayPayment/' + evenId +'/' +gameId;
 return this.http.get(this.serverUrl + str).pipe(
   catchError(this.handleError)
);
}

getStudentData(eventValue,gameVal,schoolvalue) {
  let str = 'report/getStudentData/' +  eventValue +'/' +gameVal +'/' +schoolvalue;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}

checkGameType(gameId){
  let str = 'student/checkGameType/'  +gameId;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
  );
}

loadSchoolByGame(meritInfo){
  return this.http.post<any>(this.serverUrl + 'merit/schoolList/',meritInfo)
  .pipe(
    catchError(this.handleError)
  );
 
  //  let str = 'merit/schoolList/' + evenId +'/' + gameId +'/' + age +'/' +gender;
  //  return this.http.get(this.serverUrl + str).pipe(
  //    catchError(this.handleError)
  // );
}
loadIndividualCertificate(meritInfo){
  return this.http.post<any>(this.serverUrl + 'merit/individualCertificate/',meritInfo)
  .pipe(
    catchError(this.handleError)
  );
 
  //  let str = 'merit/schoolList/' + evenId +'/' + gameId +'/' + age +'/' +gender;
  //  return this.http.get(this.serverUrl + str).pipe(
  //    catchError(this.handleError)
  // );
}

saveStudentAttendance(studentInfo){
  return this.http.post<any>(this.serverUrl + 'merit/saveStudentAttendance/',studentInfo)
  .pipe(
    catchError(this.handleError)
  );
}

 

loadStudentName(meritInfo){
  return this.http.post<any>(this.serverUrl + 'merit/studentlList/',meritInfo)
  .pipe(
    catchError(this.handleError)
  );
}

loadSubgameByGame(gameId,ageRange,genderVal,meritFlag){
  let str = 'student/loadSubgameByGame/' + gameId +'/' +ageRange +'/' + genderVal  +'/' + meritFlag;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
loadCertificateData(yearVal, reportval, eventValue,gameVale,schoolvalue) {
  let str = 'report/loadCertificateData/' + yearVal + '/'+ reportval + '/' + eventValue +'/' +gameVale +'/' +schoolvalue;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
loadStaffReport(yearVal, reportval, eventValue,gameVale,schoolvalue) {
  let str = 'report/studentDataForPayment/' + yearVal + '/'+ reportval + '/' + eventValue +'/' +gameVale +'/' +schoolvalue;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 ); 
}
checkStaffMerit(eventValue,gameVale,schoolvalue) {
  let str = 'merit/checkStaffMerit/' + eventValue +'/' +gameVale +'/' +schoolvalue;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 ); 
}
checkNOsugameMerit(eventValue,gameVale,subgameId,ageRange,genderval,schoolvalue) {
  let str = 'report/checkNOsugameMerit/' + eventValue +'/' +gameVale+'/'+ subgameId +'/' +ageRange +'/' +genderval +'/' +schoolvalue;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 ); 
}
loadCoachReport(yearVal, reportval, eventValue,gameVale,schoolvalue) {
  let str = 'report/loadCoachReport/' + yearVal + '/'+ reportval + '/' + eventValue +'/' +gameVale +'/' +schoolvalue;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 ); 
}

// loadStaffReport(yearVal, reportval, eventValue,gameVale,schoolvalue) {
//   let str = 'tcpdf/advancetcpdf_example/' + yearVal + '/'+ reportval + '/' + eventValue +'/' +gameVale +'/' +schoolvalue;
//   return this.http.get(this.serverUrl + str).pipe(
//     catchError(this.handleError)
//  );
// }
 
setReport() {
  let str = 'tcpdf/advancetcpdf_example/';
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
//  return this.http.get(this.serverUrl + 'school/schoolList').pipe(
//   catchError(this.handleError)
// );
 
}
loadConsolatedData(reportval, eventValue,gameVal, ageval, genderVal) {
  let str = 'report/loadConsolatedData/' + reportval + '/' + eventValue +'/' +gameVal +'/' +ageval +'/' +genderVal;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}
gameConsolatedData(eventValue,gameVal) {
  let str = 'report/gameConsolatedData/' + eventValue + '/' + gameVal;
  return this.http.get(this.serverUrl + str).pipe(
    catchError(this.handleError)
 );
}

checkTeamEventData(yearvalue,eventValue) {
  let str = 'report/teamEventReportData/' + yearvalue + '/' + eventValue;
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
