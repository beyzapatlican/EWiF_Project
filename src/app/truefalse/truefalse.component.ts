import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {QuestionTypeComponent} from '../question-type/question-type.component';
import {PrepareSessionService} from '../../services/prepare-session.service';
import {TrueFalse} from '../../models/question-types/true-false.model';

@Component({
    selector: 'app-truefalse',
    templateUrl: './truefalse.component.html',
    styleUrls: ['./truefalse.component.css']
})
export class TruefalseComponent extends QuestionTypeComponent implements OnInit {
    formGroup: FormGroup;


    constructor(prepareSessionService: PrepareSessionService) {
        super(prepareSessionService);
        this.ngOnInit();
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            questionNum: new FormControl(0),
            question: new FormControl(''),
            solution: new FormControl('')
        });
    }


    reset() {

    }

    onSubmit() {
        if (!this.formGroup.valid) {
            console.log('Invalid Form');
        }
        const question = new TrueFalse(
                this.formGroup.get('question').value,
                this.formGroup.get('solution').value,
                this.formGroup.get('questionNum').value);
        super.saveQuestion(question, undefined, undefined);
    }

}
