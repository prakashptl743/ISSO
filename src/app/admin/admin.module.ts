import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { EventComponent } from "./event/event.component";
import { AdminSchoolComponent } from "./admin-school/admin-school.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { LoadingComponent } from "../loading/loading.component";
import { NumberDirective } from "./numbers-only.directive";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin/admin.component";
import { TestComponent } from "./test/test.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { ManageBlogsComponent } from "./manage-blogs/manage-blogs.component";
import { ManageCategoriesComponent } from "./manage-categories/manage-categories.component";
import { ManagePagesComponent } from "./manage-pages/manage-pages.component";
import { BlogFormComponent } from "./blog-form/blog-form.component";
import { GameComponent } from "./game/game.component";
import { SubGameComponent } from "./subgame/subgame.component";
import { StudentComponent } from "./student/student.component";
import { UpcomingEventComponent } from "./upcoming-event/upcoming-event.component";
import { PaymentComponent } from "./payment/payment.component";
import { ReportComponent } from "./report/report.component";
import { MeritComponent } from "./merit/merit.component";
import { SumPipeModule } from "./pipe/sum.pipe";
import { TextTransformPipeModule } from "./pipe/format-string";
import { AutoCompleteModule } from "primeng/autocomplete";
import { MapGameComponent } from "./map-game/map-game.component";
import { StudentAttendanceComponent } from "./student-attendance/student-attendance.component";
import { CoachDataComponent } from "./coach-data/coach-data.component";
import { WebDataComponent } from "./web-data/web-data.component";
import { EmailValidatorDirective } from "./email-validator.directive";
import { PaymentInvoice } from "./admin-payment/payment-invoice/payment-invoice.component";
import { PrimengModule } from "../primeng-module";
import { AdminPayment } from "./admin-payment/admin-payment.component";
import { DownloadInvoice } from "./admin-payment/download-invoice/download-invoice.component";
import { ManageEventReport } from "./mange-event-report/manage-event-report.component";
import { DownloadReceipt } from "./admin-payment/download-receipt/download-receipt.component";
import { ManageTeamReport } from "./manage-team-report/manage-team-report.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { CertificateContentComponent } from "../certificate-content/certificate-content.component";
import { ConfigureSgfiPaymentComponent } from "./admin-payment/configure-sgfi-payment/configure-sgfi-payment.component";
import { ChangePassComponent } from "../change-pass/change-pass.component";
import { SgfiEntriesComponent } from "./sgfi-entries/sgfi-entries.component";
import { ConfigureIfsSchoolPaymentComponent } from "./admin-payment/configure-ifs-school-payment/configure-ifs-school-payment.component";
import { IfsSchoolDataComponent } from "./ifs-school-data/ifs-school-data.component";
import { ManageEvent } from "./mange-event/manage-event.component";
import { IndianCurrencyPipeModule } from "./pipe/indian-currency.pipe";
import { ViewStudentComponent } from "./student-profile/view-student/view-student.component";
import { SearchStudentProfileComponent } from "./student-profile/search-student-profile/search-student-profile.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SumPipeModule,
    IndianCurrencyPipeModule,
    TextTransformPipeModule,
    FormsModule,
    AutoCompleteModule,
  ],
  declarations: [
    AdminComponent,
    TestComponent,
    AdminDashboardComponent,
    ManageBlogsComponent,
    ManageCategoriesComponent,
    ManagePagesComponent,
    BlogFormComponent,
    EventComponent,
    GameComponent,
    SubGameComponent,
    AdminSchoolComponent,
    StudentComponent,
    UpcomingEventComponent,
    ManageEventReport,
    ManageEvent,
    ManageTeamReport,
    LoadingComponent,
    PaymentComponent,
    ReportComponent,
    MeritComponent,
    NumberDirective,
    EmailValidatorDirective,
    MapGameComponent,
    StudentAttendanceComponent,
    PaymentInvoice,
    DownloadReceipt,
    DownloadInvoice,
    CoachDataComponent,
    WebDataComponent,
    UserManagementComponent,
    AdminPayment,
    CertificateContentComponent,
    ConfigureSgfiPaymentComponent,
    ConfigureIfsSchoolPaymentComponent,
    ChangePassComponent,
    SgfiEntriesComponent,
    IfsSchoolDataComponent,
    ViewStudentComponent,
    SearchStudentProfileComponent,
  ],
  providers: [
    SumPipeModule,
    IndianCurrencyPipeModule,
    DatePipe,
    TextTransformPipeModule,
    AutoCompleteModule,
  ],
})
export class AdminModule {}
