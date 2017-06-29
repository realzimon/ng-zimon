import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Rx';
import {Zivi} from './zivi.service';
import {Subscriber} from 'rxjs/Subscriber';
import {SocketService} from './socket.service';

export class NetUsage {
  constructor(readonly hostname: string, readonly recentDownload: number, readonly recentDownloadRate: number,
              readonly totalDownload: number, readonly mac: string, readonly zivi: Zivi) {

  }
}

@Injectable()
export class NetUsageService {
  private observable: Observable<NetUsage[]>;

  constructor(private socketService: SocketService) {
    this.observable = new Observable<NetUsage[]>((observer: Subscriber<NetUsage[]>) => {
      socketService.on('netusage', (data: any) => {
        observer.next(data.usage);
      });
    });
  }

  getNetUsageUpdates(): Observable<NetUsage[]> {
    return this.observable;
  }
}
