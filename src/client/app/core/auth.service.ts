import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';

import { retry } from '../helpers/retry';
import { User } from '../helpers/user';

@Injectable()
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  private userStream: Observable<User>;

  constructor(private http: Http) {
    this.userSubject = new BehaviorSubject(null);
    this.userStream = this.userSubject.asObservable();
  }

  logout(): void {
    this.http
      .get('/auth/logout')
      .retryWhen(retry())
      .subscribe(
        () => this.userSubject.next(null),
        () => this.userSubject.next(null),
      );
  }

  getUser(refresh = false): Observable<User> {
    if (refresh) {
      this.http
        .get('/auth/me')
        .map((res) => res.json().user as User)
        .retryWhen(retry())
        .subscribe(
          (user) => this.userSubject.next(user),
          () => this.userSubject.next(null),
        );
    }

    return this.userStream;
  }
}
