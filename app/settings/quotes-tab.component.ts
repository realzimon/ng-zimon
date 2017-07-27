import {Component} from '@angular/core';
import {Quote, QuotesService} from '../services/quotes.service';

@Component({
  selector: 'quotes-tab',
  templateUrl: 'app/settings/quotes-tab.component.html'
})
export class QuotesTabComponent {
  private quotes: Quote[];
  private error: any;

  constructor(private quotesService: QuotesService) {
    this.loadQuotes();
    this.quotesService.getQuoteUpdates().subscribe(
      updateType => {
        if (updateType === 'delete') {
          this.loadQuotes();
        }
      }
    );
  }

  loadQuotes() {
    this.quotesService.getAllQuotes()
      .subscribe(quotes => {
        this.quotes = quotes;
        this.error = null;
      }, error => {
        this.quotes = [];
        this.error = error;
      });
  }

  addNewQuote() {
    let quote = new Quote(
      '%%create%%', 0
    );
    this.quotes.push(quote);
    // Scroll to the bottom of the tab to present the new element:
    let $tab = $('.modal-content');
    $tab.animate({
      scrollTop: $tab[0].scrollHeight
    }, 1000);
  }
}
