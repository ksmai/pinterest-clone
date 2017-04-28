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
import {
  imageURLValidator,
  httpURLValidator,
} from '../../helpers/image-url-validator';
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
  @Output() imageLoaded = new EventEmitter();

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

  clearStorage(): void {
    this.storageService.setItem('unsavedForm', null);
  }

  resetForm(): void {
    this.clearStorage();
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
      );
  }

  onLoad() {
    this.imageLoaded.emit();
  }

  isHTTP(url: string) {
    return url && url.match(/^https?:\/\//);
  }

  private submitSuccess(image: PinImage) {
    this.imageCreated.emit(image);
    this.submitted = false;
    this.resetForm();
  }

  private submitFailure(err: any) {
    this.submitted = false;
    this.snackbar
      .open('Unable to upload image', 'RETRY', { duration: 2000 })
      .onAction()
      .subscribe(() => setTimeout(() => this.submitForm(), 1000));
  }

  private createForm(): void {
    const initialState = this.storageService.getItem('unsavedForm');
    const url = initialState && initialState.url || '';
    const description = initialState && initialState.description || '';

    this.form = this.fb.group({
      url: [url, httpURLValidator, imageURLValidator],
      description: [description, Validators.maxLength(128)],
    });
  }
}
