import {NgModule}           from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ZiviListComponent} from './zivi/zivi-list.component';
import {ZiviCardComponent} from './zivi/zivi-card.component';
import {NumberFixedLen} from '../pipes/numberFixedLen.pipe';
import {WhoDoesItStats} from './stats/whodoesit.component';
import {ChartsModule} from 'ng2-charts/ng2-charts';

@NgModule({
  imports: [BrowserModule, ChartsModule],
  declarations: [ZiviListComponent, ZiviCardComponent, WhoDoesItStats, NumberFixedLen],
  exports: [ZiviListComponent, WhoDoesItStats],
  providers: []
})
export class DashboardModule {
}