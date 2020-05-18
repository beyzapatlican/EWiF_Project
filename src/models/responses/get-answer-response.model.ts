import {StatusResponse} from './status-response.model';

export class GetAnswerResponse extends StatusResponse {
  answer: string;


  constructor(status: string, answer: string) {
    super(status);
    this.answer = answer;
  }
}
