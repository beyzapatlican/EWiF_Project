import {HttpHeaders} from '@angular/common/http';
export class DeleteSessionResponse {
  pin: string;


  constructor(pin: string) {
    this.pin = pin;
  }
}
