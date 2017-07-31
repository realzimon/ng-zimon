/**
 * Provides random quotes from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {URLS} from './urls';

export class Quote {
  static fromDto(dto: any): Quote {
    if (!dto) {
      return null;
    } else {
      return new Quote(dto.text || '???', dto.count || 0);
    }
  }

  constructor(public text: string, private count: number) {

  }

  public clone(): Quote {
    return new Quote(this.text, this.count);
  }
}

@Injectable()
export class QuotesService {
  private randomUrl = URLS.backendPath('api/v1/quotes/random');
  private createUrl = URLS.backendPath('api/v1/quotes/create');
  private getAllUrl = URLS.backendPath('api/v1/quotes/');
  private updateUrl = URLS.backendPath('api/v1/quotes/update');
  private deleteUrl = URLS.backendPath('api/v1/quotes/delete');
  private quoteUpdates = new Subject<string>();

  constructor(private http: Http) {
  }

  getQuoteUpdates(): Subject<string> {
    return this.quoteUpdates;
  }

  getRandomQuote(): Observable<Quote> {
    return this.http.get(this.randomUrl)
      .map(res => res.json())
      .map(res => Quote.fromDto(res.quote));
  }

  getAllQuotes(): Observable<Quote[]> {
    return this.http.get(this.getAllUrl)
      .map(res => res.json())
      .map(res => res.quotes.map((dto: any) => Quote.fromDto(dto)));
  }

  createQuote(quote: Quote): Observable<Quote> {
    return this.http.post(this.createUrl, quote)
      .map(res => res.json())
      .flatMap(res => new Observable(subscriber => {
        if (!res || res.err || !res.quote) {
          subscriber.error(res.err);
        } else {
          subscriber.next(Quote.fromDto(res.quote));
          this.quoteUpdates.next('create');
        }
      }));
  }

  updateQuote(originalText: string, newText: string): Observable<Quote> {
    return this.http.post(this.updateUrl, {originalText: originalText, newText: newText})
      .map(res => res.json())
      .flatMap(res => new Observable(subscriber => {
        if (!res || res.err || !res.quote) {
          subscriber.error(res.err || 'unknown error');
        } else {
          subscriber.next(Quote.fromDto(res.quote));
          this.quoteUpdates.next('update');
        }
      }));
  }

  deleteQuote(quote: Quote): Observable<Quote> {
    return this.http.post(this.deleteUrl, quote)
      .map(res => res.json())
      .flatMap(res => new Observable(subscriber => {
        if (!res || res.err || !res.deletedQuote) {
          subscriber.error(res.err);
        } else {
          subscriber.next(Quote.fromDto(res.deletedQuote));
          this.quoteUpdates.next('delete');
        }
      }));
  }
}
