import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    MaterialModule,
  ],

  declarations: [
  ],

  exports: [
    CommonModule,
    MaterialModule,
  ],
})
export class SharedModule {
}
