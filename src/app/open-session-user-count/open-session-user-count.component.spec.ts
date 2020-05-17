import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSessionUserCountComponent } from './open-session-user-count.component';

describe('OpenSessionUserCountComponent', () => {
  let component: OpenSessionUserCountComponent;
  let fixture: ComponentFixture<OpenSessionUserCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSessionUserCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSessionUserCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
