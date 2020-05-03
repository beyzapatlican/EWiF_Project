import {Component, OnInit} from '@angular/core';
import {ReadFeedbackService} from '../services/read-feedback.service';
import {Feedback} from '../models/feedback';
import {FeedbackResponse} from '../models/feedback-response.model';

@Component({
  selector: 'app-readfeedback',
  templateUrl: './readfeedback.component.html',
  styleUrls: ['./readfeedback.component.css']
})
export class ReadfeedbackComponent implements OnInit {
  feedbacks: Array<Feedback>;
  feedbackValues: Array<string> = ['schlecht', 'Durchschnittlich', 'Gut'];

  status: string;

  constructor(private readFeedbackService: ReadFeedbackService) {

  }

  ngOnInit() {
    this.readFeedbackService.GetAll()
      .subscribe((resp: FeedbackResponse) => {
        this.feedbacks = resp.feedbacks;
      });

  }

}
