import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgfiEntryComponent } from './sgfi-entry.component';

describe('SgfiEntryComponent', () => {
  let component: SgfiEntryComponent;
  let fixture: ComponentFixture<SgfiEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgfiEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgfiEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
