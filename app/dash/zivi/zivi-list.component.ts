import {Component} from '@angular/core';
import {Zivi, ZiviService} from '../../services/zivi.service';
import {TimerService} from '../../services/timer.service';
import {toast} from 'angular2-materialize';
import {SettingsService} from '../../services/settings.service';

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

  static numberFixedLen(value: number, len: number): string {
    if (isNaN(value) || isNaN(value)) {
      return '' + value;
    }
    let num: string = '' + value;
    while (num.length < len) {
      num = '0' + num;
    }
    return num;
  }

  constructor(private ziviService: ZiviService, private timerService: TimerService, private settingsService: SettingsService) {
    this.loadZivis();
    timerService.getTimerUpdates().subscribe((data: any) => {
      if (this.loadFlag) {
        this.loadZivis(() => this.loadFlag = false);
      } else if (data.remaining === 0) {
        this.loadFlag = true;
      }
      this.remainingMins = Math.floor(data.remaining / 60);
      this.remainingSecs = data.remaining % 60;
    });
    ziviService.getZiviUpdates().subscribe(() => this.loadFlag = true);
  }

  loadZivis(callback?: (zivis: Zivi[]) => void) {
    this.ziviService.getAllZivis()
      .retryWhen(errors => {
        toast('Unable to fetch Zivis for list (10s)', 2000);
        return errors.delay(10000);
      })
      .subscribe(zivis => {
        if (zivis.length > 6) {
          zivis.splice(7);
        }
        this.zivis = zivis;
        if (callback) {
          callback(zivis);
        }
      });
  }


  handleKeyboardEvent(event: KeyboardEvent) {
    // The lowercase letter 'm' for mexican mode
    if (event.keyCode === 77) {
      this.zivis.forEach((zivi) => {
        let temp = zivi.name;
        zivi.name = zivi.name_mx;
        zivi.name_mx = temp;
      });
    }
  }
}
