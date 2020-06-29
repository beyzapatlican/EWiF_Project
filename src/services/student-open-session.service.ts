import {HttpClient} from '@angular/common/http';
import {UrlService} from './url.service';
import {TimeoutRequest} from '../models/requests/timeout-request.model';
import {TimeoutResponse} from '../models/responses/timeout-response.model';
import {GetQuestionRequest} from '../models/requests/get-question-request.model';
import {GetQuestionResponse} from '../models/responses/get-question-response.model';
import {Injectable} from '@angular/core';
import {AnswerQuestionRequest} from '../models/requests/answer-question-request.model';
import {AnswerQuestionResponse} from '../models/responses/answer-question-response.model';
import {StudentSehenComponent} from '../app/student-sehen/student-sehen.component';

@Injectable({
  providedIn: 'root'
})
export class StudentOpenSessionService {
  constructor(private http: HttpClient,
              private urlService: UrlService) {}

  checkTimeout(pinOpen: string, questionNum: number) {
    const request = new TimeoutRequest(pinOpen, questionNum);
    return this.http.post<TimeoutResponse>(`${this.urlService.getURL()}/timeout`, request);
  }

  getQuestion(pinOpen: string) {
    const reqeust = new GetQuestionRequest(pinOpen);
    return this.http.post<GetQuestionResponse>(`${this.urlService.getURL()}/question`, reqeust);
  }

  submitAnswer(questionNum: number, pinOpen: string, nick: string, answerBool?: boolean, answerInt?: number, answerStr?: string) {
    const request = new AnswerQuestionRequest(questionNum, pinOpen, nick, answerBool, answerInt, answerStr);
    return this.http.post<AnswerQuestionResponse>(`${this.urlService.getURL()}/student/answerQuestion`, request);
  }
}
