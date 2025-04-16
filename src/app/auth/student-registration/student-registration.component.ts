import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { SchoolService } from "src/app/admin/service/school.service";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
  ngOnInit() {}
  studentForm: FormGroup;
  submitted = false;
  imagePreview: string | ArrayBuffer | null = null;

  classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  games = ["Football", "Basketball", "Cricket", "Badminton"];
  tshirtSizes = ["S", "M", "L", "XL"];
  fileError: string = "";
  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      studentName: ["", [Validators.required, Validators.minLength(3)]],
      fatherName: ["", [Validators.required, Validators.minLength(3)]],
      admissionNo: [
        "",
        [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)],
      ],
      dob: ["", Validators.required],
      class: ["", Validators.required],
      adharNo: ["", [Validators.required, Validators.pattern(/^\d{12}$/)]],
      contactNo: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
      game: ["", Validators.required],
      tshirtSize: ["", Validators.required],
      curriculum: ["", Validators.required],
      photo: [null, Validators.required],
    });
  }

  // Enable submit button only if the form is valid
  get isFormValid() {
    return this.studentForm.valid;
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
  // Handle file validation
  onFileSelect(event: any) {
    console.log(event);
    const file = event.target.files[0]; //event.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        this.fileError = "Only PNG and JPEG files are allowed.";
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
      this.studentForm.patchValue({ photo: file });
    }
  }
  // Submit form
  onSubmit() {
    this.submitted = true;
    if (this.studentForm.valid) {
      console.log("Form Data:", this.studentForm.value);
      alert("Form submitted successfully!");
    }
  }
}
