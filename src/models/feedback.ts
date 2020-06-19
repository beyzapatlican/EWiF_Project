export class Feedback {
  answers: string;
  lectureName: string;
  pin: string;
  openSessionName: string;
  pinOpen: string;

  counters: Array<number> = Array(0, 1, 2, 3, 4, 5, 6);

  constructor(answers: string, lectureName?: string, openSessionName?: string, pinOpen?: string, pin?: string) {
    this.answers = answers;
    this.lectureName = lectureName;
    this.openSessionName = openSessionName;
    this.pinOpen = pinOpen;
    this.pin = pin;
  }
}
