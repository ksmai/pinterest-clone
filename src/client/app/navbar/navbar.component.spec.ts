import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdSnackBar } from '@angular/material';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core/auth.service';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar.component';

let fixture: ComponentFixture<NavbarComponent>;
let component: NavbarComponent;
let page: Page;

class Page {
  getUserSpy: jasmine.Spy;
  snackbarSpy: jasmine.Spy;
  logoutSpy: jasmine.Spy;

  logo: DebugElement;
  login: DebugElement;
  logout: DebugElement;
  user: DebugElement;

  constructor() {
    const authService = TestBed.get(AuthService);
    this.snackbarSpy = spyOn(TestBed.get(MdSnackBar), 'open');
    this.logoutSpy = spyOn(authService, 'logout');
    this.getUserSpy = spyOn(authService, 'getUser')
      .and
      .returnValue((authService as any).userStream);
  }

  createElements(): void {
    this.logo = fixture.debugElement.query(By.css('.logo'));
    this.login = fixture.debugElement.query(By.css('.login'));
    this.logout = fixture.debugElement.query(By.css('.logout'));
    this.user = fixture.debugElement.query(By.css('.user'));
  }

  fakeLogin(): void {
    const fakeUser = {
      name: 'fake',
      _id: 'fake',
      twitterID: 'fake',
      picture: 'fake',
    };
    (TestBed.get(AuthService) as any).userSubject.next(fakeUser);
    fixture.detectChanges();
    this.createElements();
  }

  fakeLogout(): void {
    if (this.logout) {
      this.logout.nativeElement.click();
      fixture.detectChanges();
      this.createElements();
    }
  }
}

function createComponent(): Promise<any> {
  fixture = TestBed.createComponent(NavbarComponent);
  component = fixture.componentInstance;
  page = new Page();
  fixture.detectChanges();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.createElements();
  });
}

describe('NavbarComponent', () => {
  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [SharedModule],
        declarations: [NavbarComponent],
        providers: [AuthService],
      })
      .compileComponents()
      .then(() => createComponent());
  }));

  it('should load current user on init', () => {
    expect(page.getUserSpy).toHaveBeenCalledWith(true);
  });

  it('should show logo and login button', () => {
    expect(page.logo).toBeDefined();
    expect(page.login).toBeDefined();
    expect(page.user).toBeFalsy();
    expect(page.logout).toBeFalsy();
  });

  it('should show logo/user/logout btn when login', () => {
    page.fakeLogin();
    expect(page.logo).toBeDefined();
    expect(page.login).toBeFalsy();
    expect(page.user).toBeDefined();
    expect(page.logout).toBeDefined();
  });

  it('should use authService to logout', () => {
    page.fakeLogin();
    page.fakeLogout();
    expect(page.logoutSpy).toHaveBeenCalled();
    expect(page.snackbarSpy).toHaveBeenCalled();
  });
});
