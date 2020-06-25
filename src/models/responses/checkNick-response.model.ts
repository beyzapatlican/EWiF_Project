import {HttpHeaders} from '@angular/common/http';
import {StatusResponse} from './status-response.model';
export class CheckNickResponseModel extends StatusResponse {
  pinOpen: string;


  constructor(status: string, pinOpen: string) {
    super(status);
    this.pinOpen = pinOpen;
  }
}
