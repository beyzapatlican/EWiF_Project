import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private postService: PostService) {
  }

  posts: Post[];

  ngOnInit(): void {
    this.postService.GetAll()
      .subscribe((response: Post[]) => this.posts = response);
  }

  Create(val: HTMLInputElement, val1: HTMLInputElement) {
    const newPost: Post = {
      body: val.value,
      id: val1.value
    };
    this.postService.Create(newPost)
      .subscribe((response: Post) => {
        this.posts.unshift(response);
        val.value = '';
        val1.value = '';
      });
  }

}
