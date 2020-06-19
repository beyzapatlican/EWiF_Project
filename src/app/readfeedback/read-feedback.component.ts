import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-readfeedback',
  templateUrl: './read-feedback.component.html',
  styleUrls: ['./read-feedback.component.css']
})
export class ReadFeedbackComponent implements OnInit {


  static selectedType = new BehaviorSubject<number>(0);
  selected = false;

  constructor() {}

  static getSelectedTypeAsObservable() {
    return ReadFeedbackComponent.selectedType.asObservable();
  }

  onUpdate1() {
    this.selected = true;
    ReadFeedbackComponent.selectedType.next(1);
  }

  onUpdate2() {
    this.selected = true;
    ReadFeedbackComponent.selectedType.next(2);
  }

  ngOnInit() {

  }

  goBack(): void {
    window.history.back();
  }
}
