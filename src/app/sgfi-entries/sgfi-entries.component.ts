 import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { SelectItem } from 'primeng/api';
 
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Rx';
import { IssoUtilService } from '../services/isso-util.service';
import { ReportMeritService } from '../admin/service/report-merit.service';
import { DatePipe } from '@angular/common';
import { SgfiEntriesService } from '../admin/service/sgfi-entries.service';
// import * as jspdf from 'jspdf';
// import * as html2canvas from 'html2canvas';
 
@Component({
  selector: 'app-sgfi-entries',
  templateUrl: './sgfi-entries.component.html',
  styleUrls: ['./sgfi-entries.component.css']
})
export class SgfiEntriesComponent implements OnInit {
  isAddMStudent: boolean;
  isViewStudent: boolean;
  yearOptions: SelectItem[];
  gameOptions: SelectItem[];
  ageOptions: SelectItem[];
  genderOptions: SelectItem[];
  subgameOptions: SelectItem[];
  schoolOptions: SelectItem[];
  gameArray =[];
  getSchoolList =[];
  subGameIdArray =[];
  studentDataArray =[];
  gameServiceDATA:any;
  rootGameServicData: any;
  subGameServicData: any;
  rootGameData: any;
  subGameData: any;
  yearvalue: any;
  selectedGame:string;
  gameReadble: boolean;
  gameId: any;
  gameName: any;
  gameType: any;
  ageReadble: boolean;
  selectedAge: string;
  genderReadble: boolean;
  selectedGender: string;
  selectedSchool:string;
  genderVal: any;
  schoolReadble: boolean;
  selectedSubGame: string;
  subGameReadable: boolean;
  subgameArray=[];
  subGameId: any;
  subGameName: any;
  subGameType: any;
  schoolList: any;
  subGameVal: any;
  isShowStudent: boolean;
  studentData: any;


  constructor( 
    private confirmation: ConfirmationService,
    private issoUtilService: IssoUtilService,
    private sgfiEntriesService :SgfiEntriesService,
    private messageService: MessageService,
    public datepipe: DatePipe,
    private meritService: ReportMeritService) {
     
    }

