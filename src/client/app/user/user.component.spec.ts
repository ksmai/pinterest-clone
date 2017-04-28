import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { UserModule } from './user.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user.component';
import { ImageService } from '../core/image.service';

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
