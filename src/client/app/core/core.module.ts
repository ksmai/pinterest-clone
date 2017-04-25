import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth.service';
import { ImageService } from './image.service';

@NgModule({
  imports: [
    HttpModule,
  ],

  providers: [
    AuthService,
    ImageService,
  ],
})
export class CoreModule {
}
