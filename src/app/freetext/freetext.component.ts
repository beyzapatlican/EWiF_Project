import {Component, OnInit, Renderer2} from '@angular/core';
import {QuestionTypeComponent} from '../question-type/question-type.component';
import {Free} from '../../models/question-types/free.model';
import {PrepareSessionService} from '../../services/prepare-session.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MobileChecker} from '../../services/mobile-checker.service';


@Component({
    selector: 'app-freetext',
    templateUrl: './freetext.component.html',
    styleUrls: ['./freetext.component.css']
})


export class FreetextComponent extends QuestionTypeComponent implements OnInit {
    formGroup: FormGroup;

    constructor(prepareSessionService: PrepareSessionService, public mobileChecker: MobileChecker,
                protected renderer: Renderer2) {
        super(prepareSessionService, mobileChecker, renderer);
        this.ngOnInit();
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            question: new FormControl(''),
            solution: new FormControl(''),
        });
    }
    onSubmit() {
        const newQuestion = new Free(
                this.formGroup.get('question').value,
                this.formGroup.get('solution').value);
        super.saveQuestion(undefined, newQuestion, undefined);
        this.resetForm(this.formGroup);
    }

  resetForm(formGroup: FormGroup) {

    formGroup.reset();

    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).setErrors(null) ;
    });
  }
}
