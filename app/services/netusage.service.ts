import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

import {Observable} from 'rxjs/Rx';

export class NetUpdate {
    constructor(private name: String, private download: Number, private upload: Number) {

    }
}

@Injectable()
export class NetUsageService {

    private socketUrl = 'http://localhost:4001';
    private socket: any;
    private observable: any;

    constructor() {
        this.observable = new Observable((observer: any) => {
            this.socket = io.connect(this.socketUrl);
            this.socket.on('netusage', (data: any) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    }

    getNetUsageUpdates() {
        return this.observable;
    }
}
