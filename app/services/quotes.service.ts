/**
 * Created by DZDomi on 27.12.16.
 */

import {Http, Response} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/Rx';

@Injectable()
export class QuotesService {

    private url = 'http://localhost:4000/quotes/random';

    constructor(private http: Http) {
    }

    getRandomQuote() {
        return this.http.get(this.url)
            .map((res: Response) => res.json());
    }
}
