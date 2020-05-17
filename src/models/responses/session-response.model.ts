import {Session} from '../session';
export class SessionResponse {
  sessions: Array<Session>;
  status: string;
  userCount: string;
  constructor(sessions: Array<Session>, status: string, userCount: string) {
    this.sessions = sessions;
    this.status = status;
    this.userCount = userCount;
  }
}
