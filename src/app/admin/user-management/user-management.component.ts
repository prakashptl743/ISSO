import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../service/school.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { PageNotFoundComponent} from 'src/app/page-not-found/page-not-found.component'
import { ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { School, WebCalender } from '../admin-interfaces';
import { Table } from 'primeng/components/table/table';
import { WebcalenderService } from '../service/webcalender.service';
import { UserService } from '../service/uesr.service';

@Component({
  selector: 'app-user-mgt',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class UserManagementComponent implements OnInit {
    
  adminMenuData: Object;
  isMenu: boolean;
  isUser: boolean;
  public userForm: FormGroup;
  error: any;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
     
   }

ngOnInit() {
    this.isMenu = true;
    this.getMenuData();
    this.initialiseForm()
}
getMenuData() {
  this.userService.getMenuData('admin').subscribe(response => {
    if(response!=="") {
        this.adminMenuData = response;
      console.log(response);
    } else {
    alert('im blankl=')
    }

  })
}
initialiseForm() {
  this.userForm = this.fb.group({
    userId:[''],
    userName: ['', Validators.required],
    userEmail: ['', Validators.required],
    userMobile: ['', Validators.required],
    userPassword: ['', Validators.required],
  });
}
onSubmit() {
   
  const formData = new FormData();
 
   
  let userId =  this.userForm.get('userId').value;
  formData.append('userName', this.userForm.get('userName').value);
  formData.append('userEmail', this.userForm.get('userEmail').value);
  formData.append('userMobile', this.userForm.get('userMobile').value);
  formData.append('userPassword', this.userForm.get('userPassword').value);
 

  if(userId == '') {
      this.userService.saveUserData(formData).subscribe(
      res => {
          if (res.status === 'error') {
            this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
          } else {
            this.messageService.add({key: 'custom', severity:'success', summary: 'User Data Added Successfully'});
           // this.eventForm.reset();
          }
        //this.display =false
       // this.getEventData();
      },
      error => this.error = error

      );
  } else {
    // this.eventService.editEventData(eventId,formData).subscribe(
    //   res => {
    //       if (res.status === 'success') { 
    //         this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Updated Successfully'});
    //         //this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
    //      } 
    //     else {
    //        this.messageService.add({key: 'custom', severity:'success', summary: 'Event Data Updated Successfully'});

    //       }
    //     this.display =false
    //     this.getEventData();
    //   },
    //   error => this.error = error
    // );
  }
}
 
onloadMenu(index) {
  if(index == '0') {
    this.isMenu =true;
    this.isUser = false;
  } else if(index =='1') {
    this.isMenu =false;
    this.isUser = true;
  }  
 }

}
