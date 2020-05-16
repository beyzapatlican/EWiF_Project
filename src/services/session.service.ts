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

  private readonly apiURL = 'http://24.133.107.44:8080';
  constructor(private http: HttpClient,
              private urlService: UrlService) {
  }


  delete(pin: string) {
    const request = new DeleteSessionRequest(pin);
    // @ts-ignore
    return this.http.delete<DeleteSessionResponse>(`${this.urlService.getURL()}/teacher/session`, request, {observe: 'response'});
  }
  userCount() {
    return this.http.get(this.apiURL + '/teacher/OpenSessionUserCount');
  }

}
