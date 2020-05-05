import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ForgotUsernameService {
  private readonly apiUrl = 'http://24.133.107.44:8080';

  constructor(private http: HttpClient) { }

  forgotUsername(obj) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.apiUrl + '/' + 'forgotUsername', obj);
  }
  private getUrl(): string {
    return environment.urlAddress;
  }
}
