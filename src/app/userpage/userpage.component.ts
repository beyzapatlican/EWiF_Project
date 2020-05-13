import {Component, OnInit} from '@angular/core';
import { ChangePasswordService} from '../../services/change-password.service';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  public isRole = '';
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private changePasswordService: ChangePasswordService,
              private tokenService: TokenService) { }

  ngOnInit() {
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

  changePassword(oldPassword: HTMLInputElement, newPassword: HTMLInputElement) {

    const passObj = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    };

    this.changePasswordService.changePass(passObj)
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
