import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayNowComponent } from './pay-now.component';

describe('PayNowComponent', () => {
  let component: PayNowComponent;
  let fixture: ComponentFixture<PayNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
