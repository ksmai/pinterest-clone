import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuard } from '../core/auth-guard.service';

const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],

  exports: [
    RouterModule,
  ],
})
export class UserRoutingModule {
}
