/**
 * Provides random quotes from the backend's REST interface.
 */

import {Http, Response} from "@angular/http";
import {Injectable} from "@angular/core";

import 'rxjs/Rx';

@Injectable()
export class QuotesService {

    private url = 'http://localhost:4000/api/v1/quote/random';

    constructor(private http: Http){}

    getRandomQuote(){
        return this.http.get(this.url)
            .map((res: Response) => res.json());
    }
}
