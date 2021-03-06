import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http } from '@angular/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class TmService implements OnInit {

  serverName: string;
  track: string;
  times: any;

  constructor(private http: Http) {
    Observable.interval(2000)
    .switchMap(() => http.get('http://localhost:8000/GetServerName')).map((data) => data.json())
    .subscribe((data) => {
      this.serverName = data;
    });

    Observable.interval(2000)
    .switchMap(() => http.get('http://localhost:8000/GetCurrentRanking')).map((data) => data.json())
    .subscribe((data) => {
      this.times = data;
    });

    Observable.interval(2000)
    .switchMap(() => http.get('http://localhost:8000/GetCurrentChallengeInfo')).map((data) => data.json())
    .subscribe((data) => {
      this.track = data['Name'];
    });
  }

  ngOnInit(): void {

  }

  getServerName(): Observable<string> {
    return of(this.serverName);
  }

  getTimes(): Observable<any> {
    return of(this.times);
  }

  getTrack(): Observable<string> {
    return of(this.track);
  }
}
