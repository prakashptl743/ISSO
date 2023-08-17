import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssoUtilService } from '../../services/isso-util.service'
import { EventService } from '../service/event.service';
import { MessageService } from 'primeng/api';
import { MustMatch } from './must-match.validator';
 

@Component({
  selector: 'app-staffadmin-profile',
  templateUrl: './staffadmin-profile.component.html',
  styleUrls: ['./staffadmin-profile.component.css'],
  providers: [MessageService]
})
export class StaffadminProfileComponent implements OnInit {
  schoolId: any;
  schoolName: string;
  schoolInfra: string;
  schoolAddress: string;
  schoolEmail: string;
  schoolNumber: Number;
  schoolBoard: string;
  schoolOldPass: string;
  newPassword: string;
  confirmPassword: string;
  schoolForm: FormGroup;
  passwordForm: FormGroup;
  error: string;
  isEditProfile: boolean = false;
  showPasswordScrren: boolean = false;
 
  submitted = false;
  schoolFormSubmitted: boolean;

  constructor(
    private issoUtilService: IssoUtilService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private eventService: EventService) { }

  ngOnInit() {
    this.schoolId = localStorage.getItem('schoolId')
    this.getSchoolInfo(this.schoolId)
    //  this.getEventData()
    this.initialForm()
  }
  get f() { return this.passwordForm.controls; }

  get schoolFun() { return this.schoolForm.controls; }

  getSchoolInfo(schoolId) {
    this.issoUtilService.getSchoolInfo(schoolId).subscribe(
      response => {
        if (response !== "") {
          this.setSchoolData(response)

        }
      },
      error => {
        //this.errorAlert =true;
      });
  }

  initialForm() {
    this.schoolForm = this.fb.group({
      schoolId: [''],
      schoolName:  ['', Validators.required],
      schoolAddress:  ['', Validators.required],
      schoolEmail:  ['', Validators.required],
      mobile:  ['', Validators.required],
      schoolBoard:  ['', Validators.required],
      schoolInfra:  ['', Validators.required] 
    });
    this.passwordForm = this.fb.group({
      schoolId: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    // acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
 
  }
  onPasswordSubmit() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
        return;
    }

    const formData = new FormData();
    formData.append('schoolId', this.passwordForm.get('schoolId').value);
    formData.append('password', this.passwordForm.get('password').value);
 
    if (this.schoolId != '') {
      this.issoUtilService.updateSchoolPassword(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
          } else {
            this.messageService.add({ key: 'custom', severity: 'success', summary: 'Password changed Successfully' });
            //  this.getSchoolInfo(this.schoolId);
          }
        },
        error => this.error = error
      );

    // }

    }
  }
  onSchoolSubmit() {
    this.schoolFormSubmitted = true;
    if (this.schoolForm.invalid) {
        return;
    }
  }
  editProfile(isProfileStatus:string) {
    if (isProfileStatus == 'isView') {
      this.isEditProfile = false;
      this.showPasswordScrren = false;
      this.getSchoolInfo(this.schoolId)
    } else if(isProfileStatus == 'isPasswordChange') {
      this.isEditProfile = false;
      this.showPasswordScrren = true;
    } else {
      this.showPasswordScrren = false;
      this.isEditProfile = true;
    }
  }
  setSchoolData(response) {
    this.schoolId = response[0].schoolId;
    this.schoolName = response[0].schoolName;
    this.schoolInfra = response[0].schoolInfrastructure;
    this.schoolAddress = response[0].schoolAddress;
    this.schoolEmail = response[0].email;
    this.schoolNumber = response[0].mobile;
    this.schoolBoard = response[0].schoolBoard;
    this.schoolOldPass = response[0].originalPassword;
    this.newPassword = '';
    this.confirmPassword = '';
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('schoolId', this.schoolForm.get('schoolId').value);
    formData.append('schoolName', this.schoolForm.get('schoolName').value);
    formData.append('schoolAddress', this.schoolForm.get('schoolAddress').value);
    formData.append('schoolEmail', this.schoolForm.get('schoolEmail').value);
    formData.append('schoolNumber', this.schoolForm.get('mobile').value);
    formData.append('schoolBoard', this.schoolForm.get('schoolBoard').value);
    formData.append('schoolInfra', this.schoolForm.get('schoolInfra').value);
    if (this.schoolId != '') {
      this.issoUtilService.updateSchoolData(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
          } else {
            this.messageService.add({ key: 'custom', severity: 'success', summary: 'School data updated Successfully' });
            //  this.getSchoolInfo(this.schoolId);
          }
        },
        error => this.error = error
      );

    }
  }

}
