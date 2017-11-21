import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ColorService {

  constructor() {
  }

  getRandomColor(): Observable<string> {

    let colors: string[] = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan',
     'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'brown', 'grey', 'blue-grey'];

    let randomIndex: number = Math.floor(Math.random() * colors.length);
    if (randomIndex >= colors.length) {
      randomIndex = 0;
    }

    return of(colors[randomIndex]);
  }


}
