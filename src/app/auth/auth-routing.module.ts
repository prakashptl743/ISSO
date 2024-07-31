import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimengModule } from '../primeng-module';
import { LoginComponent } from './login/login.component';
import { SchoolRegistrationComponent } from './school-registration/school-registration.component';
import { StudentCertificateComponent } from './student-certificate/student-certificate.component';
import { IsfSchoolComponent } from './isf-school/isf-school.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'school-registration', component: SchoolRegistrationComponent },
  { path: 'isf-school', component:  IsfSchoolComponent },
  { path: 'student-certificate/:eventId/:gameId/:schoolId/:studentId/:subgameId/:rank/:randomstring', 
  component: StudentCertificateComponent },
];

@NgModule({
  imports: [PrimengModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
