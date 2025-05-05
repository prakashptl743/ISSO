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
import { SgfiEntriesService } from "src/app/admin/service/sgfi-entries.service";
import { MessageService, SelectItem, Message } from "primeng/api";
import { ConfirmationService } from "primeng/api";
import { PaymentService } from "../service/payment.service";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "src/environments/environment";
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: "app-sgfi-entry",
  templateUrl: "./sgfi-entry.component.html",
  styleUrls: ["./sgfi-entry.component.css"],
  providers: [MessageService, ConfirmationService],
})
export class SgfiEntryComponent implements OnInit {
  @ViewChild("studentSignInput", { static: false })
  studentSignInput: ElementRef;
  @ViewChild("scannedaadharInput", { static: false })
  scannedaadharInput: ElementRef;
  @ViewChild("studentBonafideInput", { static: false })
  studentBonafideInput: ElementRef;
  @ViewChild("studentmarksheetInput", { static: false })
  studentmarksheetInput: ElementRef;
  @ViewChild("studentBirthCertificateInput", { static: false })
  studentBirthCertificateInput: ElementRef;
  @ViewChild("headmasterSignInput", { static: false })
  headmasterSignInput: ElementRef;
  @ViewChild("studentPhotoInput", { static: false })
  studentPhotoInput: ElementRef;

  @ViewChild("studentNameText", { static: false }) formDir: ElementRef;
  rootGameServicData: any;
  rootGameData: any;
  gameOptions: any[];
  schoolId: string;
  gameArray = [];
  gameId: any;
  gameName: any;
  gameType: any;
  sgfiStudentData: any;
  sgfiEnrolledStudentData: any;
  studentRecordLength: number;
  enrolledRecordLength: number;
  showSgfi: boolean = false;
  display: boolean = false;
  sgfiEnrollForm: FormGroup;
  sgfiFileEnrollForm: FormGroup;
  modal = "modal";
  isForm: boolean;
  isDoc: boolean;
  isPayment: boolean;
  studentName: any;
  schoolName: any;
  dateOfBirth: any;
  selectedFatherName: any;
  visible: boolean = false;
  schoolAddress: any;
  schoolContact: any;
  completedYear: moment.Duration;
  studentCompletedYear: any;
  finalCompletedYear: string;
  submitted: boolean;
  sgfiFormData: any;
  error: any;
  studentId: any;
  payableAmount: any;
  totalAmount: any;
  paymentTypeInfo: any;
  generatedpaymentId: any;
  dialogHeader: string;
  ageRange: any;
  gender: any;
  selectedProfile: string;
  url: any;
  isMoreDot: boolean;
  fileName: number;
  isValidFile: boolean;
  editStudentPhoto: string;
  schoolForm: FormGroup;
  studentSignFile: boolean;
  minDate: Date;
  maxDate: Date;
  fullFilename: string;
  isStudentSignValidFile: boolean = true;
  isStudentFileBig: boolean = false;

  aadharFileName: string;
  isStudenAadaharValidFile: boolean = true;
  isStudenAadaharFileBig: boolean = false;

  bonafideFileName: string;
  isBonafideFileValidFile: boolean = true;
  isBonafideFileFileBig: boolean = false;

  markSheetFileName: string;
  markSheetFileValidFile: boolean = true;
  markSheetFileFileBig: boolean = false;

  birthCertificateFileName: string;
  birthCertificateFileValidFile: boolean = true;
  birthCertificateFileFileBig: boolean = false;

  headMasterSignFileName: string;
  headMasterSignFileValidFile: boolean = true;
  headMasterSignFileFileBig: boolean = false;

  studentPhotoFileName: string;
  studentPhotoFileValidFile: boolean = true;
  studentPhotoFileFileBig: boolean = false;
  selectedGameName: any;
  formButtonVal: string;
  docButtonVal: string;

