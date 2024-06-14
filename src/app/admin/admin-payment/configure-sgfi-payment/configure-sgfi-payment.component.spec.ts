import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSgfiPaymentComponent } from './configure-sgfi-payment.component';

describe('ConfigureSgfiPaymentComponent', () => {
  let component: ConfigureSgfiPaymentComponent;
  let fixture: ComponentFixture<ConfigureSgfiPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureSgfiPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSgfiPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
