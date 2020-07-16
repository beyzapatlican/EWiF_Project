import {Component, OnDestroy, OnInit} from '@angular/core';
import {OpenSessionService} from '../../services/open-session.service';
import {interval, Subscription} from 'rxjs';
import {GetQuestionResponse} from '../../models/responses/get-question-response.model';
import {QuestionResultsResponse} from '../../models/responses/question-results-response.model';
import {CreateSessionComponent} from '../create-session/create-session.component';
import {StudentSehenComponent} from '../student-sehen/student-sehen.component';
import {StudentOpenSessionService} from '../../services/student-open-session.service';

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
  correctAnswerFree: string;
  allQuestions: GetQuestionResponse[] = [];
  answerQuestions: string[] = [];
  answer: string[];
  everyQuestion: string[] =  [];
  change: boolean;
  end: boolean; true;
  trueAnswers: string[] = [];
  sessionEndet = false;
  deneme: string[] = [];
  denemee: string[] = [];
  denemeee: string[] = [];
  denemeeee: string[] = [];
  denemeeeee: string[] = [];
  deger: string[] = [];
  satir: string[] = [];

  constructor( private sessionService: OpenSessionService, public studentOpenSessionService: StudentOpenSessionService) { }

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
      }, error => {
        if (error.error.message === 'Session has closed') {
          this.endSession();
          this.sessionEndet = true;
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
    });
  }

  endSessionRequest() {
    this.a();
    this.getResults();
    this.endSession();
  }


  private showQuestion(question: GetQuestionResponse) {
    if (question.MultipleChoice != null) {
      this.question = question.MultipleChoice.question + '\n' + 'A)';
      this.question += question.MultipleChoice.ans1 + '\n' + 'B)';
      this.question += question.MultipleChoice.ans2 + '\n' + 'C)';
      this.question += question.MultipleChoice.ans3 + '\n' + 'D)';
      this.question += question.MultipleChoice.ans4 + '\n' + 'E)';
      this.question += question.MultipleChoice.ans5 + '\n';
      this.allQuestions.push(question);
      this.deneme.push(question.MultipleChoice.ans1);
      this.denemee.push(question.MultipleChoice.ans2);
      this.denemeee.push(question.MultipleChoice.ans3);
      this.denemeeee.push(question.MultipleChoice.ans4);
      this.denemeeeee.push(question.MultipleChoice.ans5);
      this.everyQuestion.push(question.MultipleChoice.question + '\n');


    } else if (question.TrueFalse != null) {
      this.question = question.TrueFalse.question + '\n' + 'A)';
      this.question += 'True\n' + 'B)';
      this.question += 'False\n';
      this.allQuestions.push(question);
      this.everyQuestion.push(question.TrueFalse.question + '\n');

    } else if (question.Free != null) {
      this.question = question.Free.question;
      this.allQuestions.push(question);
      this.everyQuestion.push(question.Free.question + '\n');

    } else {
      console.log('Keine Frage');
    }
  }

  private showAnswer(answer: string) {
    console.log(answer);
    this.correctAnswer = answer;
    if ( !(this.trueAnswers.includes(this.correctAnswer))) {
      this.trueAnswers.push(this.correctAnswer);
    }
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
    this.userCountSubscription.unsubscribe();
    this.endOpenSession();
  }

  goBack(): void {
    window.history.back();
  }
  onEnd() {
    // TODO: Send End Session Request
    this.endSession();
    this.end = true;
  }

  endOpenSession() {
    this.sessionService.endOpenSession(this.pinOpen).subscribe(value => {}, error => console.log('error'));
  }

  getResults() {
    this.sessionService.getAllAnswers(this.pinOpen).subscribe(value => {
      this.deger = value.answers;
      this.a();
      console.log(this.deger);
    }, error => console.log('error'));
  }

  a() {
    for (let i = 0; i < this.deger.length; i++) {
      this.satir.push(this.question[i], this.deger[i] + '\n');
      console.log('yass');
    }
  }
}
