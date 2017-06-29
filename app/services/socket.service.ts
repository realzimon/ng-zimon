import {Injectable, OnDestroy} from '@angular/core';
import * as io from 'socket.io-client';
import {ENV} from '../config/environment';
import {toast} from 'angular2-materialize';

@Injectable()
export class SocketService implements OnDestroy {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect(ENV.socketUrl, {
      reconnectionDelay: 30000
    });
    this.socket.on('connect_error', function (err: any) {
      console.error('Unable to connect to', ENV.socketUrl, 'because:', err);
      toast('Unable to connect to backend socket', 2000);
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }

  public on(channel: string, handler: (data: any) => void) {
    this.socket.on(channel, handler);
  }
}
