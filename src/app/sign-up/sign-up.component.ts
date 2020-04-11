import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService) { }

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
