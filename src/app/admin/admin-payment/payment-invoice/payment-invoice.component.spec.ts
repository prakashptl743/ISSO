import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInvoice } from './payment-invoice.component';

describe('PaymentInvoice', () => {
  let component: PaymentInvoice;
  let fixture: ComponentFixture<PaymentInvoice>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentInvoice ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentInvoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
