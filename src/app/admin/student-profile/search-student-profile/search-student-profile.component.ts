import { Component, createPlatform, OnInit } from "@angular/core";
import { ConfirmationService, SelectItem } from "primeng/api";
import { IssoUtilService } from "src/app/services/isso-util.service";
import { MessageService } from "primeng/api";
import { AdminStudentProfileService } from "../../service/admin-student-profile.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-search-student-profile",
  templateUrl: "./search-student-profile.component.html",
  styleUrls: ["./search-student-profile.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class SearchStudentProfileComponent implements OnInit {
  yearOptions: SelectItem[];
  display: boolean = false;
  editDialog: boolean = false;
  selectedStudent: any = null;
  editStudentProfile: any = null;

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
  imagePreview: string | ArrayBuffer | null = null;
  editStudentForm!: FormGroup;
  studentId: any;
  isLoading: boolean = false;
  setPhotoYear: string;
  serverUrl = environment.baseUrl;
  searchForm!: FormGroup;
  studentData: any = null;
  searchResult: any;
  searchResultData: any;
  showSearchResult: boolean;
  noSearchData: boolean;
  showDetails: boolean = false;
  activeTab: string = "profile";
  baseUrl: string;
  activeIndex: number = 0;
  title = "👤 Welcome to Profile";
  oldPhoto: any;
  standardClass: { label: string; value: string }[];
  curriculum: { label: string; value: string }[];
  tShirtSize: { label: string; value: string }[];
  fileError: string;
  uploadedFile: null;
  selectedFile: any;
  isMoreDot: boolean;
  fileName: number;
  fullFilename: string;
  studentUniqueId: any;
  studentProfileYearWiseData: any[];
  constructor(
    private issoUtilService: IssoUtilService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder,
    private adminStudentProfileService: AdminStudentProfileService
  ) {}

  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.yearOptions = this.issoUtilService.studentProfileYear();
    this.searchForm = this.fb.group({
      searchQuery: ["", Validators.required],
    });
    this.setPhotoPath();
    this.tShirtSize = this.issoUtilService.setTshirtSize();
    this.standardClass = this.issoUtilService.setClass();
    this.curriculum = this.issoUtilService.setCurriculum();
  }

  beforeTabChange(index: number) {
    // if ((index === 1 || index === 2) && !this.yearvalue) {
    //   alert("Please select a year before accessing this tab.");
    //   return; // block change
    // }
    // console.log("after");

    this.activeIndex = index;
    if (index === 0) this.title = "👤 Welcome to Profile";
    else if (index === 1) this.title = "📅 Welcome to Event Details";
    else if (index === 2) this.title = "🏆 Welcome to Certificate";
  }
  // onTabChange(e: any) {
  //   // if (this.yearvalue !== undefined) {
  //   //   this.activeIndex = e.index;
  //   // } else {
  //   //   alert("please select Year");
  //   // }
  //   const requestedTab = e.index;
  //   if (!this.yearvalue && requestedTab > 0) {
  //     console.log("im if");
  //     alert("Please select a year before accessing this tab.");
  //     // Reset to Profile tab
  //     this.activeIndex = 0;
  //     return;
  //   } else {
  //     this.activeIndex = requestedTab;
  //   }
  // }

  viewDetails(student: any) {
    // this.display = true;
    this.showDetails = true;
    this.selectedStudent = student;
  }
  searchStudent() {
    this.showDetails = false;
    this.isLoading = true;
    const query = this.searchForm.value.searchQuery;
    console.log(query);
    const formData = new FormData();

    formData.append("search_text", query);
    this.adminStudentProfileService.loadGloablStudentData(formData).subscribe(
      (response) => {
        if (response !== "") {
          this.isLoading = false;
          this.searchResult = response;
          this.searchResultData = this.searchResult;
          if (this.searchResultData.length > 0) {
            this.showSearchResult = true;
            this.noSearchData = false;
          } else {
            this.noSearchData = true;
            console.log("record not");
          }
        } else {
          console.log("Data is blannk from service");
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
    // const apiUrl = `https://your-api-url.com/api/students/search?query=${query}`;

    // this.http.get(apiUrl).subscribe(
    //   (response) => {
    //     this.studentData = response;
    //   },
    //   (error) => {
    //     console.error('Search failed', error);
    //     this.studentData = null;
    //   }
    // );
  }
  isValidSubGame(value: string | null): boolean {
    return !!value && value !== "undefined" && value.trim() !== "";
  }
  setPhotoPath() {
    let photoPath = this.yearvalue;
    this.setPhotoYear = this.serverUrl + "upload/" + photoPath;
  }
  // getFilteredSubgames(subGameString: string): string[] {
  //   if (!subGameString) return [];
  //   return subGameString
  //     .split(",")
  //     .map((s) => s.trim())
  //     .filter((s) => s.length > 0);
  // }

  getFilteredSubgames(value: string | null): string[] {
    if (!this.isValidSubGame(value)) {
      return [];
    }
    return value.split(",").map((v) => v.trim());
  }

  onYearChange(event) {
    //  this.isLoading = true;
    this.yearvalue = event.value;
    this.setPhotoPath();
    this.getStudentYearWiseProfile();
    if (this.yearvalue) {
      this.adminStudentProfileService
        .getStudentDataForCertificate(
          this.yearvalue,
          this.selectedStudent.studentUniqueId
        )
        .subscribe(
          (response: any[]) => {
            this.isLoading = false;
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
  getStudentYearWiseProfile() {
    console.log("Im call");
    if (this.yearvalue) {
      this.adminStudentProfileService
        .getStudentYearWiseProfile(
          this.yearvalue,
          this.selectedStudent.studentUniqueId
        )
        .subscribe(
          (response: any[]) => {
            this.studentProfileYearWiseData = response[0];
            console.log(
              "response 12->" + JSON.stringify(this.studentProfileYearWiseData)
            );
            // this.isLoading = false;
            // this.studentProfileData = response;
            // this.studentDataLength = Object.keys(
            //   this.studentProfileData
            // ).length;
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
  hasSubgames(student: any): boolean {
    return this.getSubgameKeys(student).length > 0;
  }
  getSubgameKeys(student: any): string[] {
    return Object.keys(student).filter((key) => !isNaN(Number(key)));
  }

  onSchoolChange(event) {
    this.schoolId = event.value;
    this.schoolName = event.originalEvent.currentTarget.ariaLabel;
  }

  onImageError(event: any) {
    event.target.src = "assets/images/default-user.png";
  }
  get f() {
    return this.editStudentForm.controls;
  }
  editStudent(student: any) {
    this.issoUtilService.getAcademicYearForPhoto();
    this.editDialog = true;

    this.editStudentProfile = student;
    this.studentId = student.sId;
    this.studentUniqueId = student.studentUniqueId;
    this.imagePreview = this.setPhotoYear + "/" + student.photo;
    this.oldPhoto = student.photo;
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
      formData.append("selectedYear", this.yearvalue);
      formData.append("studentUniqueId", this.studentUniqueId);
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

      this.adminStudentProfileService
        .updateStudentDataYearWise(formData)
        .subscribe(
          (res) => {
            this.isLoading = false;
            this.editDialog = false;
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
              this.getStudentYearWiseProfile();
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
    } else {
      this.editStudentForm.markAllAsTouched();
    }
    this.selectedFile = "";
  }
}
