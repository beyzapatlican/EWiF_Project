import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {interval, Subscription} from 'rxjs';
import {GetQuestionResponse} from '../../models/responses/get-question-response.model';
import {QuestionResultsResponse} from '../../models/responses/question-results-response.model';

@Component({
  selector: 'app-session-management',
  templateUrl: './session-management.component.html',
  styleUrls: ['./session-management.component.css']
})
export class SessionManagementComponent implements OnInit, OnDestroy {
  pinOpen = 'MAAAAAA';
  userCount = 0;
  userCountSubscriptionFrequency = interval(3000);
  userCountSubscription: Subscription;
  questionNum: number;
  question = 'Hier werden Fragen angezeigt';
  correctAnswer: string;


  constructor( private sessionService: SessionService) { }

  ngOnInit(): void {
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

  getAnswerRequest() {

  }

  getAnswerRequest() {
    this.sessionService.getAnswer(this.pinOpen).subscribe(value => {
      this.showAnswer(value.answer);
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

    } else if (question.TrueFalse != null) {
      this.question = question.TrueFalse.question;
      this.question += 'True\n';
      this.question += 'False\n';

    } else if (question.Free != null) {
      this.question = question.Free.question;

    } else {
      console.log('No Question to Show');
    }
  }

  private showAnswer(answer: string) {
    console.log(answer);
  }

  private showAnswers(question: QuestionResultsResponse) {
    // TODO: Show answer in meaningful way
    this.correctAnswer = '';
    if (question.Free != null) {
      question.Free.answers.forEach(value => this.correctAnswer += value);

    } else if (question.MultipleChoice != null) {
      question.MultipleChoice.answers.forEach(value => this.correctAnswer += `${value} `);

    } else if (question.TrueFalse != null) {

      this.correctAnswer += question.TrueFalse.t + ' ';
      this.correctAnswer += question.TrueFalse.f;
    } else {
      this.correctAnswer = 'No Answers';
      console.log('No Answers');
    }

  }

  private endSession() {
    // TODO: End Session
    // TODO: Fix unsubscribe not working
    this.userCountSubscription.unsubscribe();
  }
}
