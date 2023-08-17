import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  studentCount:number;
  schoolCount:number;
  gameCount:number;
  eventCount:number;
  title = 'Dashboard';
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
   
    ) { }

  ngOnInit() {
    this.getDashboardData();
  }
  navigate(dashboardType: any) {
      if(dashboardType == 'student') {
        this.router.navigate(['/admin/student/']);
      } else if (dashboardType == 'event') {
        this.router.navigate(['/admin/event/']);
      } else if (dashboardType == 'school') {
        this.router.navigate(['/admin/admin-school/']);
      } else {
        this.router.navigate(['/admin/game/']);
      }
      
  }
 
  getDashboardData(){
    this.dashboardService.getDashboardData().subscribe(response => {
            if(response!=="") {
            this.studentCount = response['studentCount'];
            this.schoolCount = response['schoolCount'];
            this.eventCount = response['eventCount'];
            this.gameCount = response['gameCount'];
        // this.showspinner = false;
            // this.gameData =response;
            // this.schoolData = this.gameData;
            // console.log(this.schoolData.length)
            } else {
            alert('im blankl=')
            }

        })
    
}
}
