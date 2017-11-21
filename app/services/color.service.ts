import {Injectable} from '@angular/core';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Subject} from 'rxjs/Subject';
import {URLS} from './urls';

@Injectable()
export class ColorService {
  
  constructor() {
  }

  getRandomColor(): Observable<string> {

    return of('light-blue');
  }

 
}