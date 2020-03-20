import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableSessionsComponent } from './available-sessions.component';

describe('AvailableSessionsComponent', () => {
  let component: AvailableSessionsComponent;
  let fixture: ComponentFixture<AvailableSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
