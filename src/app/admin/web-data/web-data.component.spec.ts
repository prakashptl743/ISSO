import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDataComponent } from './web-data.component';

describe('WebDataComponent', () => {
  let component: WebDataComponent;
  let fixture: ComponentFixture<WebDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
