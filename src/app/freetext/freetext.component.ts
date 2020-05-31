import {Component, OnInit} from '@angular/core';
import {QuestionTypeComponent} from '../question-type/question-type.component';
import {Free} from '../../models/question-types/free.model';
import {PrepareSessionService} from '../../services/prepare-session.service';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
    selector: 'app-freetext',
    templateUrl: './freetext.component.html',
    styleUrls: ['./freetext.component.css']
})


export class FreetextComponent extends QuestionTypeComponent implements OnInit {
    formGroup: FormGroup;

    constructor(prepareSessionService: PrepareSessionService) {
        super(prepareSessionService);
        this.ngOnInit();
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            question: new FormControl(''),
            solution: new FormControl(''),
            questionNum: new FormControl(0)
        });
    }


    onSubmit() {
        const newQuestion = new Free(
                this.formGroup.get('question').value,
                this.formGroup.get('solution').value,
                this.formGroup.get('questionNum').value);
        super.saveQuestion(undefined, newQuestion, undefined);
        alert('SUCCESS !!');
        this.resetForm(this.formGroup);
    }

  resetForm(formGroup: FormGroup) {

    formGroup.reset();

    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).setErrors(null) ;
    });
  }
}
