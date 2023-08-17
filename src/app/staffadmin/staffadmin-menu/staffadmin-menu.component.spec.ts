import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffadminMenuComponent } from './staffadmin-menu.component';

describe('StaffadminMenuComponent', () => {
  let component: StaffadminMenuComponent;
  let fixture: ComponentFixture<StaffadminMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffadminMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffadminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
