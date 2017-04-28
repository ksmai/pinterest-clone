import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { CoreModule } from '../core/core.module';
import { ImageService } from '../core/image.service';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user.component';
import { UserModule } from './user.module';

let fixture: ComponentFixture<UserComponent>;
let component: UserComponent;
let page: Page;

class Page {
  getSpy: jasmine.Spy;

  constructor() {
    this.getSpy = spyOn(TestBed.get(ImageService), 'getOwn')
      .and.returnValue(Observable.of([]));
  }

  createElements() {
    return;
  }
}

function createComponent() {
  fixture = TestBed.createComponent(UserComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('UserComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          CoreModule,
          SharedModule,
          UserModule,
          NoopAnimationsModule,
        ],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should fetch image of user on load', () => {
    expect(page.getSpy).toHaveBeenCalled();
  });
});
