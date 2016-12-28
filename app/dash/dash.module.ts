import {NgModule}           from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ZiviListComponent} from './zivi/zivi-list.component';
import {ZiviCardComponent} from './zivi/zivi-card.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [ZiviListComponent, ZiviCardComponent],
  exports: [ZiviListComponent],
  providers: []
})
export class DashboardModule {
}
