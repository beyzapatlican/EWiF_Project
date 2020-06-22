import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {StudentOpenSessionService} from '../../services/student-open-session.service';
import {MultipleChoice} from '../../models/question-types/multiple-choice.model';
import {TrueFalse} from '../../models/question-types/true-false.model';
import {Free} from '../../models/question-types/free.model';
import {QuestionType} from '../../models/question-types/question-type.enum';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-student-sehen',
  templateUrl: './student-sehen.component.html',
  styleUrls: ['./student-sehen.component.css']
})
export class StudentSehenComponent implements OnInit, OnDestroy {
  static answerBool: boolean;
  static answerStr: string;
  static answerInt: number;
  questionMC: MultipleChoice;
  questionTF: TrueFalse;
  questionFr: Free;
  questionType: string;
  questionNum = 0;

  nick: string;
  timeOutCheckSubscriptionFrequency = interval(6000);
  timeOutCheckSubscription: Subscription;

  constructor(public studentOpenSessionService: StudentOpenSessionService) { }

  ngOnInit(): void {
    this.getQuestion();
    this.timeOutCheckSubscription = this.timeOutCheckSubscriptionFrequency.subscribe(_ => {
      this.studentOpenSessionService.checkTimeout(this.getPinOpen(), this.questionNum).subscribe(value => {}, error => {
        if (error.error.message === 'Wrong question') {
          this.getQuestion();
        } else if (error.error.message === 'Session has closed') {
          this.onSessionDone();
        }
      });
    });
  }

  ngOnDestroy() {
    this.done();
  }

  submit() {
    this.studentOpenSessionService.submitAnswer(
      this.questionNum,
      this.getPinOpen(),
      this.getNick(),
      StudentSehenComponent.answerBool, StudentSehenComponent.answerInt, StudentSehenComponent.answerStr)
      .subscribe(value => {}, error => {
      // TODO: Handle Errors
      // Student has already answered
      // Invalid answer
        switch (error.error.message) {
          case 'Session has closed': {
            // TODO: Inform User that session is over
            this.close();
            break;
          }
          case 'Wrong Question': {
            // TODO: Inform User that wrong question
            this.getQuestion();
            break;
          }
          case 'Missing answer field': {
            // TODO: Inform User to answer question
          }
        }
      },
    );
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
    }, error => {
      switch (error.error.message) {
        // TODO: Handle Errors
        case 'Session has closed': {
          this.done();
          break;
        }
      }
    });
    StudentSehenComponent.answerInt = null;
    StudentSehenComponent.answerBool = null;
    StudentSehenComponent.answerStr = null;
  }

  getPinOpen() {
    // TODO: Get Actual pinOpen
    return 'MAAAAAA';
  }
  getNick() {
    // TODO: Get Actual nick
    return 'alp2';
  }
  onSessionDone() {
    // TODO: Implement onSessionDone
    this.done();
  }
  done() {
    this.timeOutCheckSubscription.unsubscribe();
  }
  goBack(): void {
    window.history.back();
  }
}
