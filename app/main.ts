import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app.module';

import {ENV} from './config/environment';
import {ENV as SAMPLE_ENV} from './config/sample-environment';
import {enableProdMode} from "@angular/core";

if (ENV.production) {
  enableProdMode();
}

for (let prop in SAMPLE_ENV) {
  if (ENV[prop] === undefined) {
    console.info('Using default value for config property', prop, 'because it is not defined');
    ENV[prop] = SAMPLE_ENV[prop];
  }
}

if (!ENV.socketUrl) {
  ENV.socketUrl = SAMPLE_ENV.socketUrl;
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => {
  console.error(err);
  $('#loaderror-pre').text(err);
  $('#zimon-load-bar').hide(400);
  $('#zimon-error-bar').show(400);
});
