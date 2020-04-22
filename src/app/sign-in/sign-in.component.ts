import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
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
  error;
  loadedPosts = [];

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
      const regObj = {
        username: this.usernameData,
        password: this.passwordData,
      };
      this.loginService.Login(regObj)
      .subscribe(resp => {
        console.log('resp: ' + resp.headers.get('status') + '\n');
        if (resp.status === 200) {
          this.loginService.done(regObj);
        }
      }, error => {
        console.log('bob');
      });
    }
    this.formSubmitAttempt = true;
  }
  Login(username: HTMLInputElement, password: HTMLInputElement) {}

}
