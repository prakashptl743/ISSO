import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../service/school.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { PageNotFoundComponent} from 'src/app/page-not-found/page-not-found.component'
import { ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { School } from '../admin-interfaces';
import { Table } from 'primeng/components/table/table';
import { ReportMeritService } from '../service/report-merit.service';
import { IssoUtilService } from 'src/app/services/isso-util.service';

@Component({
  selector: 'app-admin-school',
  templateUrl: './admin-school.component.html',
  styleUrls: ['./admin-school.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class AdminSchoolComponent implements OnInit {
  schoolForm: FormGroup;
  showspinner: boolean;
  options: SelectItem[];
  zoneOptions: SelectItem[];
  editForm: FormGroup;
  public errorAlert:boolean=false;
  errormessage: boolean;
  submitted = false;
  display: boolean = false;
   // options: SelectItem[];
  schoolArray =[];
  
  control: FormControl;
  schoolServiceDATA:any;
  school: School;
  error: string;
  datasource: any;
  totalRecords: number;
  cols: any[];
  placeholderText = "Select Option"
  actions: string;
  loading: boolean;
  pageSizeOptions = [10, 25, 50, {showAll: 'All'}]
  disable = false;
  cities1: SelectItem[];
  schoolData: School[];
  showRegisterdSchoolData;
  subViewTitle: string;
  schoolType: string;
  volunteerData:string;
  zoneData:string;
  registeredSchoolZone:string;
  schoolServiceData:any;
  registerdSchoolData:any;
  expandedRows: number[];
  rowGroupMetadata = {};
  table: Table;
  sortKey: string;
  sortField: string;
  sortOrder: number;
  selectedSchool: School;
  selectedZoneVal:string;
  carDatavalue:any;
  carId:number
  displayDialog: boolean;
  confirmDropDatabaseDialogVisible = false;
  testVar: string;
  isPcUser: boolean;
  testArray: { id: number; text: string; }[];
  registeredSchoolFlag: boolean;
  setPassword: string;
  showEmailErrorMessage: boolean;
  emailOfSchool: any;
  verifyEmailForSchool: any;
  schoolEdit: boolean;
  totalNonAffilatedSchoool: number;
  totalSchoolCount: number;


  constructor(
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private schoolService: SchoolService,
    private meritService: ReportMeritService,
    private issoUtilService: IssoUtilService, 
  ) {
    setTimeout(()=>{this.disable = true}, 5000)
   }

ngOnInit() {
    this.initialForm();
    this.loading = true;
    this.selectedZoneVal = 'noZone';
    setTimeout(()=> {this.placeholderText = 'It has changed'}, 5000)
    this.getSchoolData()
}
registeredSchool() {
  this.registeredSchoolFlag = true;
  this.schoolService.getRegisterSchoolList().subscribe(response => {
    if(response!=="") {
      this.registerdSchoolData =response;
      this.showRegisterdSchoolData = this.registerdSchoolData;
    } else {
      alert('im blankl=')
    }

 } ,
 error => {
   //this.errorAlert =true;
  });
}
loadData(event) {
}
filterSchoolList(event) {
  const zoneVal = event.value;
  if(zoneVal) {
    console.log('zane vale--->'+zoneVal)
    this.selectedZoneVal =event.value;
    this.getSchoolData();
  } else {
    console.log('Im else')
    this.selectedZoneVal = 'noZone';
    this.getSchoolData();
  }
 
 
}
editSchool(event: Event, car: School) {
  let carData=  JSON.stringify(car);
  this.carId =car.id;
  this.carDatavalue = car;
  this.displayDialog = true;
  event.preventDefault();
}

onDialogHide() {
  this.selectedSchool = null;
}
changeApprovedStatus(schoolId,approvedStatus) {
  //console.log(eventData)
  // const eventStatus =  eventData.event_status
  // const eventId = eventData.eventId
  const formData = new FormData();
  if(approvedStatus == '1') {
    formData.append('approve', '0');
  } else {
    formData.append('approve', '1');
  }

  this.schoolService.changeApprovedStatus(schoolId, formData).subscribe(
    res => {
        if (res.status === 'success') { 
          this.messageService.add({key: 'custom', severity:'success', summary: 'Approved Successfully'});
       } 
      else {
         this.messageService.add({key: 'custom', severity:'success', summary: 'Approved Successfully'});
        }
      this.display =false
      this.registeredSchool();
    },
    error => this.error = error
  );

}
onSortChange(event) {
  let value = event.value;
  if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
  }
  else {
      this.sortOrder = 1;
      this.sortField = value;
  }
}
 
changeWebStatus(id,isWebVisible) {
  const webStatus =  isWebVisible;
  const eventId = id;
  const formData = new FormData();
  if(webStatus == '1') {
    formData.append('webStatus', '0');
  } else {
    formData.append('webStatus', '1');
  }

  this.schoolService.changeWebStatus(eventId, formData).subscribe(
    res => {
        if (res.status === 'success') { 
          this.messageService.add({key: 'custom', severity:'success', summary: 'School Data Updated Successfully'});
       } 
      else {
         this.messageService.add({key: 'custom', severity:'success', summary: 'School Data Updated Successfully'});
        }
      this.display =false
      this.getSchoolData();
    },
    error => this.error = error
  );

}
getSchoolData() {
      this.registeredSchoolFlag =  false;
      this.totalNonAffilatedSchoool = 0;
      this.schoolService.getSchoolList(this.selectedZoneVal).subscribe(response => {
        if(response!=="") {
         console.log('Im resp--->'+response)
          this.schoolServiceData =response;
          this.schoolData = this.schoolServiceData;
          this.totalSchoolCount = this.schoolData.length;
          if(this.schoolData) {
            this.totalNonAffilatedSchoool = this.schoolData.filter((d => d.isAffiliate=='No')).length;
          }
         
        } else {
          alert('im blankl=')
        }

     } ,
     error => {
       //this.errorAlert =true;
      });
 
} 

showDialog(rowid:number) {
  this.display = true;
}

initialForm() {
  this.options = [
    {label: "Please select", value: ''},
    {label: "Yes", value: 'Yes'},
    {label: "No", value: 'No'},
  ];
  this.zoneOptions =this.issoUtilService.setSchoolZone();
 

    this.schoolForm = this.fb.group({
      schoolId:[''],
      schoolname: ['', Validators.required],
      schoolEmail: ['', Validators.required],
      schoolBoard: ['', Validators.required],
      schoolPassword: [''],
      schoolInfra: ['', Validators.required],
      schoolTelePhone: ['', Validators.required],
      author1: ['', Validators.required],
      designation1: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.min(1000000000), Validators.max(999999999999)]],
      author2: ['', Validators.required],
      designation2: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.min(1000000000), Validators.max(999999999999)]],
      isAffilated: ['', Validators.required],
      isVoulnteer: ['', Validators.required],
      zone: ['', Validators.required],
      schoolAddress: ['', Validators.required],
      gameCoach: ['', Validators.required],
     
    });
}
updateZone(schoolId,event) { 
 const zoneVal = event.value;
 if(zoneVal != '') {
  this.schoolService.saveSchoolZone(schoolId,zoneVal).subscribe(
  res => {
      if (res.status === 'error') {
        this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
      } else {
        this.messageService.add({key: 'custom', severity:'success', summary: 'Zone Updated Successfully'});

      }
      this.display =false
      this.registeredSchool();
  },
  error => this.error = error
);

} 
}
get f() { return this.schoolForm.controls; }
addNewSchool(event: Event, schoolData: School,type:any) {
    if(type == 'edit') {
        this.schoolEdit = true;
        this.schoolType = schoolData.isAffiliate;
        this.volunteerData = schoolData.isVoulnteer;
        this.zoneData = schoolData.schoolZone;
        this.emailOfSchool = schoolData.email,
        this.setPassword = schoolData.originalPassword,
        
        this.schoolForm.setValue({
          schoolId:schoolData.id,  
            schoolname: schoolData.name,
            schoolEmail:  schoolData.email,
            schoolBoard:  schoolData.board,
            schoolPassword:  schoolData.originalPassword,
            schoolInfra:  schoolData.schoolInfrastructure,
            schoolAddress: schoolData.address,
            schoolTelePhone: schoolData.mobile,
            isAffilated:schoolData.isAffiliate,
            isVoulnteer:schoolData.isVoulnteer,
            zone:schoolData.schoolZone,
            author1:schoolData.author1,
            designation1:schoolData.designation1,
            author2:schoolData.author2,
            designation2:schoolData.designation2,
            gameCoach:schoolData.gameCoach
           // schoolId:'edit'        
        });  
         this.subViewTitle = 'Edit School';
   } else {
          this.schoolEdit = false;
          this.emailOfSchool = '';
          this.setPassword = '';
          this.schoolForm.setValue({ 
            schoolId:'',   
            schoolname: '',
            schoolEmail: '',
            schoolBoard: ' ',
            schoolPassword: ' ',
            schoolInfra: ' ',
            schoolAddress: ' ',
            schoolTelePhone:' ',
            author1:' ',
            designation1:' ',
            author2:' ',
            designation2:' ',
            isAffilated:'',
            isVoulnteer:'',
            zone:'',
            gameCoach:''
          //  schoolId:'add'  
          }); 
          this.subViewTitle = 'Add New School';
    }
    this.display = true;
    
    
}

