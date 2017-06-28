/**
 * Provides Zivi information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {ENV} from '../config/environment';

export class Zivi {
  constructor(public name: string,
              public name_mx: string,
              public post_count: number,
              public color: string,
              public colorHex: string,
              public picture: string,
              public first: number,
              public addresses: string[]) {

  }

}

@Injectable()
export class ZiviService {

  private url = ENV.backendUrl + 'api/v1/zivis';

  static createPictureUrl(url: string) {
    return ENV.backendUrl + 'images/' + url;
  }

  static createZiviFromJsonObject(data: any) {
    if (!data) {
      return null;
    } else {
      return new Zivi(data.name,
        data.name_mx,
        data.post_count,
        data.color,
        data.colorHex,
        ZiviService.createPictureUrl(data.picture),
        data.first,
        data.addresses
      );
    }
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
}
