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

  constructor(private loginService: LoginService) {}


  createLogin(username: HTMLInputElement, password: HTMLInputElement) {
    const post = {title: username.value, content: password.value};
    username.value = '';
    password.value = '';

    this.loginService.createLogin(JSON.stringify(post))
      .subscribe(response => {
        // tslint:disable-next-line:no-unused-expression
        post['name,pass'] = response['name,pass'];
        this.posts.splice(0, 0, post);
      });
}
  ngOnInit(): void {
    this.loginService.getPost()
      .subscribe(response => {
        this.posts = response as [any, any];

      });
  }
}
