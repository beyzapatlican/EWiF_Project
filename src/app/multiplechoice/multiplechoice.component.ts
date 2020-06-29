import {Component, OnInit, Renderer2} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {QuestionTypeComponent} from '../question-type/question-type.component';
import {PrepareSessionService} from '../../services/prepare-session.service';
import {MultipleChoice} from '../../models/question-types/multiple-choice.model';
import {MobileChecker} from '../../services/mobile-checker.service';

@Component({
    selector: 'app-multiplechoice',
    templateUrl: './multiplechoice.component.html',
    styleUrls: ['./multiplechoice.component.css']
})
export class MultiplechoiceComponent extends QuestionTypeComponent implements OnInit {
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
            ans1: new FormControl(''),
            ans2: new FormControl(''),
            ans3: new FormControl(''),
            ans4: new FormControl(''),
            ans5: new FormControl('')
        });
    }

    onSubmit() {
        if (!this.formGroup.valid) {
            console.log('Invalid Form');
        }
        const question = new MultipleChoice(
                this.formGroup.get('question').value,
                this.formGroup.get('solution').value,
                this.formGroup.get('ans1').value,
                this.formGroup.get('ans2').value,
                this.formGroup.get('ans3').value,
                this.formGroup.get('ans4').value,
                this.formGroup.get('ans5').value
        );
        super.saveQuestion(undefined, undefined, question);
        this.resetForm(this.formGroup);
    }

  resetForm(formGroup: FormGroup) {

    formGroup.reset();

    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).setErrors(null) ;
    });
  }
}
