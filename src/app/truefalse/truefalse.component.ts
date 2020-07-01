import {Component, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {QuestionTypeComponent} from '../question-type/question-type.component';
import {PrepareSessionService} from '../../services/prepare-session.service';
import {TrueFalse} from '../../models/question-types/true-false.model';
import {MobileChecker} from '../../services/mobile-checker.service';

@Component({
    selector: 'app-truefalse',
    templateUrl: './truefalse.component.html',
    styleUrls: ['./truefalse.component.css']
})
export class TruefalseComponent implements OnInit {

    constructor(public prepareSessionService: PrepareSessionService) {}

    ngOnInit(): void {}


    reset() {

    }

    onSubmit() {
        if (!this.prepareSessionService.questionFormGroup.valid) {
            console.log('Invalid Form');
        }
        const question = new TrueFalse(
                this.prepareSessionService.questionFormGroup.get('question').value,
                this.prepareSessionService.questionFormGroup.get('solution').value
        );
        this.prepareSessionService.saveQuestion(question, undefined, undefined);
        this.resetForm(this.prepareSessionService.questionFormGroup);
    }

  resetForm(formGroup: FormGroup) {

    formGroup.reset();

    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).setErrors(null) ;
    });
  }
}
