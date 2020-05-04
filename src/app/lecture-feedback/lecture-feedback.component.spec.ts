import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureFeedbackComponent } from './lecture-feedback.component';

describe('LectureFeedbackComponent', () => {
  let component: LectureFeedbackComponent;
  let fixture: ComponentFixture<LectureFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
