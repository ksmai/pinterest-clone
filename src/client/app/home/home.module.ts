import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    InfiniteScrollModule,
    SharedModule,
    HomeRoutingModule,
  ],

  declarations: [
    HomeComponent,
  ],

  exports: [
  ],
})
export class HomeModule {
}

