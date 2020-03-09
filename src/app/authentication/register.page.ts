import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html'
})
export class RegisterPage implements OnInit {
    registerForm: FormGroup;
  confirmPassword;
  ID: string;
  title = '';
  id = false;
  btnText = '';

  constructor( private authService: AuthService,
               private router: Router,
               private formBuilder: FormBuilder,
               public toastController: ToastController,
               private route: ActivatedRoute ) { }

  ngOnInit() {
    this.ID = this.route.snapshot.paramMap.get('id');
    if ( this.ID ) {
      this.title = 'Editar Cuenta';
      this.btnText = 'Actualizar Cuenta';
      this.id = true;
      this.GetById( this.ID );
    } else {
      this.title = 'Nueva Cuenta';
      this.btnText = 'Guardar Cuenta';
      this.id = false;
    }
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  GetById( id: string ) {
    this.authService.GetById( id ).subscribe( async res => {
      this.registerForm.patchValue({
        name: res.data.name,
        email: res.data.email,
        password: res.data.password,
        username: res.data.username,
        role: res.data.role,
      });
    });
  }

  async register() {
      const form = this.registerForm.value;
      if ( !this.ID ) {
        this.authService.register( form ).subscribe( async res => {
          if ( res.success ) {
              const TOAST = await this.toastController.create({
                  duration: 3,
                  message: res.msj
                });
              TOAST.present();
              this.router.navigateByUrl('/accounts');
          } else {
              const TOAST = await this.toastController.create({
                  duration: 3,
                  message: res.msj
                });
              TOAST.present();
          }
        });
      } else if ( this.ID ) {
        if ( !this.confirmPassword ) {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: 'Debes confirmar la contraseña'
          });
          TOAST.present();
        } else if ( this.confirmPassword === this.registerForm.value.password ) {
          this.authService.PUT(this.ID, form ).subscribe( async res => {
            if ( res.success ) {
                const TOAST = await this.toastController.create({
                    duration: 3,
                    message: res.msj
                  });
                TOAST.present();
                this.router.navigateByUrl('/accounts');
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

}
