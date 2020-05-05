import {HttpClient, HttpInterceptor} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {TokenService} from '../app/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient,
              private injector: Injector,
              private tokenService: TokenService) { }

  intercept(req, next) {
    if (this.tokenService.isLoggedIn()) {
      const tokenizedReq = req.clone({
        headers: req.headers.set('Authorization', this.tokenService.getToken()),
      });
      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }
}
