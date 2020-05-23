import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {StudentOpenSessionService} from '../../services/student-open-session.service';

@Component({
  selector: 'app-student-sehen',
  templateUrl: './student-sehen.component.html',
  styleUrls: ['./student-sehen.component.css']
})
export class StudentSehenComponent implements OnInit, OnDestroy {
  questionType: string;
  questionNum = 0;
  timeOutCheckSubscriptionFrequency = interval(6000);
  timeOutCheckSubscription: Subscription;

  constructor(public studentOpenSessionService: StudentOpenSessionService) { }

  ngOnInit(): void {
    this.timeOutCheckSubscription = this.timeOutCheckSubscriptionFrequency.subscribe(_ => {
      this.studentOpenSessionService.checkTimeout(this.getPinOpen(), this.questionNum).subscribe(value => {}, error => {
        if (error.statusMessage === 'Wrong Question') {
          this.getQuestion();
        } else if (error.statusMessage === 'Session has closed') {
          this.onSessionDone();
        }
      });
    });

  }

  ngOnDestroy() {
    this.done();
  }

  submit() {
    // TODO: Implement submit
  }

  close() {
    // TODO: Implement close
  }

  getQuestion() {
    // TODO: Implement getQuestion
  }

  getPinOpen() {
    // TODO: Get Actual pinOpen
    return 'MAAAAAA';
  }
  onSessionDone() {
    // TODO: Implement onSessionDone
  }
  done() {
    this.timeOutCheckSubscription.unsubscribe();
  }
}
