import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffadminDashboardComponent } from './staffadmin-dashboard.component';

describe('StaffadminDashboardComponent', () => {
  let component: StaffadminDashboardComponent;
  let fixture: ComponentFixture<StaffadminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffadminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffadminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
