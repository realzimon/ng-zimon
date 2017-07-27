/**
 * Component for the main navigation bar.
 */

import {Component, NgZone} from '@angular/core';
import {QuotesService} from '../services/quotes.service';
import {TimerService} from '../services/timer.service';
import {SettingsService} from '../services/settings.service';

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

  constructor(private quoteService: QuotesService, private timerService: TimerService,
              public settingsService: SettingsService, private zone: NgZone) {
    timerService.getTimerUpdates().subscribe((data: any) => {
      this.time = new Date();
      if (data.remaining % 30 === 0) {
        this.loadNewQuote();
      }
    });
    this.loadNewQuote();
  }

  loadNewQuote() {
    this.quoteService.getRandomQuote()
      .subscribe(quote => this.randomQuote = quote.text);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    // The lowercase letter 'q'
    if (event.keyCode === 81) {
      this.loadNewQuote();
    }
  }
}
