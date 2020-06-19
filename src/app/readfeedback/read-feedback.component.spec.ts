import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadFeedbackComponent } from './read-feedback.component';

describe('ReadfeedbackComponent', () => {
  let component: ReadFeedbackComponent;
  let fixture: ComponentFixture<ReadFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
