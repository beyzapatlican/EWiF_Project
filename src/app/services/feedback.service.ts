import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TrueFalse} from '../models/question-types/true-false.model';
import {Free} from '../models/question-types/free.model';
import {MultipleChoice} from '../models/question-types/multiple-choice.model';
import {PrepareSessionRequest} from '../models/prepare-session-request.model';
import {PrepareSessionResponse} from '../models/prepare-session-response.model';
import {environment} from '../../environments/environment.prod';
import {FeedbackRequest} from '../models/feedback-request.model';

import {Injectable} from '@angular/core';
import {FeedbackChoice} from '../models/feedback-choice.model';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) {}

  sendRequest(requestBody: FeedbackRequest) {
    const headers = {
      Authorization: this.getToken(),
      'Content-Type': 'application/json'
    };
    const body = requestBody;
    const url = this.getUrl() + '/';
    this.http.post(url, body, {headers}).subscribe(resp => {
      console.log(resp);
    });
  }

  prepareRequest(feedbackChoices: Array<FeedbackChoice>) {
    return new FeedbackRequest(feedbackChoices);
  }
  private getToken(): string {
    // tslint:disable-next-line:max-line-length
    return 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3JvbGUiOiJURUFDSEVSIiwic3ViIjoiYWxwcyIsImlzcyI6Ik1hbHBpc20iLCJpYXQiOjE1ODczOTAxNjZ9.bsoEOVBH2EBRL9o_BvpERdMvBRv7HYgbKWefGfu9MWA';
  }

  private getUrl(): string {
    return environment.urlAddress;
  }
}
