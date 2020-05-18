import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UrlService} from './url.service';
import {DeleteSessionRequest} from '../models/requests/deleteSessionRequest.model';
import {DeleteSessionResponse} from '../models/responses/deleteSessionResponse.model';
import {AnfangenRequest} from '../models/requests/anfangen-request.model';
import {AnfangenResponse} from '../models/responses/anfangen-response.model';
import {Router} from '@angular/router';
import {OpenSessionUserCountResponse} from '../models/responses/open-session-user-count-response.model';
import {SkipRequest} from '../models/requests/skip-request.model';
import {StatusResponse} from '../models/responses/status-response.model';
import {GetQuestionRequest} from '../models/requests/get-question-request.model';
import {GetQuestionResponse} from '../models/responses/get-question-response.model';
import {QuestionResultsRequest} from '../models/requests/question-results-request.model';
import {QuestionResultsResponse} from '../models/responses/question-results-response.model';
import {GetAnswerResponse} from '../models/responses/get-answer-response.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient,
              private urlService: UrlService,
              private router: Router) {
  }


  delete(pin: string) {
    const request = new DeleteSessionRequest(pin);
    return this.http.request<DeleteSessionResponse>('delete', `${this.urlService.getURL()}/teacher/session`, {body: request});
  }

  userCount(pinOpen: string) {
    return this.http.get<OpenSessionUserCountResponse>(this.urlService.getURL() + '/teacher/openSessionUserCount', {params: { pinOpen }});
  }

  anfangen(name: string, pin: string) {
    const request = new AnfangenRequest(name, pin);
    return this.http.get<AnfangenResponse>(`${this.urlService.getURL()}/teacher/openSessionUserCount`);
  }

  skip(pinOpen: string) {
    const request = new SkipRequest(pinOpen);

    return this.http.post<StatusResponse>(`${this.urlService.getURL()}/teacher/skip`, request);
  }

  getQuestion(pinOpen: string) {
    const request = new GetQuestionRequest(pinOpen);

    return this.http.post<GetQuestionResponse>(`${this.urlService.getURL()}/question`, request);
  }

  getAnswers(pinOpen: string, questionNum: number) {
    const request = new QuestionResultsRequest(pinOpen, questionNum);

    return this.http.post<QuestionResultsResponse>(`${this.urlService.getURL()}/teacher/questionResults`, request);
  }

  getAnswer(pinOpen: string) {
    return this.http.get<GetAnswerResponse>(`${this.urlService.getURL()}/teacher/questionAnswer`, { params: { pinOpen }});
  }

}
