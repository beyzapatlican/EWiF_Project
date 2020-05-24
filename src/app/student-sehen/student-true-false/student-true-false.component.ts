import { Component, OnInit } from '@angular/core';
import {StudentSehenComponent} from '../student-sehen.component';

@Component({
  selector: 'app-student-true-false',
  templateUrl: './student-true-false.component.html',
  styleUrls: ['./student-true-false.component.css']
})
export class StudentTrueFalseComponent implements OnInit {

  constructor(public studentSehenComponent: StudentSehenComponent) { }

  ngOnInit(): void {
  }

  selectAnswer(answer: boolean) {
    StudentSehenComponent.answerBool = answer;
    console.log(StudentSehenComponent.answerBool);
  }
}
