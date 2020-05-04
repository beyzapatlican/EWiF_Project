import { Component, OnInit } from '@angular/core';
import {Feedback} from '../models/feedback';
import {ReadFeedbackService} from '../services/read-feedback.service';
import {FeedbackResponse} from '../models/feedback-response.model';

@Component({
  selector: 'app-lecture-feedback',
  templateUrl: './lecture-feedback.component.html',
  styleUrls: ['./lecture-feedback.component.css']
})
export class LectureFeedbackComponent implements OnInit {
  feedbacks: Array<Feedback>;
  feedbackValues: Array<string> = ['Schlecht', 'Durchschnittlich', 'Gut'];
  // tslint:disable-next-line:max-line-length
  feedbackQuestions: Array<string> = ['Allgemeine Zufriedenheit: ', 'Gesamterlebnis:', 'Schwierigkeit der Lektion:' , 'Geschwindigkeit der Lektion:' ,
    // tslint:disable-next-line:max-line-length
                                      'Verständlichkeit der Lektion:', 'Konnte der Dozent Ihre Frage beantworten?: ', 'War der Inhalt interessant?: ' ];

  status: string;
  constructor(private readFeedbackService: ReadFeedbackService) { }

  ngOnInit(): void {
    this.readFeedbackService.GetAll()
      .subscribe((resp: FeedbackResponse) => {
        this.feedbacks = resp.feedbacks;
      });
  }

}
