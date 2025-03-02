import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ManageEvent } from "./manage-event.component";

describe("ManageEventReport", () => {
  let component: ManageEvent;
  let fixture: ComponentFixture<ManageEvent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEvent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEvent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
