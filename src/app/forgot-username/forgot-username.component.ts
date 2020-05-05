import { Component, OnInit } from '@angular/core';
import {ForgotUsernameService} from '../../services/forgot-username.service';

@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.css']
})
export class ForgotUsernameComponent implements OnInit {

  constructor(private forgotUsernameService: ForgotUsernameService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:max-line-length
  forgotUsername(email: HTMLInputElement) {

    const emailobj = {
      email: email.value,
    };

    this.forgotUsernameService.forgotUsername(emailobj)
      .subscribe(resp => {
        console.log(resp);
      });
  }

}
