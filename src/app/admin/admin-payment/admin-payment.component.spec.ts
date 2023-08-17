import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPayment } from './admin-payment.component';

describe('PaymentInvoice', () => {
  let component: AdminPayment;
  let fixture: ComponentFixture<AdminPayment>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPayment ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
