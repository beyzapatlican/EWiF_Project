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
        const body = requestBody;
        const url = this.getUrl() + '/teacher/prepareSession';
        this.http.post(url, body).subscribe(resp => {
            console.log(resp);
        });
    }

    prepareRequest(questionsTF: Array<TrueFalse>,
                   questionsFree: Array<Free>,
                   questionsMC: Array<MultipleChoice>,
                   testName: string) {
        return new PrepareSessionRequest(testName, questionsTF, questionsFree, questionsMC);
    }

    private getUrl(): string {
        return environment.urlAddress;
    }
}
