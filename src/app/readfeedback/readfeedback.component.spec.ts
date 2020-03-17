import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadfeedbackComponent } from './readfeedback.component';

describe('ReadfeedbackComponent', () => {
  let component: ReadfeedbackComponent;
  let fixture: ComponentFixture<ReadfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
