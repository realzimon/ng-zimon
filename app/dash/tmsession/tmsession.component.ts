import {Component} from '@angular/core';
import {TmService} from '../../services/tm.service';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'tmsession',
  templateUrl: 'app/dash/tmsession/tmsession.component.html',
  styleUrls: ['app/dash/tmsession/tmsession.component.css']
})
export class TmsessionComponent implements OnInit{
  data: any;
  track: string;
  gameInProgress: boolean;
  serverName: string;
  interval: any;


  constructor(private tmservice: TmService) {
    this.gameInProgress = true;
    this.track = '';
    this.data = {};
  }

  ngOnInit(){
    this.interval = setInterval(() => {
      this.updateData();
    }, 1000);
  }
 
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  
  updateData(): void {
    this.tmservice.getServerName().subscribe(name => this.serverName = name);
    this.tmservice.getTrack().subscribe(track => this.track = track);
    this.tmservice.getTimes().subscribe(times => this.data = times);
  }
}