  docArray: any[] = [];
  baseUrl: string;
  isEditFileUpload: boolean;
  isPaidStatus: boolean = false;
  showspinner: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sgfiEntriesService: SgfiEntriesService,
    private messageService: MessageService,
    private payemntService: PaymentService,
    private fb: FormBuilder
  ) {}

  get studentSign() {
    return this.sgfiFileEnrollForm.get("studentSign");
  }
  get studentGovDoc() {
    return this.sgfiFileEnrollForm.get("studentGovDoc");
  }
  get studentBonafide() {
    return this.sgfiFileEnrollForm.get("studentBonafide");
  }
  get lastYearmarkSheet() {
    return this.sgfiFileEnrollForm.get("lastYearmarkSheet");
  }
  get birthCertificate() {
    return this.sgfiFileEnrollForm.get("birthCertificate");
  }
  get headMasterSign() {
    return this.sgfiFileEnrollForm.get("headMasterSign");
  }
  get studentPhoto() {
    return this.sgfiFileEnrollForm.get("studentPhoto");
  }

  // get name() { return this.sgfiEnrollForm.controls; }
  get name() {
    return this.sgfiEnrollForm.get("name");
  }
  get fatherName() {
    return this.sgfiEnrollForm.get("fatherName");
  }
  get motherName() {
    return this.sgfiEnrollForm.get("motherName");
  }
  get admissionNo() {
    return this.sgfiEnrollForm.get("admissionNo");
  }
  get schoolJoinDate() {
    return this.sgfiEnrollForm.get("schoolJoinDate");
  }
  get studyingYear() {
    return this.sgfiEnrollForm.get("studyingYear");
  }
  get sgfiRegNo() {
    return this.sgfiEnrollForm.get("sgfiRegNo");
  }
  get dicipline() {
    return this.sgfiEnrollForm.get("dicipline");
  }
  get studyingLastYear() {
    return this.sgfiEnrollForm.get("studyingLastYear");
  }
  get personalIdentity() {
    return this.sgfiEnrollForm.get("personalIdentity");
  }

  ngOnInit() {
    this.schoolId = localStorage.getItem("schoolId");
    this.loadGame();
    this.getSgfiAmount();
    this.initialSgfiForm();
    this.baseUrl = environment.baseUrl;
    // this.initialiseForm();
    const today = new Date();
    this.maxDate = today;
    this.minDate = new Date(
      today.getFullYear() - 100,
      today.getMonth(),
      today.getDate()
    );
  }
  public initialSgfiForm() {
    this.sgfiEnrollForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      fatherName: new FormControl("", [Validators.required]),
      motherName: new FormControl("", [Validators.required]),
      studentAddress: new FormControl(""),
      admissionNo: new FormControl("", [Validators.required]),
      schoolJoinDate: new FormControl("", [Validators.required]),
      studyingYear: new FormControl("", [Validators.required]),
      sgfiRegNo: new FormControl("", [Validators.required]),
      dicipline: new FormControl("", [Validators.required]),
      studyingLastYear: new FormControl("", [Validators.required]),
      personalIdentity: new FormControl("", [Validators.required]),
      personalIdentitytwo: new FormControl(""),
      aadharNo: new FormControl(""),
      passport: new FormControl(""),
      bankDetails: new FormControl(""),
    });
  }
  onStudentSignSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      var newName = input.files[0].name.split(".").slice(0, -1).join(".");
      var removeSpace = newName.replace(/\s/g, "");
      var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "");
      var ext = input.files[0].name.split(".").pop();
      this.fileName = Math.floor(Math.random() * 1000000000 + 1);
      this.fullFilename = removeSpecialChar + this.fileName + "." + ext;

      if (
        ext == "png" ||
        ext == "PNG" ||
        ext == "jpeg" ||
        ext == "JPEG" ||
        ext == "JPG" ||
        ext == "jpg"
      ) {
        this.isStudentSignValidFile = true;
      } else {
        this.isStudentSignValidFile = false;
        this.studentSignInput.nativeElement.value = "";
      }
      if (
        this.studentSignInput.nativeElement.value &&
        input.files[0].size > 102400
      ) {
        this.isStudentFileBig = true;
        this.studentSignInput.nativeElement.value = "";
      } else {
        this.isStudentFileBig = false;
      }

      if (this.isStudentSignValidFile && !this.isStudentFileBig) {
        this.sgfiFileEnrollForm.get("studentSign").setValue(file);
      } else {
        this.sgfiFileEnrollForm.patchValue({ studentSign: null });
      }
    }
  }

  onScannedaadharSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      var newName = input.files[0].name.split(".").slice(0, -1).join(".");
      var removeSpace = newName.replace(/\s/g, "");
      var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "");
      var ext = input.files[0].name.split(".").pop();
      this.fileName = Math.floor(Math.random() * 1000000000 + 1);
      this.aadharFileName = removeSpecialChar + this.fileName + "." + ext;
      if (ext == "pdf" || ext == "PDF") {
        //  if ( ext == 'png'  || ext == 'PNG' || ext == 'jpeg' || ext == 'JPEG' || ext == 'JPG' || ext == 'jpg' ) {
        this.isStudenAadaharValidFile = true;
      } else {
        this.isStudenAadaharValidFile = false;
        this.scannedaadharInput.nativeElement.value = "";
      }
      if (
        this.scannedaadharInput.nativeElement.value &&
        input.files[0].size > 102400
      ) {
        this.isStudenAadaharFileBig = true;
        this.scannedaadharInput.nativeElement.value = "";
      } else {
        this.isStudenAadaharFileBig = false;
      }

      if (this.isStudenAadaharValidFile && !this.isStudenAadaharFileBig) {
        this.sgfiFileEnrollForm.get("studentGovDoc").setValue(file);
      } else {
        this.sgfiFileEnrollForm.patchValue({ studentGovDoc: null });
      }
    }
  }

  onBonafideSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      var newName = input.files[0].name.split(".").slice(0, -1).join(".");
      var removeSpace = newName.replace(/\s/g, "");
      var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "");
      var ext = input.files[0].name.split(".").pop();
      this.fileName = Math.floor(Math.random() * 1000000000 + 1);
      this.bonafideFileName = removeSpecialChar + this.fileName + "." + ext;
      if (ext == "pdf" || ext == "PDF") {
        this.isBonafideFileValidFile = true;
      } else {
        this.isBonafideFileValidFile = false;
        this.studentBonafideInput.nativeElement.value = "";
      }
      if (
        this.studentBonafideInput.nativeElement.value &&
        input.files[0].size > 102400
      ) {
        this.isBonafideFileFileBig = true;
        this.studentBonafideInput.nativeElement.value = "";
      } else {
        this.isBonafideFileFileBig = false;
      }

      if (this.isBonafideFileValidFile && !this.isBonafideFileFileBig) {
        this.sgfiFileEnrollForm.get("studentBonafide").setValue(file);
      } else {
        this.sgfiFileEnrollForm.patchValue({ studentBonafide: null });
      }
    }
  }
  onMarkSheetSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      var newName = input.files[0].name.split(".").slice(0, -1).join(".");
      var removeSpace = newName.replace(/\s/g, "");
      var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "");
      var ext = input.files[0].name.split(".").pop();
      this.fileName = Math.floor(Math.random() * 1000000000 + 1);
      this.markSheetFileName = removeSpecialChar + this.fileName + "." + ext;
      if (ext == "pdf" || ext == "PDF") {
        this.markSheetFileValidFile = true;
      } else {
        this.markSheetFileValidFile = false;
        this.studentmarksheetInput.nativeElement.value = "";
      }
      if (
        this.studentmarksheetInput.nativeElement.value &&
        input.files[0].size > 102400
      ) {
        this.markSheetFileFileBig = true;
        this.studentmarksheetInput.nativeElement.value = "";
      } else {
        this.markSheetFileFileBig = false;
      }

      if (this.markSheetFileValidFile && !this.markSheetFileFileBig) {
        this.sgfiFileEnrollForm.get("lastYearmarkSheet").setValue(file);
      } else {
        this.sgfiFileEnrollForm.patchValue({ lastYearmarkSheet: null });
      }
    }
  }

  onBirthCertificateSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      var newName = input.files[0].name.split(".").slice(0, -1).join(".");
      var removeSpace = newName.replace(/\s/g, "");
      var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "");
      var ext = input.files[0].name.split(".").pop();
      this.fileName = Math.floor(Math.random() * 1000000000 + 1);
      this.birthCertificateFileName =
        removeSpecialChar + this.fileName + "." + ext;
      if (ext == "pdf" || ext == "PDF") {
        this.birthCertificateFileValidFile = true;
      } else {
        this.birthCertificateFileValidFile = false;
        this.studentBirthCertificateInput.nativeElement.value = "";
      }
      if (
        this.studentBirthCertificateInput.nativeElement.value &&
        input.files[0].size > 102400
      ) {
        this.birthCertificateFileFileBig = true;
        this.studentBirthCertificateInput.nativeElement.value = "";
      } else {
        this.birthCertificateFileFileBig = false;
      }

      if (
        this.birthCertificateFileValidFile &&
        !this.birthCertificateFileFileBig
      ) {
        this.sgfiFileEnrollForm.get("birthCertificate").setValue(file);
      } else {
        this.sgfiFileEnrollForm.patchValue({ birthCertificate: null });
      }
    }
  }
  onHeadMasterSignSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      var newName = input.files[0].name.split(".").slice(0, -1).join(".");
      var removeSpace = newName.replace(/\s/g, "");
      var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "");
      var ext = input.files[0].name.split(".").pop();
      this.fileName = Math.floor(Math.random() * 1000000000 + 1);
      this.headMasterSignFileName =
        removeSpecialChar + this.fileName + "." + ext;
      if (
        ext == "png" ||
        ext == "PNG" ||
        ext == "jpeg" ||
        ext == "JPEG" ||
        ext == "JPG" ||
        ext == "jpg"
      ) {
        this.headMasterSignFileValidFile = true;
      } else {
        this.headMasterSignFileValidFile = false;
        this.headmasterSignInput.nativeElement.value = "";
      }
      if (
        this.headmasterSignInput.nativeElement.value &&
        input.files[0].size > 102400
      ) {
        this.headMasterSignFileFileBig = true;
        this.headmasterSignInput.nativeElement.value = "";
      } else {
        this.headMasterSignFileFileBig = false;
      }

      if (this.headMasterSignFileValidFile && !this.headMasterSignFileFileBig) {
        this.sgfiFileEnrollForm.get("headMasterSign").setValue(file);
      } else {
        this.sgfiFileEnrollForm.patchValue({ headMasterSign: null });
      }
    }
  }

  onStudentPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      var newName = input.files[0].name.split(".").slice(0, -1).join(".");
      var removeSpace = newName.replace(/\s/g, "");
      var removeSpecialChar = removeSpace.replace(/[^\w\s]/gi, "");
      var ext = input.files[0].name.split(".").pop();
      this.fileName = Math.floor(Math.random() * 1000000000 + 1);
      this.studentPhotoFileName = removeSpecialChar + this.fileName + "." + ext;
      if (
        ext == "png" ||
        ext == "PNG" ||
        ext == "jpeg" ||
        ext == "JPEG" ||
        ext == "JPG" ||
        ext == "jpg"
      ) {
        this.studentPhotoFileValidFile = true;
      } else {
        this.studentPhotoFileValidFile = false;
        this.studentPhotoInput.nativeElement.value = "";
      }
      if (
        this.studentPhotoInput.nativeElement.value &&
        input.files[0].size > 102400
      ) {
        this.studentPhotoFileFileBig = true;
        this.studentPhotoInput.nativeElement.value = "";
      } else {
        this.studentPhotoFileFileBig = false;
      }

      if (this.studentPhotoFileValidFile && !this.studentPhotoFileFileBig) {
        this.sgfiFileEnrollForm.get("studentPhoto").setValue(file);
      } else {
        this.sgfiFileEnrollForm.patchValue({ studentPhoto: null });
      }
    }
  }
  getSgfiAmount() {
    this.sgfiEntriesService.getSgfiAmount().subscribe(
      (response) => {
        if (response !== "") {
          this.payableAmount = response[0].amount;
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
  payNow(amt, studentId, paymentType) {
    this.totalAmount = amt;
    this.studentId = studentId;
    this.paymentTypeInfo = paymentType;
    let options = {
      key: "rzp_live_08wdE0QgVsFNVd", // Enter the Key ID generated from the Dashboard
      amount: amt * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      // "amount": 100,
      currency: "INR",
      name: "SGFI PAYMENT",
      description: this.gameName,
      image: "https://issoindia.com/assets/img/logo_retina.png",
      handler: (response) => {
        this.paymentCapture(response);
      },
      callback_url: "https://issoindia.com/isso/#/staffadmin/sgfi",
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
  }
  paymentCapture(response) {
    const formData = new FormData();
    this.generatedpaymentId = response.razorpay_payment_id;

    let paidAmount = this.totalAmount.toString();
    formData.append("paymentTypeInfo", this.paymentTypeInfo);
    formData.append("schoolId", this.schoolId);
    formData.append("generatedpaymentId", this.generatedpaymentId);
    formData.append("studentId", this.studentId);
    formData.append("paidAmount", paidAmount);
    formData.append("gameId", this.gameId);

    this.sgfiEntriesService.savePaymentData(formData).subscribe(
      (res) => {
        if (res.status === "error") {
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: "Validation failed",
          });
        } else {
          this.getStudents();
          this.getEnrolledStudentDataForStaff();
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Payment accepted successfully",
          });
          this.isPaidStatus = true;
        }
      },
      (error) => (this.error = error)
    );
  }
  initialFileForm(index) {
    this.sgfiFileEnrollForm = new FormGroup({
      studentSign: new FormControl("", [Validators.required]),
      studentGovDoc: new FormControl("", [Validators.required]),
      studentBonafide: new FormControl("", [Validators.required]),
      lastYearmarkSheet: new FormControl("", [Validators.required]),
      birthCertificate: new FormControl("", [Validators.required]),
      //  headMasterSign: new FormControl("", [Validators.required]),
      studentPhoto: new FormControl("", [Validators.required]),
    });

    this.schoolForm = this.fb.group({
      profile: ["", Validators.required],
      editStudentPhoto: [],
      schoolId: "",
    });
  }

  calculateAgeAsOfDecember31(val) {
    let monthVal = new Date().getMonth();
    let yearVal = new Date().getFullYear();
    let cuurentAcademicYear;

    if (monthVal >= 5) {
      cuurentAcademicYear = yearVal - 1;
    } else {
      cuurentAcademicYear = yearVal - 2;
    }
    const dobMoment = moment(val);
    const endOfYear = moment(cuurentAcademicYear + "-12-31"); // Specific year-end or current date
    const duration = moment.duration(endOfYear.diff(dobMoment));

    const age = {
      years: Math.floor(duration.asYears()),
      months: duration.months(),
      days: duration.days(),
    };

    return age;
  }
  public initialiseForm(index, studentData) {
    this.docArray = [];
    if (studentData !== undefined) {
      console.log("undefined");
      this.docArray = [];
      this.formButtonVal = "Update Changes";
      const patchValues = {
        name: studentData.studentName,
        fatherName: studentData.fatherName,
        motherName: studentData.motherName,
        studentAddress: studentData.studentAddress,
        admissionNo: studentData.admissionNoYear,
        schoolJoinDate: new Date(studentData.schoolJoinDate),
        studyingYear: studentData.studyingYear,
        sgfiRegNo: studentData.sgfiRegNo,
        dicipline: studentData.discipline,
        studyingLastYear: studentData.studyingLastYear,
        personalIdentity: studentData.personalMark1,
        personalIdentitytwo: studentData.personalMark2,
        aadharNo: studentData.aadharNo,
        passport: studentData.passport,
        bankDetails: studentData.bankDetails,
      };
      this.studentCompletedYear = this.calculateAgeAsOfDecember31(
        studentData.dateofBirth
      );
      this.studentName = studentData.studentName;
      this.selectedFatherName = studentData.fatherName;
      this.selectedGameName = studentData.gameName;
      this.schoolName = studentData.schoolName;
      this.dateOfBirth = studentData.dateofBirth;
      this.schoolAddress = studentData.schoolAddress;
      this.studentId = studentData.studentId;
      this.ageRange = studentData.ageRange;
      this.gender = studentData.gender;
      this.schoolContact = studentData.designation1;
      let genderVal = studentData.gender === "1" ? "BOYS" : "GIRLS";
      this.dialogHeader =
        studentData.studentName +
        " " +
        studentData.gameName +
        " " +
        "UNDER " +
        studentData.ageRange +
        " " +
        genderVal;
      this.sgfiEnrollForm.patchValue(patchValues);
      if (
        studentData.birthCertificate !== null &&
        studentData.studentBonafide !== null &&
        studentData.studentGovDoc !== null &&
        studentData.lastYearmarkSheet !== null &&
        studentData.studentPhoto !== null &&
        studentData.studentSign !== null &&
        studentData.headMasterSign !== null
      ) {
        this.docButtonVal = "Update Changes";
        this.docArray.push({
          birthCert:
            studentData.birthCertificate == null
              ? "N/A"
              : this.baseUrl + "upload/sgfi/" + studentData.birthCertificate,
          bonafide:
            studentData.studentBonafide == null
              ? "N/A"
              : this.baseUrl + "upload/sgfi/" + studentData.studentBonafide,
          govID:
            studentData.studentGovDoc == null
              ? "N/A"
              : this.baseUrl + "upload/sgfi/" + studentData.studentGovDoc,
          lastYearMarkSheet:
            studentData.lastYearmarkSheet == null
              ? "N/A"
              : this.baseUrl + "upload/sgfi/" + studentData.lastYearmarkSheet,
          Photo:
            studentData.studentPhoto == null
              ? "N/A"
              : this.baseUrl + "upload/sgfi/" + studentData.studentPhoto,
          stdSign:
            studentData.studentSign == null
              ? "N/A"
              : this.baseUrl + "upload/sgfi/" + studentData.studentSign,
        });
      } else {
        this.docButtonVal = "Save Changes";
      }
    } else {
      this.formButtonVal = "Save Changes";
      this.docButtonVal = "Save Changes";
      this.studentName = this.sgfiStudentData[index].studentName;
      this.selectedFatherName = this.sgfiStudentData[index].fatherName;
      this.selectedGameName = this.sgfiStudentData[index].gameName;
      this.schoolName = this.sgfiStudentData[index].schoolName;
      this.dateOfBirth = this.sgfiStudentData[index].dateOfBirth;
      this.schoolAddress = this.sgfiStudentData[index].schoolAddress;
      this.studentId = this.sgfiStudentData[index].sId;
      this.ageRange = this.sgfiStudentData[index].ageRange;
      this.gender = this.sgfiStudentData[index].gender;
      this.studentCompletedYear = this.calculateAgeAsOfDecember31(
        this.sgfiStudentData[index].dateOfBirth
      );
      this.schoolContact = this.sgfiStudentData[index].designation1;
      let genderVal =
        this.sgfiStudentData[index].gender === "1" ? "BOYS" : "GIRLS";
      this.dialogHeader =
        this.studentName +
        " " +
        this.sgfiStudentData[index].gameName +
        " " +
        "UNDER " +
        this.sgfiStudentData[index].ageRange +
        " " +
        genderVal;
    }
  }

  onUpload(event: UploadEvent) {
    this.messageService.add({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded with Basic Mode",
    });
  }
  loadGame() {
    this.sgfiEntriesService.getGameForStaff(this.schoolId).subscribe(
      (response) => {
        if (response !== "") {
          this.rootGameServicData = response;
          this.rootGameData = this.rootGameServicData;
          let recordCount = JSON.stringify(this.rootGameData.length);
          if (recordCount !== "0") {
            this.showSgfi = true;
            this.gameOptions = [];
            this.gameOptions.push({
              label: "Please select",
              value: "",
            });
            this.rootGameData.forEach((element) => {
              const gameIdAndName =
                element.gameId +
                "," +
                element.gameName +
                "," +
                element.gameType;
              this.gameOptions.push({
                label: element.gameName,
                value: gameIdAndName,
              });
            });
          } else {
            this.showSgfi = false;
          }
        } else {
          alert("im blankl=");
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  loadGameChange(gameData) {
    const gameval = gameData.value;
    this.gameArray = gameval.split(",");
    this.gameId = this.gameArray[0];
    this.gameName = this.gameArray[1];
    this.gameType = this.gameArray[2];
    if (gameData.value != "") {
      this.getStudents();
      this.getEnrolledStudentDataForStaff();
    }
  }
  public getEnrolledStudentDataForStaff() {
    this.sgfiEntriesService
      .getEnrolledStudentDataForStaff(this.schoolId, this.gameId)
      .subscribe(
        (response) => {
          if (response !== "") {
            this.sgfiEnrolledStudentData = response;
            console.log(
              "Hello-->" + JSON.stringify(this.sgfiEnrolledStudentData)
            );
            this.enrolledRecordLength = Object.keys(
              this.sgfiEnrolledStudentData
            ).length;
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }

  getStudents() {
    this.sgfiEntriesService
      .getStudentForStaff(this.schoolId, this.gameId)
      .subscribe(
        (response) => {
          if (response !== "") {
            this.sgfiStudentData = response;
            this.dateOfBirth = response[0].dateOfBirth;
            this.studentRecordLength = Object.keys(this.sgfiStudentData).length;
          }
        },
        (error) => {
          //this.errorAlert =true;
        }
      );
  }

  showDialog() {
    this.display = true;
  }
  setFocus(id: string) {
    if (isPlatformBrowser(this.platformId)) {
      this[id].nativeElement.focus();
    }
  }
  onEditFileSubmit() {
    this.isEditFileUpload = false;
    this.showspinner = true;
    const formData = new FormData();
    formData.append("schoolId", this.schoolId);
    formData.append("gameId", this.gameId);
    formData.append("studentId", this.studentId);
    if (
      this.sgfiFileEnrollForm.get("studentSign").value !== "" &&
      this.sgfiFileEnrollForm.get("studentSign").value !== null
    ) {
      formData.append(
        "studentSign",
        this.sgfiFileEnrollForm.get("studentSign").value,
        this.fullFilename
      );
      this.isEditFileUpload = true;
    }
    if (
      this.sgfiFileEnrollForm.get("studentGovDoc").value !== "" &&
      this.sgfiFileEnrollForm.get("studentGovDoc").value !== null
    ) {
      formData.append(
        "studentGovDoc",
        this.sgfiFileEnrollForm.get("studentGovDoc").value,
        this.aadharFileName
      );
      this.isEditFileUpload = true;
    }
    if (
      this.sgfiFileEnrollForm.get("studentBonafide").value !== "" &&
      this.sgfiFileEnrollForm.get("studentBonafide").value !== null
    ) {
      formData.append(
        "studentBonafide",
        this.sgfiFileEnrollForm.get("studentBonafide").value,
        this.bonafideFileName
      );
      this.isEditFileUpload = true;
    }
    if (
      this.sgfiFileEnrollForm.get("lastYearmarkSheet").value !== "" &&
      this.sgfiFileEnrollForm.get("lastYearmarkSheet").value !== null
    ) {
      formData.append(
        "lastYearmarkSheet",
        this.sgfiFileEnrollForm.get("lastYearmarkSheet").value,
        this.markSheetFileName
      );
      this.isEditFileUpload = true;
    }
    if (
      this.sgfiFileEnrollForm.get("birthCertificate").value !== "" &&
      this.sgfiFileEnrollForm.get("birthCertificate").value !== null
    ) {
      formData.append(
        "birthCertificate",
        this.sgfiFileEnrollForm.get("birthCertificate").value,
        this.birthCertificateFileName
      );
      this.isEditFileUpload = true;
    }
    // if (
    //   this.sgfiFileEnrollForm.get("headMasterSign").value !== "" &&
    //   this.sgfiFileEnrollForm.get("headMasterSign").value !== null
    // ) {
    //   formData.append(
    //     "headMasterSign",
    //     this.sgfiFileEnrollForm.get("headMasterSign").value,
    //     this.headMasterSignFileName
    //   );
    //   this.isEditFileUpload = true;
    // }
    if (
      this.sgfiFileEnrollForm.get("studentPhoto").value !== "" &&
      this.sgfiFileEnrollForm.get("studentPhoto").value !== null
    ) {
      formData.append(
        "studentPhoto",
        this.sgfiFileEnrollForm.get("studentPhoto").value,
        this.studentPhotoFileName
      );
      this.isEditFileUpload = true;
    }
    if (this.isEditFileUpload) {
      this.sgfiEntriesService.editEnrollStudentFile(formData).subscribe(
        (res) => {
          if (res.status === "error") {
            this.messageService.add({
              severity: "error",
              summary: "Error Message",
              detail: "Validation failed",
            });
          } else {
            this.docButtonVal = "Update Changes";
            this.messageService.add({
              key: "custom",
              severity: "success",
              summary: "Document uploaded successfully",
            });
            this.showspinner = false;
            this.sgfiFileEnrollForm.reset();
            this.resetFiles();
            this.getDocInfo();
            // this.isPayment = true;
            //  this.isDoc = false;
          }
        },
        (error) => (this.error = error)
      );
    } else {
      this.messageService.add({
        key: "custom",
        severity: "error",
        summary: "Please select file to upload",
      });
      //this.messageService.add({severity:'error', summary: 'Error Message', detail:'Please select file to upload'});
    }
  }
  onFileSubmit() {
    this.showspinner = true;
    const formData = new FormData();
    formData.append("schoolId", this.schoolId);
    formData.append("gameId", this.gameId);
    formData.append("studentId", this.studentId);
    formData.append(
      "studentSign",
      this.sgfiFileEnrollForm.get("studentSign").value,
      this.fullFilename
    );
    formData.append(
      "studentGovDoc",
      this.sgfiFileEnrollForm.get("studentGovDoc").value,
      this.aadharFileName
    );
    formData.append(
      "studentBonafide",
      this.sgfiFileEnrollForm.get("studentBonafide").value,
      this.bonafideFileName
    );
    formData.append(
      "lastYearmarkSheet",
      this.sgfiFileEnrollForm.get("lastYearmarkSheet").value,
      this.markSheetFileName
    );
    formData.append(
      "birthCertificate",
      this.sgfiFileEnrollForm.get("birthCertificate").value,
      this.birthCertificateFileName
    );
    // formData.append(
    //   "headMasterSign",
    //   this.sgfiFileEnrollForm.get("headMasterSign").value,
    //   this.headMasterSignFileName
    // );
    formData.append(
      "studentPhoto",
      this.sgfiFileEnrollForm.get("studentPhoto").value,
      this.studentPhotoFileName
    );
    formData.append("formStatus", this.docButtonVal);
    console.log(formData);
    this.sgfiEntriesService.enrollStudentFile(formData).subscribe(
      (res) => {
        if (res.status === "error") {
          this.messageService.add({
            severity: "error",
            summary: "Error Message",
            detail: "Validation failed",
          });
        } else {
          this.docButtonVal = "Update Changes";
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Document uploaded successfully",
          });
          this.showspinner = false;
          this.sgfiFileEnrollForm.reset();
          this.resetFiles();
          this.getDocInfo();
          this.getStudents();
          this.getEnrolledStudentDataForStaff();
          this.isPayment = true;
          this.isDoc = false;
        }
      },
      (error) => (this.error = error)
    );
  }
  getDocInfo() {
    this.docArray = [];
    this.sgfiEntriesService.getStudentDocStaff(this.studentId).subscribe(
      (response) => {
        if (response !== "") {
          console.log(response);
          this.docArray.push({
            birthCert:
              response[0].birthCertificate == null
                ? "N/A"
                : this.baseUrl + "upload/sgfi/" + response[0].birthCertificate,
            bonafide:
              response[0].studentBonafide == null
                ? "N/A"
                : this.baseUrl + "upload/sgfi/" + response[0].studentBonafide,
            govID:
              response[0].studentGovDoc == null
                ? "N/A"
                : this.baseUrl + "upload/sgfi/" + response[0].studentGovDoc,
            lastYearMarkSheet:
              response[0].lastYearmarkSheet == null
                ? "N/A"
                : this.baseUrl + "upload/sgfi/" + response[0].lastYearmarkSheet,
            Photo:
              response[0].studentPhoto == null
                ? "N/A"
                : this.baseUrl + "upload/sgfi/" + response[0].studentPhoto,
            stdSign:
              response[0].studentSign == null
                ? "N/A"
                : this.baseUrl + "upload/sgfi/" + response[0].studentSign,
            headMastSign:
              response[0].headMasterSign == null
                ? "N/A"
                : this.baseUrl + "upload/sgfi/" + response[0].headMasterSign,
          });
        }
      },
      (error) => {
        //this.errorAlert =true;
      }
    );
  }
  resetFiles() {
    this.studentSignInput.nativeElement.value = "";
    this.scannedaadharInput.nativeElement.value = "";
    this.studentBonafideInput.nativeElement.value = "";
    this.studentmarksheetInput.nativeElement.value = "";
    this.studentBirthCertificateInput.nativeElement.value = "";
    //   this.headmasterSignInput.nativeElement.value = "";
    this.studentPhotoInput.nativeElement.value = "";
  }
  onFormSubmit() {
    this.sgfiFormData = this.sgfiEnrollForm.value;
    const formData = new FormData();
    formData.append("name", this.sgfiEnrollForm.get("name").value);
    formData.append("fatherName", this.sgfiEnrollForm.get("fatherName").value);
    formData.append("motherName", this.sgfiEnrollForm.get("motherName").value);
    formData.append(
      "studentAddress",
      this.sgfiEnrollForm.get("studentAddress").value
    );
    formData.append(
      "admissionNo",
      this.sgfiEnrollForm.get("admissionNo").value
    );
    // formData.append(
    //   "schoolJoinDate",
    //   this.sgfiEnrollForm.get("schoolJoinDate").value
    // );

    let schoolJoiningDate = this.sgfiEnrollForm.get("schoolJoinDate").value;
    let formatted_schoolJoiningDate =
      schoolJoiningDate.getFullYear() +
      "-" +
      (schoolJoiningDate.getMonth() + 1) +
      "-" +
      schoolJoiningDate.getDate();

    formData.append("schoolJoinDate", formatted_schoolJoiningDate);

    formData.append(
      "studyingYear",
      this.sgfiEnrollForm.get("studyingYear").value
    );
    formData.append("sgfiRegNo", this.sgfiEnrollForm.get("sgfiRegNo").value);
    formData.append("dicipline", this.sgfiEnrollForm.get("dicipline").value);
    formData.append(
      "studyingLastYear",
      this.sgfiEnrollForm.get("studyingLastYear").value
    );
    formData.append(
      "personalIdentity",
      this.sgfiEnrollForm.get("personalIdentity").value
    );
    formData.append(
      "personalIdentitytwo",
      this.sgfiEnrollForm.get("personalIdentitytwo").value
    );
    formData.append("aadharNo", this.sgfiEnrollForm.get("aadharNo").value);
    formData.append("passport", this.sgfiEnrollForm.get("passport").value);
    formData.append(
      "bankDetails",
      this.sgfiEnrollForm.get("bankDetails").value
    );
    formData.append("dateOfBirth", this.dateOfBirth);
    formData.append("schoolId", this.schoolId);
    formData.append("gameId", this.gameId);
    formData.append("studentId", this.studentId);
    formData.append("ageRange", this.ageRange);
    formData.append("gender", this.gender);
    formData.append("formStatus", this.formButtonVal);

    this.sgfiEntriesService.enrollStudent(formData).subscribe(
      (res) => {
        if (res.status === "success") {
          this.messageService.add({
            key: "custom",
            severity: "success",
            summary: "Student Data Saved Successfully",
          });
          this.formButtonVal = "Update Changes";
          this.docButtonVal = "Save Changes";
          // this.sgfiEnrollForm.reset();
          this.isDoc = true;
          this.isForm = false;
          // this.selectedFatherName ='';
          this.getStudents();
          this.getEnrolledStudentDataForStaff();
        }
      },
      (error) => (this.error = error)
    );
  }
  openModal(inp: string) {
    console.log(inp);
    this.modal = "modal-open";
    this.isForm = true;
  }
  showEnrollDialog(studentId, event) {
    this.isPaidStatus = false;
    console.log("sdfds-->" + studentId);
    console.log(this.sgfiEnrolledStudentData);
    let student;
    if (this.enrolledRecordLength > 0) {
      student = this.sgfiEnrolledStudentData.find(
        (student) => student.studentId == studentId
      );
      console.log("Data-->" + JSON.stringify(student));
      if (student !== undefined) {
        if (student.isPaid == "1") {
          this.isPaidStatus = true;
        } else {
          this.isPaidStatus = false;
        }
      }
    }
    // const record = this.sgfiEnrolledStudentData.find(record => record.id === studentId.toString());
    //  const record = this.sgfiEnrolledStudentData.find(record =>record.studentId ===studentId);

    //  const studentIdToFind = studentId.toString();  // The studentId you want to filter by
    //  const student1 = this.sgfiEnrolledStudentData.find(record => record.studentId === studentIdToFind);
    //  console.log('Data-->'+JSON.stringify(student1))

    this.visible = true;
    this.isForm = true;
    this.isDoc = false;
    this.isPayment = false;
    this.initialiseForm(event, student);
    this.initialFileForm(event);
    setTimeout(() => {
      document.getElementById("studentName").focus();
    }, 500);
  }
  setFocusOnStudent(studentNameText) {
    // const ele = this.formDir.nativeElement[studentNameText];
    // if (ele) {
    //   ele.focus();
    // }
    document.getElementById("studentName").focus();
  }
  closeModal() {
    this.sgfiEnrollForm.reset();
    this.visible = false;
  }
  // (onHide)="cancel()"
  cancel() {
    this.sgfiEnrollForm.reset();
    this.visible = false;
  }
  formMenu(type: string) {
    if (type == "form") {
      this.isForm = true;
      this.isDoc = false;
      this.isPayment = false;
      // } else {
    } else if (type == "doc" && this.formButtonVal !== "Save Changes") {
      this.isDoc = true;
      this.isForm = false;
      this.isPayment = false;
    }
    if (type == "payment" && this.formButtonVal !== "Save Changes") {
      this.isPayment = true;
      this.isForm = false;
      this.isDoc = false;
    }
  }
}
