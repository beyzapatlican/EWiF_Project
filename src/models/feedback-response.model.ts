import {Feedback} from './feedback';

export class FeedbackResponse {
  feedbacks: Array<Feedback>;
  status: string;


  constructor(feedbacks: Array<Feedback>, status: string) {
    this.feedbacks = feedbacks;
    this.status = status;
  }
}
