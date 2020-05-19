import {Injectable} from '@angular/core';
import {Router, CanActivate, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginService} from '../services/login.service';
import {TokenService} from '../services/token.service';


@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {
  constructor(public tokenService: TokenService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.tokenService.isLoggedIn()) {
      this.router.navigate(['/signIn']);
      return false;
    }
    return true;
  }
}
