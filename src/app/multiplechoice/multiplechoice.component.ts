import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiplechoice',
  templateUrl: './multiplechoice.component.html',
  styleUrls: ['./multiplechoice.component.css']
})
export class MultiplechoiceComponent implements OnInit {

  public question = '';
  public questionId = '';
  public deleteId = '';
  public answer = '';
  public answer2 = '';
  public answer3 = '';
  public answer4 = '';
  public arr = [];

  constructor() { }

  ngOnInit(): void {
  }

  ekle(question: string, questionId: string ) {
    const ekleme = {question, questionId};
    this.arr.push(ekleme);
  }

  sil(deleteId: string) {
    this.arr = this.arr.filter(value => !(value.questionId === deleteId));
  }

  check(forEachfunc) {
    let bulundu = false;
    this.arr.forEach(value =>  {if ( this.questionId === value.questionId) {
      bulundu = true;
    } });
    return bulundu;
  }
}
