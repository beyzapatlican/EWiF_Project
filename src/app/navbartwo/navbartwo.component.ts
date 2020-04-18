import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-navbartwo',
  templateUrl: './navbartwo.component.html',
  styleUrls: ['./navbartwo.component.css']
})
export class NavbartwoComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
  }
  onLogout() {
    this.loginService.logout();
  }
}
