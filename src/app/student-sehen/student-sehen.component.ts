import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {StudentOpenSessionService} from '../../services/student-open-session.service';
import {MultipleChoice} from '../../models/question-types/multiple-choice.model';
import {TrueFalse} from '../../models/question-types/true-false.model';
import {Free} from '../../models/question-types/free.model';
import {QuestionType} from '../../models/question-types/question-type.enum';
import {StudentComponent} from '../student/student.component';
import {OpenSessionService} from '../../services/open-session.service';

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
  satir: {question: string, deger: string, studentAnswers: string}[] = [];
  studentAnswers: { answer: string, questionNum: number }[] = [];
  questionMC: MultipleChoice;
  questionTF: TrueFalse;
  questionFr: Free;
  questions: any[] = [];
  questionType: string;
  questionNum = 0;
  pinOpen;
  hasInitialQuestion = false;
  nick: string;
  control = true;
  control2 = false;
  end = false;
  sixSecondInterval = interval(1000);
  timeOutCheckSubscription: Subscription;
  checkQuestionSubscription: Subscription;
  no = false;
  deger: string[] = [];
  question: string[] = [];

  constructor(public studentOpenSessionService: StudentOpenSessionService,
              public openSession: OpenSessionService) { }

  ngOnInit(): void {
    this.pinOpen = StudentComponent.pinOpen;
    this.nick = StudentComponent.nick;

    this.getInitialQuestion();
  }

  getInitialQuestion() {
    this.checkQuestionSubscription = this.sixSecondInterval.subscribe( _ => {
      if (this.hasInitialQuestion) {
        this.checkQuestionSubscription.unsubscribe();
        // tslint:disable-next-line:no-shadowed-variable
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
          if (StudentSehenComponent.answerBool === true) {
            this.studentAnswers.push({
              answer: '' + StudentSehenComponent.answerBool,
              questionNum: this.questionNum});
          }
        // tslint:disable-next-line:triple-equals
          if (StudentSehenComponent.answerInt != undefined) {
            this.studentAnswers.push({
            answer: '' + StudentSehenComponent.answerInt,
            questionNum: this.questionNum});
          }
        // tslint:disable-next-line:triple-equals
          if (StudentSehenComponent.answerStr != undefined) {
            this.studentAnswers.push({
              answer: StudentSehenComponent.answerStr.toString(),
              questionNum: this.questionNum});
          }
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
        this.questions.push(value.MultipleChoice);
        this.clearAnswer(QuestionType.MULTIPLE_CHOICE);

      } else if (value.TrueFalse != null) {
        this.questionTF = value.TrueFalse;
        this.questionType = QuestionType.TRUE_FALSE.valueOf();
        this.questionNum = value.TrueFalse.questionNum;
        this.question.push(value.TrueFalse.question);
        this.questions.push(value.TrueFalse);
        this.clearAnswer(QuestionType.TRUE_FALSE);

      } else if (value.Free != null) {
        this.questionFr = value.Free;
        this.questionType = QuestionType.FREE_TEXT.valueOf();
        this.questionNum = value.Free.questionNum;
        this.question.push(value.Free.question);
        this.questions.push(value.Free);
        this.clearAnswer(QuestionType.FREE_TEXT);
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

  clearAnswer(questionType: QuestionType) {
    switch (questionType) {
      case QuestionType.FREE_TEXT: {
        StudentSehenComponent.answerInt = undefined;
        StudentSehenComponent.answerBool = undefined;
        break;
      } case QuestionType.MULTIPLE_CHOICE: {
        StudentSehenComponent.answerBool = undefined;
        StudentSehenComponent.answerStr = undefined;
        break;
      } case QuestionType.TRUE_FALSE: {
        StudentSehenComponent.answerInt = undefined;
        StudentSehenComponent.answerStr = undefined;
        break;
      }

    }
  }

  getResults() {
    this.openSession.getAllAnswers(this.getPinOpen()).subscribe(value => {
      this.deger = value.answers;
      this.addMissingStudentAnswers();
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

  addMissingStudentAnswers() {
    console.log(this.studentAnswers);
    for (let i = 0; i < this.deger.length; i++) {
      if (i >= this.studentAnswers.length) {
        this.studentAnswers.push({answer: '-', questionNum: i});
        this.questions.push({solution: '-', questionNum: i});
        continue;
      }

      while (this.studentAnswers[i].questionNum !== i) {
        this.studentAnswers.push({answer: '-', questionNum: i});
        this.questions.push({solution: '-', questionNum: i});
        i++;
      }
    }
    this.studentAnswers.sort((a, b) => {
      if (a.questionNum < b.questionNum) {
        return -1;
      } else if (a.questionNum === b.questionNum) {
        return 0;
      } else {
        return 1;
      }
    });
    console.log(this.studentAnswers);
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

  getAnswer(questionIndex, ansIndex) {
    console.log(questionIndex);
    console.log(ansIndex);
    ansIndex = parseInt(ansIndex, 10);
    switch (ansIndex) {
      case 0: {
        if (this.questions[questionIndex].ans1 == null) {
          return '-';
        }
        return this.questions[questionIndex].ans1;
      }
      case 1: {
        if (this.questions[questionIndex].ans2 == null) {
          return '-';
        }
        return this.questions[questionIndex].ans2;

      }
      case 2: {
        if (this.questions[questionIndex].ans3 == null) {
          return '-';
        }
        return this.questions[questionIndex].ans3;
      }
      case 3: {
        if (this.questions[questionIndex].ans4 == null) {
          return '-';
        }
        return this.questions[questionIndex].ans4;
      }
      case 4: {
        if (this.questions[questionIndex].ans5 == null) {
          return '-';
        }
        return this.questions[questionIndex].ans5;
      }
      default: {
        return '-';
      }
    }
  }

}
