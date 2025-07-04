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
    // this.adminStudentProfileService.getSchoolData(event.value).subscribe(
    //   (response) => {
    //     this.isLoading = false;
    //     if (response !== "") {
    //       this.schoolData = response;

    //       if (this.schoolData.length > 0) {
    //         this.schoolOptions = [];
    //         this.schoolReadable = true;
    //         this.isDataAvailble = false;
    //         this.schoolOptions.push({
    //           label: "Please Select",
    //           value: "",
    //         });
    //         this.schoolData.forEach((element) => {
    //           this.schoolOptions.push({
    //             label: element.schoolName,
    //             value: element.schoolId,
    //           });
    //         });
    //       } else {
    //         this.isDataAvailble = false;
    //         this.schoolReadable = false;
    //         this.messageService.add({
    //           key: "custom",
    //           severity: "error",
    //           summary: "Event not found for this year",
    //         });
    //       }
    //     } else {
    //       console.log("Data is blannk from service");
    //     }
    //   },
    //   (error) => {
    //     //this.errorAlert =true;
    //   }
    // );
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
}
