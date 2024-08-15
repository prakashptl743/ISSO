import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IfsSchoolDataComponent } from './ifs-school-data.component';

describe('IfsSchoolDataComponent', () => {
  let component: IfsSchoolDataComponent;
  let fixture: ComponentFixture<IfsSchoolDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfsSchoolDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfsSchoolDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
