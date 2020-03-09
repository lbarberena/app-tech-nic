import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';

import { AuthenticationPage } from './authentication.page';
import { PasswordPage } from './password.page';
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
  },
  {
    path: 'password',
    component: PasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationPageRoutingModule {}
