import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UrlService} from './url.service';
import {BehaviorSubject} from 'rxjs';
import {SignupRequest} from '../models/signup-request.model';
import {SignupResponse} from '../models/signup-response.model';
import {DeleteSessionRequest} from '../models/deleteSessionRequest.model';
import {DeleteSessionResponse} from '../models/deleteSessionResponse.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient,
              private urlService: UrlService) {
  }


  delete(pin: string) {
    const request = new DeleteSessionRequest(pin);
    return this.http.request<DeleteSessionResponse>('delete', `${this.urlService.getURL()}/teacher/session`, {body: request});
  }
  userCount() {
    return this.http.get(this.urlService.getURL() + '/teacher/OpenSessionUserCount');
  }

}
