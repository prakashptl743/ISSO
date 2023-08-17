import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentCertificateComponent } from './student-certificate.component';
 

 
describe('StudentCertificateComponent', () => {
  let component: StudentCertificateComponent;
  let fixture: ComponentFixture<StudentCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
