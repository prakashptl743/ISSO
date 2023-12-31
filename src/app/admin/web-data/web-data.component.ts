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
import { School, WebCalender } from '../admin-interfaces';
import { Table } from 'primeng/components/table/table';
import { WebcalenderService } from '../service/webcalender.service';

@Component({
  selector: 'app-web-data',
  templateUrl: './web-data.component.html',
  styleUrls: ['./web-data.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class WebDataComponent implements OnInit {
  profileForm:FormGroup;
  schoolForm: FormGroup;
  options: SelectItem[];
  editForm: FormGroup;
  public errorAlert:boolean=false;
  errormessage: boolean;
  submitted = false;
  display: boolean = false;
   // options: SelectItem[];
  schoolArray =[];
  editStudentPhoto: string;
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
  calenderData: WebCalender[];
  subViewTitle: string;
  schoolType: string;
  schoolServiceData:any;
  expandedRows: number[];
  rowGroupMetadata = {};

  table: Table;
  sortKey: string;
  sortField: string;
  sortOrder: number;
  selectedSchool: School;
  carDatavalue:any;
  carId:number
  displayDialog: boolean;
  confirmDropDatabaseDialogVisible = false;
  testVar: string;
  isPcUser: boolean;
  testArray: { id: number; text: string; }[];
  selectedProfile: string;
  isValidFile: boolean;
  isFileBig: boolean;
  fullFilename: string;
  fileName: number;
  isMoreDot: boolean;
  url: any;


  constructor(
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router,
    private schoolService: WebcalenderService,
    private webcalenderService: WebcalenderService,
    private pb:FormBuilder,
  ) {
    setTimeout(()=>{this.disable = true}, 5000)
   }

ngOnInit() {
    this.initialForm();
    this.fileUpladForm();
    this.loading = true;
    setTimeout(()=> {this.placeholderText = 'It has changed'}, 5000)
    this.getCalderData()
}
fileUpladForm() {
  this.profileForm= this.pb.group({
    name:[''],
    profile:['']
  })
}
loadData(event) {
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
 
getCalderData(){
      this.webcalenderService.getCalenderList().subscribe(response => {
        if(response!=="") {
          this.schoolServiceData =response;
          this.calenderData = this.schoolServiceData;
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
  //const inputElement: HTMLInputElement = document.getElementById('my-input') as HTMLInputElement
  this.isValidFile = true;
  this.selectedProfile ='';
 
    this.schoolForm = this.fb.group({
      schoolTelePhone: ['', Validators.required],
      schoolname: ['', Validators.required],
      schoolEmail: ['', Validators.required],
      schoolBoard: ['', Validators.required],
      profile: ['', Validators.required],
      editStudentPhoto:[],
      schoolId: '',
    
      
    });
}
onFileSelected(event) {    
  if(event.target.files) { 
  
   var reader = new FileReader();
   reader.readAsDataURL(event.target.files[0]);
   reader.onload=(event:any)=>{
     this.url=event.target.result;
   }
   var newName=(event.target.files[0].name).split('.').slice(0, -1).join('.')
   if(newName.indexOf('.') !== -1)
   {
     this.isMoreDot = true;
   } else {
      this.isMoreDot = false;
   }
   var removeSpace = newName.replace(/\s/g, "");
   var ext = (event.target.files[0].name).split('.').pop(); 
   this.fileName= Math.floor((Math.random() * 1000000000) + 1);
   this.fullFilename= removeSpace+this.fileName+'.'+ext;
   console.log(this.fullFilename)
  // this.blobName = this.fullFilename
   const profile = event.target.files[0];
   const fileType = profile.type
 
   if ((fileType == 'application/pdf' || fileType == 'application/PDF') && !this.isMoreDot) {
     this.isValidFile = true;
   } else {
     this.isValidFile = false;
     const inputElement: HTMLInputElement = document.getElementById('my-input') as HTMLInputElement
     inputElement.value = '';
     this.selectedProfile = '';
     if(document.getElementById('my-input')) {
         let control2 = this.schoolForm.get('profile');
         control2.setValue(null);
         control2.setValidators([Validators.required]);
         control2.updateValueAndValidity();
     }
   }
  //  if (profile.size > 102400) { 
  //     this.isFileBig = true;
  //    this.selectedProfile = '';
  //    const inputElement: HTMLInputElement = document.getElementById('my-input') as HTMLInputElement
  //    inputElement.value = '';
  //    if(document.getElementById('my-input')) {
  //     let control2 = this.schoolForm.get('profile');
  //     control2.setValue(null);
  //     control2.setValidators([Validators.required]);
  //     control2.updateValueAndValidity();
  //   }
  //  } else {
  //    this.isFileBig = false;
  //  }
   this.profileForm.get('profile').setValue(profile);
   //this.schoolForm.get('eventPdf').setValue(profile);
   
 } 
} 
changeFileName(filePath, fileName) {
  const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
  dataTransfer.items.add(new File([filePath], fileName));
  const inputElement: HTMLInputElement = document.getElementById('my-input') as HTMLInputElement
  
  inputElement.files = dataTransfer.files;
  let control2 = this.schoolForm.get('profile');
  control2.setValidators(null);
  control2.updateValueAndValidity();
}
addNewSchool(event: Event, calenderData: WebCalender,type:any) {
  this.fullFilename='';
    if(type == 'edit') {
      
      this.editStudentPhoto =  calenderData.eventFile,
      this.selectedProfile= calenderData.eventFile,
       // this.schoolType = schoolData.isAffiliate;
        this.schoolForm.setValue({
            schoolId:calenderData.id,  
            schoolname: calenderData.sportName,
            schoolEmail:  calenderData.ageTitle,
            schoolBoard:  calenderData.sportLocation,
            schoolTelePhone:  calenderData.title,
            profile:' ', 
            editStudentPhoto:calenderData.eventFile,
           // schoolId:'edit'        
        });  
         this.subViewTitle = 'Edit Calender Data';
   } else {
       this.editStudentPhoto = '';
          this.schoolForm.setValue({ 
            schoolId:'',   
            schoolname: '',
            schoolEmail: '',
            schoolBoard: ' ',
            schoolTelePhone:' ',
            profile:' ', 
            editStudentPhoto:' ', 
          }); 
          this.subViewTitle = 'Add New Calender Data';
    }
    this.display = true;
    
    
}

hideExtraView() {
  this.display = false;
}
 

onSubmit() {
      this.submitted = true;
      const formData = new FormData();
      let schoolID =  this.schoolForm.get('schoolId').value;
      formData.append('schoolname', this.schoolForm.get('schoolname').value);
      formData.append('schoolEmail', this.schoolForm.get('schoolEmail').value);
      formData.append('schoolBoard', this.schoolForm.get('schoolBoard').value);
      formData.append('schoolTelePhone', this.schoolForm.get('schoolTelePhone').value);
      if(this.fullFilename =='') {
       // this.fullFilename = 'edit'
       // formData.append('editFile',  this.editStudentPhoto);
      } else {
        formData.append('editFile',  this.editStudentPhoto);
        formData.append('profile', this.profileForm.get('profile').value, this.fullFilename); 
      }
     if(schoolID == '') {
        this.webcalenderService.saveCalenderData(formData).subscribe(
        res => {
            if (res.status === 'error') {
              this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
            } else {
              this.messageService.add({key: 'custom', severity:'success', summary: 'Calender Data Added Successfully'});

            }
          this.display =false
          this.getCalderData();
        },
        error => this.error = error
      );

    } 
     else {
      this.schoolService.editCalenderData(schoolID,formData).subscribe(
        res => {
            if (res.status === 'success') { 
              console.log('Im success')
              this.messageService.add({key: 'custom', severity:'success', summary: 'Calender Data Updated Successfully'});

              //this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
           } 
          else {
             this.messageService.add({key: 'custom', severity:'success', summary: 'Calender Data Updated Successfully'});

            }
          this.display =false
          this.getCalderData();
        },
        error => this.error = error
      );

     }
 
}


deleteSchoolData(event: Event, calenderData: WebCalender) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmation.confirm({
      key: 'confirm-delete-school',
      icon: 'pi pi-info-circle',
      message: 'Are you sure to delete calender data?',
      accept: () => { this.deleteSchool(calenderData); },
    });
}

private _deleteSchoolData() {
    this.messageService.add({key: 'custom', severity:'success', summary: 'Calender Data Deleted Successfully'});
}

deleteSchool(School) {
  let schoolId=School.id
  this.schoolService.deleteSchool(schoolId).subscribe(
   res => {
     //  if (res.status !== 'error') {
     //    this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
     //  } else {
         this.messageService.add({key: 'custom', severity:'success', summary: 'Calender Data Deleted Successfully'});

     //  }

     this.display =false
     this.getCalderData();
   },
   error => this.error = error
 );
}



private _dropDatabase() {
  console.log('Database dropped');
}


}
