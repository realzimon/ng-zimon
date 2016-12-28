/**
 * Provides Zivi information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/Rx';

export class Zivi {
  constructor(public name: string, public name_mx: string, public post_count: number, public color: string) {

  }

}

@Injectable()
export class ZiviService {

    private url = 'http://localhost:4000/api/v1/zivis';

    constructor(private http: Http) {
    }

    getZiviByName(name: string) {
      return new Zivi(name, 'name', 0, 'teal');
    }

    getAllZivis() {
        return this.http.get(this.url)
            .map(res => res.json())
            .map(res => {
                let zivis: Zivi[] = [];
                res.zivis.forEach(function(zivi: any){
                    zivis.push(new Zivi(zivi.name, zivi.name_mx, zivi.post_count, zivi.color));
                });
                return zivis;
            });
    }
}
