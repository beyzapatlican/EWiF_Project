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
              private injector: Injector,
              public loginService: LoginService) { }


  interceptt(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loginService.getToken()}`
      }
    });
    return next.handle(request);
  }

  intercept(req, next) {
    const loginService = this.injector.get(LoginService);
    const tokenizedReq = req.clone({
      setHeaders: {
        // tslint:disable-next-line:max-line-length
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3JvbGUiOiJBRE1JTiIsInN1YiI6ImFscCIsImlzcyI6Ik1hbHBpc20iLCJpYXQiOjE1ODQzOTE5NjJ9.cjzdW7kOZZzG_K8cgYj33BIh8KukQyoCaZiMhO517_U',
        'Content-Type': 'application/json'
      }
    });
    return next.handle(tokenizedReq);
  }
}
