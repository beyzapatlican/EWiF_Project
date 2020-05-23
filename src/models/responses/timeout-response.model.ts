import {StatusResponse} from './status-response.model';

export class TimeoutResponse extends StatusResponse {

  constructor(status: string) {
    super(status);
  }
}
