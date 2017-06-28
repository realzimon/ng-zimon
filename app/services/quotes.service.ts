/**
 * Provides random quotes from the backend's REST interface.
 */

import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {ENV} from '../config/environment';

@Injectable()
export class QuotesService {

    private url = ENV.backendUrl + 'api/v1/quotes/random';

    constructor(private http: Http) {
    }

    getRandomQuote() {
        return this.http.get(this.url)
            .map((res: Response) => res.json());
    }
}
