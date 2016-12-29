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

  getAllZivis() {
    return this.http.get(this.url)
      .map(res => res.json())
      .map(res => {
        return res.zivis.map((zivi: any) => ZiviService.createZiviFromJsonObject(zivi));
      });
  }

  static createZiviFromJsonObject(data: any) {
    if (data === null) {
      return null;
    } else {
      return new Zivi(data.name,
        data.name_mx,
        data.post_count,
        data.color,
        data.colorHex,
        ZiviService.createPictureUrl(data.picture),
        data.first
      );
    }
  }
}
