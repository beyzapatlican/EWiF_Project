import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TrueFalse} from '../models/question-types/true-false.model';
import {Free} from '../models/question-types/free.model';
import {MultipleChoice} from '../models/question-types/multiple-choice.model';
import {PrepareSessionRequest} from '../models/requests/prepare-session-request.model';
import {PrepareSessionResponse} from '../models/responses/prepare-session-response.model';
import {environment} from '../environments/environment.prod';

import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class PrepareSessionService {

    constructor(private http: HttpClient) {}

    sendRequest(requestBody: PrepareSessionRequest) {
        const headers = {
            Authorization: this.getToken(),
            'Content-Type': 'application/json'
        };
        const body = requestBody;
        const url = this.getUrl() + '/teacher/prepareSession';
        this.http.post(url, body, {headers}).subscribe(resp => {
            console.log(resp);
        });
    }

    prepareRequest(questionsTF: Array<TrueFalse>,
                   questionsFree: Array<Free>,
                   questionsMC: Array<MultipleChoice>,
                   testName: string) {
        return new PrepareSessionRequest(testName, questionsTF, questionsFree, questionsMC);
    }
    private getToken(): string {
        // tslint:disable-next-line:max-line-length
        return 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX3JvbGUiOiJURUFDSEVSIiwic3ViIjoiYWxwcyIsImlzcyI6Ik1hbHBpc20iLCJpYXQiOjE1ODczOTAxNjZ9.bsoEOVBH2EBRL9o_BvpERdMvBRv7HYgbKWefGfu9MWA';
    }

    private getUrl(): string {
        return environment.urlAddress;
    }
}
