import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {StudentOpenSessionService} from '../../services/student-open-session.service';
import {MultipleChoice} from '../../models/question-types/multiple-choice.model';
import {TrueFalse} from '../../models/question-types/true-false.model';
import {Free} from '../../models/question-types/free.model';
import {QuestionType} from '../../models/question-types/question-type.enum';

@Component({
  selector: 'app-student-sehen',
  templateUrl: './student-sehen.component.html',
  styleUrls: ['./student-sehen.component.css']
})
export class StudentSehenComponent implements OnInit, OnDestroy {
  questionMC: MultipleChoice;
  questionTF: TrueFalse;
  questionFr: Free;
  questionType: string;
  questionNum = 0;
  timeOutCheckSubscriptionFrequency = interval(6000);
  timeOutCheckSubscription: Subscription;

  constructor(public studentOpenSessionService: StudentOpenSessionService) { }

  ngOnInit(): void {
    this.getQuestion();
    this.timeOutCheckSubscription = this.timeOutCheckSubscriptionFrequency.subscribe(_ => {
      this.studentOpenSessionService.checkTimeout(this.getPinOpen(), this.questionNum).subscribe(value => {}, error => {
        if (error.statusMessage === 'Wrong Question') {
          this.getQuestion();
        } else if (error.statusMessage === 'Session has closed') {
          this.onSessionDone();
        }
      });
    });

  }

  ngOnDestroy() {
    this.done();
  }

  submit() {
    // TODO: Implement submit
  }

  close() {
    // TODO: Implement close
  }

  getQuestion() {
    this.studentOpenSessionService.getQuestion(this.getPinOpen()).subscribe(value => {
      if (value.MultipleChoice != null) {
        this.questionMC = value.MultipleChoice;
        this.questionType = QuestionType.MULTIPLE_CHOICE.valueOf();
        this.questionNum = value.MultipleChoice.questionNum;
      } else if (value.TrueFalse != null) {
        this.questionTF = value.TrueFalse;
        this.questionType = QuestionType.TRUE_FALSE.valueOf();
        this.questionNum = value.TrueFalse.questionNum;
      } else if (value.Free != null) {
        this.questionFr = value.Free;
        this.questionType = QuestionType.FREE_TEXT.valueOf();
        this.questionNum = value.Free.questionNum;
      }
    });
  }

  getPinOpen() {
    // TODO: Get Actual pinOpen
    return 'MAAAAAA';
  }
  onSessionDone() {
    // TODO: Implement onSessionDone
  }
  done() {
    this.timeOutCheckSubscription.unsubscribe();
  }
}
