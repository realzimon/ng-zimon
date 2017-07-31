import {Injectable, OnDestroy} from '@angular/core';
import * as io from 'socket.io-client';
import {toast} from 'angular2-materialize';
import {URLS} from './urls';

@Injectable()
export class SocketService implements OnDestroy {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect(URLS.socketUrl, {
      reconnectionDelay: 30000
    });
    this.socket.on('connect_error', function (err: any) {
      console.error('Unable to connect to', URLS.socketUrl, 'because:', err);
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
