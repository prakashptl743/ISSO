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
  selector: "parent-dashboard",
  templateUrl: "./parent-dashboard.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./parent-dashboard.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class ParentDashboardComponent implements OnInit, OnChanges {
  filteredPages: any[];
  schoolName: any;
  serverUrl = environment.baseUrl;
  submitted = false;
  isEnrollSubmitted = false;

  schoolListResponse: any;
  schoolListArray = [];
  error: { errorTitle: ""; errorDesc: "" };

  schoolId: any;
  editStudentForm!: FormGroup;
  isStudentEnrollForm: boolean = true;
  studentData: any;
  studentProfileData: any;
  studentDataLength: number;
  setPhotoYear: string;
  menuLabel: string;
  isLoading: boolean = false; // Control the loader's visibility
  today: string;
  display: boolean;
  editStudentProfile: any;
  editStudentData: boolean;
  tShirtSize: any;
  standardClass;
  studentId: any;
  dialogTitle: string;
  fileError: string;
  imagePreview: string | ArrayBuffer | null = null;
  uploadedFile: null;
  isMoreDot: boolean;
  fullFilename: string;
  fileName: number;
  oldPhoto: any;
  selectedFile: any;
  studentUniqueId: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private parentDashboardService: ParentDashboardService,
    private messageService: MessageService,
    private issoUtilService: IssoUtilService,
    private studentProfileService: StudentProfileService,
    private payemntService: PaymentService,
    private renderer: Renderer2
  ) {}
  ngOnChanges(changes): void {}
  ngOnInit() {
    const now = new Date();
    this.today = now.toISOString();
    this.setPhotoPath();
    this.menuLabel = "dashboard";
    console.log("IM DATA-->" + localStorage.getItem("studentData"));
    this.studentData = localStorage.getItem("studentData");
    this.getProfileData();
    if (this.studentData) {
      console.log("Im blank");
      this.studentData = JSON.parse(
        localStorage.getItem("studentData") || "[]"
      );
      this.getStudentDetails();
    } else {
      this.router.navigate(["student-registration"]);
    }
    this.tShirtSize = this.issoUtilService.setTshirtSize();
    this.standardClass = this.issoUtilService.setClass();
    //console.log("NEWDATA--->" + JSON.stringify(storedArray)); // ["apple", "banana", "cherry"]
  }
  get f() {
    return this.editStudentForm.controls;
  }
  setPhotoPath() {
    this.setPhotoYear =
      this.serverUrl +
      "upload/" +
      this.issoUtilService.getAcademicYearForPhoto();
  }
  onImageError(event: any) {
    event.target.src = "assets/images/default-user.png";
  }
  changeMenu(menuType) {
    if (menuType == "dashboard") {
      this.menuLabel = "dashboard";
    } else if (menuType == "certificate") {
      this.menuLabel = "certificate";
    } else if (menuType == "profile") {
      this.menuLabel = "profile";
    } else {
      localStorage.removeItem("studentData");
      this.router.navigate(["student-registration"]);
    }
  }
  getStudentDetails() {
    this.isLoading = true;
    this.parentDashboardService
      .getStudentDetails(this.studentData[0].sId, this.studentData[0].schoolId)
      .subscribe(
        (response: any[]) => {
          this.isLoading = false;
          //if (response !== "") {
          console.log("DATA parent" + JSON.stringify(response));
          this.studentProfileData = response;
          this.studentDataLength = Object.keys(this.studentProfileData).length;
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
  getProfileData() {
    const studentDataStr = JSON.parse(localStorage.getItem("studentData"));
    console.log("Im data-->" + studentDataStr);
    const formData = new FormData();

    formData.append("studentId", studentDataStr[0].studentUniqueId);
    this.studentProfileService.checkStudentEnroll(formData).subscribe((res) => {
      this.studentData = res;
      console.log("resp data---->" + JSON.stringify(res));
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
      formData.append("selectedYear", this.getCurrentAcademicYear());

      const control = this.editStudentForm.get("photo");
      if (control && control.value) {
        const file = control.value;
        console.log("Selected file:", file.name);
      }
      if (this.selectedFile) {
        formData.append("profile", this.fullFilename);
        formData.append(
          "profile",
          this.editStudentForm.get("photo").value,
          this.fullFilename
        );
      } else {
        formData.append("profile", this.fullFilename);
        formData.append("profile", this.oldPhoto); // Send old file name to backend
      }

      this.parentDashboardService.studentDataUpdate(formData).subscribe(
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
          this.getProfileData();
          //this.getStudentDetails();
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
    this.selectedFile = "";
  }
  payNow(amt, student) {
    console.log(student.studentId);
    console.log("DATA---->" + JSON.stringify(student));
    this.isLoading = true;
    // this.totalAmount = amt;
    // this.studentId = studentId;
    // this.paymentTypeInfo = paymentType;
    let options = {
      key: "rzp_live_08wdE0QgVsFNVd", // Enter the Key ID generated from the Dashboard
      amount: amt * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      // "amount": 100,
      currency: "INR",
      name: "PARTICIPATION PAYMENT",
      description: student.gameName,
      image: "https://issoindia.com/assets/img/logo_retina.png",
      handler: (response) => {
        console.log("Im respse");
        this.paymentCapture(response, student);
      },
      modal: {
        escape: false,
        ondismiss: () => {
          this.isLoading = false;
          console.warn("User exited the payment without completing it.");
          // 👉 You can perform your logic here, like showing a message or updating state
          // this.onPaymentExit();
        },
      },
      callback_url: "",
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var propay = new this.payemntService.nativeWindow.Razorpay(options);
    propay.open();

    propay.on("payment.success", function (resp) {
      alert("payment checking.");
      alert(resp.razorpay_payment_id),
        alert(resp.razorpay_order_id),
        alert(resp.razorpay_signature);
    });
    propay.on("payment.failed", (response: any) => {
      this.isLoading = false;
      console.error("Payment Failed:", response.error);
      // this.paymentFailed = true;
    });
  }

  paymentCapture(response, student) {
    console.log("Payemnt Resp--" + response.razorpay_payment_id);
    const studentData = [
      student.studentId,
      response.razorpay_payment_id,
      student.eventId,
      student.gameId,
      student.ageRange,
      student.gender,
    ];

    this.renderer.removeClass(document.body, "no-scroll");

    const formData = new FormData();
    formData.append("studentId", student.studentId);
    formData.append("gameId", student.gameId);
    formData.append("eventId", student.eventId);
    formData.append("ageRange", student.ageRange);
    formData.append("gender", student.gender);
    formData.append("paymentId", response.razorpay_payment_id);

    this.parentDashboardService.updatePaymentStatus(formData).subscribe(
      (res) => {
        if (res.status === "success") {
          this.copyStudentData(
            student.studentId,
            student.gameId,
            student.eventId,
            student.ageRange,
            student.gender
          );
        }
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
  }
  getFilteredSubgames(subGameString: string): string[] {
    if (!subGameString) return [];
    return subGameString
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  copyStudentData(studentId, gameId, eventId, ageRange, gender) {
    this.parentDashboardService
      .copyStudentData(studentId, gameId, eventId, ageRange, gender)
      .subscribe(
        (res) => {
          this.isLoading = false;
          // Remove 'no-scroll' class from the body to unfreeze the screen

          if (res.status === "success") {
            this.messageService.add({
              key: "custom",
              severity: "success",
              summary: "Payment Accepted Successfully",
            });
          }
          this.getStudentDetails();
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
  }
  toggleLoader(): void {
    this.isLoading = !this.isLoading;
    if (this.isLoading) {
      this.startLoading();
    } else {
      this.stopLoading();
    }
  }
  // You would typically call these methods before/after an HTTP request
  startLoading(): void {
    this.isLoading = true;
    // Add 'no-scroll' class to the body to freeze the screen
    this.renderer.addClass(document.body, "no-scroll");
    console.log("Loader shown, screen frozen.");
  }
  onFileSelect(event: any) {
    console.log(event);
    this.fileError = "";
    this.imagePreview = null;
    this.uploadedFile = null;
    const file = event.target.files[0]; //event.files[0];
    if (file) {
      this.selectedFile = file;
    }
    var newName = event.target.files[0].name.split(".").slice(0, -1).join(".");
    if (newName.indexOf(".") !== -1) {
      this.isMoreDot = true;
    } else {
      this.isMoreDot = false;
    }
    if (file) {
      const validTypes = [
        "image/png",
        "image/jpeg",
        "image/JPEG",
        "image/jpg",
        "image/JPG",
        "image/PNG",
      ];
      if (!validTypes.includes(file.type) && !this.isMoreDot) {
        this.fileError = "File type not supported.";
        return;
      }
      if (file.size > 100 * 1024) {
        this.fileError = "File size must be below 100KB.";
        return;
      }

      this.fileError = "";
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);

      var removeSpace = newName.replace(/\s/g, "");
      var ext = event.target.files[0].name.split(".").pop();
      this.fileName = Math.floor(Math.random() * 1000000000 + 1);
      this.fullFilename = removeSpace + this.fileName + "." + ext;
      this.editStudentForm.patchValue({ photo: file });
      this.uploadedFile = file;
    }
  }
  editStudent(student: any) {
    this.dialogTitle =
      "Updating profile for year:" +
      this.issoUtilService.getAcademicYearForPhoto();
    this.display = true;
    this.editStudentData = true;
    this.editStudentProfile = student[0];
    this.studentId = student[0].sId;
    this.studentUniqueId = student[0].studentUniqueId;
    this.imagePreview = this.setPhotoYear + "/" + student[0].photo;
    this.oldPhoto = student[0].photo;
    this.editStudentForm = this.fb.group({
      studentName: [this.editStudentProfile.studentName, Validators.required],
      fatherName: [this.editStudentProfile.fatherName, Validators.required],
      dateOfBirth: [this.editStudentProfile.dateOfBirth, Validators.required],
      contactNo: [this.editStudentProfile.contactNo, Validators.required],
      aadharNumber: [this.editStudentProfile.aadharNumber, Validators.required],
      admissionNumber: [
        this.editStudentProfile.admissionNumber,
        Validators.required,
      ],
      curruclm: [this.editStudentProfile.curruclm, Validators.required],
      standardClass: [
        this.editStudentProfile.standardClass,
        Validators.required,
      ],
      photo: [null],
      tShirtSize: [this.editStudentProfile.tShirtSize, Validators.required],
      gender: [this.editStudentProfile.gender, Validators.required],
    });
  }
  stopLoading(): void {
    this.isLoading = false;
    // Remove 'no-scroll' class from the body to unfreeze the screen
    this.renderer.removeClass(document.body, "no-scroll");
    console.log("Loader hidden, screen unfrozen.");
  }
  getCurrentAcademicYear(): string {
    const today = new Date();
    const currentYear = today.getFullYear();
    const juneFirst = new Date(currentYear, 5, 1); // Month is 0-based: 5 = June

    if (today >= juneFirst) {
      // If current date is June 1 or after, academic year is current–next
      return `${currentYear}-${currentYear + 1}`;
    } else {
      // If before June 1, academic year is previous–current
      return `${currentYear - 1}-${currentYear}`;
    }
  }

  ngOnDestroy(): void {
    if (this.isLoading) {
      this.renderer.removeClass(document.body, "no-scroll");
    }
  }
}
