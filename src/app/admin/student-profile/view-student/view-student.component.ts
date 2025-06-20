import { Component, createPlatform, OnInit } from "@angular/core";
import { ConfirmationService, SelectItem } from "primeng/api";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { MessageService } from "primeng/api";
import { AdminStudentProfileService } from "../../service/admin-student-profile.service";

@Component({
  selector: "app-view-student",
  templateUrl: "./view-student.component.html",
  styleUrls: ["./view-student.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class ViewStudentComponent implements OnInit {
  yearOptions: SelectItem[];
  display: boolean = false;
  selectedStudent: any = null;
  schoolOptions: SelectItem[];
  isDataAvailble: boolean;
  schoolData: any;
  studentProfileData: any;
  studentDataLength: number = 0;
  schoolReadable: boolean;
  approvalCount = 0;
  pendingCount = 0;
  yearvalue: any;
  schoolName: any;
  schoolId: any;
  constructor(
    private issoUtilService: IssoUtilService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private adminStudentProfileService: AdminStudentProfileService
  ) {}

  ngOnInit() {
    this.yearOptions = this.issoUtilService.setYear();
  }
  onyeareChange(event) {
    // this.studentAttendanceArray = [];
    // this.studentAbsentArray = [];
    this.yearvalue = event.value;
    this.adminStudentProfileService.getSchoolData(event.value).subscribe(
      (response) => {
        if (response !== "") {
          this.schoolData = response;

          if (this.schoolData.length > 0) {
            this.schoolOptions = [];
            this.schoolReadable = true;
            this.isDataAvailble = false;
            this.schoolOptions.push({
              label: "Please Select",
              value: "",
            });
            this.schoolData.forEach((element) => {
              this.schoolOptions.push({
                label: element.schoolName,
                value: element.schoolId,
              });
            });
          } else {
            this.isDataAvailble = false;
            this.schoolReadable = false;
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: "Event not found for this year",
            });
          }
        } else {
          console.log("Data is blannk from service");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  onSchoolChange(event) {
    // this.studentAttendanceArray = [];
    // this.studentAbsentArray = [];
    // let yearVal = this.yearvalue.toString();
    // let eventYear = yearVal.split("-");
    // console.log("Hello" + eventYear[1]);
    // this.selectedYearVal = eventYear[1];

    // this.eventValue = event.value;
    this.schoolId = event.value;
    this.schoolName = event.originalEvent.currentTarget.ariaLabel;
    this.getStudentData();
  }
  getStudentData() {
    this.adminStudentProfileService
      .getStudentProfileData(this.yearvalue, this.schoolId)
      .subscribe(
        (response: any[]) => {
          // if (response !== "") {
          this.studentProfileData = response;
          this.studentDataLength = Object.keys(this.studentProfileData).length;
          this.approvalCount = response.filter(
            (student) => student.approvedStatus == "1"
          ).length;
          this.pendingCount = response.filter(
            (student) => student.approvedStatus == "0"
          ).length;
          console.log(this.studentProfileData);
          if (this.studentProfileData.length > 0) {
            // this.gameOptions = [];
            // this.gameReadble = true;
            this.isDataAvailble = false;
          } else {
            this.isDataAvailble = false;
          }
          //  } else {
          console.log("Data is blannk from service");
          // }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }
  onImageError(event: any) {
    event.target.src = "assets/images/default-user.png";
  }
  showDialog(student: any) {
    this.display = true;
    this.selectedStudent = student;
  }
  deleteStudentData(studentId) {
    this.adminStudentProfileService.deleteStudentData(studentId).subscribe(
      (res) => {
        this.messageService.add({
          key: "custom",
          severity: "success",
          summary: "Student Data Deleted Successfully",
        });

        this.getStudentData();
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
  changeApprovalStatus(student: any) {
    const studentId = student.sId;
    const formData = new FormData();
    formData.append("approvedStatus", "1");
    formData.append("schoolName", this.schoolName);
    this.adminStudentProfileService
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
          this.getStudentData();
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
