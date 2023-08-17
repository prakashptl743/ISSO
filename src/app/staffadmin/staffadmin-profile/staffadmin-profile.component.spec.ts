import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffadminProfileComponent } from './staffadmin-profile.component';

describe('StaffadminProfileComponent', () => {
  let component: StaffadminProfileComponent;
  let fixture: ComponentFixture<StaffadminProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffadminProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffadminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
