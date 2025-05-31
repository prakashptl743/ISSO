import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StudentProfileEnrollmentComponent } from "./student-profile-enrollment.component";

describe("StudentProfileEnrollmentComponent", () => {
  let component: StudentProfileEnrollmentComponent;
  let fixture: ComponentFixture<StudentProfileEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProfileEnrollmentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfileEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
