import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { CoreModule } from './core.module';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

@Component({
  template: '',
  styles: [''],
})
class DummyComponent {
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;
  let authSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        CoreModule,
        RouterTestingModule.withRoutes([
          { path: '', component: DummyComponent, pathMatch: 'full' },
        ]),
      ],
      declarations: [DummyComponent],
    });

    authGuard = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    authSpy = spyOn(authService, 'checkUser');
    navigateSpy = spyOn(router, 'navigate');
  });

  it('should allow activation if user is logged in', (done) => {
    authSpy.and.returnValue(Observable.of('user'));

    authGuard.canActivate().subscribe((canActivate: boolean) => {
      expect(authSpy).toHaveBeenCalled();
      expect(navigateSpy).not.toHaveBeenCalled();
      expect(canActivate).toBe(true);
      done();
    });
  });

  it('should disallow activation and navigate if not logged in', (done) => {
    authSpy.and.returnValue(Observable.throw('error'));

    authGuard.canActivate().subscribe((canActivate: boolean) => {
      expect(authSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
      expect(canActivate).toBe(false);
      done();
    });
  });
});
