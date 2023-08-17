import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadReceipt } from './download-receipt.component';

describe('DownloadReceipt', () => {
  let component: DownloadReceipt;
  let fixture: ComponentFixture<DownloadReceipt>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadReceipt ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadReceipt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
