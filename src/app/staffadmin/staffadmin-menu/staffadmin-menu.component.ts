import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-staffadmin-menu',
  templateUrl: './staffadmin-menu.component.html',
  styleUrls: ['./staffadmin-menu.component.css']
})
export class StaffadminMenuComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;
  schoolName: string;
  isvolunteer: string | null;
  currentYear: number = new Date().getFullYear();
  constructor(private router: Router) { }

  ngOnInit() {
    this.loadMenu();
    this.schoolName = localStorage.getItem('schoolName');
    this.isvolunteer  = localStorage.getItem('isVoulnteer');
   console.log('volunteer==>'+this.isvolunteer);
  }
  loadMenu() {
    this.items = [
      {label: 'Event Dashboard', icon: 'pi pi-fw pi-home', command: () => this.router.navigate(['/staffadmin/event-dashboard'])},
      {label: 'Student Dashboard', icon: 'pi pi-fw pi-calendar', command: () => this.router.navigate(['/staffadmin/student-dashboard'])},
      {label: 'Report', icon: 'pi pi-chart-bar', command: () => this.router.navigate(['/staffadmin/report'])},
      {label: 'My Profile', icon: 'pi pi-users', command: () => this.router.navigate(['/staffadmin/my-profile'])},
      {label: 'Log out', icon: 'pi pi-fw pi-cog', command: () => this.router.navigate(['/login'])}
    ];
    this.activeItem = this.items[0];
   }
   addNewUser() {
    this.router.navigate(['/staffadmin/student-dashboard']);
   }
   closeMenu() {
    let isMobile = /iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Android/i.test(navigator.userAgent);
    if (isMobile) {
      document.getElementById('navButton').click();
    }
  }
}
