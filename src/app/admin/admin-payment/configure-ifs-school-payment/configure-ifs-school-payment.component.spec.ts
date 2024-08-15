import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureIfsSchoolPaymentComponent } from './configure-ifs-school-payment.component';

describe('ConfigureIfsSchoolPaymentComponent', () => {
  let component: ConfigureIfsSchoolPaymentComponent;
  let fixture: ComponentFixture<ConfigureIfsSchoolPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureIfsSchoolPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureIfsSchoolPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
