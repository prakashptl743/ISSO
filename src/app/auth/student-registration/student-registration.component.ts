import { Component, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";
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

export interface SubGame {
  id: string;
  gameType: string;
  subGameName: string;
  gameId: string;
  // Dynamic capacity keys will be accessed via index signature
  [key: string]: any; // Allow for dynamic properties like 'fourteen_girls', 'min_fourteen_girls'
}

export interface Student {
  id: string; // Unique ID for the student
  name: string;
  fatherName: string;
  dateOfBirth: string; // You might want to use Date type if doing date operations
  gender: string;
  // Fields to be updated after subgame selection
  selectedSubGameIds: string[];
  selectedSubGameNames: string[];
}
//import { SchoolService } from '../service/school.service';
//E:\Angular\new-isso\src\app\admin\service\school.service.ts
@Component({
  selector: "student-registration",
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
  validStudentId: boolean;

  capacityContextKey: string = "fourteen_girls"; // Set this dynamically based on your application logic

  allSubGames: SubGame[] = [];
  isLoading: boolean = false;
  students: Student[] = [
    {
      id: "S001",
      name: "Alice",
      fatherName: "Mr. Smith",
      dateOfBirth: "2005-01-15",
      gender: "Female",
      selectedSubGameIds: ["18"],
      selectedSubGameNames: ["50 M FREE STYLE"],
    },
    {
      id: "S002",
      name: "Bob",
      fatherName: "Mr. Johnson",
      dateOfBirth: "2004-11-22",
      gender: "Male",
      selectedSubGameIds: [],
      selectedSubGameNames: [],
    },
    {
      id: "S003",
      name: "Charlie",
      fatherName: "Mr. Davis",
      dateOfBirth: "2006-03-10",
      gender: "Male",
      selectedSubGameIds: [],
      selectedSubGameNames: [],
    },
    // Add more students as needed
  ];
  currentSubGameCounts: { [id: string]: number } = {};
  subGameCapacityKeys: {
    [subGameId: string]: { maxKey: string; minKey: string };
  } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentProfileService: StudentProfileService,
    private messageService: MessageService,
    private issoUtilService: IssoUtilService,
    private studentService: StudentService,
    private renderer: Renderer2
  ) {
    this.studentForm = this.fb.group({
      studentName: ["", [Validators.required, Validators.minLength(3)]],
      fatherName: ["", [Validators.required, Validators.minLength(3)]],
      admissionNo: ["", [Validators.required, Validators.minLength(1)]],
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
    this.validStudentId = false;
    this.loadAllSchool();
    this.setDateOfBirth();
    this.genderOptions = this.issoUtilService.setGender();
    this.tShirtSize = this.issoUtilService.setTshirtSize();
    this.standardClass = this.issoUtilService.setClass();
    this.initializeCapacityCounts();

    const fourteenGirlsSubGames: SubGame[] = [
      {
        id: "18",
        gameType: "Individual",
        subGameName: "50 M FREE STYLE",
        gameId: "15",
        seventeen_boys: "2",
        min_seventeen_boys: "0",
      },
      {
        id: "19",
        gameType: "Individual",
        subGameName: "100 M FREE STYLE",
        gameId: "15",
        seventeen_boys: "2",
        min_seventeen_boys: "0",
      },
      {
        id: "20",
        gameType: "Individual",
        subGameName: "200 M FREE STYLE",
        gameId: "15",
        seventeen_boys: "2",
        min_seventeen_boys: "0",
      },
    ];
    this.allSubGames = fourteenGirlsSubGames; // Or seventeenGirlsSubGames;
    this.allSubGames.forEach((sg) => {
      console.log("DATA-->" + JSON.stringify(sg));
      this.currentSubGameCounts[sg.id] = 0; // Initialize current count to 0

      // Find the dynamic capacity keys (e.g., 'fourteen_girls', 'seventeen_girls')
      // const maxKey = Object.keys(sg).find(
      //   (key) => key.endsWith("_girls") && !key.startsWith("min_")
      // );

      const maxKey = Object.keys(sg).find(
        (key) =>
          (key.endsWith("_girls") || key.endsWith("_boys")) &&
          !key.startsWith("min_")
      );

      if (maxKey) {
        const minKey = `min_${maxKey}`;
        this.subGameCapacityKeys[sg.id] = { maxKey: maxKey, minKey: minKey };
      } else {
        console.warn(
          `SubGame ${sg.id} missing a dynamic capacity key like 'xx_girls'.`
        );
        this.subGameCapacityKeys[sg.id] = { maxKey: "0", minKey: "0" }; // Default or handle error
      }
    });

    // If students already have pre-selected subgames, initialize counts here
    // this.students.forEach(student => {
    //   student.selectedSubGameIds.forEach(id => {
    //     this.currentSubGameCounts[id] = (this.currentSubGameCounts[id] || 0) + 1;
    //   });
    // });
  }

  // Helper methods for dynamic capacity (remain the same)
  getActualMaxCapacity(subgame: SubGame): number {
    const key = this.capacityContextKey;
    return parseInt(subgame[key] as string, 10) || 999;
  }

  getActualMinCapacity(subgame: SubGame): number {
    const key = `min_${this.capacityContextKey}`;
    return parseInt(subgame[key] as string, 10) || 0;
  }

  // MODIFIED: This method now initializes counts from *all* loaded students
  initializeCapacityCounts(): void {
    // 1. Reset all counts to zero initially
    this.currentSubGameCounts = {}; // Ensure it's a fresh object
    this.allSubGames.forEach((sg) => {
      this.currentSubGameCounts[sg.id] = 0;
    });

    // 2. Iterate through ALL students (including those loaded from DB)
    // and increment counts for their pre-assigned subgames.
    this.students.forEach((student) => {
      student.selectedSubGameIds.forEach((subGameId) => {
        if (this.currentSubGameCounts.hasOwnProperty(subGameId)) {
          // Check if the subGameId exists in our allSubGames
          this.currentSubGameCounts[subGameId]++;
        } else {
          // Handle case where a loaded subGameId might not exist in allSubGames, though unlikely
          console.warn(
            `SubGame ID ${subGameId} found in student ${student.id} but not in allSubGames list.`
          );
        }
      });
    });

    console.log(
      "Initial Global SubGame Counts after loading:",
      this.currentSubGameCounts
    );
  }

  getAvailableSubGames(
    student: Student,
    currentDropdownIndex: number
  ): SubGame[] {
    const selectedIdsByStudent = student.selectedSubGameIds;
    const availableOptions: SubGame[] = [];

    this.allSubGames.forEach((sg) => {
      const actualMaxCapacity = this.getActualMaxCapacity(sg);

      if (
        selectedIdsByStudent.includes(sg.id) &&
        selectedIdsByStudent.indexOf(sg.id) !== currentDropdownIndex
      ) {
        return;
      }

      const currentCount = this.currentSubGameCounts[sg.id] || 0;
      if (
        currentCount >= actualMaxCapacity &&
        !(
          selectedIdsByStudent.includes(sg.id) &&
          selectedIdsByStudent.indexOf(sg.id) === currentDropdownIndex
        )
      ) {
        return;
      }

      availableOptions.push(sg);
    });
    return availableOptions;
  }

  onSubGameSelectionChange(
    student: Student,
    dropdownIndex: number,
    event: Event
  ): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    const previouslySelectedId = student.selectedSubGameIds[dropdownIndex];

    if (
      previouslySelectedId &&
      this.currentSubGameCounts[previouslySelectedId] > 0
    ) {
      this.currentSubGameCounts[previouslySelectedId]--;
    }
    if (selectedId) {
      this.currentSubGameCounts[selectedId] =
        (this.currentSubGameCounts[selectedId] || 0) + 1;
    }

    if (selectedId) {
      const selectedSubGame = this.allSubGames.find(
        (sg) => sg.id === selectedId
      );
      if (selectedSubGame) {
        student.selectedSubGameIds[dropdownIndex] = selectedId;
        student.selectedSubGameNames[dropdownIndex] =
          selectedSubGame.subGameName;
      }
    } else {
      student.selectedSubGameIds[dropdownIndex] = "";
      student.selectedSubGameNames[dropdownIndex] = "";
    }

    student.selectedSubGameIds = student.selectedSubGameIds.filter(
      (id) => id !== ""
    );
    student.selectedSubGameNames = student.selectedSubGameNames.filter(
      (name) => name !== ""
    );

    console.log("Updated Student:", student);
    console.log("Current Global SubGame Counts:", this.currentSubGameCounts);
  }

  // isSubmitButtonDisabled getter remains the same
  get isSubmitButtonDisabled(): boolean {
    return this.students.some(
      (student) => student.selectedSubGameIds.length === 0
    );
  }

  submitDataTable(): void {
    let allMinCapacitiesMet = true;
    let allStudentsValid = true;

    this.allSubGames.forEach((sg) => {
      const actualMinCapacity = this.getActualMinCapacity(sg);
      const currentCount = this.currentSubGameCounts[sg.id] || 0;

      if (currentCount < actualMinCapacity) {
        allMinCapacitiesMet = false;
        console.warn(
          `Warning: Subgame '${sg.subGameName}' (ID: ${sg.id}) has not met its minimum capacity of ${actualMinCapacity}. Current count: ${currentCount}`
        );
      }
    });

    this.students.forEach((student) => {
      const selectedCount = student.selectedSubGameIds.length;
      if (selectedCount < 1 || selectedCount > 3) {
        allStudentsValid = false;
        console.error(
          `Error: Student '${student.name}' must select between 1 and 3 subgames. Currently selected: ${selectedCount}`
        );
      }
    });

    if (allMinCapacitiesMet && allStudentsValid) {
      console.log("Submitting data table...");
      const dataToSubmit = this.students.map((student) => ({
        id: student.id,
        name: student.name,
        fatherName: student.fatherName,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        subGameId: student.selectedSubGameIds.join(","),
        subGameName: student.selectedSubGameNames.join(","),
      }));
      console.log("Data prepared for API submission:", dataToSubmit);
      alert("Assignments submitted successfully!");
      // After successful submission, you might want to refresh the page or update your local data
      // to reflect the new state, which would re-trigger initializeCapacityCounts.
    } else {
      alert(
        "Please review the assignments. Some minimum capacities are not met, or students have invalid numbers of subgames assigned."
      );
    }
  }

  getMaxCapacity(subGame: SubGame): number {
    const keys = this.subGameCapacityKeys[subGame.id];
    if (keys && subGame[keys.maxKey] !== undefined) {
      return parseInt(subGame[keys.maxKey], 10);
    }
    return 0; // Default to 0 if key not found or invalid
  }
  getMinCapacity(subGame: SubGame): number {
    const keys = this.subGameCapacityKeys[subGame.id];
    if (keys && subGame[keys.minKey] !== undefined) {
      return parseInt(subGame[keys.minKey], 10);
    }
    return 0; // Default to 0 if key not found or invalid
  }
  // getAvailableSubGames(
  //   student: Student,
  //   currentDropdownIndex: number
  // ): SubGame[] {
  //   const selectedIdsByStudent = student.selectedSubGameIds;
  //   const availableOptions: SubGame[] = [];

  //   this.allSubGames.forEach((sg) => {
  //     // Check if this subgame is already selected by the student in a *different* dropdown
  //     // (This handles the "disappear from other dropdowns" logic)
  //     if (
  //       selectedIdsByStudent.includes(sg.id) &&
  //       selectedIdsByStudent.indexOf(sg.id) !== currentDropdownIndex
  //     ) {
  //       return; // Skip this subgame as it's already selected in another dropdown for this student
  //     }

  //     // Check if the subgame has reached its global max capacity
  //     const maxCap = this.getMaxCapacity(sg);
  //     const currentCount = this.currentSubGameCounts[sg.id] || 0;

  //     // Check if the subgame is already selected in the current dropdown for this student
  //     const isCurrentlySelectedInThisDropdown =
  //       selectedIdsByStudent.includes(sg.id) &&
  //       selectedIdsByStudent.indexOf(sg.id) === currentDropdownIndex;

  //     if (currentCount >= maxCap && !isCurrentlySelectedInThisDropdown) {
  //       // If capacity is maxed out AND it's not the currently selected item in this dropdown,
  //       // then it's not available for selection.
  //       return;
  //     }

  //     availableOptions.push(sg);
  //   });
  //   return availableOptions;
  // }

  /**
   * Handles a change in a subgame dropdown for a specific student.
   * @param student The student object being updated.
   * @param dropdownIndex The index of the dropdown (0, 1, or 2).
   * @param event The change event from the select element.
   */

  // onSubGameSelectionChange(
  //   student: Student,
  //   dropdownIndex: number,
  //   event: Event
  // ): void {
  //   const selectedId = (event.target as HTMLSelectElement).value; // Get the new selected ID
  //   const previouslySelectedId = student.selectedSubGameIds[dropdownIndex]; // Get the ID that was previously in this dropdown

  //   // --- Update Global Capacity Counts ---
  //   if (previouslySelectedId) {
  //     this.currentSubGameCounts[previouslySelectedId]--;
  //   }
  //   if (selectedId) {
  //     this.currentSubGameCounts[selectedId] =
  //       (this.currentSubGameCounts[selectedId] || 0) + 1;
  //   }

  //   // --- Update Student's selectedSubGameIds and selectedSubGameNames arrays ---
  //   if (selectedId) {
  //     // Find the full subgame object to get its name
  //     const selectedSubGame = this.allSubGames.find(
  //       (sg) => sg.id === selectedId
  //     );
  //     if (selectedSubGame) {
  //       student.selectedSubGameIds[dropdownIndex] = selectedId;
  //       student.selectedSubGameNames[dropdownIndex] =
  //         selectedSubGame.subGameName; // Use subGameName from the object
  //     }
  //   } else {
  //     // If "Select SubGame" (empty option) is chosen, clear this slot
  //     student.selectedSubGameIds[dropdownIndex] = "";
  //     student.selectedSubGameNames[dropdownIndex] = "";
  //   }

  //   // Clean up empty slots from the selectedSubGame arrays (optional, but keeps arrays tidy)
  //   student.selectedSubGameIds = student.selectedSubGameIds.filter(
  //     (id) => id !== ""
  //   );
  //   student.selectedSubGameNames = student.selectedSubGameNames.filter(
  //     (name) => name !== ""
  //   );

  //   console.log("Updated Student:", student);
  //   console.log("Current Global SubGame Counts:", this.currentSubGameCounts);
  // }

  setDateOfBirth() {
    const today = new Date();
    this.maxDate = today;
    this.minDate = new Date(
      today.getFullYear() - 19,
      today.getMonth(),
      today.getDate()
    );
  }
  changeMenu(menuType: string) {
    if (menuType == "enroll") {
      this.isStudentEnrollForm = false;
    } else {
      this.isStudentEnrollForm = true;
    }
    // if(menuType =='issoId') {

    // }
    this.validStudentId = false;
    this.isStudentEnrollForm = !this.isStudentEnrollForm;
    this.studentForm.reset();
    this.issoEnrolledForm.reset();
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
    console.log("this.filteredPages -->" + this.filteredPages);
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
    const formData = new FormData();
    formData.append("studentId", this.issoEnrolledForm.value.studentId);
    this.studentProfileService.checkStudentEnroll(formData).subscribe(
      (res) => {
        if (res.error === "error") {
          this.validStudentId = false;
          this.messageService.add({
            key: "custom",
            severity: "error",
            detail: "Student Id not found",
          });
        } else {
          this.issoEnrolledForm.reset();
          localStorage.setItem("studentData", JSON.stringify(res));
          this.router.navigate(["parent-dashboard"]);
        }
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
  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    const formData = new FormData();
    let datOfbirth = this.studentForm.get("dob").value;
    let formatted_DOB =
      datOfbirth.getFullYear() +
      "-" +
      (datOfbirth.getMonth() + 1) +
      "-" +
      datOfbirth.getDate();
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
          this.isLoading = false;
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
  ngOnDestroy(): void {
    if (this.isLoading) {
      this.renderer.removeClass(document.body, "no-scroll");
    }
  }
}
