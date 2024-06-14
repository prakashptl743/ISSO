import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgfiEntriesComponent } from './sgfi-entries.component';

describe('SgfiEntriesComponent', () => {
  let component: SgfiEntriesComponent;
  let fixture: ComponentFixture<SgfiEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgfiEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgfiEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
