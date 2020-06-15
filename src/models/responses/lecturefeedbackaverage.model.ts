import {StatusResponse} from './status-response.model';
import {Feedback} from '../feedback';

export class LecturefeedbackaverageModel extends StatusResponse {
  average: number;


  constructor(average: number, status: string) {
    super(status);
    this.average = average;
  }
}
