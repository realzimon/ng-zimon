import {Component} from '@angular/core';
import {PostState, PostlerData, PostlerService} from '../../services/postler.service';
import {TimerService} from "../../services/timer.service";

@Component({
  selector: 'postler',
  templateUrl: 'app/dash/postler/postler.component.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class PostlerComponent {
  stateInfo: PostlerData = new PostlerData(PostState.Idle, new Date(), null);

  constructor(private postlerService: PostlerService, private timerService: TimerService) {
    timerService.getTimerUpdates().subscribe((data: any) => {
      postlerService.getCurrentState().do(state => this.stateInfo = state);
    });
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    // The lowercase letter 'p' for post
    if (event.keyCode === 80) {
      //todo
    }
  }
}
