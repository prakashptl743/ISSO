import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateInvoiceComponent } from './certificate-invoice.component';

describe('CertificateInvoiceComponent', () => {
  let component: CertificateInvoiceComponent;
  let fixture: ComponentFixture<CertificateInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
