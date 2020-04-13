import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://24.133.107.44:8080';

  constructor(private http: HttpClient) { }

  getPost() {
    return this.http.get(this.url);
  }

  createLogin(post){
   return this.http.post(this.url, JSON.stringify(post));
  }
}
