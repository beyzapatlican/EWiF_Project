import { Component, OnInit } from '@angular/core';
import {Session} from '../../models/session';
import {SessionListService} from '../../services/session-list.service';
import {SessionResponse} from '../../models/responses/session-response.model';
import { SessionService } from 'src/services/session.service';
import {subscribeTo} from 'rxjs/internal-compatibility';
import {TrueFalse} from '../../models/question-types/true-false.model';
@Component({
  selector: 'app-available-sessions',
  templateUrl: './available-sessions.component.html',
  styleUrls: ['./available-sessions.component.css']
})
export class AvailableSessionsComponent implements OnInit {
  static pin: string;
  sessions: Array<Session>;
  sessionNames: Array<string>;

  constructor(private sessionListService: SessionListService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionListService.GetAll()
      .subscribe((resp: SessionResponse) => {
        this.sessions = new Array<Session>();
        resp.sessions.forEach(value => {
          this.sessions.push(new Session(value.name, value.sessionID));
        });
      });
  }
  delete(pin: string) {
    this.sessionService.delete(pin)
      .subscribe (resp => console.log(resp));
  }

 /* anfangen(pin: string) {
    this.sessionService.anfangen(pin)
      .subscribe(resp => console.log(resp));
  }*/
  anfangen(pinn: string) {
    AvailableSessionsComponent.pin = pinn;
    this.sessionService.anfangen();
  }
  refresh(): void {
    window.location.reload();
  }
  goBack(): void {
    window.history.back();
  }
}
