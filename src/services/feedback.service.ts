import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment.prod';

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {TokenService} from './token.service';
import {UrlService} from './url.service';

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

  done(object) {
    if (object.a !== '' && object.b !== '' && object.c !== '' && object.d !== '' && object.e !== ''
      && object.f !== '' && object.g !== '' && object.pin !== '') {
      this.givenFeedback.next(true);
      this.router.navigate(['/']);
    }
  }
}
