/**
 * Provides Postler information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Zivi, ZiviService} from './zivi.service';

import 'rxjs/Rx';

export enum PostState {
  Idle,
  Preparation,
  Action,
  Reminder
}

export class PostlerData {
  constructor(public state: PostState, public timestamp: Date, public postler: Zivi) {

  }

}

@Injectable()
export class PostlerService {

  private baseUrl = 'http://localhost:4000/api/v1/postler';

  constructor(private http: Http) {
  }

  getCurrentState() {
    return this.http.get(this.baseUrl + '/get')
      .map(res => res.json())
      .map(res => {
        return new PostlerData(
          PostState[<string>res.state],
          new Date(res.timestamp),
          ZiviService.createZiviFromJsonObject(res.postler)
        );
      });
  }
}
