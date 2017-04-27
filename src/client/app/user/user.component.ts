import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { ImageService } from '../core/image.service';
import { PinImage } from '../helpers/pin-image';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  images: PinImage[] = [];

  constructor(
    private imageService: ImageService,
    private snackbar: MdSnackBar,
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
            .open('Deletion failed', 'Retry', { duration: 2000 })
            .onAction().subscribe(() => this.delete(id));
        },
      );
  }

  confirmDelete(id: string): void {
    return this.delete(id);
  }
}
