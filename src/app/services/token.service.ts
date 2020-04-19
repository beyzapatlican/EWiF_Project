import { Injectable, Injector } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{
  private url = 'http://24.133.107.44:8080';

  constructor(private http: HttpClient,
              private injector: Injector) { }

  intercept(req, next) {
    const loginService = this.injector.get(LoginService);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3JvbGUiOiJURUFDSEVSIiwic3ViIjoid2l0Y2hlciIsImlzcyI6Ik1hbHBpc20iLCJpYXQiOjE1ODcxNTA2NTV9.zukEhSgNraET4no-z4Pne8pgN3cN9czQq6OOkNGEf_Y',
        'Content-Type': 'application/json'
      }
    });
    return next.handle(tokenizedReq);
  }
}
