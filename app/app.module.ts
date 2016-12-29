import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {DashboardModule} from './dash/dash.module';
import {ZiviService} from './services/zivi.service';
import {QuotesService} from './services/quotes.service';
import {AppComponent}  from './app.component';
import {NavComponent} from './navbar/navbar.component';
import {TimerService} from "./services/timer.service";
import {PostlerService} from './services/postler.service';

@NgModule({
  imports: [BrowserModule, HttpModule, DashboardModule],
  declarations: [AppComponent, NavComponent],
  bootstrap: [AppComponent],
  providers: [QuotesService, ZiviService, TimerService, PostlerService]
})
export class AppModule {
}
