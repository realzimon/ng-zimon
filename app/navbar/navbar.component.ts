/**
 * Component for the main navigation bar.
 */

import {Component} from '@angular/core';
import {QuotesService} from '../services/quotes.service';
import {TimerService} from '../services/timer.service';

@Component({
  selector: 'navbar',
  templateUrl: 'app/navbar/navbar.component.html',
  host: {
    '(document:keydown)': 'handleKeyboardEvent($event)'
  }
})
export class NavComponent {
  randomQuote = 'Random Quote';
  time = new Date();

  constructor(private quoteService: QuotesService, private timerService: TimerService) {
    timerService.getTimerUpdates().subscribe((data: any) => {
      this.time = new Date();
      if (data.remaining % 10 === 0) {
        this.loadNewQuote();
      }
    });
    this.loadNewQuote();
  }

  loadNewQuote() {
    this.quoteService.getRandomQuote()
      .subscribe(res => this.randomQuote = res.quote.text);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    // The lowercase letter 'q'
    if (event.keyCode === 81) {
      this.loadNewQuote();
    }
  }
}
