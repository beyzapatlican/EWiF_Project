import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {TokenService} from './token.service';
import {UrlService} from './url.service';
import {FeedbackAverage} from '../models/responses/feedback-average.model';
import {Feedback} from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private givenFeedback: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  feedbackValues: Array<string> = ['Schlecht', 'Durchschnittlich', 'Gut'];
  feedbackQuestions: Array<string> = [
    '1. Allgemeine Zufriedenheit : ',
    '2. Gesamterlebnis :',
    '3. Schwierigkeit der Lektion :' ,
    '4. Geschwindigkeit der Lektion :' ,
    '5. Verständlichkeit der Lektion :',
    '6. Konnte der Dozent Ihre Frage beantworten? : ',
    '7. War der Inhalt interessant? : ' ];

  get giveFeedback() {
    return this.givenFeedback.asObservable();
  }
  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private urlService: UrlService,
              private router: Router) {

  }

  Give(obj) {
    const headers = {
      Authorization: this.tokenService.getToken(),
      'Content-Type': 'application/json'};
    return this.http.post(this.urlService.getURL() + '/' + 'giveFeedback', obj, {observe: 'response'});
  }

  getAverageFeedback(pin, type) {
    if (type === 1) {
      return this.getAverageLectureFeedback(pin);
    } else {
      return this.getAverageOpenSessionFeedback(pin);
    }
  }

  getAverageLectureFeedback(pin: string) {
    const params = {
      params:   {pin},
      headers:  {Authorization: this.tokenService.getToken()}};
    return this.http.get<FeedbackAverage>(this.urlService.getURL() + '/teacher/lectureFeedbackAverage', params);
  }

  getAverageOpenSessionFeedback(pinOpen: string) {
    const params = {
      params:   {pinOpen},
      headers:  {Authorization: this.tokenService.getToken()}};
    return this.http.get<FeedbackAverage>(this.urlService.getURL() + '/teacher/openSessionFeedbackAverage', params);
  }
}
