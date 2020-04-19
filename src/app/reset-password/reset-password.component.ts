import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private resetPasswordService: ResetPasswordService) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:max-line-length
  resetPass(newpass: HTMLInputElement) {

    const passObj = {
      newpass: newpass.value,
    };

    this.resetPasswordService.resetPass(passObj)
      .subscribe(resp => {
        console.log(resp);
      });
  }

}
