import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UrlService} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private readonly apiURL = 'http://24.133.107.44:8080';
  constructor(private http: HttpClient) {
  }
  delete(pin: string) {
    return this.http.delete(this.apiURL + '/teacher/session');
  }
  userCount() {
    return this.http.get(this.apiURL + '/teacher/OpenSessionUserCount');
  }
}
