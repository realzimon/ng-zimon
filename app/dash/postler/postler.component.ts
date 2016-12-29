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
    if (this.stateInfo.state === PostState.Preparation) {
      if (event.keyCode === 79) {
        this.submitAction('accepted');
      } else if (event.keyCode === 78) {
        this.submitAction('next');
      } else if (event.keyCode === 75) {
        this.submitAction('cancel');
      }
    } else if (this.stateInfo.state === PostState.Reminder && event.keyCode === 72) { // 'h'ave returned
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
