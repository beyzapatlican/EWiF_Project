import { Component, OnInit } from '@angular/core';
import {StudentSehenComponent} from '../student-sehen.component';

@Component({
  selector: 'app-student-multiple-choice',
  templateUrl: './student-multiple-choice.component.html',
  styleUrls: ['./student-multiple-choice.component.css']
})
export class StudentMultipleChoiceComponent implements OnInit {

  constructor(public studentSehenComponent: StudentSehenComponent) { }

  ngOnInit(): void {}

  selectAnswer(answer: number) {
    StudentSehenComponent.answerInt = answer;
    console.log(StudentSehenComponent.answerInt);
  }
}
