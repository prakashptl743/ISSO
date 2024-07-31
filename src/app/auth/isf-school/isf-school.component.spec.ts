import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IsfSchoolComponent } from './isf-school.component';
 

 
describe('SchoolRegistrationComponent', () => {
  let component: IsfSchoolComponent;
  let fixture: ComponentFixture<IsfSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsfSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsfSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
