import { ReflectiveInjector } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestOptions,
  Response,
  ResponseOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let injector: ReflectiveInjector;
  let backend: MockBackend;
  let lastConnection: any;
  let spy: jasmine.Spy;

  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      AuthService,
    ]);

    authService = injector.get(AuthService);
    backend = injector.get(ConnectionBackend) as MockBackend;
    backend.connections.subscribe((conn: any) => lastConnection = conn);
    spy = jasmine.createSpy('subscribeSpy').and.returnValue(0);
    lastConnection = undefined;
  });

  it('should return current user without refreshing', () => {
    authService.getUser().subscribe(spy);
    expect(lastConnection).not.toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return current user with refreshing', fakeAsync(() => {
    authService.getUser(true).subscribe(spy);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.calls.reset();

    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toMatch(/me/);
    lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 200,
      statusText: 'OK',
      body: JSON.stringify({ name: 'n', twitterID: 'abc', picture: 'p' }),
    })));
    tick();

    expect(spy).toHaveBeenCalledTimes(1);
  }));

  it('should logout', () => {
    authService.logout();
    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toMatch(/logout/);
  });
});
