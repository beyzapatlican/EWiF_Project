import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {SignupRequest} from '../models/requests/signup-request.model';
import {SignupResponse} from '../models/responses/signup-response.model';
import {UrlService} from './url.service';
import {LoginRequest} from '../models/requests/login-request.model';
import {LoginResponse} from '../models/responses/login-response.model';
import {TokenService} from './token.service';

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
              private urlService: UrlService,
              private tokenService: TokenService) { }

  Register(name, password, email, username, role) {
    const request = new SignupRequest(name, username, email, password, role);
    return this.http.post<SignupResponse>(`${this.urlService.getURL()}/register`, request, {observe: 'response'});
  }

  done(token: string, tokenType: string) {
    this.tokenService.saveToken(token);
    this.tokenService.saveRole(tokenType);
    this.signedUp.next(true);
    this.router.navigate(['/']);
  }


}
