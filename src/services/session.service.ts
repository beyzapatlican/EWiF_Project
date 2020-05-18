import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UrlService} from './url.service';
import {BehaviorSubject} from 'rxjs';
import {SignupRequest} from '../models/requests/signup-request.model';
import {SignupResponse} from '../models/responses/signup-response.model';
import {DeleteSessionRequest} from '../models/requests/deleteSessionRequest.model';
import {DeleteSessionResponse} from '../models/responses/deleteSessionResponse.model';
import {AnfangenRequest} from '../models/requests/anfangen-request.model';
import {AnfangenResponse} from '../models/responses/anfangen-response.model';
import {Router} from '@angular/router';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient,
              private urlService: UrlService,
              private router: Router,
              private tokenService: TokenService) {
  }


  delete(pin: string) {
    const request = new DeleteSessionRequest(pin);
    return this.http.request<DeleteSessionResponse>('delete', `${this.urlService.getURL()}/teacher/session`, {body: request});
  }

  userCount() {
    return this.http.get(this.urlService.getURL() + '/teacher/OpenSessionUserCount');
  }

  anfangen(pin: string) {
    const request = new AnfangenRequest(pin);
    this.router.navigate(['/createSession']);
    return this.http.post<AnfangenResponse>(`${this.urlService.getURL()}/teacher/createSession`, request, {observe: 'response'});
  }
}
