import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app.module';

import {ENV} from './config/environment';
import {ENV as SAMPLE_ENV} from './config/sample-environment';
import {enableProdMode} from '@angular/core';

if (ENV.production) {
  enableProdMode();
}

for (let prop in SAMPLE_ENV) {
  if (ENV[prop] === undefined) {
    console.log('Using default value for config property', prop, 'because it is not defined');
    ENV[prop] = SAMPLE_ENV[prop];
  }
}

function finalCharIsNotSlash(str: string): boolean {
  return !str || str.charAt(str.length - 1) !== '/';
}

if (finalCharIsNotSlash(ENV.socketUrl)) {
  console.error('Socket URL needs a slash at the end! This might be an error in the future.');
  ENV.socketUrl += '/';
}
if (finalCharIsNotSlash(ENV.backendUrl)) {
  console.error('Backend URL needs a slash at the end! This might be an error in the future.');
  ENV.backendUrl += '/';
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => {
  console.error(err);
  $('#loaderror-pre').text(err);
  $('#zimon-load-bar').hide(400);
  $('#zimon-error-bar').show(400);
});
