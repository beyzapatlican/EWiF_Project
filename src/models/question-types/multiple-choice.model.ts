export class MultipleChoice {
  question: string;
  solution: number;
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
  ans5: string;
  questionNum: number;

  constructor(question: string, solution?: number,
              ans1?: string, ans2?: string, ans3?: string, ans4?: string, ans5?,
              questionNum?: number) {

    this.question = question;
    this.solution = solution;
    this.questionNum = questionNum;
    this.ans1 = ans1;
    this.ans2 = ans2;
    this.ans3 = ans3;
    this.ans4 = ans4;
    this.ans5 = ans5;
  }
}
