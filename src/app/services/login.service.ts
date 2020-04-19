import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

class Resp {
  body: string;
  headers: HttpHeaders;


  constructor(body: string,  headers: HttpHeaders) {
    this.body = body;
    this.headers = headers;
  }
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://24.133.107.44:8080';
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient,
              private router: Router) { }

  Login(object) {
    const headers = {'Content-Type': 'application/json'};

    return this.http.post(this.url + '/' + 'login', object, {observe: 'response'});
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

 /* loggedIn() {
    return !!localStorage.getItem('token');
  }*/

  getToken() {
    return localStorage.getItem('token');
  }
  done(object) {
    if (object.username !== '' && object.password !== '') {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }
  }
