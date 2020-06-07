import {Component, OnInit} from '@angular/core';
import { ChangePasswordService} from '../../services/change-password.service';
import {TokenService} from '../../services/token.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FeedbackChoice} from '../../models/feedback-choice.model';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  public isRole = '';
  formGroup: FormGroup;
  feedback = new Array<FeedbackChoice>();
  form: FormGroup;
  private givenPassword: boolean;
  a: any;
  b: any;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private changePasswordService: ChangePasswordService,
              private tokenService: TokenService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.isRole = this.tokenService.getRole();
    this.tokenService.isRoleObservable().subscribe(value => {
      console.log(value);
      this.isRole = value;
    });
    // TODO: Add error page if role is not equal to STUDENT OR TEACHER
    if (this.isRole !== this.tokenService.getRole()) {
        console.log('Something went wrong');
    }

    this.form = this.fb.group({
      a: ['', Validators.required],
      b: ['', Validators.required]
    });
  }

  isFieldInvalid(field: any) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.givenPassword)
    );
  }

  changePassword(oldPassword: HTMLInputElement, newPassword: HTMLInputElement) {

    const passObj = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    };

    this.changePasswordService.changePass(passObj)
      .subscribe(resp => {
        console.log(resp);
        alert('SUCCESS !!');
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
