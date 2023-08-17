import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';
import { StaffadminDashboardComponent} from './staffadmin-dashboard/staffadmin-dashboard.component';
import { StaffadminMenuComponent} from './staffadmin-menu/staffadmin-menu.component';
import { NumberDirective } from 'src/app/shared/directive/numbers-only.directive';
import { ReportComponent } from './report/report.component';
import { EventDashboardComponent } from './event-dashboard/event-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StaffadminProfileComponent } from './staffadmin-profile/staffadmin-profile.component';
 
import { FormsModule }    from '@angular/forms';
import { StaffadminRoutingModule } from './staffadmin-routing.module';
import { LoadingComponent } from './loading/loading.component';
import { StudentEnrollmentComponent } from './student-enrollment/student-enrollment.component';
import { SafeUrlPipeModule } from 'src/app/staffadmin/pipe/safe-url.pipe';
import { TestReportComponent } from './test-report/test-report.component';
import { PayNowComponent } from './pay-now/pay-now.component';
import { CoachEntiresComponent } from './coach-entires/coach-entires.component';
import { VolunteerDataComponent } from './volunteer-data/volunteer-data.component';
import { PrimengModule } from '../primeng-module';
import { CertificateInvoiceComponent } from './certificate-invoice/certificate-invoice.component';

// import { AdminComponent } from './admin/admin.component';
// import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
// import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
// import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
// import { ManagePagesComponent } from './manage-pages/manage-pages.component';
// import { BlogFormComponent } from './blog-form/blog-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    StaffadminRoutingModule,
    SafeUrlPipeModule
  ],
  declarations: [
    StaffadminDashboardComponent,
    StaffadminMenuComponent,
    EventDashboardComponent,
    StudentDashboardComponent,
    ReportComponent,
    StaffadminProfileComponent,
    LoadingComponent,
    StudentEnrollmentComponent,
    CertificateInvoiceComponent,
    NumberDirective,
    TestReportComponent,
    PayNowComponent,
    CoachEntiresComponent,
    VolunteerDataComponent


    // AdminComponent,
    // AdminDashboardComponent,
    // ManageBlogsComponent,
    // ManageCategoriesComponent,
    // ManagePagesComponent,
    // BlogFormComponent
  ],
  providers: [SafeUrlPipeModule]
})
export class StaffAdminModule { }
