import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor() { }
  selected1 = true;
  selected2 = false;
  ngOnInit() {
  }
  onUpdate1() {
    this.selected1 = false;
    this.selected2 = true;
  }

  onUpdate2() {
    this.selected2 = true;
    this.selected1 = false;
  }
  refresh(): void {
    window.location.reload();
  }
}
