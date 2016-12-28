import {Component} from '@angular/core';
import {Zivi, ZiviService} from '../../services/zivi.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'zivilist',
  templateUrl: 'app/dash/zivi/zivi-list.component.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class ZiviListComponent {
  private socketUrl = "http://localhost:4001";
  private socket: any;

  zivis: Zivi[];
  remainingMins: number;
  remainingSecs: number;
  loadFlag: boolean = false;

  constructor(private ziviService: ZiviService) {
    this.loadZivis();
    this.socket = io.connect(this.socketUrl);
    this.socket.on('timer', (data: any) => {
      if(this.loadFlag){
        this.loadFlag = false;
        this.loadZivis();
      }
      if(data.remaining === 0){
        this.loadFlag = true;
      }
      this.remainingMins = ~~(data.remaining / 60);
      this.remainingSecs = data.remaining % 60;
    });
  }

  loadZivis(){
    this.ziviService.getAllZivis().subscribe(zivis => {
      this.zivis = zivis;
    });
  }


  handleKeyboardEvent(event: KeyboardEvent) {
    // The lowercase letter 'm' for mexican mode
    if (event.keyCode === 77) {
      this.zivis.forEach((zivi) => {
        let temp = zivi.name;
        zivi.name = zivi.name_mx;
        zivi.name_mx = temp;
      })
    }
  }
}
