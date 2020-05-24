export class AnswerQuestionRequest {
  answerBool: boolean;
  answerInt: number;
  answerStr: string;
  questionNum: number;
  pinOpen: string;
  nick: string;

  constructor(questionNum: number, pinOpen: string, nick: string, answerBool?: boolean, answerInt?: number, answerStr?: string) {
    this.answerBool = answerBool;
    this.answerInt = answerInt;
    this.answerStr = answerStr;
    this.questionNum = questionNum;
    this.pinOpen = pinOpen;
    this.nick = nick;
  }
}
