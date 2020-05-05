import {TrueFalse} from './question-types/true-false.model';
import {Free} from './question-types/free.model';
import {MultipleChoice} from './question-types/multiple-choice.model';
import {FeedbackChoice} from './feedback-choice.model';

export class FeedbackRequest {
  FeedbackChoice: Array<FeedbackChoice> = new Array<FeedbackChoice>();


  constructor(feedbackChoices: Array<FeedbackChoice>) {
    feedbackChoices.forEach( it => this.FeedbackChoice.push(it));
  }
}
