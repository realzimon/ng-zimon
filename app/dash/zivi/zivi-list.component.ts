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
    this.zivis = ziviService.getAllZivis();
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    //todo
  }
}
