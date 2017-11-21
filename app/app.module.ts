import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import {DashboardModule} from './dash/dash.module';
import {ZiviService} from './services/zivi.service';
import {QuotesService} from './services/quotes.service';
import {AppComponent}  from './app.component';
import {NavComponent} from './navbar/navbar.component';
import {TimerService} from './services/timer.service';
import {PostlerService} from './services/postler.service';
import {FladeService} from './services/flade.service';
import {NetUsageService} from './services/netusage.service';
import {MaterializeModule} from 'angular2-materialize';
import {SocketService} from './services/socket.service';
import {SettingsModule} from './settings/settings.module';
import {SettingsService} from './services/settings.service';
import {ColorService} from './services/color.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule, DashboardModule, SettingsModule,
    MaterializeModule
  ],
  declarations: [AppComponent, NavComponent],
  bootstrap: [AppComponent],
  providers: [
    QuotesService, ZiviService, TimerService, PostlerService,
    FladeService, NetUsageService, SocketService, SettingsService, ColorService
  ]
})
export class AppModule {
}
