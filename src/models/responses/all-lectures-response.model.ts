import {StatusResponse} from './status-response.model';
import {Lecture} from '../lecture.model';

export class AllLecturesResponse extends StatusResponse {
  lectures: Lecture[];

  constructor(status: string, lectures: Lecture[]) {
    super(status);
    this.lectures = lectures;
  }
}
