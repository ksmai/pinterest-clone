import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { MasonryLayoutDirective } from './masonry-layout.directive';

@NgModule({
  imports: [
    MaterialModule,
  ],

  declarations: [
    DialogComponent,
    MasonryLayoutDirective,
  ],

  entryComponents: [
    DialogComponent,
  ],

  exports: [
    CommonModule,
    MaterialModule,
    MasonryLayoutDirective,
  ],
})
export class SharedModule {
}
