import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  Register(obj) {
    return this.http.post(this.apiUrl + '/' + 'register', obj);
  }
}
