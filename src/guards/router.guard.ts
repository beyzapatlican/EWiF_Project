import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {
  constructor(public tokenService: TokenService, public router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.isLoggedIn()) {
      if (this.tokenService.getRole() === 'TEACHER') {
        this.router.navigate(['/teacher']);
      }
      if (this.tokenService.getRole() === 'STUDENT') {
        this.router.navigate(['/student']);
      }
    }
    return true;
  }
}
