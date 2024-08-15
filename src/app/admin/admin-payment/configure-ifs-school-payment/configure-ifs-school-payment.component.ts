import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ReportMeritService } from '../../service/report-merit.service';

@Component({
  selector: 'app-configure-ifs-school-payment',
  templateUrl: './configure-ifs-school-payment.component.html',
  styleUrls: ['./configure-ifs-school-payment.component.css']
})
export class ConfigureIfsSchoolPaymentComponent implements OnInit {
  sgfiAmountForm: FormGroup;
  error: any;
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private meritService: ReportMeritService
  ) { }

  ngOnInit() {
    this.initialForm();
    this.getAmountData()
  }
  initialForm() {
    this.sgfiAmountForm = this.fb.group({
      id: [''],
      amount: ['', Validators.required]
    });
  }
  getAmountData() {
    this.meritService.getIfsSchoolAmountData().subscribe(
      response => {
        if(response!=="") {
          this.sgfiAmountForm.setValue({
            id:response[0].id,  
            amount: response[0].amount
          }); 
        }
      });
  }
  onSubmit() {
    const formData = new FormData();
    let id =  this.sgfiAmountForm.get('id').value;
    formData.append('amount', this.sgfiAmountForm.get('amount').value);
 
    this.meritService.updateIfsSchoolAmount(id,formData).subscribe(
      res => {
          if (res.status === 'error') { 
            this.messageService.add({severity:'error', summary: 'Error Message', detail:'Validation failed'});
          } else {
            this.messageService.add({key: 'custom', severity:'success', summary: 'Amount Updated Successfully'});
          }
       // this.display =false
        // this.getCertificateData();
      },
      error => this.error = error
    );
  }
}
