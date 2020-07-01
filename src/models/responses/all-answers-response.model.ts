import {StatusResponse} from './status-response.model';

export class AllAnswersResponseModel extends StatusResponse {
  answers: string[];

  constructor(status: string, answers: string[]) {
    super(status);
    this.answers = answers;
  }
}
