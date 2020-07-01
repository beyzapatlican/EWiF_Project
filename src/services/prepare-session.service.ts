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


@Injectable({
  providedIn: 'root'
})
export class PrepareSessionService {

  constructor(private http: HttpClient) {}

  sessions: Array<Session> = [];
  questionsTF: Array<TrueFalse> = [];
  questionsFree: Array<Free> = [];
  questionsMC: Array<MultipleChoice> = [];
  questionStrings: {questionNum: number, questionString: string}[] = [];

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

  saveQuestion(questionTF?: TrueFalse, questionFree?: Free, questionMC?: MultipleChoice) {
    const questionNum = this.getNextQuestionNum();

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

  clearQuestions() {
    this.questionStrings = [];
    this.questionsTF = [];
    this.questionsMC = [];
    this.questionsFree = [];
  }


  sendRequest(requestBody: PrepareSessionRequest) {
    const body = requestBody;
    const url = this.getUrl() + '/teacher/prepareSession';
    this.http.post(url, body).subscribe(resp => {
      console.log(resp);
    });
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
