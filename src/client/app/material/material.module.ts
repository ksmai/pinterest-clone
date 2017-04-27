import { NgModule } from '@angular/core';
import {
  MdListModule,
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
    MdListModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdCardModule,
    MdSnackBarModule,
    MdDialogModule,
  ],

  exports: [
    MdListModule,
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
