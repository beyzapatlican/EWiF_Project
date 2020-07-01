import {StatusResponse} from './status-response.model';
import {Free} from '../question-types/free.model';
import {MultipleChoice} from '../question-types/multiple-choice.model';
import {TrueFalse} from '../question-types/true-false.model';

export class AllQuestionsResponse extends StatusResponse {
  Free: Array<Free>;
  MultipleChoice: Array<MultipleChoice>;
  TrueFalse: Array<TrueFalse>;

  constructor(status: string, Free: Array<Free>, MultipleChoice: Array<MultipleChoice>, TrueFalse: Array<TrueFalse>) {
    super(status);
    this.Free = Free;
    this.MultipleChoice = MultipleChoice;
    this.TrueFalse = TrueFalse;
  }
}
