import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;
  constructor(private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
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
      this.authService.Register(this.form.get('name').value,
        this.form.get('password').value,
        this.form.get('email').value,
        this.form.get('username').value,
        this.form.get('role').value).subscribe(resp => {
          this.authService.done(resp.headers.get('Authorization'), resp.body.role);
        }, error => {
          console.log(error);
        });
    }
    this.formSubmitAttempt = true;
  }
}
