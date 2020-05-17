import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {LoginRequest} from '../models/requests/login-request.model';
import {LoginResponse} from '../models/responses/login-response.model';
import {TokenService} from './token.service';
import {UrlService} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private router: Router,
              private tokenService: TokenService,
              private urlService: UrlService) {
  }

  login(username: string, password: string) {
    const request = new LoginRequest(username, password);
    return this.http.post<LoginResponse>(`${this.urlService.getURL()}/login`, request, {observe: 'response'});
  }

  done(token: string, tokenType: string) {
    this.tokenService.saveToken(token);
    this.tokenService.saveRole(tokenType);
    this.router.navigate(['/']);
  }
}
