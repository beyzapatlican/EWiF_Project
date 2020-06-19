import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlService} from './url.service';
import {TokenService} from './token.service';
import {AllLecturesResponse} from '../models/responses/all-lectures-response.model';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient,
              private urlService: UrlService,
              private tokenService: TokenService) {
  }

  getAllLectures() {
    return this.http.get<AllLecturesResponse>(`${this.urlService.getURL()}/teacher/allLectures`);
  }
}
