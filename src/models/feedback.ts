export class Feedback {
  answers: string;
  lectureName: string;
  openSessionName: string;
  openSessionPin: string;

  feedbackValues: Array<string> = ['Schlecht', 'Durchschnittlich', 'Gut'];
  feedbackQuestions: Array<string> = [
    '1. Allgemeine Zufriedenheit : ',
    '2. Gesamterlebnis :',
    '3. Schwierigkeit der Lektion :' ,
    '4. Geschwindigkeit der Lektion :' ,
    '5. Verständlichkeit der Lektion :',
    '6. Konnte der Dozent Ihre Frage beantworten? : ',
    '7. War der Inhalt interessant? : ' ];
  counters: Array<number> = Array(0, 1, 2, 3, 4, 5, 6);


  constructor(answers: string, lectureName?: string, openSessionName?: string, openSessionPin?: string) {
    this.answers = answers;
    this.lectureName = lectureName;
    this.openSessionName = openSessionName;
    this.openSessionPin = openSessionPin;
  }
}
