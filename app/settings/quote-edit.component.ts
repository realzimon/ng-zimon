import {Component, OnInit} from '@angular/core';
import {toast} from 'angular2-materialize';
import {Quote, QuotesService} from '../services/quotes.service';

@Component({
  selector: 'quoteedit',
  templateUrl: 'app/settings/quote-edit.component.html',
  inputs: ['quote', 'index'],
  host: {
    'class': 'col-xs-12 edit-card'
  }
})
export class QuoteEditComponent implements OnInit {
  quote: Quote;
  originalQuote: Quote;
  loading: boolean;
  error: any;
  editing = false;
  create = false;

  constructor(private quotesService: QuotesService) {
  }

  ngOnInit() {
    if (this.quote.text === '%%create%%') {
      this.create = true;
      this.editing = true;
      this.quote.text = '';
    }
  }

  updateQuote() {
    if (!this.checkQuoteForSaving()) {
      return;
    }
    this.quotesService.updateQuote(this.originalQuote.text, this.quote.text)
      .subscribe(
        updated => this.handleWriteSuccess(updated),
        error => this.handleWriteError(error),
        () => this.loading = false
      );
  }

  handleWriteSuccess(res: Quote) {
    this.quote = res;
    this.originalQuote = res;
    this.error = false;
    this.editing = false;
    this.loading = false;
    this.create = false;
  }

  private handleWriteError(error: any) {
    this.error = error;
    this.loading = false;
  }

  checkQuoteForSaving(): boolean {
    let result;
    if (!this.quote || !this.quote.text) {
      result = 'Kein Zitattext angegeben.';
    } else if (this.quote.text === '%%create%%') {
      result = 'Dieser Zitattext ist nicht erlaubt.';
    } else if (this.loading) {
      result = 'Es läuft bereits ein Speichervorgang.';
    }
    if (result) {
      toast(result, 2000);
      return false;
    } else {
      this.loading = true;
      return true;
    }
  }

  createQuote() {
    if (!this.checkQuoteForSaving()) {
      return;
    }
    this.quotesService.createQuote(this.quote)
      .subscribe(
        updated => this.handleWriteSuccess(updated),
        error => this.handleWriteError(error)
      );
  }

  startEditing() {
    this.originalQuote = this.quote.clone();
    this.editing = true;
  }

  cancelEditing() {
    this.editing = false;
    if (this.create) {
      this.quotesService.getQuoteUpdates().next('delete');
    } else {
      this.quote = this.originalQuote;
    }
  }

  deleteQuote() {
    this.loading = true;
    console.log(' ### Deleting Quote', this.quote);
    this.quotesService.deleteQuote(this.quote)
      .subscribe(
        deletedQuote => toast('Zitat "' + deletedQuote.text + '" gelöscht.', 4000),
        error => {
          toast('Fehler beim Löschen.', 4000);
          console.error('Fehler beim Löschen von', this.quote, error);
        }
      );
  }

  // noinspection JSMethodCanBeStatic
  trackByIndex(index: number) {
    return index;
  }
}
