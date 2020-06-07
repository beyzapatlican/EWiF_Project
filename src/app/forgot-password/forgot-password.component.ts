import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ForgotPasswordService} from '../../services/forgot-password.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FeedbackChoice} from '../../models/feedback-choice.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  formGroup: FormGroup;
  feedback = new Array<FeedbackChoice>();
  form: FormGroup;
  private givenPassword: boolean;
  a: any;

  constructor(private forgotPasswordService: ForgotPasswordService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      a: ['', Validators.required]
    });
  }

  isFieldInvalid(field: any) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.givenPassword)
    );
  }

  // tslint:disable-next-line:max-line-length
  forgotPassword(email: HTMLInputElement) {

    const emailobj = {
      email: email.value,
    };

    this.forgotPasswordService.forgotPassword(emailobj)
      .subscribe(resp => {
        console.log(resp);
        alert('SUCCESS !!, Bitte überprüfen Sie Ihre E-Mails');
        this.resetForm(this.form);
      }, error => {
        console.log('bob');
        alert('NOT SUCCESS !!');
        this.resetForm(this.form);
      });
  }

  resetForm(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
  }
}
