/**
 * Provides Zivi information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {ENV} from '../config/environment';
import {Observable} from 'rxjs/Observable';

export class Zivi {
  public static fromDTO(rawData: any) {
    if (!rawData) {
      return null;
    } else {
      return new Zivi(
        rawData.name, rawData.name_mx,
        rawData.post_count, rawData.color,
        rawData.colorHex,
        ZiviService.createPictureUrl(rawData.picture),
        rawData.first, rawData.addresses
      );
    }
  }

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

  constructor(private http: Http) {
  }

  getAllZivis(): Observable<Zivi[]> {
    return this.http.get(this.url)
      .map(res => res.json())
      .map(res => {
        return res.zivis.map((rawData: any) => Zivi.fromDTO(rawData));
      });
  }
}
