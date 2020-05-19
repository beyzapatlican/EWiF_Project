import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {
  role: string;
  constructor(public tokenService: TokenService, public router: Router) {
    this.role = this.tokenService.getRole();

  }
  canActivate(): boolean {
    if (this.tokenService.isLoggedIn()) {
      if (this.role === 'TEACHER') {
        this.router.navigate(['/teacher']);
      }
      if (this.role === 'STUDENT') {
        this.router.navigate(['/student']);
      }
    } else {
      this.router.navigate(['']);
    }
    return true;
  }
}
