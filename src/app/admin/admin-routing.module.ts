import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminComponent } from "./admin/admin.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { ManageBlogsComponent } from "./manage-blogs/manage-blogs.component";
import { ManageCategoriesComponent } from "./manage-categories/manage-categories.component";
import { ManagePagesComponent } from "./manage-pages/manage-pages.component";
import { BlogFormComponent } from "./blog-form/blog-form.component";
import { EventComponent } from "./event/event.component";
import { GameComponent } from "./game/game.component";
import { TestComponent } from "./test/test.component";
import { AdminSchoolComponent } from "./admin-school/admin-school.component";
import { SubGameComponent } from "./subgame/subgame.component";
import { StudentComponent } from "./student/student.component";
import { UpcomingEventComponent } from "./upcoming-event/upcoming-event.component";
import { PaymentComponent } from "./payment/payment.component";
import { ReportComponent } from "./report/report.component";
import { MeritComponent } from "./merit/merit.component";
import { CoachDataComponent } from "./coach-data/coach-data.component";
import { AuthGuard } from "../auth/auth.guard";
import { StudentAttendanceComponent } from "./student-attendance/student-attendance.component";
import { WebDataComponent } from "./web-data/web-data.component";
import { AdminPayment } from "./admin-payment/admin-payment.component";
import { ManageEventReport } from "./mange-event-report/manage-event-report.component";
import { ManageTeamReport } from "./manage-team-report/manage-team-report.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { PermissionGuard } from "../services/permission.guard";
import { AdminPermission } from "../services/user.service";
import { SgfiEntriesComponent } from "./sgfi-entries/sgfi-entries.component";
import { ManageEvent } from "./mange-event/manage-event.component";
import { MapGameComponent } from "./map-game/map-game.component";
import { PaymentInvoice } from "./admin-payment/payment-invoice/payment-invoice.component";
import { DownloadInvoice } from "./admin-payment/download-invoice/download-invoice.component";
import { DownloadReceipt } from "./admin-payment/download-receipt/download-receipt.component";
import { ConfigureSgfiPaymentComponent } from "./admin-payment/configure-sgfi-payment/configure-sgfi-payment.component";
import { ConfigureIfsSchoolPaymentComponent } from "./admin-payment/configure-ifs-school-payment/configure-ifs-school-payment.component";
import { ChangePassComponent } from "../change-pass/change-pass.component";
import { IfsSchoolDataComponent } from "./ifs-school-data/ifs-school-data.component";
import { ViewStudentComponent } from "./student-profile/view-student/view-student.component";
import { SearchStudentProfileComponent } from "./student-profile/search-student-profile/search-student-profile.component";

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: "",
        children: [
          {
            path: "dashboard",
            pathMatch: "full",
            component: TestComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.Dashboard },
          },
          {
            path: "game",
            pathMatch: "full",
            component: GameComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.Game },
          },
          {
            path: "dashboard",
            pathMatch: "full",
            component: TestComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.Dashboard },
          },
          {
            path: "subgame",
            pathMatch: "full",
            component: SubGameComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.SubGame },
          },
          {
            path: "upcomingevent",
            pathMatch: "full",
            component: UpcomingEventComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.UpcomingEvent },
          },
          {
            path: "manageeventreport",
            pathMatch: "full",
            component: ManageEventReport,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.EventReport },
          },
          {
            path: "ManageTeamReport",
            pathMatch: "full",
            component: ManageTeamReport,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.TeamReport },
          },
          {
            path: "student",
            pathMatch: "full",
            component: StudentComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.Student },
          },
          {
            path: "payment",
            pathMatch: "full",
            component: PaymentComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.Payment },
          },

          {
            path: "merit",
            pathMatch: "full",
            component: MeritComponent,
            canActivate: [PermissionGuard],
            data: {
              adminpermission: AdminPermission.Merit,

              isAddMerit: true,
              isPrintMerit: false,
              isConsolited: false,
            },
          },
          {
            path: "print-merit",
            pathMatch: "full",
            component: MeritComponent,
            canActivate: [PermissionGuard],
            data: {
              adminpermission: AdminPermission.Merit,

              isAddMerit: false,
              isPrintMerit: true,
              isConsolited: false,
            },
          },
          {
            path: "consolited-merit",
            pathMatch: "full",
            component: MeritComponent,
            canActivate: [PermissionGuard],
            data: {
              adminpermission: AdminPermission.ConsolitedMerit,

              isAddMerit: false,
              isPrintMerit: true,
              isConsolited: true,
            },
          },
          {
            path: "sgfi-add-student",
            pathMatch: "full",
            component: SgfiEntriesComponent,
            canActivate: [PermissionGuard],
            data: {
              adminpermission: AdminPermission.Sgfiaddstudent,
              isAddStudent: true,
              isViewStudent: false,
              isShowPayment: false,
            },
          },
          {
            path: "sgfi-view-student",
            pathMatch: "full",
            component: SgfiEntriesComponent,
            canActivate: [PermissionGuard],
            data: {
              adminpermission: AdminPermission.Sgfiviewstudent,
              isAddStudent: false,
              isViewStudent: true,
              isShowPayment: false,
            },
          },
          {
            path: "sgfi-download-payment",
            pathMatch: "full",
            component: SgfiEntriesComponent,
            canActivate: [PermissionGuard],
            data: {
              adminpermission: AdminPermission.Sgfidownloadpayment,
              isAddStudent: false,
              isViewStudent: false,
              isShowPayment: true,
            },
          },
          {
            path: "report",
            pathMatch: "full",
            component: ReportComponent,
            canActivate: [PermissionGuard],

            data: {
              adminpermission: AdminPermission.AdminReport,
              isConsolited: false,
              reportLabel: "Print Report",
              isCertificateContent: false,
              isEventReport: false,
              isIdCardShow: false,
              isReportShow: true,
              reportValue: 0,
            },
          },
          {
            path: "certificate",
            pathMatch: "full",
            component: ReportComponent,
            canActivate: [PermissionGuard],

            data: {
              adminpermission: AdminPermission.AdminReport,
              isConsolited: false,
              reportLabel: "Print Certificate",
              isCertificateContent: false,
              isEventReport: false,
              isIdCardShow: false,
              isReportShow: true,
              reportValue: 1,
            },
          },
          {
            path: "coach-certificate",
            pathMatch: "full",
            component: ReportComponent,
            canActivate: [PermissionGuard],

            data: {
              adminpermission: AdminPermission.AdminReport,
              isConsolited: false,
              reportLabel: "Print Coach Certificate",
              isCertificateContent: false,
              isEventReport: false,
              isIdCardShow: false,
              isReportShow: true,
              reportValue: 2,
            },
          },
          {
            path: "consolited-report",
            pathMatch: "full",
            component: ReportComponent,
            canActivate: [PermissionGuard],

            data: {
              adminpermission: AdminPermission.AdminReport,
              isConsolited: true,
              reportLabel: "Print Consolidated",
              isCertificateContent: false,
              isEventReport: false,
              isReportShow: false,
              isIdCardShow: false,
              isConsolitedData: false,
              reportValue: 3,
            },
          },
          {
            path: "volunteer-certificate",
            pathMatch: "full",
            component: ReportComponent,
            canActivate: [PermissionGuard],

            data: {
              adminpermission: AdminPermission.AdminReport,
              isConsolited: false,
              reportLabel: "Print Volunteer Certificate",
              isCertificateContent: false,
              isEventReport: false,
              isReportShow: true,
              isIdCardShow: false,
              isConsolitedData: false,
              reportValue: 4,
            },
          },
          {
            path: "team-event-report",
            pathMatch: "full",
            component: ReportComponent,
            canActivate: [PermissionGuard],

            data: {
              adminpermission: AdminPermission.AdminReport,
              isConsolited: false,
              reportLabel: "Print Event Report",
              isCertificateContent: false,
              isEventReport: true,
              isReportShow: false,
              isIdCardShow: false,
              isConsolitedData: false,
              isTeamEventReport: false,
              reportValue: 5,
            },
          },
          {
            path: "id-card",
            pathMatch: "full",
            component: ReportComponent,
            canActivate: [PermissionGuard],

            data: {
              adminpermission: AdminPermission.AdminReport,
              isConsolited: false,
              reportLabel: "Download ID Card",
              isCertificateContent: false,
              isEventReport: false,
              isReportShow: false,
              isIdCardShow: true,
              isConsolitedData: false,
              isTeamEventReport: false,
              istshirtReport: false,
              reportValue: 7,
            },
          },

          {
            path: "event",
            pathMatch: "full",
            component: EventComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.Event },
          },
          {
            path: "event",
            pathMatch: "full",
            component: EventComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.Event },
          },
          {
            path: "attendance",
            pathMatch: "full",
            component: StudentAttendanceComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.Attendance },
          },

          {
            path: "admin-payment",
            pathMatch: "full",
            component: AdminPayment,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.AdminPayment },
          },
          {
            path: "admin-school",
            pathMatch: "full",
            component: AdminSchoolComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.AdmiSchool },
          },
          {
            path: "webData",
            pathMatch: "full",
            component: WebDataComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.WebData },
          },
          {
            path: "coach-data",
            pathMatch: "full",
            component: CoachDataComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.WebData },
          },
          {
            path: "user-mgt",
            pathMatch: "full",
            component: UserManagementComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.UserMgt },
          },
          {
            path: "sgfi-entries",
            pathMatch: "full",
            component: SgfiEntriesComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.SgfiEntries },
          },
          {
            path: "manageevent",
            pathMatch: "full",
            component: ManageEvent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.ManageEvent },
          },
          {
            path: "map-game",
            pathMatch: "full",
            component: MapGameComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.MapGame },
          },
          {
            path: "download-invoice",
            pathMatch: "full",
            component: DownloadInvoice,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.DownloadInvoice },
          },
          {
            path: "download-receipt",
            pathMatch: "full",
            component: DownloadReceipt,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.DownloadReceipt },
          },
          {
            path: "sgfi-fee",
            pathMatch: "full",
            component: ConfigureSgfiPaymentComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.SgfiFee },
          },
          {
            path: "isf-fee",
            pathMatch: "full",
            component: ConfigureIfsSchoolPaymentComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.IsfFee },
          },
          {
            path: "payment-invoice",
            pathMatch: "full",
            component: PaymentInvoice,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.PaymentInvoice },
          },
          {
            path: "change-pass",
            pathMatch: "full",
            component: ChangePassComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.ChangePass },
          },
          {
            path: "isf-data",
            pathMatch: "full",
            component: IfsSchoolDataComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.IsfData },
          },
          {
            path: "profile-view-student",
            pathMatch: "full",
            component: ViewStudentComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.ProfileViewStudent },
          },
          {
            path: "search-student-profile",
            pathMatch: "full",
            component: SearchStudentProfileComponent,
            canActivate: [PermissionGuard],
            data: { adminpermission: AdminPermission.SearchStudentProfile },
          },
          // { path: 'game', component: GameComponent },
          // { path: 'dashboard', component: TestComponent },
          // { path: 'subgame', component: SubGameComponent },
          //   { path: 'upcomingevent', component: UpcomingEventComponent },
          // { path: 'manageeventreport', component: ManageEventReport },
          // { path: 'ManageTeamReport', component: ManageTeamReport },
          // { path: 'student', component: StudentComponent },
          //   { path: 'payment', component: PaymentComponent },
          //  { path: 'report', component: ReportComponent },
          //  { path: 'merit', component: MeritComponent },
          //  { path: 'event', component: EventComponent },
          //  { path: 'coach-data', component: CoachDataComponent },
          //  { path: 'attendance', component: StudentAttendanceComponent },
          // { path: 'admin-payment', component: AdminPayment },
          // { path: 'admin-school', component: AdminSchoolComponent },
          //{ path: 'webData', component: WebDataComponent },
          // { path: 'user-mgt', component: UserManagementComponent },
          // { path: 'dashboard', component: AdminDashboardComponent }
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
