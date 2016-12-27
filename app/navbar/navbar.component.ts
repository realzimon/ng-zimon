/**
 * Component for the main navigation bar.
 */

import { Component } from '@angular/core';
import { QuotesService } from "../services/quotes.service";

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html',
    host: {
        '(document:keydown)': 'handleKeyboardEvent($event)'
    }
})
export class NavComponent  {
    randomQuote = 'Random Quote';
    time = new Date();

    constructor(private quoteService: QuotesService){
        window.setInterval(() => this.time = new Date(), 1000);
        window.setInterval(() => {
            quoteService.getRandomQuote()
                .subscribe(quote => this.randomQuote = quote);
        }, 10000);
        quoteService.getRandomQuote()
            .subscribe(quote => this.randomQuote = quote);
    }

    loadNewQuote(){
        this.quoteService.getRandomQuote()
            .subscribe(quote => this.randomQuote = quote);
    }

    handleKeyboardEvent(event: KeyboardEvent){
        //The lowercase letter 'q'
        if(event.keyCode === 81){
            this.loadNewQuote();
        }
    }
}
