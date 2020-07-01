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


export class FreetextComponent implements OnInit {

    constructor(public prepareSessionService: PrepareSessionService) {}

    ngOnInit(): void {

    }
    onSubmit() {
        const newQuestion = new Free(
                this.prepareSessionService.questionFormGroup.get('question').value,
                this.prepareSessionService.questionFormGroup.get('solution').value);
        this.prepareSessionService.saveQuestion(undefined, newQuestion, undefined);
        this.resetForm(this.prepareSessionService.questionFormGroup);
    }

  resetForm(formGroup: FormGroup) {

    formGroup.reset();

    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).setErrors(null) ;
    });
  }
}
