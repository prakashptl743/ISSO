import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageTeamReport } from './manage-team-report.component';

 

describe('ManageEventReport', () => {
  let component: ManageTeamReport;
  let fixture: ComponentFixture<ManageTeamReport>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTeamReport ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
