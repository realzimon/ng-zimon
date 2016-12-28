import {Component} from '@angular/core';
import {Zivi} from '../../services/zivi.service';

@Component({
  selector: 'zivicard',
  inputs: ['zivi'],
  templateUrl: 'app/dash/zivi/zivi-card.component.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class ZiviCardComponent {
  public zivi: Zivi;

  constructor() {

  }

  handleKeyboardEvent(event: KeyboardEvent) {
    //todo
  }
}
