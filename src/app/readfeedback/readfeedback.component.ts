import {Component, OnInit} from '@angular/core';
import {ReadFeedbackService} from '../../services/read-feedback.service';
import {Feedback} from '../../models/feedback';
import {FeedbackResponse} from '../../models/feedback-response.model';

@Component({
  selector: 'app-readfeedback',
  templateUrl: './readfeedback.component.html',
  styleUrls: ['./readfeedback.component.css']
})
export class ReadfeedbackComponent implements OnInit {
  selected1 = false;
  selected2 = false;
  constructor() {

  }
  onUpdate1() {
    this.selected1 = true;
    this.selected2 = false;
  }

  onUpdate2() {
    this.selected2 = true;
    this.selected1 = false;
  }

  ngOnInit() {
  }

}
