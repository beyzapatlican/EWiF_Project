import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LecturefeedbackService {

  private readonly apiURL = 'http://24.133.107.44:8080/teacher/lectureFeedback';
  constructor(private http: HttpClient) {
  }

  GetAll() {
    return this.http.get(this.apiURL);
  }
}
