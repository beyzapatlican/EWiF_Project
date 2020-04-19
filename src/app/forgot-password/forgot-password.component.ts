import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ForgotPasswordService} from '../services/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private forgotPasswordService: ForgotPasswordService) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:max-line-length
  forgotPassword(email: HTMLInputElement) {

    const emailobj = {
      email: email.value,
    };

    this.forgotPasswordService.forgotPassword(emailobj)
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
