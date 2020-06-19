import {Component, OnDestroy, OnInit} from '@angular/core';
import {FeedbackService} from '../../services/feedback.service';
import {Subscription} from 'rxjs';
import {LectureService} from '../../services/lecture.service';
import {OpenSessionService} from '../../services/open-session.service';
import {ReadFeedbackComponent} from '../readfeedback/read-feedback.component';

@Component({
  selector: 'app-average-feedback',
  templateUrl: './average-feedback.component.html',
  styleUrls: ['./average-feedback.component.css']
})
export class AverageFeedbackComponent implements OnInit, OnDestroy {

  public select1Params: {
    name: string
    pin: string
  }[] = [];

  public select2Params: {
    name: string
    pin: string
  }[] = [];

  feedbackAverages: Array<number>;
  selectedOption: {
    name: string
    pin: string
  };

  selectedTypeSubscription: Subscription;
  selectedType = 0;

  constructor(public feedbackService: FeedbackService,
              private lectureService: LectureService,
              private openSessionService: OpenSessionService) {
  }

  ngOnInit(): void {
    // this.readFeedbackService.GetAll()
    //   .subscribe((resp: FeedbackResponse) => {
    //     this.feedbacks = new Array<Feedback>();
    //     resp.feedbacks.forEach(value => {
    //       this.feedbacks.push(new Feedback(value.answers, value.lectureName));
    //     });
    //   });

    this.getAllLectures();
    this.getAllOpenSessions();
    this.getSelectedType();
  }

  ngOnDestroy() {
    this.selectedTypeSubscription.unsubscribe();
  }

  getSelectedType() {
    this.selectedType = ReadFeedbackComponent.selectedType.value;
    this.selectedTypeSubscription = ReadFeedbackComponent.getSelectedTypeAsObservable().subscribe(value => {
      this.selectedType = value;
    });
  }

  getPin() {
    return 'RE00001';
  }

  getAllLectures() {
    this.lectureService.getAllLectures().subscribe(value => {
      value.lectures.forEach(lecture => {
        this.select1Params.push( {name: lecture.name, pin: lecture.pin});
      });
    }, error => {
      console.log(error);
    });
  }

  getAllOpenSessions() {
    this.openSessionService.getAllOpenSessions().subscribe(value => {
      value.openSessions.forEach(openSession => {
        this.select2Params.push( { name: openSession.name, pin: openSession.pinOpen });
      });
    }, error => {
      console.log(error);
    });
  }

  onSelect(event) {
    console.log('bob');
    const value: string = event.target.value;
    const name = value.substr(value.length - 7);
    const pin = value.substr(value.length - 7, value.length);
    this.selectedOption = {name, pin};
    this.feedbackService.getAverageFeedback(pin, this.selectedType).subscribe(resp => {
      console.log(resp);
      this.feedbackAverages = resp.average;
      console.log(resp.average);
    }, error => {
      console.log(error);
    });
  }
}
