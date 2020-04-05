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

  selected1: MultiplechoiceComponent;
  selected2: FreetextComponent;
  selected3: TruefalseComponent;

  constructor() {
    this.selected1 = new MultiplechoiceComponent();
    this.selected2 = new FreetextComponent();
    this.selected3 = new TruefalseComponent();
  }

  ngOnInit(): void {
  }

}
