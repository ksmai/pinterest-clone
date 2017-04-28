import { DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { CoreModule } from '../../core/core.module';
import { ImageService } from '../../core/image.service';
import { StorageService } from '../../core/storage.service';
import * as validators from '../../helpers/image-url-validator';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user.module';
import { PostImageComponent } from './post-image.component';

let fixture: ComponentFixture<PostImageComponent>;
let component: PostImageComponent;
let page: Page;

class Page {
  urlInput: DebugElement;
  descriptionInput: DebugElement;
  submitButton: DebugElement;
  resetButton: DebugElement;

  validateSpy: jasmine.Spy;
  createSpy: jasmine.Spy;
  getItemSpy: jasmine.Spy;
  setItemSpy: jasmine.Spy;

  constructor() {
    this.validateSpy = spyOn(validators, 'imageURLValidator')
      .and.returnValue(Observable.of(null));
    this.createSpy = spyOn(TestBed.get(ImageService), 'upload')
      .and.returnValue(Observable.of({
        url: 'hello',
        _id: 'abc',
        owners: {},
        likers: [],
      }));

    this.setItemSpy = spyOn(TestBed.get(StorageService), 'setItem');
    this.getItemSpy = spyOn(TestBed.get(StorageService), 'getItem')
      .and.returnValue(undefined);

  }

  createElements(): void {
    this.urlInput = fixture.debugElement.query(By.css('[type="url"]'));
    this.descriptionInput = fixture.debugElement.query(By.css('textarea'));
    this.submitButton = fixture.debugElement
      .query(By.css('[type="submit"]'));
    this.resetButton = fixture.debugElement
      .query(By.css('[type="button"]'));
  }

  input(url = '', desc = '') {
    this.urlInput.nativeElement.value = url;
    this.urlInput.triggerEventHandler('input', {
      target: this.urlInput.nativeElement,
    });

    this.descriptionInput.nativeElement.value = desc;
    this.descriptionInput.triggerEventHandler('input', {
      target: this.descriptionInput.nativeElement,
    });

    fixture.detectChanges();
  }

  submit() {
    this.submitButton.nativeElement.click();
    fixture.detectChanges();
  }

  reset() {
    this.resetButton.nativeElement.click();
    fixture.detectChanges();
  }
}

function createComponent() {
  fixture = TestBed.createComponent(PostImageComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('PostImageComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          SharedModule,
          CoreModule,
          UserModule,
          NoopAnimationsModule,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should validate url', fakeAsync(() => {
    expect(page.submitButton.nativeElement.disabled).toBe(true);
    page.input('https://some/invalid/url/that/bypass/validation/lol');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(page.validateSpy).toHaveBeenCalled();
    expect(page.submitButton.nativeElement.disabled).toBe(false);
  }));

  it('should submit new image to server', fakeAsync(() => {
    const url = 'https://some/invalid/url/that/bypass/validation/lol';
    page.input(url);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    page.submit();
    expect(page.createSpy).toHaveBeenCalled();
  }));

  it('should reset form', fakeAsync(() => {
    page.input('123', '456');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(page.urlInput.nativeElement.value).toBeTruthy();
    expect(page.descriptionInput.nativeElement.value).toBeTruthy();
    page.reset();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(page.urlInput.nativeElement.value).toBeFalsy();
    expect(page.descriptionInput.nativeElement.value).toBeFalsy();
  }));

  it('should fetch any unsaved data from storage on load', () => {
    expect(page.getItemSpy).toHaveBeenCalled();
  });

  it('should save any unsaved data to storage on destroy', () => {
    fixture.destroy();
    expect(page.setItemSpy).toHaveBeenCalled();
  });
});
