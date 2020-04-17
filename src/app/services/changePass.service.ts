import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line:class-name
export class changePassService {

  private readonly apiUrl = 'http://24.133.107.44:8080';

  constructor(private http: HttpClient) { }

  changePass(obj) {
    return this.http.post(this.apiUrl + '/' + 'changePassword', obj);
  }
}
