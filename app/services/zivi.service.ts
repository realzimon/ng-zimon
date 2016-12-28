/**
 * Provides Zivi information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/Rx';

export class Zivi {
  constructor(private name: string, private color: string) {

  }
}

@Injectable()
export class ZiviService {

    constructor(private http: Http) {
    }

    getZiviByName(name: string) {
      return new Zivi(name, 'teal');
    }

    getAllZivis() {
      return [
        new Zivi('Simon', 'teal'),
        new Zivi('Karl', 'light-blue'),
        new Zivi('Günther', 'red')
      ];
    }
}
