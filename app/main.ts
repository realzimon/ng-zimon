import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import { ENV } from './config/environment';
import {enableProdMode} from "@angular/core";

if(ENV.production){
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => {
  console.error(err);
  $('#loaderror-pre').text(err);
  $('#zimon-load-bar').hide(400);
  $('#zimon-error-bar').show(400);
});
