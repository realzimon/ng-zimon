/**
 * Provides Zivi information from the backend's REST interface.
 */

import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {ENV} from '../config/environment';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

export class Zivi {
  public create: boolean;

  public static fromDTO(rawData: any) {
    if (!rawData) {
      return null;
    } else {
      return new Zivi(
        rawData.name, rawData.name_mx,
        rawData.post_count, rawData.color,
        rawData.colorHex,
        rawData.picture,
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

  public clone(): Zivi {
    return new Zivi(
      this.name, this.name_mx, this.post_count, this.color, this.colorHex, this.picture, this.first, this.addresses
    );
  }

  getFullPictureUrl(): string {
    if (!this.picture || this.picture.startsWith('http')) {
      return this.picture;
    } else {
      return ZiviService.createPictureUrl(this.picture);
    }
  }
}

@Injectable()
export class ZiviService {
  private listUrl = ENV.backendUrl + 'api/v1/zivis';
  private createUrl = ENV.backendUrl + 'api/v1/zivis/create';
  private updateUrl = ENV.backendUrl + 'api/v1/zivis/update';
  private deleteUrl = ENV.backendUrl + 'api/v1/zivis/delete';
  private ziviUpdates = new Subject<string>();

  static createPictureUrl(url: string) {
    return ENV.backendUrl + 'images/' + url;
  }

  constructor(private http: Http) {
  }

  getZiviUpdates(): Subject<string> {
    return this.ziviUpdates;
  }

  getAllZivis(): Observable<Zivi[]> {
    return this.http.get(this.listUrl)
      .map(res => res.json())
      .map(res => {
        return res.zivis.map((rawData: any) => Zivi.fromDTO(rawData));
      });
  }

  createNewZivi(spec: Zivi): Observable<Zivi> {
    return this.http.post(this.createUrl, {spec: spec})
      .map(res => res.json())
      .flatMap(res => this.dtoToObservableAndPushUpdate(res, 'create'));
  }

  updateZivi(name: string, spec: Zivi): Observable<Zivi> {
    return this.http.post(this.updateUrl, {name: name, spec: spec})
      .map(res => res.json())
      .flatMap(res => this.dtoToObservableAndPushUpdate(res, 'update'));
  }

  private dtoToObservableAndPushUpdate(res: any, action: string): Observable<Zivi> {
    return new Observable(subscriber => {
      if (!res || res.error || !res.zivi) {
        subscriber.error(res.error || 'unknown error');
      } else {
        subscriber.next(Zivi.fromDTO(res.zivi));
        this.ziviUpdates.next(action);
      }
    });
  }

  deleteZivi(name: string): Observable<{}> {
    return this.http.post(this.deleteUrl, {name: name})
      .map(res => res.json())
      .flatMap(res => {
        return new Observable(subscriber => {
          if (!res || res.error) {
            subscriber.error(res.error || 'unknown error');
          } else {
            subscriber.next({});
            this.ziviUpdates.next('delete');
          }
        });
      });
  }
}
