import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PostImageComponent } from './post-image/post-image.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    UserRoutingModule,
  ],

  declarations: [
    UserComponent,
    PostImageComponent,
  ],

  exports: [
    PostImageComponent,
  ],
})
export class UserModule {
}
