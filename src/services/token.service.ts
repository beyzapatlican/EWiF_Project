import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_STORAGE_NAME = 'token';
  private TOKEN_TYPE_STORAGE_NAME = 'token-type';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private roleSubject = new BehaviorSubject<string>(this.getRole());


  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  isLoggedInObservable() {
    return this.isLoggedInSubject.asObservable();
  }

  isRoleObservable() {
    return this.roleSubject.asObservable();
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_STORAGE_NAME);
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_STORAGE_NAME, token);
    this.isLoggedInSubject.next(this.isLoggedIn());
  }

  deleteToken() {
    localStorage.removeItem(this.TOKEN_STORAGE_NAME);
    this.isLoggedInSubject.next(this.isLoggedIn());
  }

  getRole() {
    return localStorage.getItem(this.TOKEN_TYPE_STORAGE_NAME);
  }

  deleteRole() {
    localStorage.removeItem(this.TOKEN_TYPE_STORAGE_NAME);
  }

  saveRole(tokenType: string) {
    localStorage.setItem(this.TOKEN_TYPE_STORAGE_NAME, tokenType);
    this.roleSubject.next(this.getRole());
  }

}
