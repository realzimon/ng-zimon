/**
 * Provides Zivi information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/Rx';

export class Zivi {
  constructor(public name: string,
              public name_mx: string,
              public post_count: number,
              public color: string,
              public colorHex: string,
              public picture: string,
              public first: number) {

  }

}

@Injectable()
export class ZiviService {

  private url = 'http://localhost:4000/api/v1/zivis';

  static createPictureUrl(url: string) {
    return 'http://localhost:4000/images/' + url;
  }

  constructor(private http: Http) {
  }

  getZiviByName(name: string) {
    return new Zivi(name, 'name', 0, 'teal', '#009688', 'picture', 0);
  }

  getAllZivis() {
    return this.http.get(this.url)
      .map(res => res.json())
      .map(res => {
        let zivis: Zivi[] = [];
        res.zivis.forEach(function (zivi: any) {
          zivis.push(new Zivi(zivi.name,
            zivi.name_mx,
            zivi.post_count,
            zivi.color,
            zivi.colorHex,
            ZiviService.createPictureUrl(zivi.picture),
            zivi.first));
        });
        return zivis;
      });
  }
}
