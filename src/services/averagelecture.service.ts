import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenService} from './token.service';
import {UrlService} from './url.service';
import {LoginRequest} from '../models/requests/login-request.model';
import {LoginResponse} from '../models/responses/login-response.model';
import {LecturefeedbackaverageModel} from '../models/responses/lecturefeedbackaverage.model';
import {Feedback} from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class AveragelectureService {

  private readonly apiURL = 'http://24.133.107.44:8080/teacher/lectureFeedback';
  constructor(private http: HttpClient,
              private router: Router,
              private tokenService: TokenService,
              private urlService: UrlService) {
  }

  GetAll() {
    return this.http.get(this.apiURL);
  }

  login(pin: string) {
    const request = new Feedback(pin);
    return this.http.post<Feedback>(`${this.urlService.getURL()}/read-feedback`, request, {observe: 'response'});
  }

  done(token: string, tokenType: string) {
    this.tokenService.saveToken(token);
    this.tokenService.saveRole(tokenType);
    this.router.navigate(['']);
  }
}
