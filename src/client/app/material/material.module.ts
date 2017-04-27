import { NgModule } from '@angular/core';
import {
  MdProgressSpinnerModule,
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
