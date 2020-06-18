import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {TokenService} from './token.service';
import {UrlService} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private givenFeedback: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get giveFeedback() {
    return this.givenFeedback.asObservable();
  }
  constructor(private http: HttpClient,
              private tokenService: TokenService,
              private urlService: UrlService,
              private router: Router) {}

  Give(obj) {
    const headers = {
      Authorization: this.tokenService.getToken(),
      'Content-Type': 'application/json'};
    return this.http.post(this.urlService.getURL() + '/' + 'giveFeedback', obj, {observe: 'response'});
  }
}
