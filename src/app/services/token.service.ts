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
        Authorization: 'Bearer ${loginService.getToken()}'
      }
    });
    return next.handle(tokenizedReq);
  }
}
