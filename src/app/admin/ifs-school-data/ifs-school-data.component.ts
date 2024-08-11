import { Component, OnInit } from '@angular/core';
import { IfsSchoolService } from '../service/ifs-school.service';

@Component({
  selector: 'app-ifs-school-data',
  templateUrl: './ifs-school-data.component.html',
  styleUrls: ['./ifs-school-data.component.css']
})
export class IfsSchoolDataComponent implements OnInit {
 public schoolData: any;

  constructor(
   private ifsSchoolService: IfsSchoolService
  ) { }

  ngOnInit() {
    this.getIfsSchoolData()
  }
  public getIfsSchoolData(){ 
    this.ifsSchoolService.getSchoolData().subscribe(response => {
      if(response!=="") {
        this.schoolData =response; 
        console.log('dta-->',this.schoolData)
      } else {
        alert('im blankl=')
      }
  
   } ,
   error => {
     //this.errorAlert =true;
    });
  }

}
