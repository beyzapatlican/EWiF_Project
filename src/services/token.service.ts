import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_STORAGE_NAME = 'token';
  private TOKEN_TYPE_STORAGE_NAME = 'token-type';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  private isTeacherSubject = new BehaviorSubject<boolean>(this.isTeacher());
  private isStudentSubject = new BehaviorSubject<boolean>(this.isStudent());
  private isRoleSubject = new BehaviorSubject<boolean>(this.isRole());

  isTeacher(): boolean {
    const token = this.getToken();
    const tokenType = this.getAuth();
    return !!token && !!tokenType;
  }

  isStudent(): boolean {
    const token = this.getToken();
    const tokenType = this.getAuth();
    return  !!token && !!tokenType;
  }
  isRole(): boolean {
    const token = this.getToken();
    const tokenType = this.getAuth();
    return  !!token && !!tokenType;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  isLoggedInObservable() {
    return this.isLoggedInSubject.asObservable();
  }

  isTeacherObservable() {
    return this.isTeacherSubject.asObservable();
  }

  isStudentObservable() {
    return this.isStudentSubject.asObservable();
  }

  isRoleObservable() {
    return this.isRoleSubject.asObservable();
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

  getAuth() {
    return localStorage.getItem(this.TOKEN_TYPE_STORAGE_NAME);
  }

  deleteAuth() {
    localStorage.removeItem(this.TOKEN_TYPE_STORAGE_NAME);
  }

  saveAuth(tokenType: string) {
    localStorage.setItem(this.TOKEN_TYPE_STORAGE_NAME, tokenType);
    this.isRoleSubject.next(this.isRole());
  }

}
