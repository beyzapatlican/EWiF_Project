import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PrepareSessionService} from '../../services/prepare-session.service';
import {MultipleChoice} from '../../models/question-types/multiple-choice.model';

@Component({
    selector: 'app-multiplechoice',
    templateUrl: './multiplechoice.component.html',
    styleUrls: ['./multiplechoice.component.css']
})
export class MultiplechoiceComponent implements OnInit {

    constructor(public prepareSessionService: PrepareSessionService) {}

    ngOnInit(): void {}

    onSubmit() {
        if (!this.prepareSessionService.questionFormGroup.valid) {
            console.log('Invalid Form');
        }
        const question = new MultipleChoice(
                this.prepareSessionService.questionFormGroup.get('question').value,
                this.prepareSessionService.questionFormGroup.get('solution').value,
                this.prepareSessionService.questionFormGroup.get('ans1').value,
                this.prepareSessionService.questionFormGroup.get('ans2').value,
                this.prepareSessionService.questionFormGroup.get('ans3').value,
                this.prepareSessionService.questionFormGroup.get('ans4').value,
                this.prepareSessionService.questionFormGroup.get('ans5').value
        );
        console.log(question);
        this.prepareSessionService.saveQuestion(undefined, undefined, question);
        this.resetForm(this.prepareSessionService.questionFormGroup);
    }

  resetForm(formGroup: FormGroup) {

    formGroup.reset();

    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key).setErrors(null) ;
    });
  }
}
