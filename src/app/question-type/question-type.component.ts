import {Component, OnInit} from '@angular/core';
import {MultiplechoiceComponent} from '../multiplechoice/multiplechoice.component';
import {FreetextComponent} from '../freetext/freetext.component';
import {TruefalseComponent} from '../truefalse/truefalse.component';
import {TrueFalse} from '../../models/question-types/true-false.model';
import {Free} from '../../models/question-types/free.model';
import {MultipleChoice} from '../../models/question-types/multiple-choice.model';
import {PrepareSessionService} from '../../services/prepare-session.service';



@Component({
    selector: 'app-question-type',
    templateUrl: './question-type.component.html',
    styleUrls: ['./question-type.component.css']
})

export class QuestionTypeComponent implements OnInit {
    static questionsTF = new Array<TrueFalse>();
    static questionsFree = new Array<Free>();
    static questionsMC = new Array<MultipleChoice>();

  constructor(prepareSessionService: PrepareSessionService) {
        this.prepareSessionService = prepareSessionService;
    }

    selected1 = false;
    selected2 = false;
    selected3 = false;
    type = true;

    prepareSessionService: PrepareSessionService;
    title: string;


    ngOnInit(): void {
        QuestionTypeComponent.questionsTF = new Array<TrueFalse>();
        QuestionTypeComponent.questionsFree = new Array<Free>();
        QuestionTypeComponent.questionsMC = new Array<MultipleChoice>();
    }

    onUpdate1() {
        this.selected1 = true;
        this.selected2 = false;
        this.selected3 = false;
        this.type = false;
    }

    onUpdate2() {
        this.selected2 = true;
        this.selected1 = false;
        this.selected3 = false;
        this.type = false;

    }

    onUpdate3() {
        this.selected3 = true;
        this.selected1 = false;
        this.selected2 = false;
        this.type = false;

    }
    onUpdate4() {
    this.selected3 = false;
    this.selected1 = false;
    this.selected2 = false;
    this.type = true;
    }

    saveQuestion(questionTF?: TrueFalse, questionFree?: Free, questionMC?: MultipleChoice) {
        if (questionTF !== undefined) {
            QuestionTypeComponent.questionsTF.push(questionTF);
        } else if (questionFree !== undefined) {
            QuestionTypeComponent.questionsFree.push(questionFree);
        } else if (questionMC !== undefined) {
            QuestionTypeComponent.questionsMC.push(questionMC);
        }
        console.log(QuestionTypeComponent.questionsTF);
        console.log(QuestionTypeComponent.questionsFree);
        console.log(QuestionTypeComponent.questionsMC);
    }

    saveSession() {

        const request = this.prepareSessionService.prepareRequest(
                QuestionTypeComponent.questionsTF,
                QuestionTypeComponent.questionsFree,
                QuestionTypeComponent.questionsMC,
                this.title);
        this.prepareSessionService.sendRequest(request);
    }
  refresh(): void {
    window.location.reload();
  }

}
