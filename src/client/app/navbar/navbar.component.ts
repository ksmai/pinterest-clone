import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../core/auth.service';
import { User } from '../helpers/user';

@Component({
  selector: 'pin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private snackbar: MdSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.authService
      .getUser(true)
      .subscribe((user) => {
        const newLogin = user &&
          (!this.user || user.name !== this.user.name);
        if (newLogin) {
          this.snackbar.open(`Welcome, ${user.name}`, null, {
            duration: 2000,
          });
        }
        this.user = user;
      });
  }

  logout(): void {
    this.authService.logout();
    this.snackbar.open('Bye!', null, { duration: 2000 });
  }
}
