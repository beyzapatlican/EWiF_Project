import {Component, OnDestroy, OnInit} from '@angular/core';
import {OpenSessionService} from '../../services/open-session.service';
import {interval, Subscription} from 'rxjs';
import {GetQuestionResponse} from '../../models/responses/get-question-response.model';
import {QuestionResultsResponse} from '../../models/responses/question-results-response.model';
import {CreateSessionComponent} from '../create-session/create-session.component';

@Component({
  selector: 'app-session-management',
  templateUrl: './session-management.component.html',
  styleUrls: ['./session-management.component.css']
})
export class SessionManagementComponent implements OnInit, OnDestroy {
  pinOpen;
  userCount = 0;
  userCountSubscriptionFrequency = interval(3000);
  userCountSubscription: Subscription;
  questionNum: number;
  question = 'Hier werden Fragen angezeigt';
  correctAnswer: string;
  allQuestions: GetQuestionResponse[] = [];
  answerQuestions: string[];
  answer: string[];
  everyQuestion: string[];
  change: boolean;

  constructor( private sessionService: OpenSessionService) { }

  ngOnInit(): void {
    this.pinOpen = CreateSessionComponent.pinOpen;
    this.questionNum = 0;

    this.sessionService.getQuestion(this.pinOpen).subscribe(value => {
      this.showQuestion(value);
    });
    this.userCountSubscription = this.userCountSubscriptionFrequency.subscribe(_ => {
      this.sessionService.userCount(this.pinOpen).subscribe(resp => {
          this.userCount = resp.studentCount;
        }, error => {
          if (error.error.message === 'Invalid pin') {
            this.endSession();
          } else {
            console.log(error);
          }
      });
    });
  }
  ngOnDestroy(): void {
    this.endSession();
  }

  skipRequest() {
    this.sessionService.skip(this.pinOpen).subscribe(value => {
      this.sessionService.getQuestion(this.pinOpen).subscribe(value1 => {
        this.showQuestion(value1);
        this.change = false;
      }, error => {
        // TODO: Fix end of questions
        if (error.error.message === 'Session has closed') {
          this.endSession();
          // TODO: Handle Session has closed
        } else {
          // TODO: Handle error
          console.log('bob' + error);
        }
      });
    }, error => {
      this.endSession();
    });
  }

  getAnswersRequest() {
    this.sessionService.getAnswers(this.pinOpen, this.questionNum).subscribe(value => {
      this.showAnswers(value);
    });
  }

  getAnswerRequest() {
    this.sessionService.getAnswer(this.pinOpen).subscribe(value => {
      this.showAnswer(value.answer);
      this.change = true;
    });
  }

  endSessionRequest() {
    this.endSession();
  }

  private showQuestion(question: GetQuestionResponse) {
    if (question.MultipleChoice != null) {
      this.question = question.MultipleChoice.question + '\n';
      this.question += question.MultipleChoice.ans1 + '\n';
      this.question += question.MultipleChoice.ans2 + '\n';
      this.question += question.MultipleChoice.ans3 + '\n';
      this.question += question.MultipleChoice.ans4 + '\n';
      this.question += question.MultipleChoice.ans5 + '\n';
      this.allQuestions.push(question);
      this.everyQuestion.push(question.MultipleChoice.question);

    } else if (question.TrueFalse != null) {
      this.question = question.TrueFalse.question + '\n';
      this.question += 'True\n';
      this.question += 'False\n';
      this.allQuestions.push(question);
      this.everyQuestion.push(question.TrueFalse.question);

    } else if (question.Free != null) {
      this.question = question.Free.question;
      this.allQuestions.push(question);
      this.everyQuestion.push(question.Free.question);

    } else {
      console.log('No Question to Show');
    }
  }

  private showAnswer(answer: string) {
    console.log(answer);
    this.correctAnswer = answer;
  }

  private showAnswers(question: QuestionResultsResponse) {
    // TODO: Show answer in meaningful way
    this.correctAnswer = '';
    if (question.Free != null) {
      question.Free.answers.forEach(value => this.correctAnswer += value);
      this.answerQuestions.push(this.correctAnswer);

    } else if (question.MultipleChoice != null) {
      question.MultipleChoice.answers.forEach(value => this.correctAnswer += `${value}`);
      this.answerQuestions.push(this.correctAnswer);

    } else if (question.TrueFalse != null) {

      this.correctAnswer += question.TrueFalse.t + ' ';
      this.correctAnswer += question.TrueFalse.f;
      this.answerQuestions.push(this.correctAnswer);
    } else {
      this.correctAnswer = 'No Answers';
      console.log('No Answers');
    }

  }

  private endSession(): void {
    // TODO: End Session
    // TODO: Fix unsubscribe not working
    this.userCountSubscription.unsubscribe();
    console.log(this.allQuestions);
    console.log(this.answerQuestions);
    console.log(this.everyQuestion);
    this.test(this.answerQuestions, this.everyQuestion);
  }

   test(a: string[], b: string[]): void {
    this.answerQuestions = a;
    this.everyQuestion = b;
  }

  goBack(): void {
    window.history.back();
  }
}
