export class Feedback {
  answers: string;
  lectureName: string;
  openSessionName: string;
  openSessionPin: string;

  constructor(answers: string, lectureName: string, openSessionName: string, openSessionPin: string) {
    this.answers = answers;
    this.lectureName = lectureName;
    this.openSessionName = openSessionName;
    this.openSessionPin = openSessionPin;
  }


}
