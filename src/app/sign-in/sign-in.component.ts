import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../models/post';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  onCreatePost(postData: {title: string; content: string}) {
    this.http.post('localhost:8080/login', postData)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

}
