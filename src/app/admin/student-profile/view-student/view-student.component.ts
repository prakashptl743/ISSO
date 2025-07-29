import { Component, createPlatform, OnInit } from "@angular/core";
import { ConfirmationService, SelectItem } from "primeng/api";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { MessageService } from "primeng/api";
import { AdminStudentProfileService } from "../../service/admin-student-profile.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";

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
  editStudentProfile: any = null;
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
  editStudentData: boolean;
  genderOptions: SelectItem[];
  tShirtSize: any;
  standardClass;
  editStudentForm!: FormGroup;
  studentId: any;
  isLoading: boolean = false;
  setPhotoYear: string;
  serverUrl = environment.baseUrl;
  studentUniqueId: any;
  constructor(
    private issoUtilService: IssoUtilService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder,
    private adminStudentProfileService: AdminStudentProfileService
  ) {}

  ngOnInit() {
    this.genderOptions = this.issoUtilService.setGender();
    this.tShirtSize = this.issoUtilService.setTshirtSize();
    this.standardClass = this.issoUtilService.setClass();
    this.yearOptions = this.issoUtilService.studentProfileYear();
  }
  setPhotoPath() {
    // this.setPhotoYear = this.issoUtilService.setPhotoYear();
    let photoPath = this.yearvalue;
    this.setPhotoYear = this.serverUrl + "upload/" + photoPath;
  }
  get f() {
    return this.editStudentForm.controls;
  }
  onyeareChange(event) {
    // this.studentAttendanceArray = [];
    // this.studentAbsentArray = [];
    this.isLoading = true;
    this.yearvalue = event.value;
    this.setPhotoPath();
    this.adminStudentProfileService.getSchoolData(event.value).subscribe(
      (response) => {
        this.isLoading = false;
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
    this.schoolId = event.value;
    this.schoolName = event.originalEvent.currentTarget.ariaLabel;
    this.getStudentData();
  }
  getStudentData() {
    this.isLoading = true;
    this.adminStudentProfileService
      .getStudentProfileData(this.yearvalue, this.schoolId)
      .subscribe(
        (response: any[]) => {
          // if (response !== "") {
          this.isLoading = false;
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
    this.editStudentData = false;
    this.selectedStudent = student;
  }
  editStudent(student: any) {
    this.display = true;
    this.editStudentData = true;
    this.editStudentProfile = student;
    this.studentId = student.sId;
    this.studentUniqueId = student.studentUniqueId;
    this.editStudentForm = this.fb.group({
      studentName: [this.editStudentProfile.studentName, Validators.required],
      fatherName: [this.editStudentProfile.fatherName, Validators.required],
      dateOfBirth: [this.editStudentProfile.dateOfBirth, Validators.required],
      contactNo: [this.editStudentProfile.contactNo, Validators.required],
      aadharNumber: [this.editStudentProfile.aadharNumber, Validators.required],
      // admissionNumber: [
      //   this.editStudentProfile.admissionNumber,
      //   Validators.required,
      // ],
      // curruclm: [this.editStudentProfile.curruclm, Validators.required],
      // standardClass: [
      //   this.editStudentProfile.standardClass,
      //   Validators.required,
      // ],
      // tShirtSize: [this.editStudentProfile.tShirtSize, Validators.required],
      gender: [this.editStudentProfile.gender, Validators.required],
    });
  }
  onSubmit() {
    this.isLoading = true;
    if (this.editStudentForm.valid) {
      const formData = new FormData();
      const updatedStudentData = this.editStudentForm.value;
      console.log("Updated Student Data:", updatedStudentData);
      Object.keys(this.editStudentForm.controls).forEach((key) => {
        //formData.append(key, this.studentForm.get(key)?.value);
        const control = this.editStudentForm.get(key);
        formData.append(key, control ? control.value : "");
      });
      formData.append("studentId", this.studentId);
      formData.append("studentUniqueId", this.studentUniqueId);
      this.adminStudentProfileService
        .updateGlobalStudentProfile(formData)
        .subscribe(
          (res) => {
            this.isLoading = false;
            this.display = false;
            if (res.status === "error") {
              this.messageService.add({
                severity: "error",
                summary: "Error Message",
                detail: "Validation failed",
              });
            } else {
              this.messageService.add({
                key: "custom",
                severity: "success",
                summary: "Data Updated Successfully",
              });
            }
            this.getStudentData();
            // this.getSchoolData();
          },
          (error) => {
            this.isLoading = false;
            this.messageService.add({
              key: "custom",
              severity: "error",
              summary: error.errorDesc,
            });
          }
        );
    } else {
      this.editStudentForm.markAllAsTouched();
    }
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
    formData.append("contactNo", student.contactNo);
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
