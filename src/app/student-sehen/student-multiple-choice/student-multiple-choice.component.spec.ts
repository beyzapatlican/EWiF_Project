import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMultipleChoiceComponent } from './student-multiple-choice.component';

describe('StudentMultipleChoiceComponent', () => {
  let component: StudentMultipleChoiceComponent;
  let fixture: ComponentFixture<StudentMultipleChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMultipleChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMultipleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
