import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {error} from '@angular/compiler/src/util';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  nameData: string;
  nachnameData: string;
  usernameData: string;
  emailData: string;
  passwordData: string;
  roleData1: boolean;
  roleData2: boolean;
  roleData: any;
  role: any;

  selectedRole1 = false;
  selectedRole2 = false;
  form: FormGroup;
  private formSubmitAttempt: boolean;
  constructor(private authService: AuthService,
              private fb: FormBuilder) { }

  onUpdate1() {
    this.selectedRole1 = true;
    this.selectedRole2 = false;
  }

  onUpdate2() {
    this.selectedRole1 = false;
    this.selectedRole2 = true;
  }
  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nachname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
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
        name: this.nameData,
        nachname: this.nachnameData,
        username: this.usernameData,
        email: this.emailData,
        password: this.passwordData,
        role: this.roleData
      };
      this.authService.Register(regObj)
        .subscribe(resp => {
          console.log(resp);
          if (resp.status === 200) {
            this.authService.done(regObj);
          }
          // tslint:disable-next-line:no-shadowed-variable
        }, error => {
          console.log('bob');
        });
    }
    this.formSubmitAttempt = true;
  }
  // tslint:disable-next-line:max-line-length
 /* Register(name: HTMLInputElement, username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement, role: HTMLInputElement) {

    const regObj = {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
      role: role.value,
    };

    this.authService.Register(regObj)
      .subscribe(resp => {
        console.log(resp);
      });
  }*/

}
