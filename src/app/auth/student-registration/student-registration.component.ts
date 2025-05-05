import { Component, OnInit, ViewEncapsulation } from "@angular/core";
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
  selector: "app-login",
  templateUrl: "./student-registration.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./student-registration.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class StudentRegistrationComponent implements OnInit {
  filteredPages: any[];
  schoolName: any;
  studentForm: FormGroup;
  issoEnrolledForm: FormGroup;
  submitted = false;
  isEnrollSubmitted = false;
  imagePreview: string | ArrayBuffer | null = null;
  schoolListResponse: any;
  schoolListArray = [];
  error: { errorTitle: ""; errorDesc: "" };
  classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  tshirtSizes = ["S", "M", "L", "XL"];
  fileError: string = "";
  uploadedFile: File | null = null;
  schoolId: any;
  genderOptions: SelectItem[];
  tShirtSize: any;
  standardClass;
  isMoreDot: boolean;
  fullFilename: string;
  fileName: number;
  minDate: Date;
  maxDate: Date;
  isStudentEnrollForm: boolean = true;
  constructor(
    private fb: FormBuilder,
    private studentProfileService: StudentProfileService,
    private messageService: MessageService,
    private issoUtilService: IssoUtilService,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      studentName: ["", [Validators.required, Validators.minLength(3)]],
      fatherName: ["", [Validators.required, Validators.minLength(3)]],
      admissionNo: [
        "",
        [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)],
      ],
      schoolName: ["", Validators.required],
      dob: ["", Validators.required],
      class: ["", Validators.required],
      adharNo: ["", [Validators.required, Validators.pattern(/^\d{12}$/)]],
      contactNo: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
      studentGender: ["", Validators.required],
      tshirtSize: ["", Validators.required],
      curriculum: ["", Validators.required],
      photo: [null, Validators.required],
    });
    this.issoEnrolledForm = this.fb.group({
      studentId: ["", [Validators.required, Validators.minLength(3)]],
    });
  }
  ngOnInit() {
    this.loadAllSchool();
    this.setDateOfBirth();
    this.genderOptions = this.issoUtilService.setGender();
    this.tShirtSize = this.issoUtilService.setTshirtSize();
    this.standardClass = this.issoUtilService.setClass();
  }
  setDateOfBirth() {
    const today = new Date();
    this.maxDate = today;
    this.minDate = new Date(
      today.getFullYear() - 19,
      today.getMonth(),
      today.getDate()
    );
  }
  changeMenu() {
    this.isStudentEnrollForm = !this.isStudentEnrollForm;
    this.studentForm.reset();
    this.issoEnrolledForm.reset();
    console.log("sdfagag-->" + this.isStudentEnrollForm);
  }
  loadAllSchool() {
    this.studentService.loadAllSchool().subscribe(
      (response) => {
        if (response !== "") {
          this.schoolListResponse = response;
          this.schoolListArray = this.schoolListResponse;
        } else {
          console.log("Data is blannk from service");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  // Handle image upload
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
      this.studentForm.patchValue({ photo: file });
    }
  }
  filterPages(event) {
    this.filteredPages = this.filterCountry(event.query, this.schoolListArray);
  }
  onPageSelect(evt: any) {
    console.log(evt.id);
    this.schoolId = evt.id;
  }
  filterCountry(query, countries: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      if (country.text.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    if (filtered.length <= 0) {
      this.schoolName = "";
    }
    return filtered;
  }
  // Handle file validation
  onFileSelect(event: any) {
    console.log(event);
    this.fileError = "";
    this.imagePreview = null;
    this.uploadedFile = null;
    const file = event.target.files[0]; //event.files[0];
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
      this.studentForm.patchValue({ photo: file });
      this.uploadedFile = file;
    }
  }

  // onFileSelect(event: any) {
  //   const file = event.target.files[0];
  //   this.fileError = "";

  //   if (
  //     file &&
  //     (file.type === "image/png" ||
  //       file.type === "image/jpeg" ||
  //       file.type === "image/PNG")
  //   ) {
  //     if (file.size <= 100 * 1024) {
  //       const reader = new FileReader();
  //       reader.onload = () => (this.imagePreview = reader.result);
  //       reader.readAsDataURL(file);
  //       this.uploadedFile = file;
  //     } else {
  //       this.fileError = "File size must be under 100KB";
  //     }
  //   } else {
  //     this.fileError = "Only PNG or JPEG images allowed";
  //   }
  //   console.log()
  // }

  // Submit form
  isFormValid(): boolean {
    return (
      this.studentForm.valid && this.uploadedFile !== null && !this.fileError
    );
  }
  isIssoFormValid(): boolean {
    return this.issoEnrolledForm.valid;
  }
  onIssoEnrollSubmit() {
    this.isEnrollSubmitted = true;
    console.log(this.issoEnrolledForm.value.studentId);
  }
  onSubmit() {
    this.submitted = true;
    const formData = new FormData();
    let datOfbirth = this.studentForm.get("dob").value;
    let formatted_DOB =
      datOfbirth.getFullYear() +
      "-" +
      (datOfbirth.getMonth() + 1) +
      "-" +
      datOfbirth.getDate();
    console.log("asdafsas-->" + formatted_DOB);
    if (this.studentForm.valid) {
      Object.keys(this.studentForm.controls).forEach((key) => {
        //formData.append(key, this.studentForm.get(key)?.value);
        const control = this.studentForm.get(key);
        formData.append(key, control ? control.value : "");
      });

      formData.append("schoolName", this.schoolId);
      formData.append("studentdateOfBirth", formatted_DOB);
      formData.append("profile", this.fullFilename);
      formData.append(
        "profile",
        this.studentForm.get("photo").value,
        this.fullFilename
      );
      this.studentProfileService.studentRegistration(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.messageService.add({
              severity: "error",
              summary: "Error Message",
              detail: "Validation failed",
            });
          } else {
            this.studentForm.reset();
            this.uploadedFile = null;
            this.imagePreview = null;
            this.fileError = "";

            this.imagePreview = "";
            this.studentForm.reset();
            this.messageService.add({
              key: "custom",
              severity: "success",
              summary: "You have registered Successfully",
            });
          }
          // this.getSchoolData();
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
}
