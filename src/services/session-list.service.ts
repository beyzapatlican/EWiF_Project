import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionListService {

  private readonly apiURL = 'http://24.133.107.44:8080/teacher/sessions';
  constructor(private http: HttpClient) {
  }
  GetAll() {
    // @ts-ignore
    return this.http.post(this.apiURL);
  }
}
