import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionFeedbackService {

  private readonly apiURL = 'http://24.133.107.44:8080/teacher/openSessionFeedback';
  constructor(private http: HttpClient) {
  }

  GetAll() {
    return this.http.get(this.apiURL);
  }
}
