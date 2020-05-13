import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSehenComponent } from './student-sehen.component';

describe('StudentSehenComponent', () => {
  let component: StudentSehenComponent;
  let fixture: ComponentFixture<StudentSehenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSehenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSehenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
