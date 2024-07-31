import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SchoolRegistrationComponent } from './school-registration/school-registration.component';
import { PrimengModule } from '../primeng-module';
import { StudentCertificateComponent } from './student-certificate/student-certificate.component';
import { IsfSchoolComponent } from './isf-school/isf-school.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    InputTextModule,
    FormsModule,
    PrimengModule,
    AutoCompleteModule
    
  ],
 
  declarations: [LoginComponent,SchoolRegistrationComponent,StudentCertificateComponent,IsfSchoolComponent]
})
export class AuthModule { }
