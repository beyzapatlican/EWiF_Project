import {Component, OnInit} from '@angular/core';
import {changePassService} from '../services/changePass.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private changePassService: changePassService) { }

  ngOnInit() {
  }

  changePassword(oldPassword: HTMLInputElement, newPassword: HTMLInputElement) {

    const passObj = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    };

    this.changePassService.changePass(passObj)
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
