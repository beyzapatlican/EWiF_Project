import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {QuestionTypeComponent} from '../question-type/question-type.component';
import {PrepareSessionService} from '../services/prepare-session.service';
import {TrueFalse} from '../models/question-types/true-false.model';

@Component({
    selector: 'app-truefalse',
    templateUrl: './truefalse.component.html',
    styleUrls: ['./truefalse.component.css']
})
export class TruefalseComponent extends QuestionTypeComponent implements OnInit {
    question: string;
    questionNum: number;
    solution: string;
    trueFalseForm: FormGroup;


    constructor(prepareSessionService: PrepareSessionService) {
        super(prepareSessionService);
        this.trueFalseForm = new FormGroup({
            questionNum: new FormControl(0),
            question: new FormControl(''),
            solution: new FormControl('')
        });
    }

    ngOnInit(): void {
    }


    reset() {

    }

    onSubmit() {
        if (!this.trueFalseForm.valid) {
            console.log('Invalid Form');
        }
        const question = new TrueFalse(
                this.trueFalseForm.get('question').value,
                this.trueFalseForm.get('solution').value,
                this.trueFalseForm.get('questionNum').value);
        super.saveQuestion(question, undefined, undefined);
    }

}
