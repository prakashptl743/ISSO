import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReportComponent } from "./report/report.component";
import { EventDashboardComponent } from "./event-dashboard/event-dashboard.component";
import { StudentDashboardComponent } from "./student-dashboard/student-dashboard.component";
import { StaffadminMenuComponent } from "./staffadmin-menu/staffadmin-menu.component";
import { StudentEnrollmentComponent } from "./student-enrollment/student-enrollment.component";
import { StaffadminProfileComponent } from "./staffadmin-profile/staffadmin-profile.component";
import { AuthGuard } from "../auth/auth.guard";
import { from } from "rxjs";
import { TestReportComponent } from "./test-report/test-report.component";
import { PayNowComponent } from "./pay-now/pay-now.component";
import { CoachEntiresComponent } from "./coach-entires/coach-entires.component";
import { VolunteerDataComponent } from "./volunteer-data/volunteer-data.component";
import { CertificateInvoiceComponent } from "./certificate-invoice/certificate-invoice.component";
import { PermissionGuard } from "../services/permission.guard";
import { Permission } from "../services/user.service";
import { SgfiEntryComponent } from "./sgfi-entry/sgfi-entry.component";
import { StudentProfileComponent } from "./student-profile/student-profile.component";
import { StudentProfileEnrollmentComponent } from "./student-profile-enrollment/student-profile-enrollment.component";

// import { PayNowComponent } from '../pay-now/pay-now.component';

const routes: Routes = [
  {
    path: "staffadmin",
    component: StaffadminMenuComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        children: [
          {
            path: "student-dashboard",
            pathMatch: "full",
            component: StudentDashboardComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.StudentDashboard },
          },
          {
            path: "student-enrollment",
            pathMatch: "full",
            component: StudentEnrollmentComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.StudentEnrollment },
          },
          {
            path: "event-dashboard",
            pathMatch: "full",
            component: EventDashboardComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.EventDashboard },
          },
          {
            path: "report",
            pathMatch: "full",
            component: ReportComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.Report },
          },
          {
            path: "certificate-invoice",
            pathMatch: "full",
            component: CertificateInvoiceComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.InvoiceReceipt },
          },
          {
            path: "coach-entires",
            pathMatch: "full",
            component: CoachEntiresComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.CoachEntries },
          },
          {
            path: "volunteer-entires",
            pathMatch: "full",
            component: VolunteerDataComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.Sgfi },
          },
          {
            path: "sgfi",
            pathMatch: "full",
            component: SgfiEntryComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.Volunteer },
          },
          {
            path: "student-profile",
            pathMatch: "full",
            component: StudentProfileComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.StudentProfile },
          },
          {
            path: "student-profile-enrollment",
            pathMatch: "full",
            component: StudentProfileEnrollmentComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.StudentProfileEnrollment },
          },
          {
            path: "pay-now",
            pathMatch: "full",
            component: PayNowComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.PayNow },
          },
          {
            path: "my-profile",
            pathMatch: "full",
            component: StaffadminProfileComponent,
            canActivate: [PermissionGuard],
            data: { permission: Permission.Profile },
          },

          //  { path: 'student-enrollment', component: StudentEnrollmentComponent },
          // { path: 'report', component: ReportComponent },
          //  { path: 'certificate-invoice', component: CertificateInvoiceComponent },
          //{ path: 'coach-entires', component: CoachEntiresComponent },
          // { path: 'volunteer-entires', component: VolunteerDataComponent },
          // { path: 'pay-now', component: PayNowComponent },
          //   { path: 'event-dashboard', component: EventDashboardComponent },
          //  { path: 'student-dashboard', component: StudentDashboardComponent },
          // { path: 'my-profile', component: StaffadminProfileComponent },
          // { path: 'test-report', component: TestReportComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffadminRoutingModule {}
