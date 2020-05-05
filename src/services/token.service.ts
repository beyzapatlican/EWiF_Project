import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_STORAGE_NAME = 'token';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  isLoggedInObservable() {
    return this.isLoggedInSubject.asObservable();
  }

  getToken() {
    return sessionStorage.getItem(this.TOKEN_STORAGE_NAME);
  }

  saveToken(token: string) {
    sessionStorage.setItem(this.TOKEN_STORAGE_NAME, token);
    this.isLoggedInSubject.next(this.isLoggedIn());
  }

  deleteToken() {
    sessionStorage.removeItem(this.TOKEN_STORAGE_NAME);
    this.isLoggedInSubject.next(this.isLoggedIn());
  }

}
