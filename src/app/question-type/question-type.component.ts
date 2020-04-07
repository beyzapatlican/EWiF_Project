import { Component, OnInit } from '@angular/core';
import {MultiplechoiceComponent} from '../multiplechoice/multiplechoice.component';
import {FreetextComponent} from '../freetext/freetext.component';
import {TruefalseComponent} from '../truefalse/truefalse.component';

@Component({
  selector: 'app-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.css']
})
export class QuestionTypeComponent implements OnInit {

  selected1 = false;
  selected2 = false;
  selected3 = false;

  ngOnInit(): void {
  }

  onUpdate1() {
    this.selected1 = true;
    this.selected2 = false;
    this.selected3 = false;
  }

  onUpdate2() {
    this.selected2 = true;
    this.selected1 = false;
    this.selected3 = false;
  }
  onUpdate3() {
    this.selected3 = true;
    this.selected1 = false;
    this.selected2 = false;
  }
}
