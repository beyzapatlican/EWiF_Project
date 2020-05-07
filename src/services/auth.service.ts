import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {SignupRequest} from '../models/signup-request.model';
import {SignupResponse} from '../models/signup-response.model';
import {UrlService} from './url.service';

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
              private router: Router,
              private urlService: UrlService) { }

  Register(name, password, email, username, role) {
    const newUser = new SignupRequest(name, username, email, password, role);
    return this.http.post<SignupResponse>(this.urlService.getURL() + '/' + 'register', newUser);
  }

  done() {
    this.signedUp.next(true);
    this.router.navigate(['/']);
  }
}
