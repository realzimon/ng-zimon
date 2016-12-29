import {NgModule}           from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ZiviListComponent} from './zivi/zivi-list.component';
import {ZiviCardComponent} from './zivi/zivi-card.component';
import {NumberFixedLen} from '../pipes/numberFixedLen.pipe';
import {WhoDoesItStats} from './stats/whodoesit.component';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {PostlerComponent} from './postler/postler.component';

@NgModule({
  imports: [BrowserModule, ChartsModule],
  declarations: [ZiviListComponent, ZiviCardComponent, WhoDoesItStats, NumberFixedLen, PostlerComponent],
  exports: [ZiviListComponent, WhoDoesItStats, PostlerComponent],
  providers: []
})
export class DashboardModule {
}
