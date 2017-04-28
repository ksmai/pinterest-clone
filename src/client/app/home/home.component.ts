import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../core/auth.service';
import { ImageService } from '../core/image.service';
import { PinImage } from '../helpers/pin-image';
import { showPlaceholder } from '../helpers/show-placeholder';
import { User } from '../helpers/user';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  images: PinImage[];
  user: User;
  noMore = false;
  @ViewChild('masonry') private masonry: any;

  constructor(
    private imageService: ImageService,
    private authService: AuthService,
    private snackbar: MdSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.images = [];
    this.imageService
      .list(0, 10)
      .subscribe((images) => this.addImages(images));

    this.authService
      .getUser(true)
      .subscribe((user) => this.user = user);
  }

  loadMore(): void {
    if (this.noMore) {
      return;
    }

    const len = this.images.length;
    this.imageService
      .list(len, len + 10)
      .subscribe((images) => {
        if (images.length > 0) {
          this.addImages(images);
        } else {
          this.noMore = true;
        }
      });
  }

  like(image: PinImage): void {
    image.likers.push(this.user);

    this.imageService
      .like(image._id)
      .subscribe(
        () => {
          this.snackbar.open('Image liked', null, {
            duration: 2000,
          });
        },

        () => {
          image.likers.pop();
          this.snackbar
            .open('Unable to like image', 'RETRY', { duration: 2000 })
            .onAction()
            .subscribe(() => setTimeout(() => this.like(image), 1000));
        },
      );
  }

  canVote(image: PinImage): boolean {
    if (!this.user) {
      return false;
    }

    return image.likers
      .map((liker) => liker._id)
      .indexOf(this.user._id) === -1;
  }

  showPlaceholder(image: PinImage): void {
    showPlaceholder(image);
    this.masonry.updateLayout();
  }

  private addImages(images: PinImage[]): void {
    const existingIDs = this.images.map((image) => image._id);
    const newImages = images
      .filter((image) => existingIDs.indexOf(image._id) === -1);
    this.images = this.images.concat(newImages);
  }
}
