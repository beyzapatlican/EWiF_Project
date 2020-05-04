export class Feedback {
  answers: string;
  lectureName: string;
  openSessionName: string;
  openSessionPin: string;

  feedbackValues: Array<string> = ['Schlecht', 'Durchschnittlich', 'Gut'];
  feedbackQuestions: Array<string> = [
    'Allgemeine Zufriedenheit: ',
    'Gesamterlebnis:',
    'Schwierigkeit der Lektion:' ,
    'Geschwindigkeit der Lektion:' ,
    'Verständlichkeit der Lektion:',
    'Konnte der Dozent Ihre Frage beantworten?: ',
    'War der Inhalt interessant?: ' ];
  counters: Array<number> = Array(0, 1, 2, 3, 4, 5, 6);


  constructor(answers: string, lectureName?: string, openSessionName?: string, openSessionPin?: string) {
    this.answers = answers;
    this.lectureName = lectureName;
    this.openSessionName = openSessionName;
    this.openSessionPin = openSessionPin;
  }
}
