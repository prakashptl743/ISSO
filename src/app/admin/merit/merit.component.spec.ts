import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeritComponent } from './merit.component';

describe('MeritComponent', () => {
  let component: MeritComponent;
  let fixture: ComponentFixture<MeritComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeritComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
