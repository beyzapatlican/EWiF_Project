import {StatusResponse} from './status-response.model';
import {OpenSession} from '../open-session.model';

export class AllOpenSessionsResponse extends StatusResponse {
  openSessions: Array<OpenSession>;

  constructor(status: string, openSessions: Array<OpenSession>) {
    super(status);
    this.openSessions = openSessions;
  }
}
