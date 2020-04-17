import { Component, OnInit } from '@angular/core';
import {saveQuestion} from '../question-type/question-type.component';
import {Free} from '../models/question-types/free.model';


@Component({
  selector: 'app-freetext',
  templateUrl: './freetext.component.html',
  styleUrls: ['./freetext.component.css']
})



export class FreetextComponent implements OnInit {
  question: string;
  solution: string;
  questionNum: number;

  constructor() { }

  ngOnInit(): void {}


  saveQuestion(question: string, solution: string, questionNum: number) {
    const newQuestion = new Free(question, solution, questionNum);
    saveQuestion(undefined, newQuestion, undefined);
  }
}
