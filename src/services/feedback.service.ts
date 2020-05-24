import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TrueFalse} from '../models/question-types/true-false.model';
import {Free} from '../models/question-types/free.model';
import {MultipleChoice} from '../models/question-types/multiple-choice.model';
import {PrepareSessionRequest} from '../models/requests/prepare-session-request.model';
import {PrepareSessionResponse} from '../models/responses/prepare-session-response.model';
import {environment} from '../environments/environment.prod';
import {FeedbackRequest} from '../models/requests/feedback-request.model';

import {Injectable} from '@angular/core';
import {FeedbackChoice} from '../models/feedback-choice.model';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

class Resp {
  body: string;
  headers: HttpHeaders;


  constructor(body: string,  headers: HttpHeaders) {
    this.body = body;
    this.headers = headers;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly apiUrl = 'http://24.133.107.44:8080';
  private givenFeedback: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get giveFeedback() {
    return this.givenFeedback.asObservable();
  }
  constructor(private http: HttpClient,
              private router: Router) {}

  Give(obj) {
    const headers = {
      Authorization: this.getToken(),
      'Content-Type': 'application/json'};
    return this.http.post(this.getUrl() + '/' + 'giveFeedback', obj, {observe: 'response'});
  }

  done(object) {
    if (object.a !== '' && object.b !== '' && object.c !== '' && object.d !== '' && object.e !== ''
      && object.f !== '' && object.g !== '' && object.pin !== '') {
      this.givenFeedback.next(true);
      this.router.navigate(['/']);
    }
  }

  private getToken(): string {
    // tslint:disable-next-line:max-line-length
    return 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3JvbGUiOiJBRE1JTiIsInN1YiI6ImFscCIsImlzcyI6Ik1hbHBpc20iLCJpYXQiOjE1ODQzOTE5NjJ9.cjzdW7kOZZzG_K8cgYj33BIh8KukQyoCaZiMhO517_U';
  }

  private getUrl(): string {
    return environment.urlAddress;
  }
}
