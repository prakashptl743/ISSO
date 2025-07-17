import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { SchoolRegistrationComponent } from "./auth/school-registration/school-registration.component";
import { StudentCertificateComponent } from "./auth/student-certificate/student-certificate.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { IsfSchoolComponent } from "./auth/isf-school/isf-school.component";
import { StudentRegistrationComponent } from "./auth/student-registration/student-registration.component";
import { ParentDashboardComponent } from "./auth/parent-dashboard/parent-dashboard.component";
import { CertificateDashboardComponent } from "./auth/certificate-dashboard/certificate-dashboard.component";
import { TestCompComponent } from "./auth/test-comp/test-comp.component";

const routes: Routes = [
  { path: "", redirectTo: "", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
  { path: "login", component: LoginComponent },
  { path: "school-registration", component: SchoolRegistrationComponent },
  // { path: "student-registration", component: StudentRegistrationComponent },
  { path: "test-comp", component: TestCompComponent },
  { path: "parent-dashboard", component: ParentDashboardComponent },
  { path: "certificate-dashboard", component: CertificateDashboardComponent },
  { path: "student-certificate", component: StudentCertificateComponent },
  { path: "isf-school", component: IsfSchoolComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
