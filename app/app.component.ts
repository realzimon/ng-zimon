import { Component } from '@angular/core';

@Component({
  selector: 'zimon',
  template: `<navbar></navbar><h1>Hello {{name}}</h1>`,
})
export class AppComponent  { name = 'Angular'; }
