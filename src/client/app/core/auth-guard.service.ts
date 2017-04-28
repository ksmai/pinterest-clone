import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.authService
      .checkUser()
      .map((user) => true)
      .catch(() => {
        this.router.navigate(['/']);

        return Observable.of(false);
      });
  }
}
