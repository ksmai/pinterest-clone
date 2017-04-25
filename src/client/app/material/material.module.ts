import { NgModule } from '@angular/core';
import {
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdCardModule,
  MdSnackBarModule,
  MdDialogModule,
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
