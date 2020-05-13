import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-session-management',
  templateUrl: './session-management.component.html',
  styleUrls: ['./session-management.component.css']
})
export class SessionManagementComponent implements OnInit {

  constructor( private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.userCount()
      .subscribe( resp => console.log(resp));
  }
}
