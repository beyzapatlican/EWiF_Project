import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string;
  password: string;
  posts: [any, any];
  error;
  loadedPosts = [];

  constructor(private loginService: LoginService) {}


  ngOnInit(): void {
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
