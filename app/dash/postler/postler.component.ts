import {Component} from '@angular/core';
import {PostState, PostlerData, PostlerService} from '../../services/postler.service';
import {toast} from 'angular2-materialize';

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
  error = false;

  constructor(private postlerService: PostlerService) {
    postlerService.onStateChange().subscribe((data: PostlerData) => {
      this.stateInfo = data;
      this.error = false;
      console.log('Received post change', data);
    });
    this.loadPostState();
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.stateInfo.state === PostState.Preparation) {
      if (event.keyCode === 79) { // 'a'ccept
        this.submitAction('accepted');
      } else if (event.keyCode === 78) { // 'n'ext
        this.submitAction('next');
      } else if (event.keyCode === 75) { // 'k'ancel (German: 'k'eine Post)
        this.submitAction('cancel');
      }
    } else if (this.stateInfo.state === PostState.Reminder && event.keyCode === 72) { // 'h'ave returned
      this.submitAction('dismiss-reminder');
    }
  }

  submitAction(action: string) {
    this.postlerService.sendAction(action)
      .subscribe(() => {
        this.loadPostState();
      }, (err) => {
        console.error('Unable to submit post action', action, 'due to', err);
        toast('Unable to submit post action, try again later.', 10000);
      });
  }

  loadPostState() {
    this.postlerService.getCurrentState()
      .retryWhen(errors => {
        this.stateInfo = null;
        this.error = true;
        return errors.delay(30000);
      })
      .subscribe((data: PostlerData) => {
        this.stateInfo = data;
        this.error = false;
      });
  }
}
