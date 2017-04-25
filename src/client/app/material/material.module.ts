import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdSnackBarModule,
  MdToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdCardModule,
    MdSnackBarModule,
    MdDialogModule,
  ],

  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdCardModule,
    MdSnackBarModule,
    MdDialogModule,
  ],
})
export class MaterialModule {
}
