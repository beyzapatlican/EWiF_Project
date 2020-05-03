import { Component, OnInit } from '@angular/core';
import {ReadFeedbackService} from '../services/read-feedback.service';
import {Feedback} from '../models/feedback';

@Component({
  selector: 'app-readfeedback',
  templateUrl: './readfeedback.component.html',
  styleUrls: ['./readfeedback.component.css']
})
export class ReadfeedbackComponent implements OnInit {
  feedbacks: Feedback[];
  status: string;
  constructor(private readFeedbackService: ReadFeedbackService) { }

  ngOnInit() {
    this.readFeedbackService.GetAll()
      .subscribe((resp: Feedback[]) => this.feedbacks = resp);
  }

}
