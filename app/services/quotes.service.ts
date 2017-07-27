/**
 * Provides random quotes from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {ENV} from '../config/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class QuotesService {

  private randomUrl = ENV.backendUrl + 'api/v1/quotes/random';
  private createUrl = ENV.backendUrl + 'api/v1/quotes/';
  private updateUrl = ENV.backendUrl + 'api/v1/quotes/update';

  constructor(private http: Http) {
  }

  getRandomQuote() {
    return this.http.get(this.randomUrl)
      .map(res => res.json());
  }

  submitNewQuote(text: string): Observable<string> {
    return this.http.post(this.createUrl, {text: text})
      .map(res => res.json())
      .flatMap(res => new Observable(subscriber => {
        if (res && res.err) {
          subscriber.error(res.err);
        } else {
          subscriber.next(text);
        }
      }));
  }

  modifyQuote(originalText: string, newText: string): Observable<string> {
    return this.http.post(this.updateUrl, {originalText: originalText, newText: newText})
      .map(res => res.json())
      .flatMap(res => new Observable(subscriber => {
        if (!res || res.err || !res.newText) {
          subscriber.error(res.err || 'unknown error');
        } else {
          subscriber.next(res.newText);
        }
      }));
  }
}
