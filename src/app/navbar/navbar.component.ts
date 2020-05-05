import { Component, OnInit } from '@angular/core';
import {LogoutService} from '../services/logout.service';
import {TokenService} from '../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // isLoggedIn$: Observable<boolean>;
  public loggedIn = false;

  constructor(public logoutService: LogoutService, private tokenService: TokenService) { }

  ngOnInit() {
    // this.isLoggedIn$ = this.loginService.isLoggedIn;
    this.tokenService.isLoggedInObservable().subscribe(value => {
      this.loggedIn = value;
    });
  }

  onLogout() {
    this.logoutService.logout();
  }
}
