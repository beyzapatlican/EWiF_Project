import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Post} from '../models/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly apiUrl = 'https://localhost:8443/Post';

  constructor(private http: HttpClient) { }

  GetAll() {
   return this.http.get(this.apiUrl);
  }

  Create(object: Post) {
    return this.http.post(this.apiUrl, object);
  }
}
