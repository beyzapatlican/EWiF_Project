import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../services/session.service';
import {interval, Subscription} from 'rxjs';
import {MultipleChoice} from '../../models/question-types/multiple-choice.model';
import {TrueFalse} from '../../models/question-types/true-false.model';
import {Free} from '../../models/question-types/free.model';
import {GetQuestionResponse} from '../../models/responses/get-question-response.model';

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
  question = 'Hier wird fragen angezeigt';


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

  endSessionRequest() {

  }

  private showQuestion(question: GetQuestionResponse) {
    if (question.MultipleChoice != null) {
      this.question = question.MultipleChoice.question;

    } else if (question.TrueFalse != null) {
      this.question = question.TrueFalse.question;

    } else if (question.Free != null) {
      this.question = question.Free.question;

    } else {
      console.log('No Question to Show');
    }
  }

  private endSession() {
    // TODO: End Session
    // TODO: Fix unsubscribe not working
    this.userCountSubscription.unsubscribe();
  }
}
