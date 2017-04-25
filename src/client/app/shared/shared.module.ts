import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    MaterialModule,
  ],

  declarations: [
  ],

  exports: [
    MaterialModule,
  ],
})
export class SharedModule {
}
