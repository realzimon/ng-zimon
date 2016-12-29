/**
 * Provides Postler information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Zivi, ZiviService} from './zivi.service';
import * as io from 'socket.io-client';

import {Observable} from 'rxjs/Rx';

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
  private apiUrl = 'http://localhost:4000/api/v1/post';
  private socketUrl = 'http://localhost:4001';
  private socket: SocketIOClient.Socket;
  private stateChangeObservable: Observable<PostlerData>;

  constructor(private http: Http) {
    this.stateChangeObservable = new Observable((observer: any) => {
      this.socket = io.connect(this.socketUrl);
      this.socket.on('post', () => {
        this.getCurrentState().subscribe(state => observer.next(state));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  getCurrentState() {
    return this.http.get(this.apiUrl)
      .map(res => res.json())
      .map(res => {
        return new PostlerData(
          PostState[<string>res.state],
          new Date(res.timestamp),
          ZiviService.createZiviFromJsonObject(res.zivi)
        );
      });
  }

  onStateChange() {
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
