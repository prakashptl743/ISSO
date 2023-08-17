import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEventReport } from './manage-event-report.component';

describe('ManageEventReport', () => {
  let component: ManageEventReport;
  let fixture: ComponentFixture<ManageEventReport>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEventReport ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEventReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
