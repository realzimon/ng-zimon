/**
 * Component for the main navigation bar.
 */

import { Component } from '@angular/core';
import { QuotesService } from "./services/quotes.service";

@Component({
    selector: 'navbar',
    templateUrl: '../templates/navbar.component.html',

})
export class NavComponent  {
    randomQuote = 'Random Quote';
    time = new Date();

    constructor(private quoteService: QuotesService){
        window.setInterval(() => this.time = new Date(), 1000);
        window.setInterval(() => {
            quoteService.getRandomQuote()
                .subscribe(quote => this.randomQuote = quote);
        }, 2000);
        quoteService.getRandomQuote()
            .subscribe(quote => this.randomQuote = quote);
    }
}