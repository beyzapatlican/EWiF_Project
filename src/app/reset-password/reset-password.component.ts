import { Component, OnInit } from '@angular/core';
import { ResetPasswordService } from '../../services/reset-password.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FeedbackChoice} from '../../models/feedback-choice.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private resetPasswordService: ResetPasswordService,
              private fb: FormBuilder) { }

  ngOnInit() {

  }



  // tslint:disable-next-line:max-line-length
  resetPass(code: HTMLInputElement, newpass: HTMLInputElement) {

    const passObj = {
      forgotPasswordToken: code.value,
      newPassword: newpass.value
    };

    this.resetPasswordService.resetPass(passObj)
      .subscribe(resp => {
        console.log(resp);
        alert('Ihr Passwort wurde erfolgreich geändert');
      }, error => {
        alert('Etwas ist schief gelaufen. Bitte versuchen Sie es neu.');
    });
  }

}
