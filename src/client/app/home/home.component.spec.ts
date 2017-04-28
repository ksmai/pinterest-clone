import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core/auth.service';
import { CoreModule } from '../core/core.module';
import { ImageService } from '../core/image.service';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeModule } from './home.module';

let fixture: ComponentFixture<HomeComponent>;
let component: HomeComponent;
let page: Page;

class Page {
  authSpy: jasmine.Spy;
  listSpy: jasmine.Spy;

  constructor() {
    this.authSpy = spyOn(TestBed.get(AuthService), 'getUser')
      .and.returnValue(Observable.of(null));

    this.listSpy = spyOn(TestBed.get(ImageService), 'list')
      .and.returnValue(Observable.of([]));
  }

  createElements(): void {
    return;
  }
}

function createComponent() {
  fixture = TestBed.createComponent(HomeComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [CoreModule, SharedModule, HomeModule],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should fetch first 10 images on load', () => {
    expect(page.listSpy).toHaveBeenCalledWith(0, 10);
  });

  it('should fetch current user on load', () => {
    expect(page.authSpy).toHaveBeenCalledWith(true);
  });
});
