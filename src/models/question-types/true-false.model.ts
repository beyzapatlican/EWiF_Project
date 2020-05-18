export class TrueFalse {

    question: string;
    solution: boolean;
    questionNum: number;


    constructor(question: string, solution?: boolean, questionNum?: number) {
        this.question = question;
        this.solution = solution;
        this.questionNum = questionNum;
    }
}
