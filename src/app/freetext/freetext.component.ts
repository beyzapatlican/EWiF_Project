import {Component, OnInit} from '@angular/core';
import {QuestionTypeComponent} from '../question-type/question-type.component';
import {Free} from '../models/question-types/free.model';
import {PrepareSessionService} from '../services/prepare-session.service';


@Component({
    selector: 'app-freetext',
    templateUrl: './freetext.component.html',
    styleUrls: ['./freetext.component.css']
})


export class FreetextComponent extends QuestionTypeComponent implements OnInit {
    question: string;
    solution: string;
    questionNum: number;

    constructor(prepareSessionService: PrepareSessionService) {
        super(prepareSessionService);
    }

    ngOnInit(): void {
    }


    saveQuestionInner(question: string, solution: string, questionNum: number) {

        const newQuestion = new Free(question, solution, questionNum);
        super.saveQuestion(undefined, newQuestion, undefined);
    }
}
