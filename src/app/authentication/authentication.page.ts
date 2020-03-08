import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html'
})
export class AuthenticationPage implements OnInit {
  authForm: FormGroup;
  passwordForm: FormGroup;
  confirmPassword;

  constructor( private authService: AuthService,
               private router: Router,
               private formBuilder: FormBuilder,
               public toastController: ToastController ) { }

  ngOnInit() {
    this.validation();

    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      password: ['', Validators.required]
    });
  }

  async login() {
    await this.authService.login(this.authForm.value).subscribe(async res => {
      if ( res.success ) {
        localStorage.setItem('auth-token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('user', res.data.username);
        localStorage.setItem('userId', res.data.userId);
        const TOAST = await this.toastController.create({
          duration: 3,
          message: res.msj
        });
        TOAST.present();
        this.router.navigateByUrl('/tabs/billing');
      } else if (res.success === false) {
        this.ereaseToken(res.msj);
        const TOAST = await this.toastController.create({
          duration: 3,
          message: res.msj
        });
        TOAST.present();
      }

    }, error => {
      this.ereaseToken(error.msj);
    }
    );
  }

  async ereaseToken(msj: string) {
    const TOAST = await this.toastController.create({
      duration: 3,
      message: msj
    });
    TOAST.present();
    localStorage.removeItem('auth-token');
  }

  validation() {
    const token = localStorage.getItem('auth-token');

    if ( token ) {
      this.router.navigateByUrl('/tabs/billing');
    }
  }

  async changePassword() {
    const form = this.passwordForm.value;
    if ( !this.confirmPassword ) {
      const TOAST = await this.toastController.create({
        duration: 3,
        message: 'Debes confirmar la contraseña'
      });
      TOAST.present();
    } else if ( this.confirmPassword === this.passwordForm.value.password ) {
      this.authService.password( form ).subscribe( async res => {
        if ( res.success ) {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
        } else {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
        }
      });
    } else {
      const TOAST = await this.toastController.create({
        duration: 3,
        message: 'Las contraseñas no coinciden'
      });
      TOAST.present();
    }

  }

}
