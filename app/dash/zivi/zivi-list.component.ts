import {Component} from '@angular/core';
import {Zivi, ZiviService} from '../../services/zivi.service';

@Component({
  selector: 'zivilist',
  templateUrl: 'app/dash/zivi/zivi-list.component.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class ZiviListComponent {
  zivis: Zivi[];

  constructor(private ziviService: ZiviService) {
    ziviService.getAllZivis().subscribe(zivis => {
      this.zivis = zivis;
      console.log(this.zivis);
    });
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    //todo
  }
}
