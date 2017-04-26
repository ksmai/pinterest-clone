import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooterComponent } from './footer.component';
import { SharedModule } from '../shared/shared.module';

let fixture: ComponentFixture<FooterComponent>;
let component: FooterComponent;
let page: Page;

class Page {
  link: DebugElement;

  createElements() {
    this.link = fixture.debugElement.query(By.css('.copyright'));
  }
}

function createComponent(): Promise<any> {
  fixture = TestBed.createComponent(FooterComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('FooterComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [SharedModule],
        declarations: [FooterComponent],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should show a link to github repo', () => {
    expect(page.link.nativeElement.href).toEqual(component.link);
    expect(page.link.nativeElement.textContent).toContain(component.author);
    expect(page.link.nativeElement.textContent).toContain(component.year);
  });
});
