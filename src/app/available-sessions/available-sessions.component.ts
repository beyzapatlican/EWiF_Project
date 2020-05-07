import { Component, OnInit } from '@angular/core';
import {Session} from '../../models/session';
import {SessionListService} from '../../services/session-list.service';
import {FeedbackResponse} from '../../models/feedback-response.model';
import {Feedback} from '../../models/feedback';
import {SessionResponse} from '../../models/session-response.model';

@Component({
  selector: 'app-available-sessions',
  templateUrl: './available-sessions.component.html',
  styleUrls: ['./available-sessions.component.css']
})
export class AvailableSessionsComponent implements OnInit {
  sessions: Array<Session>;

  constructor(private sessionListService: SessionListService) { }

  ngOnInit(): void {
    this.sessionListService.GetAll()
      .subscribe((resp: SessionResponse) => {
        this.sessions = new Array<Session>();
        resp.sessions.forEach(value => {
          this.sessions.push(new Session(value.name, value.sessionID));
        });
      });
  }
}
