import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AuthService } from './auth.service';
import { ImageService } from './image.service';
import { StorageService } from './storage.service';

@NgModule({
  imports: [
    HttpModule,
  ],

  providers: [
    AuthService,
    ImageService,
    StorageService,
  ],
})
export class CoreModule {
}
