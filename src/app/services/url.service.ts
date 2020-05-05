import {environment} from '../../environments/environment.prod';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  getURL() {
    return environment.urlAddress;
  }
}
