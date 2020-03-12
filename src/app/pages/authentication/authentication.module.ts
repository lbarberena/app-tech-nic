import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticationPageRoutingModule } from './authentication-routing.module';
import { AuthenticationPage } from './authentication.page';
import { PasswordPage } from './password.page';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AuthenticationPageRoutingModule
  ],
  declarations: [AuthenticationPage, RegisterPage, PasswordPage]
})
export class AuthenticationPageModule {}
