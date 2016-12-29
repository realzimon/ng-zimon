import {Component} from '@angular/core';
import {PostState, PostlerData, PostlerService} from '../../services/postler.service';

@Component({
  selector: 'postler',
  templateUrl: 'app/dash/postler/postler.component.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class PostlerComponent {
  stateInfo: PostlerData = new PostlerData(PostState.Idle, new Date(), null);
  states = PostState;

  constructor(private postlerService: PostlerService) {
    postlerService.onStateChange().subscribe((data: PostlerData) => {
      this.stateInfo = data;
    });
    this.loadPostState();
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.stateInfo.state == PostState.Action) {
      switch (event.keyCode) {
        case 79: // 'o'kay
          this.submitAction('accepted');
          break;
        case 78: // 'n'ext
          this.submitAction('next');
          break;
        case 75: // 'k' - no post today
          this.submitAction('cancel');
          break;
      }
    } else if (this.stateInfo.state == PostState.Reminder && event.keyCode === 72) { // 'h'ave returned
      this.submitAction('dismiss-reminder');
    }
  }

  submitAction(action: string) {
    this.postlerService.sendAction(action).subscribe((data: any) => {
      this.loadPostState();
    });
  }

  loadPostState() {
    this.postlerService.getCurrentState().subscribe((data: PostlerData) => {
      this.stateInfo = data;
    });
  }
}
