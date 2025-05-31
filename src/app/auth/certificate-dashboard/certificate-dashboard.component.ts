import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { SchoolService } from "src/app/admin/service/school.service";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { ConfirmationService, SelectItem } from "primeng/api";
import { MessageService } from "primeng/api";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { StudentProfileService } from "src/app/admin/service/student-profile.service";
import { StudentService } from "src/app/admin/service/student.service";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { ParentDashboardService } from "src/app/admin/service/parent-dashboard.service";
import { environment } from "src/environments/environment";
import { PaymentService } from "src/app/staffadmin/service/payment.service";

interface IUser {
  name: string;
  nickname: string;
  email: string;
  password: string;
  showPassword: boolean;
}
//import { SchoolService } from '../service/school.service';
//E:\Angular\new-isso\src\app\admin\service\school.service.ts
@Component({
  selector: "certificate-dashboard",
  templateUrl: "./certificate-dashboard.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./certificate-dashboard.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class CertificateDashboardComponent implements OnInit, OnChanges {
  filteredPages: any[];
  schoolName: any;
  serverUrl = environment.baseUrl;
  submitted = false;
  isEnrollSubmitted = false;

  schoolListResponse: any;
  schoolListArray = [];
  error: { errorTitle: ""; errorDesc: "" };

  schoolId: any;

  isStudentEnrollForm: boolean = true;
  @Input() studentData: any;
  studentProfileData: any;
  studentDataLength: number;
  setPhotoYear: string;
  menuLabel: string;
  isLoading: boolean = false; // Control the loader's visibility
  yearOptions: SelectItem[];
  yearvalue: any;
  baseUrl: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private parentDashboardService: ParentDashboardService,
    private messageService: MessageService,
    private issoUtilService: IssoUtilService,

    private payemntService: PaymentService,
    private renderer: Renderer2
  ) {}
  ngOnChanges(changes): void {}
  setPhotoPath() {
    this.setPhotoYear =
      this.serverUrl +
      "upload/" +
      this.issoUtilService.getAcademicYearForPhoto();
  }
  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.setPhotoPath();
    console.log("Im certficate" + JSON.stringify(this.studentData));
    this.yearOptions = this.issoUtilService.setCertificateYear();
    this.studentProfileData = [];
  }
  onyeareChange(event) {
    this.yearvalue = event.value;
    this.studentProfileData = [];
    if (this.yearvalue) {
      this.isLoading = true;
      this.parentDashboardService
        .getStudentDataForCertificate(
          this.yearvalue,
          this.studentData[0].studentUniqueId
        )
        .subscribe(
          (response: any[]) => {
            this.isLoading = false;
            //if (response !== "") {
            console.log("CERTIFICATE DATA Certificate-->>" + response);
            this.studentProfileData = response;
            this.studentDataLength = Object.keys(
              this.studentProfileData
            ).length;
          },
          (error) => {
            this.isLoading = false;
            console.log("this is error-->" + JSON.stringify(error.errorDesc));
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: error.errorDesc,
            });
          }
        );
    }
  }

  onImageError(event: any) {
    event.target.src = "assets/images/default-user.png";
  }
  toggleLoader(): void {
    this.isLoading = !this.isLoading;
    if (this.isLoading) {
      this.startLoading();
    } else {
      this.stopLoading();
    }
  }

  getSubgameKeys(student: any): string[] {
    return Object.keys(student).filter((key) => !isNaN(Number(key)));
  }

  hasSubgames(student: any): boolean {
    return this.getSubgameKeys(student).length > 0;
  }
  getSubgameCount(student: any): number {
    let count = 0;
    this.getSubgameKeys(student).forEach((key) => {
      if (Array.isArray(student[key])) {
        count += student[key].length;
      }
    });
    return count;
  }
  // You would typically call these methods before/after an HTTP request
  startLoading(): void {
    this.isLoading = true;
    // Add 'no-scroll' class to the body to freeze the screen
    this.renderer.addClass(document.body, "no-scroll");
    console.log("Loader shown, screen frozen.");
  }

  stopLoading(): void {
    this.isLoading = false;
    // Remove 'no-scroll' class from the body to unfreeze the screen
    this.renderer.removeClass(document.body, "no-scroll");
    console.log("Loader hidden, screen unfrozen.");
  }
  ngOnDestroy(): void {
    if (this.isLoading) {
      this.renderer.removeClass(document.body, "no-scroll");
    }
  }
}