  ngOnInit() {
    this.isAddMStudent = true;
    this.loadInitialData();
    this.loadGame();
  }
  onloadMenu(index) {
    if(index == '0'){
      this.isAddMStudent = true;
      this.isViewStudent =false;
    } else  {
      this.isViewStudent = true;
      this.isAddMStudent = false;
    } 
  }
  loadInitialData() {
    this.yearOptions = this.issoUtilService.setYear();
    this.ageOptions = this.issoUtilService.setAge();
    this.genderOptions =this.issoUtilService.setGender();
  }
  loadGame(){
    this.sgfiEntriesService.getRootGameList().subscribe(response => {
      if(response!=="") {
        this.rootGameServicData =response;
        this.rootGameData = this.rootGameServicData;
        this.gameOptions = []; 
        this.gameOptions.push({
          label:"Please select",
          value: ''
        });
        this.rootGameData.forEach(element => {
          const gameIdAndName = element.gameId +','+ element.gameName +','+ element.gameType;
          this.gameOptions.push({
            label: element.gameName,
            value: gameIdAndName
          });

        })
      } else {
        alert('im blankl=')
      }
    } ,
   error => {
     //this.errorAlert =true;
    });
  }
  loadGameChange(gameData) {
    const gameval = gameData.value;
    this.gameArray =  gameval.split(","); 
    this.gameId = this.gameArray[0];
    this.gameName =  this.gameArray[1];
    this.gameType =  this.gameArray[2];
    this.selectedAge ='';
    this.selectedGender ='';
    this.selectedSubGame = '';
    this.selectedSchool = '';
    this.subGameReadable = false;
    this.ageReadble = false;
    this.genderReadble = false;
    this.schoolReadble = false;
    this.isShowStudent = false;
    if(gameData.value!='') {
      if(this.gameType == 'Both') {
        this.ageReadble = false;
        this.loadSubGameData();
      } else {
        this.ageReadble = true; 
        this.selectedSubGame = '';
        this.subGameReadable = false;
      }
     
    } else {
      this.selectedAge = '';
      this.selectedSchool = '';
      this.selectedGender = '';
      this.selectedSubGame = '';
      this.ageReadble = false;
      this.genderReadble = false;
      this.subGameReadable = false;
       this.schoolReadble = false;
    }
  }
  loadSubGameData() {
    this.sgfiEntriesService.getSubGameList(this.gameId).subscribe(response => {
      if(response!=="") {
        this.subGameServicData = response;
        this.subGameData = this.subGameServicData;
        this.subgameOptions = []; 
        this.subGameData.forEach(element => {
          const gameIdAndName = element.id +','+ element.subGameName +','+ element.gameType;
          this.subgameOptions.push({
            label: element.subGameName,
            value: gameIdAndName
          });

        })
        this.subGameReadable = true;
      } else {
        alert('im blankl=')
      }
    } ,
   error => {
     //this.errorAlert =true;
    });
  }
  onyeareChange(event) {
    this.yearvalue = event.value;
    this.selectedGame ='';
    this.selectedAge = '';
    this.selectedSchool = '';
    this.selectedGender = '';
    this.selectedSubGame = '';
    this.ageReadble = false;
    this.genderReadble = false;
    this.subGameReadable = false;
    this.gameReadble = false;
    this.schoolReadble = false;
    this.schoolReadble = false;
    this.isShowStudent = false;
    if(this.yearvalue) {
      this.gameReadble = true;
    }  
  }
  loadAgeChange(ageData) {
    this.selectedGender='';
    this.selectedSchool = '';
    this.selectedGender = '';
    this.genderReadble = false;
    this.genderReadble = false;
    this.schoolReadble = false;
    this.isShowStudent = false;
    if(ageData.value!='') {
      this.genderReadble = true;
    }
  }
  loadGenderChange(gender) {
    this.genderVal = gender.value;
    this.subGameIdArray = [];
    this.isShowStudent = false;
    if(this.genderVal !=='') {
     this.schoolReadble = true;
     if(this.subGameVal && this.gameType == 'Both') {
     this.subGameVal.forEach(element => {
      if (this.subGameIdArray.some(x => x == element.split(",")[0])) {
   
       } else {
        this.subGameIdArray.push(
          Number(element.split(",")[0])
        );
       }
       })
      }
     this.getSchools();
    } else {
      this.schoolReadble = false;
      this.selectedSchool = '';
    }
  }
  loadSubGameChange(subgame) {
    this.selectedAge ='';
    this.selectedGender ='';
    this.selectedSchool= '';
    this.genderReadble = false;
    this.ageReadble= false;
    this.schoolReadble = false;
    this.isShowStudent = false;
    this.subGameVal = subgame.value
    // this.subgameArray =  subgame.value[0].split(","); 
    // this.subGameId = this.subgameArray[0];
  
    // this.subGameName =  this.subgameArray[1];
    // this.subGameType =  this.subgameArray[2];
    if (this.subGameVal.length > 0) {
      this.ageReadble =true;
    } else {
      this.ageReadble = false;
    }
  }
  getSchools() {
    this.getSchoolList=[];
    if(this.subGameIdArray.length >0 ) {
      this.subGameId = this.subGameIdArray.toString();
    } else {
      this.subGameId ='N';
    }
    this.getSchoolList.push(
      this.yearvalue,this.gameId,this.selectedAge,this.genderVal,this.gameType
    );
    const formData = new FormData();
    formData.append('getSchoolList', JSON.stringify(this.getSchoolList));
    formData.append('subGameId', JSON.stringify(this.subGameId));
      this.sgfiEntriesService.loadSchoolByGame(formData).subscribe(
        response => {
          if(response!=="") {
            if(response.length > 0) {
              this.schoolReadble = true;
              this.schoolList = response;
              this.schoolOptions = [];
              this.schoolOptions.push({
                label: "Please Select",
                value: ''
              });
              this.schoolList.forEach(element => {
                const schoolIdAndName = element.schoolId +','+ element.schoolName;
                this.schoolOptions.push({
                  label: element.schoolName,
                  value: schoolIdAndName
                });
              })
            }
          }
      } ,
      error => {
        //this.errorAlert =true;
      });
  }
  loadSchoolChange(schoolData) {
    console.log(schoolData);
    const schoolval =  schoolData.value.split(",")[0]; 
    this.studentDataArray =[];
    this.studentDataArray.push(
      this.yearvalue,this.gameId,this.selectedAge,this.genderVal,schoolval
    );
    const formData = new FormData();
    formData.append('studentData', JSON.stringify(this.studentDataArray));
    formData.append('subGameId', JSON.stringify(this.subGameId));
    if(schoolval !=='') {
      this.sgfiEntriesService.loadStudentData(formData).subscribe(
        response => {
          if(response.length > 0) {
            this.studentData = response;
            this.isShowStudent = true;
             console.log(response) 
          } else {
            this.isShowStudent = false;
            console.log('Data is blannk from service')
            this.messageService.add({key: 'custom', severity:'error', summary: 'Data not found'});

          }
    
       } ,
       error => {
         //this.errorAlert =true;
        });
    }
  }

}
