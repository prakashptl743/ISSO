import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import * as moment from "moment";

import { MessageService, SelectItem, Message } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { PaymentService } from "../service/payment.service";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "src/environments/environment";
import { StudentProfileService } from "src/app/admin/service/student-profile.service";
import { IssoUtilService } from "src/app/services/isso-util.service";
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: "app-student-profile",
  templateUrl: "./student-profile.component.html",
  styleUrls: ["./student-profile.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class StudentProfileComponent implements OnInit {
  display: boolean = false;
  yearOptions: object;
  schoolId: string;
  studentProfileData: Object;
  setPhotoYear: string;
  serverUrl = environment.baseUrl;
  studentDataLength: number;
  selectedIndex: any;
  selectedStudent: any = null;
  isFirstYear: boolean;
  selectedYearVal: any;
  approvalCount = 0;
  pendingCount = 0;
  schoolName: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private messageService: MessageService,
    private studentProfileService: StudentProfileService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService,
    private issoUtilService: IssoUtilService
  ) {}
  ngOnInit(): void {
    this.schoolId = localStorage.getItem("schoolId");
    this.schoolName = localStorage.getItem("schoolName");
    this.yearOptions = this.issoUtilService.setYearToStaffadmin();
    //this.getStudentData();
    this.setPhotoPath();
    this.getStudentData(this.yearOptions[1].year);
  }
  setPhotoPath() {
    this.setPhotoYear =
      this.serverUrl +
      "upload/" +
      this.issoUtilService.getAcademicYearForPhoto();
  }
  getStudentData(val) {
    //alert(new Date().getFullYear());
    //const curre
    //const eventYear = val;
    const currentYear = new Date().getFullYear();
    const endYear = parseInt(val.split("-")[1]);

    if (currentYear !== endYear) {
      this.isFirstYear = false;
    } else {
      this.isFirstYear = true;
    }
    this.selectedYearVal = val;
    this.studentProfileService
      .getStudentProfileData(val, this.schoolId)
      .subscribe(
        (response: any[]) => {
          //if (response !== "") {

          this.studentProfileData = response;
          this.studentDataLength = Object.keys(this.studentProfileData).length;
          this.approvalCount = response.filter(
            (student) => student.approvedStatus == "1"
          ).length;
          this.pendingCount = response.filter(
            (student) => student.approvedStatus == "0"
          ).length;
          //}
        },
        (error) => {
          console.log("this is error-->" + JSON.stringify(error.errorDesc));
          this.messageService.add({
            key: "custom",
            severity: "error",
            summary: error.errorDesc,
          });
        }
      );
  }
  showDialog(student: any) {
    this.display = true;
    this.selectedStudent = student;
  }
  onImageError(event: any) {
    event.target.src = "assets/images/default-user.png";
  }
  deleteStudentData(studentId) {
    this.studentProfileService.deleteStudentData(studentId).subscribe(
      (res) => {
        this.messageService.add({
          key: "custom",
          severity: "success",
          summary: "Student Data Deleted Successfully",
        });

        this.getStudentData(this.selectedYearVal);
      },
      (error) => {
        this.messageService.add({
          key: "custom",
          severity: "error",
          summary: error.errorDesc,
        });
      }
    );
  }
  deleteStudent(studentId) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: "confirm-delete-student",
      icon: "pi pi-info-circle",
      message: "Are you sure to delete student data?",
      accept: () => {
        this.deleteStudentData(studentId);
      },
    });
  }
  // getStudentData() {
  //   this.studentProfileService.getStudentProfileData(this.schoolId).subscribe(
  //     (response) => {
  //       if (response !== "") {
  //         this.studentProfileData = response;
  //         this.studentDataLength = Object.keys(this.studentProfileData).length;
  //       }
  //     },
  //     (error) => {
  //       console.log("this is error-->" + JSON.stringify(error.errorDesc));
  //       this.messageService.add({
  //         key: "custom",
  //         severity: "error",
  //         summary: error.errorDesc,
  //       });
  //     }
  //   );
  // }
  changeApprovalStatus(student: any) {
    const studentId = student.sId;
    const formData = new FormData();
    formData.append("approvedStatus", "1");
    formData.append("studentName", student.studentName);
    formData.append("contactNo", student.contactNo);
    formData.append("schoolName", this.schoolName);

    this.studentProfileService
      .changeApprovalStatus(studentId, formData)
      .subscribe(
        (res) => {
          if (res.status === "success") {
            this.messageService.add({
              key: "custom",
              severity: "success",
              summary: "Approved Successfully",
            });
          }
          this.getStudentData(this.selectedYearVal);
        },
        (error) => {
          this.messageService.add({
            key: "custom",
            severity: "error",
            summary: error.errorDesc,
          });
        }
      );
  }
}
