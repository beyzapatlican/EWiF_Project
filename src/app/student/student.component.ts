import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OpenSessionService} from '../../services/open-session.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  static pinOpen: string;
  static nick: string;
  a: string;
  b: string;

  constructor(private http: HttpClient,
              private openSession: OpenSessionService) { }

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

  submit(nickk: string, pinOpenn: string) {
    StudentComponent.nick = nickk;
    StudentComponent.pinOpen = pinOpenn;
    this.openSession.baslama(nickk, pinOpenn).subscribe(resp => {
      console.log(nickk, pinOpenn);
      this.openSession.baslama(nickk, pinOpenn);
    }, error => {
      console.log(error);
    });
  }
}
