import {NgModule}           from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SettingsModalComponent} from './settings-modal.component';
import {MaterializeModule} from 'angular2-materialize';
import {HomeTabComponent} from './home-tab.component';
import {ZiviSettingsComponent} from './zivi-settings.component';
import {ZivisTabComponent} from './zivis-tab.component';
import {FormsModule} from '@angular/forms';
import {QuotesTabComponent} from './quotes-tab.component';
import {QuoteEditComponent} from './quote-edit.component';

@NgModule({
  imports: [BrowserModule, FormsModule, MaterializeModule],
  declarations: [
    SettingsModalComponent, HomeTabComponent, ZivisTabComponent, ZiviSettingsComponent,
    QuotesTabComponent, QuoteEditComponent
  ],
  exports: [SettingsModalComponent],
  providers: []
})
export class SettingsModule {
}
