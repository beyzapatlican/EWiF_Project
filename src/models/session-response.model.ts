import {Session} from './session';
import {Feedback} from './feedback';

export class SessionResponse {
  sessions: Array<Session>;
  status: string;

  constructor(sessions: Array<Session>, status: string) {
    this.sessions = sessions;
    this.status = status;
  }


}

