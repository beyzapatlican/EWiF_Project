import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {StudentOpenSessionService} from '../../services/student-open-session.service';
import {MultipleChoice} from '../../models/question-types/multiple-choice.model';
import {TrueFalse} from '../../models/question-types/true-false.model';
import {Free} from '../../models/question-types/free.model';
import {QuestionType} from '../../models/question-types/question-type.enum';
import {BehaviorSubject, Observable} from 'rxjs';
import {CreateSessionComponent} from '../create-session/create-session.component';
import {StudentComponent} from '../student/student.component';
import {delay} from 'rxjs/operators';
import {OpenSessionService} from '../../services/open-session.service';
import {StatusResponse} from '../../models/responses/status-response.model';

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
  studentAnswers: string[] = [];
  questionMC: MultipleChoice;
  questionTF: TrueFalse;
  questionFr: Free;
  questionType: string;
  questionNum = 0;
  pinOpen;
  hasInitialQuestion = false;
  nick: string;
  control = true;
  control2 = false;
  end = false;
  sixSecondInterval = interval(6000);
  timeOutCheckSubscription: Subscription;
  checkQuestionSubscription: Subscription;
  no = false;
  deger: string[] = [];
  question: string[] = [];
  ans: string[] = [];
  anss: string[] = [];
  ansss: string[] = [];
  anssss: string[] = [];

  constructor(public studentOpenSessionService: StudentOpenSessionService,
              public openSession: OpenSessionService) { }

  ngOnInit(): void {
    this.pinOpen = StudentComponent.pinOpen;
    this.nick = StudentComponent.nick;

    this.getInitialQuestion();
    this.getResults();
  }

  getInitialQuestion() {
    this.checkQuestionSubscription = this.sixSecondInterval.subscribe( _ => {
      if (this.hasInitialQuestion) {
        this.checkQuestionSubscription.unsubscribe();
        this.timeOutCheckSubscription = this.sixSecondInterval.subscribe(_ => {
          this.studentOpenSessionService.checkTimeout(this.getPinOpen(), this.questionNum).subscribe(value => {}, error => {
            if (error.error.message === 'Wrong question') {
              this.getQuestion();
            } else if (error.error.message === 'Session has closed') {
              this.close();
            }
          });
        });
        return;
      }
      this.getQuestion();
    });
  }

  ngOnDestroy() {
    this.done();
  }
  update() {
    this.control = false;
  }

  submit() {
    this.studentOpenSessionService.submitAnswer(
      this.questionNum,
      this.getPinOpen(),
      this.getNick(),
      StudentSehenComponent.answerBool, StudentSehenComponent.answerInt, StudentSehenComponent.answerStr)
      .subscribe(value => {
        if (StudentSehenComponent.answerBool === true) { this.studentAnswers.push('true'); }
        if (StudentSehenComponent.answerBool === false) { this.studentAnswers.push('false'); }
        if (StudentSehenComponent.answerInt) { this.studentAnswers.push(StudentSehenComponent.answerInt.toString()); }
        if (StudentSehenComponent.answerStr) { this.studentAnswers.push(StudentSehenComponent.answerStr.toString()); }
        console.log(this.studentAnswers);
        }, error => {

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
    this.done();
    this.getResults();
    this.no = true;
  }

  getQuestion() {
    this.studentOpenSessionService.getQuestion(this.getPinOpen()).subscribe(value => {
      if (value.MultipleChoice != null) {
        this.questionMC = value.MultipleChoice;
        this.questionType = QuestionType.MULTIPLE_CHOICE.valueOf();
        this.questionNum = value.MultipleChoice.questionNum;
        this.question.push(value.MultipleChoice.question);
        this.ans.push(value.MultipleChoice.ans1);
        this.anss.push(value.MultipleChoice.ans2);
        this.ansss.push(value.MultipleChoice.ans3);
        this.anssss.push(value.MultipleChoice.ans4);
      } else if (value.TrueFalse != null) {
        this.questionTF = value.TrueFalse;
        this.questionType = QuestionType.TRUE_FALSE.valueOf();
        this.questionNum = value.TrueFalse.questionNum;
        this.question.push(value.TrueFalse.question);
      } else if (value.Free != null) {
        this.questionFr = value.Free;
        this.questionType = QuestionType.FREE_TEXT.valueOf();
        this.questionNum = value.Free.questionNum;
        this.question.push(value.Free.question);
      }
      this.control = true;
      this.hasInitialQuestion = true;
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

  getResults() {
    this.openSession.getAllAnswers(this.getPinOpen()).subscribe(value => {
      this.deger = value.answers;
      console.log(this.deger);
    }, error => console.log('error'));
  }


  getPinOpen() {
    this.pinOpen = StudentComponent.pinOpen;
    return this.pinOpen;
  }
  getNick() {
    this.nick = StudentComponent.nick;
    return this.nick;
  }
  onSessionDone() {
    // TODO: Implement onSessionDone
    this.done();
  }
  done() {
    if (!this.hasInitialQuestion) {
      return;
    }
    this.timeOutCheckSubscription.unsubscribe();
    this.checkQuestionSubscription.unsubscribe();
  }
  goBack(): void {
    window.history.back();
  }
}
