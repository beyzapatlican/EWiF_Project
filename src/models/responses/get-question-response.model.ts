import {MultipleChoice} from '../question-types/multiple-choice.model';
import {Free} from '../question-types/free.model';
import {TrueFalse} from '../question-types/true-false.model';

export class GetQuestionResponse {
  MultipleChoice: MultipleChoice;
  Free: Free;
  TrueFalse: TrueFalse;


  constructor(multipleChoice?: MultipleChoice, free?: Free, trueFalse?: TrueFalse) {
    this.MultipleChoice = multipleChoice;
    this.Free = free;
    this.TrueFalse = trueFalse;
  }
}
