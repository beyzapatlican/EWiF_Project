import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FeedbackService} from '../services/feedback.service';
import {MultipleChoice} from '../models/question-types/multiple-choice.model';
import {FeedbackChoice} from '../models/feedback-choice.model';
import {TrueFalse} from '../models/question-types/true-false.model';
import {Free} from '../models/question-types/free.model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  formGroup: FormGroup;

constructor(feedbackService: FeedbackService) {
  // @ts-ignore
  super(FeedbackService);
  this.ngOnInit();
}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      ans1: new FormControl(''),
      ans2: new FormControl(''),
      ans3: new FormControl('')
    });
  }
  onSubmit() {
    if (!this.formGroup.valid) {
      console.log('Invalid Form');
    }
    const question = new FeedbackChoice(
      this.formGroup.get('ans1').value,
      this.formGroup.get('ans2').value,
      this.formGroup.get('ans3').value
    );
    // @ts-ignore
    super.saveFeedback(feedback);

  }

choose(message: string) {
alert(message);
}
}
