import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Rx';
import {SocketService} from './socket.service';
import {Subscriber} from 'rxjs/Subscriber';

export class TimerData {
  constructor(readonly remaining: number) {

  }
}

@Injectable()
export class TimerService {
  private observable: Observable<TimerData>;

  constructor(private socketService: SocketService) {
    this.observable = new Observable((observer: Subscriber<TimerData>) => {
      socketService.on('timer', (data: any) => {
        observer.next(data);
      });
    });
  }

  getTimerUpdates() {
    return this.observable;
  }
}
