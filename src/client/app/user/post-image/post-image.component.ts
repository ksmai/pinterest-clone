import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { StorageService } from '../../core/storage.service';
import { ImageService } from '../../core/image.service';
import { PinImage } from '../../helpers/pin-image';

@Component({
  selector: 'pin-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.scss'],
})
export class PostImageComponent {
  form: FormGroup;
  private initialState: any;

  constructor(
    private imageService: ImageService,
    private storageService: StorageService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initialState = this.storageService.getItem('unsavedForm');
    this.createForm();
  }

  ngOnDestroy(): void {
    this.storageService.setItem('unsavedForm', this.form.value);
  }

  resetForm(): void {
    if (this.initialState) {
      this.form.reset(this.initialState);
    } else {
      this.form.reset();
    }
  }

  submitForm(): void {
    const { url, description } = this.form.value;
    this.imageService
      .upload(url, description)
      .subscribe(
        (image) => this.submitSuccess(image),
        (err) => this.submitFailure(err),
      );
  }

  private submitSuccess(image: PinImage) {
    console.log(image);
  }

  private submitFailure(err: any) {
    console.log(err);
  }

  private createForm(): void {
    this.form = this.fb.group({
      url: '',
      description: '',
    });
    this.resetForm();
  }
}
