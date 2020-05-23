import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentSehenComponent} from '../student-sehen.component';
import {BehaviorSubject, Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-student-free-text',
  templateUrl: './student-free-text.component.html',
  styleUrls: ['./student-free-text.component.css']
})
export class StudentFreeTextComponent implements OnInit, OnDestroy {

  answerField: string;
  answerFieldBehaviorSubject = new BehaviorSubject<string>(this.answerField);
  answerFieldSubscription: Subscription;

  constructor(public studentSehenComponent: StudentSehenComponent) { }

  ngOnInit(): void {
    this.answerFieldSubscription = this.answerFieldBehaviorSubject.asObservable().subscribe(value => {
      StudentSehenComponent.answerStr = this.answerField;
    });
  }

  ngOnDestroy() {
    this.answerFieldSubscription.unsubscribe();
  }

  bob() {
    console.log('bob');
  }

  updateAnswer() {
    StudentSehenComponent.answerStr = this.answerField;
  }
}
