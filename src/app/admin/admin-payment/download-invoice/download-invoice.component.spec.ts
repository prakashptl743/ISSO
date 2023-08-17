import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadInvoice } from './download-invoice.component';

describe('DownloadInvoice', () => {
  let component: DownloadInvoice;
  let fixture: ComponentFixture<DownloadInvoice>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadInvoice ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadInvoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
