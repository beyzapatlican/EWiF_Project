import {StatusResponse} from './status-response.model';

class Free {
  answers: string[];

  constructor(answers: string[]) {
    this.answers = answers;
  }
}
class MultipleChoice {
  answers: number[];

  constructor(answers: number[]) {
    this.answers = answers;
  }
}
class TrueFalse {
  t: number;
  f: number;

  constructor(t: number) {
    this.t = t;
  }
}

export class QuestionResultsResponse extends StatusResponse {
  Free: Free;
  MultipleChoice: MultipleChoice;
  TrueFalse: TrueFalse;


  constructor(status: string, free?: Free, multipleChoice?: MultipleChoice, trueFalse?: TrueFalse) {
    super(status);
    this.Free = free;
    this.MultipleChoice = multipleChoice;
    this.TrueFalse = trueFalse;
  }
}
