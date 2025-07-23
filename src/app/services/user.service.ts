import { Injectable } from "@angular/core";

export enum Permission {
  EventDashboard = "EventDashboard",
  StudentEnrollment = "StudentEnrollment",
  StudentDashboard = "StudentDashboard",
  CoachEntries = "CoachEntries",
  Report = "Report",
  InvoiceReceipt = "InvoiceReceipt",
  PayNow = "PayNow",
  Volunteer = "Volunteer",
  Sgfi = "Sgfi",
  StudentProfile = "StudentProfile",
  StudentProfileEnrollment = "StudentProfileEnrollment",
  Profile = "Profile",
}
export enum AdminPermission {
  Game = "Game",
  Dashboard = "Dashboard",
  SubGame = "SubGame",
  UpcomingEvent = "UpcomingEvent",
  EventReport = "EventReport",
  TeamReport = "TeamReport",
  Student = "Student",
  Payment = "Payment",
  AdminReport = "AdminReport",
  Merit = "Merit",
  Event = "Event",
  Attendance = "Attendance",
  AdminPayment = "AdminPayment",
  AdmiSchool = "AdmiSchool",
  WebData = "WebData",
  UserMgt = "UserMgt",
  SgfiEntries = "SgfiEntries",
  ManageEvent = "ManageEvent",
  MapGame = "MapGame",
  PaymentInvoice = "PaymentInvoice",
  DownloadInvoice = "DownloadInvoice",
  DownloadReceipt = "DownloadReceipt",
  SgfiFee = "SgfiFee",
  IsfFee = "IsfFee",
  ChangePass = "ChangePass",
  IsfData = "IsfData",
  PrintMerit = "PrintMerit",
  ConsolitedMerit = "ConsolitedMerit",
  Sgfiaddstudent = "Sgfiaddstudent",
  Sgfiviewstudent = "Sgfiviewstudent",
  Sgfidownloadpayment = "Sgfidownloadpayment",
  ProfileViewStudent = "ProfileViewStudent",
  SearchStudentProfile = "SearchStudentProfile",
}
@Injectable({
  providedIn: "root",
})
export class UserService {
  public username: string;
  //this.schoolType = localStorage.getItem('isAffiliate');
  // console.log('Im user service--->'+localStorage.getItem('isAffiliate'));
  // in real world, we would fill this from jwt token or cookie or call to some API
  permissions = [
    Permission.EventDashboard,
    Permission.StudentEnrollment,
    Permission.StudentDashboard,
    Permission.CoachEntries,
    Permission.Report,
    Permission.InvoiceReceipt,
    Permission.PayNow,
    Permission.Volunteer,
    Permission.Sgfi,
    Permission.StudentProfile,
    Permission.StudentProfileEnrollment,
    Permission.Profile,
  ];

  adminpermission = [
    AdminPermission.Game,
    AdminPermission.Dashboard,
    AdminPermission.SubGame,
    AdminPermission.UpcomingEvent,

    AdminPermission.EventReport,
    AdminPermission.TeamReport,
    AdminPermission.Student,
    AdminPermission.Payment,
    AdminPermission.AdminReport,
    AdminPermission.Merit,
    AdminPermission.Event,
    AdminPermission.Attendance,
    AdminPermission.AdminPayment,

    AdminPermission.AdmiSchool,
    AdminPermission.WebData,
    AdminPermission.UserMgt,
    AdminPermission.SgfiEntries,
    AdminPermission.ManageEvent,
    AdminPermission.MapGame,
    AdminPermission.PaymentInvoice,
    AdminPermission.DownloadInvoice,
    AdminPermission.DownloadReceipt,
    AdminPermission.SgfiFee,
    AdminPermission.IsfFee,
    AdminPermission.ChangePass,
    AdminPermission.IsfData,
    AdminPermission.PrintMerit,
    AdminPermission.ConsolitedMerit,
    AdminPermission.Sgfiaddstudent,
    AdminPermission.Sgfiviewstudent,
    AdminPermission.Sgfidownloadpayment,
    AdminPermission.ProfileViewStudent,
    AdminPermission.SearchStudentProfile,
  ];
  public isAuthorizedFor(permissions: Permission): boolean {
    return this.permissions.indexOf(permissions) >= 0;
  }
  public isAuthorizedForAdmin(adminpermission: AdminPermission): boolean {
    return this.adminpermission.indexOf(adminpermission) >= 0;
  }

  // Below code for original back up
  //   public isAuthorizedFor(permissions: Permission): boolean {
  //     return this.permissions.indexOf(permissions) >= 0;
  //   }

  //   public isAuthorizedForAdmin(adminpermission: AdminPermission): boolean {
  //     return this.adminpermission.indexOf(adminpermission) >= 0;
  //   }
}
