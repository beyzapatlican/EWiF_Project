import {HttpHeaders} from '@angular/common/http';
export class AnfangenResponse {
  pin: string;


  constructor(pin: string) {
    this.pin = pin;
  }
}
