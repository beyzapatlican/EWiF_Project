export class Feedback {
  answers: string;
  lectureName: string;
  openSessionName: string;
  openSessionPin: string;
  counters: Array<number>;

  constructor(answers: string, lectureName: string, openSessionName: string, openSessionPin: string, counters: number) {
    this.answers = answers;
    this.lectureName = lectureName;
    this.openSessionName = openSessionName;
    this.openSessionPin = openSessionPin;
    this.counters = [1, 2, 3, 4, 5, 6, 7];
  }
}
