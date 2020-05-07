import {Component, OnInit} from '@angular/core';
import { ChangePasswordService} from '../../services/change-password.service';
import {LogoutService} from '../../services/logout.service';
import {TokenService} from '../../services/token.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  public loggedIn = false;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private changepasswordService: ChangePasswordService,
              private tokenService: TokenService,
              private userService: UserService,
              public logoutService: LogoutService) { }

  ngOnInit() {
    this.tokenService.isLoggedInObservable().subscribe(value => {
      this.loggedIn = value;
    });
  }

  changePassword(oldPassword: HTMLInputElement, newPassword: HTMLInputElement) {

    const passObj = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    };

    this.changepasswordService.changePass(passObj)
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
