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
  schoolId: string;
  studentProfileData: Object;
  setPhotoYear: string;
  serverUrl = environment.baseUrl;
  studentDataLength: number;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private messageService: MessageService,
    private studentProfileService: StudentProfileService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.schoolId = localStorage.getItem("schoolId");
    this.getStudentData();
    this.setPhotoPath();
  }
  setPhotoPath() {
    this.setPhotoYear = this.serverUrl + "upload/" + "2024-2025";
  }
  onImageError(event: any) {
    event.target.src = "assets/images/default-user.png";
  }
  getStudentData() {
    this.studentProfileService.getStudentProfileData(this.schoolId).subscribe(
      (response) => {
        if (response !== "") {
          this.studentProfileData = response;
          this.studentDataLength = Object.keys(this.studentProfileData).length;
        }
      },
      (error) => {
        console.log("this is error-->" + JSON.stringify(error.errorDesc));
        // this.messageService.add({key: 'error', severity:'error', summary: error.errorDesc});
        this.messageService.add({
          key: "custom",
          severity: "error",
          summary: error.errorDesc,
        });
        //this.errorAlert =true;
      }
    );
  }
}
