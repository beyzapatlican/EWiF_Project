import { Component, OnInit } from '@angular/core';
import {LogoutService} from '../../services/logout.service';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn = false;
  public isRole = '';

  constructor(public logoutService: LogoutService, private tokenService: TokenService) { }

  ngOnInit() {
    this.tokenService.isLoggedInObservable().subscribe(value => {
      this.loggedIn = value;
    });

    this.isRole = this.tokenService.getRole();
    this.tokenService.isRoleObservable().subscribe(value => {
      console.log(value);
      this.isRole = value;
    });
    // TODO: Add error page if role is not equal to STUDENT OR TEACHER
    if (this.isRole !== this.tokenService.getRole()) {
      console.log('Something went wrong');
    }
  }

  onLogout() {
    this.logoutService.logout();
  }
}
