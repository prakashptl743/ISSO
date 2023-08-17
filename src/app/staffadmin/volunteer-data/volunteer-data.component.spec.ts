import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachEntiresComponent } from './coach-entires.component';

describe('CoachEntiresComponent', () => {
  let component: CoachEntiresComponent;
  let fixture: ComponentFixture<CoachEntiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachEntiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachEntiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
