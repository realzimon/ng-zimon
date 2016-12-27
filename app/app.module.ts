import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent }  from './app.component';
import { NavComponent } from './navbar/navbar.component';
import { QuotesService } from './services/quotes.service';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, NavComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ QuotesService ]
})
export class AppModule { }
