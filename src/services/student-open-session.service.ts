import {HttpClient} from '@angular/common/http';
import {UrlService} from './url.service';
import {TimeoutRequest} from '../models/requests/timeout-request.model';
import {TimeoutResponse} from '../models/responses/timeout-response.model';

export class StudentOpenSessionService {


  constructor(private http: HttpClient,
              private urlService: UrlService) {}

  checkTimeout(pinOpen: string, questionNum: number) {
    const request = new TimeoutRequest(pinOpen, questionNum);
    return this.http.post<TimeoutResponse>(`${this.urlService.getURL()}/timeout`, request);
  }
}
