import {Component, OnInit} from '@angular/core';
import {MultiplechoiceComponent} from '../multiplechoice/multiplechoice.component';
import {FreetextComponent} from '../freetext/freetext.component';
import {TruefalseComponent} from '../truefalse/truefalse.component';
import {TrueFalse} from '../models/question-types/true-false.model';
import {Free} from '../models/question-types/free.model';
import {MultipleChoice} from '../models/question-types/multiple-choice.model';
import {PrepareSessionService} from '../services/prepare-session.service';
import {FeedbackChoice} from '../models/feedback-choice.model';
import {FeedbackService} from '../services/feedback.service';



@Component({
  selector: 'app-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.css']
})

export class FeedbackTypeComponent implements OnInit {
  static feedback = new Array<FeedbackChoice>();

  constructor(feedbackService: FeedbackService) {
    this.feedbackService = feedbackService;
  }

  selected1 = false;
  selected2 = false;
  selected3 = false;

  feedbackService: FeedbackService;
  title: string;


  ngOnInit(): void {
    FeedbackTypeComponent.feedback = new Array<FeedbackChoice>();
  }
  saveFeedback( feedback?: FeedbackChoice) {
    console.log(FeedbackTypeComponent.feedback);
  }

  saveSession() {

    const request = this.feedbackService.prepareRequest(
      FeedbackTypeComponent.feedback);
    this.feedbackService.sendRequest(request);
  }
}
