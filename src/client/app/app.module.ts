import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import {
  BrowserAnimationsModule,
} from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarModule } from './navbar/navbar.module';
import '../styles/styles.scss';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    CoreModule,
    SharedModule,
    NavbarModule,
    AppRoutingModule,
  ],

  declarations: [
    AppComponent,
  ],

  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
