import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { StorageService } from './core/storage.service';

let fixture: ComponentFixture<AppComponent>;
let page: Page;
let component: AppComponent;

class Page {
  fab: DebugElement;
  host: DebugElement;
  getSpy: jasmine.Spy;
  setSpy: jasmine.Spy;

  constructor() {
    this.getSpy = spyOn(TestBed.get(StorageService), 'getItem');
    this.setSpy = spyOn(TestBed.get(StorageService), 'setItem');
  }

  createElements(): void {
    this.fab = fixture.debugElement.query(By.css('[md-fab]'));
    this.host = fixture.debugElement;
  }
}

function createComponent(): Promise<any> {
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [AppComponent],
        providers: [StorageService],
        schemas: [NO_ERRORS_SCHEMA],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should get "dark" from storage on init', () => {
    expect(page.getSpy).toHaveBeenCalledWith('dark');
  });

  it('should toggle dark upon clicking fab', () => {
    const dark = component.dark;
    page.fab.nativeElement.click();
    fixture.detectChanges();
    expect(page.setSpy).toHaveBeenCalledWith('dark', !dark);
    expect(component.dark).toBe(!dark);
  });

  it('should toggle dark-theme class on host element', () => {
    const dark = component.dark;
    expect(page.host.nativeElement.classList.contains('dark-theme'))
      .toBe(dark);
    page.fab.nativeElement.click();
    fixture.detectChanges();
    expect(page.host.nativeElement.classList.contains('dark-theme'))
      .toBe(!dark);
  });
});