hideExtraView() {
  this.display = false;
}
setSchoolPassword(){
  if(!this.schoolEdit) {
    let password;
    let schoolName = this.schoolForm.get('schoolname').value;
    schoolName = schoolName.trim();
    password = schoolName.replace(/\s/g, "");
    this.setPassword = password.substring(0, 5) + '12345';
  }
}
checkEmail(email) {
  this.emailOfSchool =  email.target.value;
  this.schoolService.verifyEmail(this.emailOfSchool).subscribe((data) => {
    console.log('DATE===',data);
   
    this.verifyEmailForSchool = data;
    if (this.verifyEmailForSchool.length > 0) {
      //this.schoolId = data[0].schoolId;
      this.emailOfSchool = '';
      console.log('this.emailOfSchool===',this.emailOfSchool);
      this.showEmailErrorMessage = true;
    } else {
      console.log('Im errror')
      this.showEmailErrorMessage = false;
    }
     //  console.log('NEWDATA+++>'+JSON.stringify(this.registeredSchoolData[0]));
   },
    error => this.error = error
  );
}

onSubmit() {
      this.submitted = true;
      const formData = new FormData();
      let schoolID =  this.schoolForm.get('schoolId').value;
      formData.append('schoolname', this.schoolForm.get('schoolname').value);
      formData.append('schoolEmail', this.schoolForm.get('schoolEmail').value);
      formData.append('schoolBoard', this.schoolForm.get('schoolBoard').value);
      formData.append('schoolPassword', this.schoolForm.get('schoolPassword').value);
      formData.append('schoolInfra', this.schoolForm.get('schoolInfra').value);
      formData.append('schoolTelePhone', this.schoolForm.get('schoolTelePhone').value);
      formData.append('author1', this.schoolForm.get('author1').value);
      formData.append('designation1', this.schoolForm.get('designation1').value);
      formData.append('author2', this.schoolForm.get('author2').value);
      formData.append('designation2', this.schoolForm.get('designation2').value);
      formData.append('gameCoach', this.schoolForm.get('gameCoach').value);
      formData.append('isAffilated', this.schoolForm.get('isAffilated').value);
      formData.append('isVoulnteer', this.schoolForm.get('isVoulnteer').value);
      formData.append('zone', this.schoolForm.get('zone').value);
      formData.append('schoolAddress', this.schoolForm.get('schoolAddress').value);
    // formData.append('hiddentext', this.schoolForm.get('hiddentext').value);
     if(schoolID == '') {
        this.schoolService.saveSchoolData(formData).subscribe(
        res => {
            if (res.status === 'error') {
              this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
            } else {
              this.messageService.add({key: 'custom', severity:'success', summary: 'New School Added Successfully'});

            }
          this.display =false
          this.getSchoolData();
        },
        error => this.error = error
      );

    } 
     else {
      this.schoolService.editSchoolData(schoolID,formData).subscribe(
        res => {
            if (res.status === 'success') { 
              console.log('Im success')
              this.messageService.add({key: 'custom', severity:'success', summary: 'School Data Updated Successfully'});

              //this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
           } 
          else {
             this.messageService.add({key: 'custom', severity:'success', summary: 'School Data Updated Successfully'});

            }
          this.display =false
          this.getSchoolData();
        },
        error => this.error = error
      );

     }
 
}
deleteRegisteredSchoolData(schoolId) {
  if (event.defaultPrevented) return;
  event.preventDefault();
  this.confirmation.confirm({
    key: 'confirm-delete-school',
    icon: 'pi pi-info-circle',
    message: 'Are you sure to delete school data?',
    accept: () => { this.deleteRegisteredSchool(schoolId); },
  });
}

