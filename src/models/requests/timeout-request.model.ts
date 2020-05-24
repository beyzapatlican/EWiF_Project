export class TimeoutRequest {
  pinOpen: string;
  questionNum: number;

  constructor(pinOpen: string, questionNum: number) {
    this.pinOpen = pinOpen;
    this.questionNum = questionNum;
  }
}
