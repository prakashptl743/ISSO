import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGameComponent } from './map-game.component';

describe('MapGameComponent', () => {
  let component: MapGameComponent;
  let fixture: ComponentFixture<MapGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
