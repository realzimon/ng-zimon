import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

import {Observable} from 'rxjs/Rx';
import {ENV} from '../config/environment';

@Injectable()
export class TimerService {

  private socket: any;
  private observable: any;

  constructor() {
    this.observable = new Observable((observer: any) => {
      this.socket = io.connect(ENV.socketUrl);
      this.socket.on('timer', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  getTimerUpdates() {
    return this.observable;
  }
}
