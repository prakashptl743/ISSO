import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
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
  templateUrl: "./school-registration.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./school-registration.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class SchoolRegistrationComponent implements OnInit {
  netImage: any = "assets/images/general/isso_logo.png";
  display: boolean = true;
  schoolForm: FormGroup;
  fileForm: FormGroup;
  verifyEmail: FormGroup;
  isRegisteredSchool: boolean = true;
  isDocUpload: boolean = false;
  registeredSchoolData: any;
  verifyEmailForSchool: any;
  showErrorMessage: boolean;
  schoolId: any;
  fileName: number;
  fullFilename: string;
  selectedProfile: string;
  isValidFile: boolean = true;
  isFileBig: boolean = false;
  editStudentPhoto: string;
  studentPhoto: any;
  reactiveForm!: FormGroup;
  user: IUser;
  showEmailErrorMessage: boolean = false;
  emailOfSchool: string;
  showDialog() {
    this.display = true;
  }

  errormessage: boolean;
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: { errorTitle: ""; errorDesc: "" };
  loginError: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pb: FormBuilder,
    private cdr: ChangeDetectorRef,
    //private authService1 :SchoolService,
    private authService: AuthService,
    private httpClient: HttpClient,
    private schoolService: SchoolService,
    private confirmation: ConfirmationService,
    private messageService: MessageService
  ) {
    this.user = {} as IUser;
  }

  ngOnInit() {
    this.errormessage = false;
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.authService.logout();
    this.initialForm();
    this.initialEmailForm();
    this.fileUpladForm();
    this.setInitialForm();
  }

  get name() {
    return this.reactiveForm.get("name")!;
  }

  get nickname() {
    return this.reactiveForm.get("nickname")!;
  }

  get email() {
    return this.reactiveForm.get("email")!;
  }

  get password() {
    return this.reactiveForm.get("password")!;
  }

  public validate(): void {
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }

    this.user = this.reactiveForm.value;

    console.info("Name:", this.user.name);
    console.info("Nickname:", this.user.nickname);
    console.info("Email:", this.user.email);
    console.info("Password:", this.user.password);
  }

  fileUpladForm() {
    this.fileForm = this.pb.group({
      schoolId: [""],
      profile: ["", Validators.required],
    });
  }

  setInitialForm() {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      nickname: new FormControl(this.user.nickname, [Validators.maxLength(10)]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
        // emailValidator(),
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(15),
      ]),
    });
  }

  initialForm() {
    this.schoolForm = this.fb.group({
      schoolId: [""],
      schoolname: ["", Validators.required],
      schoolEmail: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      schoolPassword: [""],
      schoolInfra: ["", Validators.required],
      schoolTelePhone: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
          Validators.min(1000000000),
          Validators.max(999999999999),
        ],
      ],
      enrollNo: ["", Validators.required],
      author1: ["", Validators.required],
      designation1: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
          Validators.min(1000000000),
          Validators.max(999999999999),
        ],
      ],
      author2: ["", Validators.required],
      designation2: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+$"),
          Validators.min(1000000000),
          Validators.max(999999999999),
        ],
      ],
      gameCoach: ["", Validators.required],
      schoolAddress: ["", Validators.required],
    });
  }
  get f() {
    return this.schoolForm.controls;
  }
  initialEmailForm() {
    this.verifyEmail = this.fb.group({
      varifyEmail: ["", Validators.required],
    });
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  checkEmail(email) {
    this.emailOfSchool = email.target.value;
    this.schoolService.verifyEmail(this.emailOfSchool).subscribe(
      (data) => {
        console.log("DATE===", data);

        this.verifyEmailForSchool = data;
        if (data.exists) {
          //this.schoolId = data[0].schoolId;
          this.emailOfSchool = "";
          console.log("this.emailOfSchool===", this.emailOfSchool);
          this.showEmailErrorMessage = true;
        } else {
          console.log("Im errror");
          this.showEmailErrorMessage = false;
        }
        //  console.log('NEWDATA+++>'+JSON.stringify(this.registeredSchoolData[0]));
      },
      (error) => (this.error = error)
    );
  }
  registerSchool() {
    this.showEmailErrorMessage = false;
    this.isRegisteredSchool = true;
    this.isDocUpload = false;
  }
  uploadDoc() {
    this.showEmailErrorMessage = false;
    this.isRegisteredSchool = false;
    this.isDocUpload = true;
    this.schoolId = "";
    this.verifyEmail.reset();
  }
  onFileUpload() {
    const formData = new FormData();

    formData.append("schoolId", this.schoolId);
    formData.append(
      "profile",
      this.fileForm.get("profile").value,
      this.fullFilename
    );
    this.schoolService.uploadDoc(formData).subscribe(
      (res) => {
        console.log("RES==>", res);
        if (res.status === "error") {
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: "Validation failed",
          });
        } else {
          //  this.addClass = true;
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Document uploaded Successfully",
          });
          this.selectedProfile = "";
          // this.studentEnroolForm.reset();
          // this.loadStudentData();
          // this.selectedSubGame1 = '';
        }
      },
      (error) => (this.error = error)
    );
  }
  onFileSelected(event) {
    if (event.target.files) {
      //  var reader = new FileReader();
      //  reader.readAsDataURL(event.target.files[0]);
      //  reader.onload=(event:any)=>{
      //   // this.url=event.target.result;
      //  }
      var newName = event.target.files[0].name
        .split(".")
        .slice(0, -1)
        .join(".");
      // if(newName.indexOf('.') !== -1)
      // {
      //   this.isMoreDot = true;
      // } else {
      //    this.isMoreDot = false;
      // }

      var removeSpace = newName.replace(/\s/g, "");
      var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "");
      console.log(removeSpecialChar);
      var ext = event.target.files[0].name.split(".").pop();
      this.fileName = Math.floor(Math.random() * 1000000000 + 1);
      this.fullFilename = removeSpecialChar + this.fileName + "." + ext;

      // this.blobName = this.fullFilename
      const profile = event.target.files[0];
      const fileType = profile.type;
      // console.log(profile);
      if (fileType == "application/pdf" || fileType == "application/PDF") {
        this.isValidFile = true;
      } else {
        this.isValidFile = false;
        this.selectedProfile = "";
        //  if(document.getElementById('my-input')) {
        //      let control2 = this.fileForm.get('profile');
        //      control2.setValue(null);
        //      control2.setValidators([Validators.required]);
        //      control2.updateValueAndValidity();
        //  }
      }
      if (profile.size > 102400) {
        this.isFileBig = true;
        this.selectedProfile = "";
        //  if(document.getElementById('my-input')) {
        //   let control2 = this.fileForm.get('profile');
        //   control2.setValue(null);
        //   control2.setValidators([Validators.required]);
        //   control2.updateValueAndValidity();
        // }
      } else {
        this.isFileBig = false;
      }
      this.fileForm.get("profile").setValue(profile);
    }
  }

  onEmailVerify() {
    let emailVal = this.verifyEmail.get("varifyEmail").value;
    this.schoolService.verifyEmail(emailVal).subscribe(
      (data) => {
        console.log(data);

        this.registeredSchoolData = data;
        if (this.registeredSchoolData.length > 0) {
          this.schoolId = data[0].schoolId;
          this.showErrorMessage = false;
        } else {
          console.log("Im errror");
          this.showErrorMessage = true;
        }

        console.log(
          "NEWDATA+++>" + JSON.stringify(this.registeredSchoolData[0])
        );
      },
      (error) => (this.error = error)
    );
    this.verifyEmail.reset();
  }
  onSubmit() {
    this.submitted = true;
    const formData = new FormData();
    let password;
    let schoolID = this.schoolForm.get("schoolId").value;
    let schoolName = this.schoolForm.get("schoolname").value;
    schoolName = schoolName.trim();
    password = schoolName.replace(/\s/g, "");
    console.log("Hello===>" + schoolName.replace(/\s/g, ""));
    password = password.substring(0, 5) + "12345";
    console.log("password===>" + password);

    formData.append("schoolname", schoolName);
    formData.append("schoolEmail", this.schoolForm.get("schoolEmail").value);
    formData.append("schoolPassword", password);
    formData.append("schoolInfra", this.schoolForm.get("schoolInfra").value);
    formData.append(
      "schoolTelePhone",
      this.schoolForm.get("schoolTelePhone").value
    );
    formData.append("enrollNo", this.schoolForm.get("enrollNo").value);

    formData.append("author1", this.schoolForm.get("author1").value);
    formData.append("designation1", this.schoolForm.get("designation1").value);
    formData.append("author2", this.schoolForm.get("author2").value);
    formData.append("designation2", this.schoolForm.get("designation2").value);
    formData.append("gameCoach", this.schoolForm.get("gameCoach").value);
    formData.append(
      "schoolAddress",
      this.schoolForm.get("schoolAddress").value
    );
    //if(schoolID == '') {
    this.schoolService.schoolRegistration(formData).subscribe(
      (res) => {
        if (res.status === "error") {
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: "Validation failed",
          });
        } else {
          this.schoolForm.reset();
          this.showEmailErrorMessage = false;
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "You have registered Successfully",
          });
        }
        this.display = false;
        // this.getSchoolData();
      },
      (error) => (this.error = error)
    );

    //}
    //else {
    // this.schoolService.editSchoolData(schoolID,formData).subscribe(
    //   res => {
    //       if (res.status === 'success') {
    //         console.log('Im success')
    //         this.messageService.add({key: 'custom', severity:'success', summary: 'School Data Updated Successfully'});

    //         //this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
    //      }
    //     else {
    //        this.messageService.add({key: 'custom', severity:'success', summary: 'School Data Updated Successfully'});

    //       }
    //     this.display =false
    //     this.getSchoolData();
    //   },
    //   error => this.error = error
    // );

    // }
  }
}
