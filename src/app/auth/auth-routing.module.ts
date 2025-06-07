import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PrimengModule } from "../primeng-module";
import { LoginComponent } from "./login/login.component";
import { SchoolRegistrationComponent } from "./school-registration/school-registration.component";
import { StudentCertificateComponent } from "./student-certificate/student-certificate.component";
import { IsfSchoolComponent } from "./isf-school/isf-school.component";
import { StudentRegistrationComponent } from "./student-registration/student-registration.component";
import { ParentDashboardComponent } from "./parent-dashboard/parent-dashboard.component";
import { CertificateDashboardComponent } from "./certificate-dashboard/certificate-dashboard.component";
import { TestCompComponent } from "./test-comp/test-comp.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "school-registration", component: SchoolRegistrationComponent },
  { path: "student-registration", component: StudentRegistrationComponent },
  { path: "test-comp", component: TestCompComponent },
  { path: "parent-dashboard", component: ParentDashboardComponent },
  { path: "certificate-dashboard", component: CertificateDashboardComponent },
  { path: "isf-school", component: IsfSchoolComponent },
  {
    path: "student-certificate/:eventId/:gameId/:schoolId/:studentId/:subgameId/:rank/:randomstring",
    component: StudentCertificateComponent,
  },
];

@NgModule({
  imports: [PrimengModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
