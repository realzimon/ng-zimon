/**
 * Provides Flade information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../config/environment';
import {SocketService} from './socket.service';
import {Subscriber} from 'rxjs/Subscriber';

export class Flade {
  constructor(public text: String, public timestamp: Date) {

  }
}

@Injectable()
export class FladeService {
  private apiUrl = ENV.backendUrl + 'api/v1/flade';
  private fladeChangeObservable: Observable<Flade>;

  constructor(private http: Http, private socketService: SocketService) {
    this.fladeChangeObservable = new Observable((observer: Subscriber<Flade>) => {
      socketService.on('flade', () => {
        this.getCurrentFlade().subscribe(flade => observer.next(flade));
      });
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
