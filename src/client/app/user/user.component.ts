import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSnackBar, MdDialog } from '@angular/material';

import { ImageService } from '../core/image.service';
import { PinImage } from '../helpers/pin-image';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { showPlaceholder } from '../helpers/show-placeholder';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  images: PinImage[] = [];
  @ViewChild('masonry') private masonry: any;

  constructor(
    private imageService: ImageService,
    private snackbar: MdSnackBar,
    private dialog: MdDialog,
  ) {
  }

  ngOnInit(): void {
    this.imageService
      .getOwn()
      .subscribe((imgs) => this.images = this.images.concat(imgs));
  }

  delete(id: string): void {
    const idx = this.images.findIndex(image => image._id === id);
    const [deletedImage] = this.images.splice(idx, 1);

    this.imageService.delete(id)
      .subscribe(
        () => {
          this.snackbar.open('Image deleted', null, {
            duration: 2000,
          })
        },

        () => {
          this.images.splice(idx, 0, deletedImage);
          this.snackbar
            .open('Deletion failed', 'RETRY', { duration: 2000 })
            .onAction().subscribe(() => this.delete(id));
        },
      );
  }

  confirmDelete(id: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete image?',
        yes: 'DELETE',
        no: 'CANCEL',
      },
    })
      .afterClosed()
      .subscribe((ans: boolean) => ans && this.delete(id));
  }

  showPlaceholder(image: PinImage): void {
    showPlaceholder(image);
    this.updateLayout();
  }

  showImage(image: PinImage): void {
    image.show = true;
    this.updateLayout();
  }

  updateLayout(): void {
    setTimeout(() => this.masonry.updateLayout(), 0);
  }

  createImage(image: PinImage): void {
    image.show = true;
    this.images.unshift(image);
  }
}
