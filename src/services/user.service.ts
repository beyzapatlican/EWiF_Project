import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {LoginRequest} from '../models/requests/login-request.model';
import {LoginResponse} from '../models/responses/login-response.model';
import {TokenService} from './token.service';
import {UrlService} from './url.service';
import {SignupRequest} from '../models/requests/signup-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private role: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  get isLoggedIn() {
    return this.role.asObservable();
  }

  constructor(private http: HttpClient,
              private router: Router,
              private tokenService: TokenService,
              private urlService: UrlService) {
  }

  Show() {
    return this.http.post(`${this.urlService.getURL()}/login`, {observe: 'response'});
  }

  done(token: string, tokenType: string) {
    this.tokenService.saveToken(token);
    this.tokenService.saveRole(tokenType);
    this.role.next(true);
    this.router.navigate(['/userpage']);
  }
}
