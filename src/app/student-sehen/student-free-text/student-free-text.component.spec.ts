import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFreeTextComponent } from './student-free-text.component';

describe('StudentFreeTextComponent', () => {
  let component: StudentFreeTextComponent;
  let fixture: ComponentFixture<StudentFreeTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFreeTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFreeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
