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
  static fromDTO(dto: any) {
    return dto ? new Flade(dto.text, new Date(dto.timestamp)) : null;
  }

  constructor(public text: String, public timestamp: Date) {

  }
}

export class FladeResult {
  static fromDTO(dto: any) {
    return new FladeResult(dto.error, Flade.fromDTO(dto.flade));
  }

  constructor(public error: any, public flade: Flade) {

  }
}

@Injectable()
export class FladeService {
  private apiUrl = ENV.backendUrl + 'api/v1/flade';
  private fladeChangeObservable: Observable<FladeResult>;

  constructor(private http: Http, private socketService: SocketService) {
    this.fladeChangeObservable = new Observable((observer: Subscriber<FladeResult>) => {
      socketService.on('flade', (res: any) => {
        observer.next(res);
      });
    });
  }

  getCurrentFlade() {
    return this.http.get(this.apiUrl)
      .map(res => res.json())
      .map(res => FladeResult.fromDTO(res));
  }

  getChangeObservable() {
    return this.fladeChangeObservable;
  }
}
