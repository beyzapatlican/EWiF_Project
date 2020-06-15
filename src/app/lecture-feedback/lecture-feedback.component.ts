import { Component, OnInit } from '@angular/core';
import {Feedback} from '../../models/feedback';
import {ReadFeedbackService} from '../../services/read-feedback.service';
import {FeedbackResponse} from '../../models/responses/feedback-response.model';
import {AveragelectureService} from '../../services/averagelecture.service';
import {LecturefeedbackaverageModel} from '../../models/responses/lecturefeedbackaverage.model';

@Component({
  selector: 'app-lecture-feedback',
  templateUrl: './lecture-feedback.component.html',
  styleUrls: ['./lecture-feedback.component.css']
})
export class LectureFeedbackComponent implements OnInit {
  feedbacks: Array<Feedback>;
  deneme: LecturefeedbackaverageModel;

  constructor(private readFeedbackService: ReadFeedbackService,
              private averagelectureService: AveragelectureService) {
  }

  ngOnInit(): void {
    this.readFeedbackService.GetAll()
      .subscribe((resp: FeedbackResponse) => {
        this.feedbacks = new Array<Feedback>();
        resp.feedbacks.forEach(value => {
          this.feedbacks.push(new Feedback(value.answers, value.lectureName));
        });
      });

    this.averagelectureService.GetAll()
      .subscribe((resp: LecturefeedbackaverageModel) => {
        console.log(resp);
        console.log('hi');
      }, error => {
        console.log('bob');
      });

    this.averagelectureService.login('Renaissance II').subscribe(resp => {
      this.averagelectureService.done(resp.headers.get('Authorization'), resp.body.answers);
      console.log(resp);
    }, error => {
      console.log(error);
    });
  }

}
