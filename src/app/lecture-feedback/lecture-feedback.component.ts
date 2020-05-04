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
  counters: Array<number> = Array(0, 1, 2, 3, 4, 5, 6);
  feedbackValues: Array<string> = ['Schlecht', 'Durchschnittlich', 'Gut'];
  feedbackQuestions: Array<string> = [
    'Allgemeine Zufriedenheit: ',
    'Gesamterlebnis:',
    'Schwierigkeit der Lektion:' ,
    'Geschwindigkeit der Lektion:' ,
    'Verständlichkeit der Lektion:',
    'Konnte der Dozent Ihre Frage beantworten?: ',
    'War der Inhalt interessant?: ' ];

  status: string;
  constructor(private readFeedbackService: ReadFeedbackService) { }

  ngOnInit(): void {
    this.readFeedbackService.GetAll()
      .subscribe((resp: FeedbackResponse) => {
        this.feedbacks = resp.feedbacks;
      });
  }

}
