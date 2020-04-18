import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string;
  password: string;
  error;
  loadedPosts = [];

  form: FormGroup;
  private formSubmitAttempt: boolean;
  constructor(private loginService: LoginService,
              private fb: FormBuilder) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
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
      this.loginService.Login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }
  Login(username: HTMLInputElement, password: HTMLInputElement) {

    const regObj = {
      username: username.value,
      password: password.value,
    };

    this.loginService.Login(regObj)
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
