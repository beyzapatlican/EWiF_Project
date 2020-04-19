import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {error} from '@angular/compiler/src/util';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  selectedRole1 = false;
  selectedRole2 = false;
  constructor(private authService: AuthService) { }

  onUpdate1() {
    this.selectedRole1 = true;
    this.selectedRole2 = false;
  }

  onUpdate2() {
    this.selectedRole1 = false;
    this.selectedRole2 = true;
  }
  ngOnInit() {
  }

  // tslint:disable-next-line:max-line-length
  Register(name: HTMLInputElement, username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement, role: HTMLInputElement) {

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
  }

}
