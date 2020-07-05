import {HttpClient} from '@angular/common/http';
import {TrueFalse} from '../models/question-types/true-false.model';
import {Free} from '../models/question-types/free.model';
import {MultipleChoice} from '../models/question-types/multiple-choice.model';
import {PrepareSessionRequest} from '../models/requests/prepare-session-request.model';
import {environment} from '../environments/environment.prod';

import {Injectable} from '@angular/core';
import {SessionResponse} from '../models/responses/session-response.model';
import {AllQuestionsResponse} from '../models/responses/all-questions-response.model';
import {Session} from '../models/session';
import {FormControl, FormGroup} from '@angular/forms';
import {QuestionType} from '../models/question-types/question-type.enum';
import {UrlService} from './url.service';
import {DeleteSessionRequest} from '../models/requests/deleteSessionRequest.model';
import {DeleteSessionResponse} from '../models/responses/deleteSessionResponse.model';


@Injectable({
  providedIn: 'root'
})
export class PrepareSessionService {

  constructor(private http: HttpClient, private urlService: UrlService) {}

  sessions: Array<Session> = [];
  questionsTF: Array<TrueFalse> = [];
  questionsFree: Array<Free> = [];
  questionsMC: Array<MultipleChoice> = [];
  questionStrings: {questionNum: number, questionString: string}[] = [];
  editQuestion = false;
  newSession = false;


  selectedRowNumber = -1;
  selectedSessionIndex: any;

  questionFormGroup: FormGroup;

  prepareNewFormGroup(type: QuestionType) {
    switch (type) {
      case QuestionType.MULTIPLE_CHOICE: {
        this.questionFormGroup = new FormGroup({
          question: new FormControl(''),
          solution: new FormControl(''),
          ans1: new FormControl(''),
          ans2: new FormControl(''),
          ans3: new FormControl(''),
          ans4: new FormControl(''),
          ans5: new FormControl('')
        });
        break;
      } case QuestionType.TRUE_FALSE: {
          this.questionFormGroup = new FormGroup({
            question: new FormControl(''),
            solution: new FormControl('')
          });
          break;
      } case QuestionType.FREE_TEXT: {
        this.questionFormGroup = new FormGroup({
          question: new FormControl(''),
          solution: new FormControl(''),
        });
      }
    }
  }

  getQuestionNum(): number {
    if (this.selectedRowNumber >= this.questionsTF.length +
      this.questionsFree.length +
      this.questionsMC.length || !this.editQuestion) {
      return this.getNextQuestionNum();
    } else {
        return this.selectedRowNumber;
    }
  }


  getNextQuestionNum(): number {
    const questionCount = this.questionsTF.length +
      this.questionsFree.length +
      this.questionsMC.length;

    const foundArr = Array<boolean>(questionCount);
    this.questionsMC.forEach(question => foundArr[question.questionNum] = true);
    this.questionsTF.forEach(question => foundArr[question.questionNum] = true);
    this.questionsFree.forEach(question => foundArr[question.questionNum] = true);
    let questionNum = questionCount;

    foundArr.forEach((found, index) => {
      if (!found) {
        questionNum = index;
        return;
      }
    });

    return questionNum;
  }

  editQuestionInArray(question, array, questionNum) {
    question.questionNum = questionNum;
    const index = array.findIndex( value => value.questionNum === this.questionStrings[this.selectedRowNumber].questionNum);
    array[index] = question;
    this.questionStrings[this.selectedRowNumber].questionString = question.question;
  }

  postDeleteSession(pin: string) {
    const request = new DeleteSessionRequest(pin);
    return this.http.request<DeleteSessionResponse>('delete', `${this.urlService.getURL()}/teacher/session`, {body: request});
  }

  saveQuestion(questionTF?: TrueFalse, questionFree?: Free, questionMC?: MultipleChoice) {
    const questionNum = this.getQuestionNum();
    if (this.editQuestion) {
      if (questionTF !== undefined) {
        this.editQuestionInArray(questionTF, this.questionsTF, questionNum);
      } else if (questionFree !== undefined) {
        this.editQuestionInArray(questionFree, this.questionsFree, questionNum);
      } else if (questionMC !== undefined) {
        this.editQuestionInArray(questionMC, this.questionsMC, questionNum);
      }
    } else {
      if (questionTF !== undefined) {
        questionTF.questionNum = questionNum;
        this.questionsTF.push(questionTF);
        this.questionStrings.push({questionNum, questionString: questionTF.question});

      } else if (questionFree !== undefined) {
        questionFree.questionNum = questionNum;
        this.questionsFree.push(questionFree);
        this.questionStrings.push({questionNum, questionString: questionFree.question});

      } else if (questionMC !== undefined) {
        questionMC.questionNum = questionNum;
        this.questionsMC.push(questionMC);
        this.questionStrings.push({questionNum, questionString: questionMC.question});
      }
    }
  }

  clearQuestions() {
    this.questionStrings = [];
    this.questionsTF = [];
    this.questionsMC = [];
    this.questionsFree = [];
  }


  sendRequest(requestBody: PrepareSessionRequest) {
    const body = requestBody;
    const url = this.getUrl() + '/teacher/prepareSession';
    return this.http.post(url, body);
  }

  prepareRequest(questionsTF: Array<TrueFalse>,
                 questionsFree: Array<Free>,
                 questionsMC: Array<MultipleChoice>,
                 testName: string) {
    return new PrepareSessionRequest(testName, questionsTF, questionsFree, questionsMC);
  }

  getAllSessions() {
    return this.http.post<SessionResponse>(`${this.getUrl()}/teacher/sessions`, {});
  }

  getAllQuestions(pin: string) {
    return this.http.post<AllQuestionsResponse>(`${this.getUrl()}/teacher/allQuestions`, {pin});
  }

  private getUrl(): string {
    return environment.urlAddress;
  }
}
