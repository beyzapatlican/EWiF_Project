import {StatusResponse} from './status-response.model';

export class FeedbackAverage extends StatusResponse {
  average: Array<number>;


  constructor(averages: Array<number>, status: string) {
    super(status);
    this.average = averages;
  }
}
