import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachDataComponent } from './coach-data.component';

describe('CoachDataComponent', () => {
  let component: CoachDataComponent;
  let fixture: ComponentFixture<CoachDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
