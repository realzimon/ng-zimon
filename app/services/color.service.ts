import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ColorPair, colorPalette} from '../classes/colorPair';

@Injectable()
export class ColorService {

  constructor() {
  }

  getRandomColor(): Observable<ColorPair> {

    let randomIndex: number = Math.floor(Math.random() * colorPalette.length);
    if (randomIndex >= colorPalette.length) {
      randomIndex = 0;
    }

    return of(colorPalette[randomIndex]);
  }

  convertColorToHex(color: string): Observable<string> {
    
    let hex: string = null;

    colorPalette.forEach(element => {
      if (element.color === color) { hex = element.hex; }
    });
    
    return of(hex);
  }


}
