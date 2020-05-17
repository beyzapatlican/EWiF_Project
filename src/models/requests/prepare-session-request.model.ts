import {TrueFalse} from '../question-types/true-false.model';
import {Free} from '../question-types/free.model';
import {MultipleChoice} from '../question-types/multiple-choice.model';

export class PrepareSessionRequest {
    testName: string;
    TrueFalse: Array<TrueFalse> = new Array<TrueFalse>();
    Free: Array<Free> = new Array<Free>();
    MultipleChoice: Array<MultipleChoice> = new Array<MultipleChoice>();


    constructor(testName: string, questionsTF: Array<TrueFalse>, questionsFree: Array<Free>, questionsMC: Array<MultipleChoice>) {
        this.testName = testName;
        questionsTF.forEach( it => this.TrueFalse.push(it));
        questionsFree.forEach( it => this.Free.push(it));
        questionsMC.forEach( it => this.MultipleChoice.push(it));
    }
}
