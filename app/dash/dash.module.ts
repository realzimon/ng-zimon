import {NgModule}           from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ZiviListComponent} from './zivi/zivi-list.component';
import {ZiviCardComponent} from './zivi/zivi-card.component';
import {NumberFixedLen} from '../pipes/numberFixedLen.pipe';
import {PostlerComponent} from './postler/postler.component';
import {PostStats} from './stats/poststats.component';
import {FladeComponent} from './flade/flade.component';
import {BernieComponent} from './bernie/bernie.component';
import {NetUsageComponent} from './stats/netusage.component';
import {TmsessionComponent} from './tmsession/tmsession.component';
import {TmstatsComponent} from './tmstats/tmstats.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    ZiviListComponent, ZiviCardComponent, NumberFixedLen,
    PostlerComponent, PostStats, FladeComponent, BernieComponent, NetUsageComponent,
    TmsessionComponent, TmstatsComponent
  ],
  exports: [
    ZiviListComponent, PostlerComponent, PostStats,
    FladeComponent, BernieComponent, NetUsageComponent,
    TmsessionComponent, TmstatsComponent
  ],
  providers: []
})
export class DashboardModule {
}
