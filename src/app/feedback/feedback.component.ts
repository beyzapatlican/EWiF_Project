import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FeedbackService} from '../services/feedback.service';
import {MultipleChoice} from '../models/question-types/multiple-choice.model';
import {FeedbackChoice} from '../models/feedback-choice.model';
import {TrueFalse} from '../models/question-types/true-false.model';
import {Free} from '../models/question-types/free.model';
import {PrepareSessionService} from '../services/prepare-session.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  formGroup: FormGroup;
  feedback = new Array<FeedbackChoice>();
  form: FormGroup;
  private givenFeedback: boolean;
  a: any;
  b: any;
  c: any;
  d: any;
  e: any;
  f: any;
  g: any;
  pin: any;
constructor( private feedbackService: FeedbackService,
             private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      pin: ['', Validators.required],
      a: ['', Validators.required],
      b: ['', Validators.required],
      c: ['', Validators.required],
      d: ['', Validators.required],
      e: ['', Validators.required],
      f: ['', Validators.required],
      g: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.givenFeedback)
    );
  }


  onSubmit() {
    if (this.form.valid) {
       const regObj = {
         pin: this.pin,
         a: this.a,
         b: this.b,
         c: this.c,
         d: this.d,
         e: this.e,
         f: this.f,
         g: this.g
       };
       const st = this.a + ' ' + this.b + ' ' + this.c + ' ' + this.d + ' ' + this.e + ' ' + this.f + ' ' + this.g;
       const answer = new FeedbackChoice(st, this.pin);
       this.feedbackService.Give(answer)
        .subscribe(resp => {
          console.log(resp);
          // tslint:disable-next-line:no-shadowed-variable
        }, error => {
          console.log('bob');
        });
    }
    this.givenFeedback = true;
  }



choose(message: string) {
alert(message);
}
}
