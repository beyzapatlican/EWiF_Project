import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://24.133.107.44:8080';

  constructor(private http: HttpClient) { }

  Login(object) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.url + '/' + 'login', object);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  }
