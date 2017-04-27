import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
 } from '@angular/forms';
import { MdSnackBar } from '@angular/material';

import { StorageService } from '../../core/storage.service';
import { ImageService } from '../../core/image.service';
import { PinImage } from '../../helpers/pin-image';
import { imageURLValidator } from '../../helpers/image-url-validator';
const placeholder = require('../../../../../assets/placeholder.png');

@Component({
  selector: 'pin-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.scss'],
})
export class PostImageComponent {
  form: FormGroup;
  placeholder: string;
  submitted = false;

  @Output() imageCreated = new EventEmitter<PinImage>();

  constructor(
    private imageService: ImageService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private snackbar: MdSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.placeholder = placeholder;
    this.createForm();
  }

  ngOnDestroy(): void {
    this.storageService.setItem('unsavedForm', this.form.value);
  }

  resetForm(): void {
    this.form.reset();
  }

  submitForm(): void {
    if (this.submitted) {
      return;
    }

    this.submitted = true;
    const { url, description } = this.form.value;
    this.imageService
      .upload(url, description)
      .subscribe(
        (image) => this.submitSuccess(image),
        (err) => this.submitFailure(err),
        () => this.submitted = false,
      );
  }

  private submitSuccess(image: PinImage) {
    this.imageCreated.emit(image);
    this.resetForm();
  }

  private submitFailure(err: any) {
    this.snackbar.open('Image upload failed', 'Retry', {
      duration: 2000,
    })
      .onAction()
      .subscribe(() => this.submitForm());
  }

  private createForm(): void {
    const initialState = this.storageService.getItem('unsavedForm');
    const url = initialState && initialState.url || '';
    const description = initialState && initialState.description || '';

    this.form = this.fb.group({
      url: [url, Validators.required, imageURLValidator],
      description: [description, Validators.maxLength(128)],
    });
  }
}
