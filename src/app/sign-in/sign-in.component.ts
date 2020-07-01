import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { TokenService } from '../../services/token.service';
import { UrlService} from '../../services/url.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  usernameData: string;
  passwordData: string;
  role: string;
  url: string

  form: FormGroup;
  private formSubmitAttempt: boolean;
  constructor(private loginService: LoginService,
              private fb: FormBuilder, private tokenService: TokenService, private urlService: UrlService) {}


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
        this.role = this.tokenService.getRole();
      }, error => {
        console.log(error);
        alert('Etwas ist schief gelaufen. Bitte versuchen Sie es neu');
      });
    }
    this.formSubmitAttempt = true;
  }
}
