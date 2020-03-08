import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';

import { AuthenticationPage } from './authentication.page';
import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationPage
  },
  {
    path: 'register',
    canActivate: [AuthGuardService],
    component: RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationPageRoutingModule {}
