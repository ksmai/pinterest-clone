import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdSnackBarModule,
  MdToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [
    MdProgressSpinnerModule,
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
    MdProgressSpinnerModule,
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
