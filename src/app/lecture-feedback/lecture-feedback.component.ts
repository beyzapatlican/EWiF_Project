import { Component, OnInit } from '@angular/core';
import {Feedback} from '../../models/feedback';
import {ReadFeedbackService} from '../../services/read-feedback.service';
import {FeedbackResponse} from '../../models/feedback-response.model';

@Component({
  selector: 'app-lecture-feedback',
  templateUrl: './lecture-feedback.component.html',
  styleUrls: ['./lecture-feedback.component.css']
})
export class LectureFeedbackComponent implements OnInit {
  feedbacks: Array<Feedback>;

  constructor(private readFeedbackService: ReadFeedbackService) { }

  ngOnInit(): void {
    this.readFeedbackService.GetAll()
      .subscribe((resp: FeedbackResponse) => {
        this.feedbacks = new Array<Feedback>();
        resp.feedbacks.forEach(value => {
          this.feedbacks.push(new Feedback(value.answers, value.lectureName));
        });
      });
  }

}
