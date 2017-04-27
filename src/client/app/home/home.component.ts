import { Component, OnInit } from '@angular/core';

import { ImageService } from '../core/image.service';
import { PinImage } from '../helpers/pin-image';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  images: PinImage[];

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.images = [];
    this.imageService
      .list(0, 10)
      .subscribe(images => this.addImages(images));
  }

  loadMore(): void {
    const len = this.images.length;
    this.imageService
      .list(len, len + 10)
      .subscribe(images => this.addImages(images));
  }

  private addImages(images: PinImage[]): void {
    const existingIDs = this.images.map(image => image._id);
    const newImages = images.filter(
      image => existingIDs.indexOf(image._id) === -1
    );
    this.images = this.images.concat(newImages);
  }
}
