import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbartwoComponent } from './navbartwo.component';

describe('NavbartwoComponent', () => {
  let component: NavbartwoComponent;
  let fixture: ComponentFixture<NavbartwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbartwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbartwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
