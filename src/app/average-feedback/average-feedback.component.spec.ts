import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageFeedbackComponent } from './average-feedback.component';

describe('LectureFeedbackComponent', () => {
  let component: AverageFeedbackComponent;
  let fixture: ComponentFixture<AverageFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
