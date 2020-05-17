import {HttpHeaders} from '@angular/common/http';
export class AnfangenResponse {
  name: string;
  pin: string;


  constructor(name: string, pin: string) {
    this.name = name;
    this.pin = pin;
  }
}
