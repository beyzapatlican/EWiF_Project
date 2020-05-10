import {Component, OnInit} from '@angular/core';
import { ChangePasswordService} from '../../services/change-password.service';
import {LogoutService} from '../../services/logout.service';
import {TokenService} from '../../services/token.service';
import {UserService} from '../../services/user.service';
import {User} from '../user';
import {LoginResponse} from '../../models/login-response.model';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  public loggedIn = false;
  public isTeacher = false;
  public isStudent = false;
  public isRole = false;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private changepasswordService: ChangePasswordService,
              private tokenService: TokenService,
              private userService: UserService,
              private loginResponse: LoginResponse,
              private user: User) { }

  ngOnInit() {
    this.tokenService.isTeacherObservable().subscribe(value => {
      this.isTeacher = value;
    });

    this.tokenService.isStudentObservable().subscribe(value => {
      this.isStudent = value;
    });

    this.tokenService.isRoleObservable().subscribe(value => {
      this.isRole = value;
    });

    if (this.tokenService.getAuth() === this.loginResponse.role) {
      return this.isRole;
    }
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
