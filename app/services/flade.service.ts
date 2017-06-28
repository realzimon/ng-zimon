/**
 * Provides Postler information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import * as io from 'socket.io-client';
import {ENV} from '../config/environment';

export class Flade {
  constructor(public text: String, public timestamp: Date) {

  }
}

@Injectable()
export class FladeService {
  private apiUrl = ENV.backendUrl + 'api/v1/flade';
  private socketUrl = ENV.socketUrl;
  private socket: SocketIOClient.Socket;
  private fladeChangeObservable: Observable<Flade>;

  constructor(private http: Http) {
    this.fladeChangeObservable = new Observable((observer: any) => {
      this.socket = io.connect(this.socketUrl);
      this.socket.on('flade', () => {
        this.getCurrentFlade().subscribe(flade => observer.next(flade));
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  getCurrentFlade() {
    return this.http.get(this.apiUrl)
      .map(res => res.json())
      .map(res => {
        return new Flade(res.text, new Date(res.timestamp));
      });
  }

  getChangeObservable() {
    return this.fladeChangeObservable;
  }
}