deleteSchoolData(event: Event, schoolData: School) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: 'confirm-delete-school',
      icon: 'pi pi-info-circle',
      message: 'Are you sure to delete school data?',
      accept: () => { this.deleteSchool(schoolData); },
    });
}

private _deleteSchoolData() {
    this.messageService.add({key: 'custom', severity:'success', summary: 'School Data Deleted Successfully'});
}

deleteSchool(School) {
  let schoolId=School.id
  this.schoolService.deleteSchool(schoolId).subscribe(
   res => {
     //  if (res.status !== 'error') {
     //    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
     //  } else {
         this.messageService.add({key: 'custom', severity:'success', summary: 'School Data Deleted Successfully'});

     //  }

     this.display =false
     this.getSchoolData();
   },
   error => this.error = error
 );
}
deleteRegisteredSchool(schoolId) {
 
  this.schoolService.deleteRegisteredSchool(schoolId).subscribe(
   res => {
     //  if (res.status !== 'error') {
     //    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
     //  } else {
         this.messageService.add({key: 'custom', severity:'success', summary: 'School Data Deleted Successfully'});

     //  }

     this.display =false
     this.getSchoolData();
   },
   error => this.error = error
 );
}
importSchoolExcel() {
  this.meritService.exportAsExcelFile(this.schoolData, 'school-data');
}

private _dropDatabase() {
  console.log('Database dropped');
}


}
