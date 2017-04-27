import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  title: string;
  content: string;
  yes: string;
  no: string;

  constructor(
    public dialogRef: MdDialogRef<DialogComponent>,
    @Inject(MD_DIALOG_DATA) private data: any,
  ) {
    this.title = data.title || 'Are you sure?';
    this.content = data.content || '';
    this.yes = data.yes || 'Yes';
    this.no = data.no || 'No';
  }
}
