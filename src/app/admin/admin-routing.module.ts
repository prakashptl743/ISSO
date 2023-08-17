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
 
const routes: Routes = [
  {
    path: 'admin',component: AdminComponent,canActivate: [AuthGuard],
    
    children: [
      {
      path: '',
      children: [
        { path: 'blogs', component: ManageBlogsComponent },
        { path: 'blogs/create', component: BlogFormComponent },
        { path: 'blogs/edit/:id', component: BlogFormComponent },
        { path: 'categories', component: ManageCategoriesComponent },
        { path: 'pages', component: ManagePagesComponent },
        // { path: 'dashboard', component: AdminComponent },
        { path: 'game', component: GameComponent },
        { path: 'dashboard', component: TestComponent },
        { path: 'subgame', component: SubGameComponent },
        { path: 'upcomingevent', component: UpcomingEventComponent },
        { path: 'manageeventreport', component: ManageEventReport },   
        { path: 'ManageTeamReport', component: ManageTeamReport },          
        { path: 'student', component: StudentComponent },
        { path: 'payment', component: PaymentComponent },
        { path: 'report', component: ReportComponent },
        { path: 'merit', component: MeritComponent },
        { path: 'event', component: EventComponent },
        { path: 'coach-data', component: CoachDataComponent },
        { path: 'attendance', component: StudentAttendanceComponent },
        { path: 'admin-payment', component: AdminPayment },
        { path: 'admin-school', component: AdminSchoolComponent },
        { path: 'webData', component: WebDataComponent },
        { path: 'user-mgt', component: UserManagementComponent },
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
