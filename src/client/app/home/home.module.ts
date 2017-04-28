import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

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
