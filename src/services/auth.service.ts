import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
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
export class AuthService {

  private readonly apiUrl = 'http://24.133.107.44:8080';
  private signedUp: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.signedUp.asObservable();
  }

  constructor(private http: HttpClient,
              private router: Router) { }

  Register(obj) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(this.apiUrl + '/' + 'register', obj, {observe: 'response'});
  }

  done(object) {
    if (object.username !== '' && object.password !== '' && object.name !== '' && object.nachname !== '' && object.email !== ''
      && object.role !== '') {
      this.signedUp.next(true);
      this.router.navigate(['/']);
    }
  }
}
