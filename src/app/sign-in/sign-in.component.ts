import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  usernameData: string;
  passwordData: string;

  form: FormGroup;
  private formSubmitAttempt: boolean;
  constructor(private loginService: LoginService,
              private fb: FormBuilder) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {

      this.loginService.login(this.usernameData, this.passwordData).subscribe(resp => {
        this.loginService.done(resp.headers.get('Authorization'), resp.body.role);
      }, error => {
        console.log(error);
      });
    }
    this.formSubmitAttempt = true;
  }
}
