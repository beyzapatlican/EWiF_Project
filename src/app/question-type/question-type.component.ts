import {Component, OnInit} from '@angular/core';
import {MultiplechoiceComponent} from '../multiplechoice/multiplechoice.component';
import {FreetextComponent} from '../freetext/freetext.component';
import {TruefalseComponent} from '../truefalse/truefalse.component';
import {TrueFalse} from '../models/question-types/true-false.model';
import {Free} from '../models/question-types/free.model';
import {MultipleChoice} from '../models/question-types/multiple-choice.model';
import {PrepareSessionService} from '../services/prepare-session.service';

const questionsTF = new Array<TrueFalse>();
const questionsFree = new Array<Free>();
const questionsMC = new Array<MultipleChoice>();

@Component({
    selector: 'app-question-type',
    templateUrl: './question-type.component.html',
    styleUrls: ['./question-type.component.css']
})

export class QuestionTypeComponent implements OnInit {


    constructor(prepareSessionService: PrepareSessionService) {
        this.prepareSessionService = prepareSessionService;
    }

    selected1 = false;
    selected2 = false;
    selected3 = false;

    prepareSessionService: PrepareSessionService;


    ngOnInit(): void {}

    onUpdate1() {
        this.selected1 = true;
        this.selected2 = false;
        this.selected3 = false;
    }

    onUpdate2() {
        this.selected2 = true;
        this.selected1 = false;
        this.selected3 = false;
    }

    onUpdate3() {
        this.selected3 = true;
        this.selected1 = false;
        this.selected2 = false;
    }


    saveQuestion(questionTF?: TrueFalse, questionFree?: Free, questionMC?: MultipleChoice) {
        if (questionTF !== undefined) {
            questionsTF.push(questionTF);
        } else if (questionFree !== undefined) {
            questionsFree.push(questionFree);
        } else if (questionMC !== undefined) {
            questionsMC.push(questionMC);
        }
    }

    saveSession() {

        const request = this.prepareSessionService.prepareRequest(questionsTF, questionsFree, questionsMC, 'GenericSession');
        this.prepareSessionService.sendRequest(request);
    }
}
