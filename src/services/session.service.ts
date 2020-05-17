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

  userCount() {
    return this.http.get(this.urlService.getURL() + '/teacher/OpenSessionUserCount');
  }

  anfangen(name: string, pin: string) {
    const request = new AnfangenRequest(name, pin);
    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    return this.http.get<AnfangenResponse>(`${this.urlService.getURL()}/teacher/OpenSessionUserCount`, request, {queryParams: { pinOpen: 'pin' }});
  }
}
