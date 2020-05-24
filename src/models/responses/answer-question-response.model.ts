import {StatusResponse} from './status-response.model';

export class AnswerQuestionResponse extends StatusResponse {

  constructor(status: string) {
    super(status);
  }
}
