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
export class TruefalseComponent extends QuestionTypeComponent implements OnInit {
    formGroup: FormGroup;


    constructor(prepareSessionService: PrepareSessionService, public mobileChecker: MobileChecker,
                protected renderer: Renderer2) {
        super(prepareSessionService, mobileChecker, renderer);
        this.ngOnInit();
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
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
                this.formGroup.get('solution').value
        );
        super.saveQuestion(question, undefined, undefined);
        this.resetForm(this.formGroup);
    }

  resetForm(formGroup: FormGroup) {

    formGroup.reset();

    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).setErrors(null) ;
    });
  }
}
