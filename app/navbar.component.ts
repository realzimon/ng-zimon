/**
 * Created by DZDomi on 27.12.16.
 */

import { Component } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: '../templates/navbar.component.html'

})
export class NavComponent  {
    randomQuote = '#danielvcs';
    time = new Date();

    constructor(){
        window.setInterval(() => this.time = new Date(), 1000);
    }
}