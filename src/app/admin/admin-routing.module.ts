import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageBlogsComponent } from './manage-blogs/manage-blogs.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';
import { BlogFormComponent } from './blog-form/blog-form.component';
import { EventComponent } from './event/event.component';
import { GameComponent } from './game/game.component';
import { TestComponent } from './test/test.component';
import { AdminSchoolComponent } from './admin-school/admin-school.component';
import { SubGameComponent  } from './subgame/subgame.component';
import { StudentComponent } from './student/student.component';
import { UpcomingEventComponent } from './upcoming-event/upcoming-event.component';
import { PaymentComponent } from './payment/payment.component';
import { ReportComponent } from './report/report.component';
import { MeritComponent } from './merit/merit.component';
import { CoachDataComponent } from './coach-data/coach-data.component';
import { AuthGuard } from '../auth/auth.guard';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { WebDataComponent } from './web-data/web-data.component';
import { AdminPayment } from './admin-payment/admin-payment.component';
import { ManageEventReport } from './mange-event-report/manage-event-report.component';
import { ManageTeamReport } from './manage-team-report/manage-team-report.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { PermissionGuard } from '../services/permission.guard';
import { AdminPermission } from '../services/user.service';   
import { SgfiEntriesComponent } from './sgfi-entries/sgfi-entries.component';

const routes: Routes = [
  {
     path: 'admin',
     component: AdminComponent,
     canActivate: [AuthGuard],
    
    children: [
      {
      path: '',
      children: [

        {
          path: 'dashboard',
          pathMatch: 'full',
          component: TestComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.Dashboard }
        },  
        {
          path: 'game',
          pathMatch: 'full',
          component: GameComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.Game }
        },  
        {
          path: 'dashboard',
          pathMatch: 'full',
          component: TestComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.Dashboard }
        },  
        {
          path: 'subgame',
          pathMatch: 'full',
          component: SubGameComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.SubGame }
        }, 
        {
          path: 'upcomingevent',
          pathMatch: 'full',
          component: UpcomingEventComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.UpcomingEvent }
        }, 
        {
          path: 'manageeventreport',
          pathMatch: 'full',
          component: ManageEventReport,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.EventReport }
        }, 
        {
          path: 'ManageTeamReport',
          pathMatch: 'full',
          component: ManageTeamReport,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.TeamReport }
        }, 
        {
          path: 'student',
          pathMatch: 'full',
          component: StudentComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.Student }
        }, 
        {
          path: 'payment',
          pathMatch: 'full',
          component: PaymentComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.Payment }
        }, 
        {
          path: 'report',
          pathMatch: 'full',
          component: ReportComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.AdminReport }
        }, 
        {
          path: 'merit',
          pathMatch: 'full',
          component: MeritComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.Merit }
        }, 
        {
          path: 'event',
          pathMatch: 'full',
          component: EventComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.Event }
        }, 
        {
          path: 'event',
          pathMatch: 'full',
          component: EventComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.Event }
        }, 
        {
          path: 'attendance',
          pathMatch: 'full',
          component: StudentAttendanceComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.Attendance }
        }, 
        {
          path: 'admin-payment',
          pathMatch: 'full',
          component: AdminPayment,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.AdminPayment }
        }, 
        {
          path: 'admin-school',
          pathMatch: 'full',
          component: AdminSchoolComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.AdmiSchool }
        }, 
        {
          path: 'webData',
          pathMatch: 'full',
          component: WebDataComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.WebData }
        }, 
        {
          path: 'coach-data',
          pathMatch: 'full',
          component: CoachDataComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.WebData }
        }, 
        {
          path: 'user-mgt',
          pathMatch: 'full',
          component: UserManagementComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.UserMgt }
        }, 
        {
          path: 'sgfi-entries',
          pathMatch: 'full',
          component: SgfiEntriesComponent,
          canActivate: [PermissionGuard],  
          data: { adminpermission: AdminPermission.SgfiEntries }
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
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
