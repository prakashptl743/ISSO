import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {formatDate } from '@angular/common';
import { ConfirmationService,MessageService } from 'primeng/api';
import { UserService } from '../service/uesr.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [MessageService,ConfirmationService]
})

export class AdminComponent implements OnInit {
    today= new Date();
    todaysDataTime = '';
    CurrentTime: any;
    adminMenuData: Object;
  constructor(
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private userSerview: UserService
  ) { 
 
    this.todaysDataTime = formatDate(new Date(), 'dd-MMM-yyyy', 'en');
    // this.todaysDataTime = formatDate(this.today, 'dd-MMM-yyyy hh:mm:ss a', 'en-US', '+0530');
    setInterval(() => {
        this.CurrentTime = new Date().getHours() + '    :    ' + new Date().getMinutes() + '   :    '+  new Date().getSeconds()}, 1);
   
  }
  items: MenuItem[];
  ngOnInit() {
    this.adminMenu();
    this.items = [
      {
          label: 'File',
          routerLink: './admin-school',
          icon: 'pi pi-pw pi-file',
          items: [{
                  label: 'New', 
                  icon: 'pi pi-fw pi-plus',
               
                  items: [
                      {label: 'User', icon: 'pi pi-fw pi-user-plus'},
                      {label: 'Filter', icon: 'pi pi-fw pi-filter'}
                  ]
              },
              {label: 'Open', icon: 'pi pi-fw pi-external-link'},
              {separator: true},
              {label: 'Quit', icon: 'pi pi-fw pi-times'}
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      },
      {
          label: 'Help',
          routerLink: './categories',
          icon: 'pi pi-fw pi-question',
          items: [
              {
                  label: 'Contents',
                  icon: 'pi pi-pi pi-bars'
              },
              {
                  label: 'Search', 
                  icon: 'pi pi-pi pi-search', 
                  items: [
                      {
                          label: 'Text', 
                          items: [
                              {
                                  label: 'Workspace'
                              }
                          ]
                      },
                      {
                          label: 'User',
                          icon: 'pi pi-fw pi-file',
                      }
              ]}
          ]
      },
      {
          label: 'Actions',
          icon: 'pi pi-fw pi-cog',
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-fw pi-pencil',
                  items: [
                      {label: 'Save', icon: 'pi pi-fw pi-save'},
                      {label: 'Update', icon: 'pi pi-fw pi-save'},
                  ]
              },
              {
                  label: 'Other',
                  icon: 'pi pi-fw pi-tags',
                  items: [
                      {label: 'Delete', icon: 'pi pi-fw pi-minus'}
                  ]
              }
          ]
      }
  ];

}
adminMenu() {
    this.userSerview.getMenuData('issoadmin').subscribe(response => {
        if(response!=="") {
            this.adminMenuData = response;
          console.log(response);
        } else {
        alert('im blankl=')
        }
  
      })
}
logOff() {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: 'confirm-delete-school',
      icon: 'pi pi-info-circle',
      message: 'Are you sure to want logoff?',
       accept: () => { this.logoffUser(); },
    });
}
logoffUser() {

}



}
 
