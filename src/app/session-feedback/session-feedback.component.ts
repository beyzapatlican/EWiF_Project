import { Component, OnInit } from '@angular/core';
import {Feedback} from '../models/feedback';
import {FeedbackResponse} from '../models/feedback-response.model';
import {SessionFeedbackService} from '../services/session-feedback.service';

@Component({
  selector: 'app-session-feedback',
  templateUrl: './session-feedback.component.html',
  styleUrls: ['./session-feedback.component.css']
})
export class SessionFeedbackComponent implements OnInit {
  feedbacks: Array<Feedback>;
  feedbackValues: Array<string> = ['Schlecht', 'Durchschnittlich', 'Gut'];
  status: string;
  // tslint:disable-next-line:no-shadowed-variable
  constructor(private SessionFeedbackService: SessionFeedbackService) { }

  ngOnInit(): void {
    this.SessionFeedbackService.GetAll()
      .subscribe((resp: FeedbackResponse) => {
        this.feedbacks = resp.feedbacks;
      });
  }

}