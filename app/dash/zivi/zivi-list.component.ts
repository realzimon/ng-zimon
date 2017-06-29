import {Component} from '@angular/core';
import {Zivi, ZiviService} from '../../services/zivi.service';
import {TimerService} from "../../services/timer.service";
import {toast} from "angular2-materialize";

@Component({
  selector: 'zivilist',
  templateUrl: 'app/dash/zivi/zivi-list.component.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class ZiviListComponent {

  zivis: Zivi[];
  remainingMins: number = 0;
  remainingSecs: number = 0;
  loadFlag: boolean = false;

  constructor(private ziviService: ZiviService, private timerService: TimerService) {
    this.loadZivis();
    timerService.getTimerUpdates().subscribe((data: any) => {
      if (this.loadFlag) {
        this.loadZivis(() => this.loadFlag = false);
      } else if (data.remaining === 0) {
        this.loadFlag = true;
      }
      this.remainingMins = ~~(data.remaining / 60);
      this.remainingSecs = data.remaining % 60;
    });
  }

  loadZivis(callback?: (zivis: Zivi[]) => void) {
    this.ziviService.getAllZivis()
      .retryWhen(errors => {
        toast('Unable to fetch Zivis for list (130s)', 5000);
        return errors.delay(10000);
      }) //wait 10s on error
      .subscribe(zivis => {
        this.zivis = zivis;
        callback && callback(zivis);
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
