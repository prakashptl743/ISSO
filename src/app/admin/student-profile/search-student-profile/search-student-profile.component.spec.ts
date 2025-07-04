import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchStudentProfileComponent } from "./search-student-profile.component";

describe(" SearchStudentProfileComponent", () => {
  let component: SearchStudentProfileComponent;
  let fixture: ComponentFixture<SearchStudentProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchStudentProfileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStudentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
