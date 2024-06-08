import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../admin/service/uesr.service';
import { MessageService } from 'primeng/api';
import { MustMatch } from '../staffadmin/staffadmin-profile/must-match.validator';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css'],
  providers: [MessageService]
})
export class ChangePassComponent implements OnInit {
  public passwordForm: FormGroup;
  error: any;
  submitted: boolean;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) { }
  get f() { return this.passwordForm.controls; }
  ngOnInit() {
    this.initialiseForm()
  }
  initialiseForm() {
    // this.passwordForm = this.fb.group({
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   confirmPassword: ['', Validators.required],
    // });

 
    this.passwordForm = this.fb.group({
      schoolId: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    // acceptTerms: [false, Validators.requiredTrue]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });

  }
  resetForm() {
    this.passwordForm.reset();
  }
  onPasswordSubmit() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
        return;
    }
    const formData = new FormData();
    formData.append('userPass', this.passwordForm.get('password').value);
    this.userService.changePassword(formData).subscribe(
      res => {
        if (res.status === 'success') { 
          this.messageService.add({key: 'custom', severity:'success', summary: 'Password Updated Successfully'});
          
       } 
       },
      error => this.error = error

      );
  }
}
