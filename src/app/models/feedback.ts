export class Feedback {
  answers: string;
  lectureName: string;
  openSessionName: string;
  openSessionPin: string;


  constructor(answers: string, lectureName: string, openSessionName: string, openSessionPin: string, counters: number) {
    this.answers = answers;
    this.lectureName = lectureName;
    this.openSessionName = openSessionName;
    this.openSessionPin = openSessionPin;
  }
}
