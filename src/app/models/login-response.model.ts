import {HttpHeaders} from '@angular/common/http';

export class LoginResponse {
  status: string;
  role: string;
  name: string;


  constructor(status: string, role: string, name: string) {
    this.status = status;
    this.role = role;
    this.name = name;
  }
}
