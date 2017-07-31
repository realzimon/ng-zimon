/**
 * Provides Postler information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Zivi} from './zivi.service';

import {Observable} from 'rxjs/Rx';
import {ENV} from '../config/environment';
import {SocketService} from './socket.service';
import {URLS} from './urls';

export enum PostState {
  Idle,
  Preparation,
  Action,
  Reminder
}

export class PostlerData {
  public static fromDTO(rawData: any): PostlerData {
    return new PostlerData(
      PostState[<string>rawData.state],
      new Date(rawData.timestamp),
      Zivi.fromDTO(rawData.zivi)
    );
  }

  constructor(public state: PostState, public timestamp: Date, public postler: Zivi) {

  }
}

@Injectable()
export class PostlerService {
  private apiUrl = URLS.backendPath('api/v1/post');
  private stateChangeObservable: Observable<PostlerData>;

  constructor(private http: Http, private socketService: SocketService) {
    this.stateChangeObservable = new Observable((observer: any) => {
      socketService.on('post', (res: any) => {
        observer.next(PostlerData.fromDTO(res.post));
      });
    });
  }

  getCurrentState(): Observable<PostlerData> {
    return this.http.get(this.apiUrl)
      .map(res => res.json())
      .map(res => {
        return PostlerData.fromDTO(res);
      });
  }

  onStateChange(): Observable<PostlerData> {
    return this.stateChangeObservable;
  }

  sendAction(action: string) {
    return this.http.put(this.apiUrl, {
      action: action
    })
    // Handle the empty response
      .map((res) => {
        return res.text() ? res.json() : {};
      });
  }
}
