import { Component } from '@angular/core';
import {ENV} from './config/environment';

@Component({
  selector: 'zimon',
  templateUrl: 'app/app.component.html',
})
export class AppComponent  {
  name = 'Zimon';
  env = ENV;
}
