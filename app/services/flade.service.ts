/**
 * Provides Postler information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
// import * as io from 'socket.io-client';

// import {Observable} from 'rxjs/Rx';

export class Flade {
  constructor(public text: String, public timestamp: Date) {

  }
}

@Injectable()
export class FladeService {
  private apiUrl = 'http://localhost:4000/api/v1/flade';
  private socketUrl = 'http://localhost:4001';
  private socket: SocketIOClient.Socket;
  private stateChangeObservable: Observable<Flade>;

  constructor(private http: Http) {
    this.stateChangeObservable = new Observable((observer: any) => {
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

}
