/**
 * Component for the main navigation bar.
 */

import { Component } from '@angular/core';
import { QuotesService } from "./services/quotes.service";

@Component({
    selector: 'navbar',
    templateUrl: '../templates/navbar.component.html',
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
            this.loadNewQuote();
        }, 10000);
        this.loadNewQuote();
    }

    loadNewQuote(){
        this.quoteService.getRandomQuote()
            .subscribe(res => this.randomQuote = res.quote.text);
    }

    handleKeyboardEvent(event: KeyboardEvent){
        //The lowercase letter 'q'
        if(event.keyCode === 81){
            this.loadNewQuote();
        }
    }
}