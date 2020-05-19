import { Component, OnInit } from '@angular/core';
import {AnfangenRequest} from '../../models/requests/anfangen-request.model';
import {AnfangenResponse} from '../../models/responses/anfangen-response.model';
import {SessionResponse} from '../../models/responses/session-response.model';
import {Session} from '../../models/session';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../../services/session.service';
import {TrueFalse} from '../../models/question-types/true-false.model';
import {AvailableSessionsComponent} from '../available-sessions/available-sessions.component';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  a: string;
  constructor(private http: HttpClient,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionService.basla(AvailableSessionsComponent.pin)
      .subscribe(resp => {
        this.a = resp.pinOpen;
        console.log(resp.pinOpen);
      }, error => {
      console.log(error);
    });
  }

}
