import {NgModule}           from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ZiviListComponent} from './zivi/zivi-list.component';
import {ZiviCardComponent} from './zivi/zivi-card.component';
import {NumberFixedLen} from '../pipes/numberFixedLen.pipe';
import {WhoDoesItStats} from './stats/whodoesit.component';
import {ChartsModule} from 'ng2-charts';
import {PostlerComponent} from './postler/postler.component';
import {PostStats} from './stats/poststats.component';
import {FladeComponent} from './flade/flade.component';
import {BernieComponent} from './bernie/bernie.component';
import {NetUsage} from './stats/netusage.component';

@NgModule({
  imports: [BrowserModule, ChartsModule],
  declarations: [
    ZiviListComponent, ZiviCardComponent, WhoDoesItStats, NumberFixedLen,
    PostlerComponent, PostStats, FladeComponent, BernieComponent, NetUsage
  ],
  exports: [
    ZiviListComponent, WhoDoesItStats, PostlerComponent, PostStats,
    FladeComponent, BernieComponent, NetUsage
  ],
  providers: []
})
export class DashboardModule {
}
