import {Inject, Injectable} from '@angular/core';
import {TokenService} from './token.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {


  constructor(private tokenService: TokenService, private router: Router) {
  }

  logout() {
    this.tokenService.deleteToken();
    this.tokenService.deleteRole();
    this.router.navigate(['/signIn']);
  }
}
