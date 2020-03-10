import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastController } from '@ionic/angular';

import { AuthService } from '../services/auth.service';
import { StoresService } from '../services/stores.service';
import { StoresModel } from '../helpers/models/stores.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html'
})
export class RegisterPage implements OnInit {
    registerForm: FormGroup;
    newStore: FormGroup;
  confirmPassword;
  ID: string;
  title = '';
  id = false;
  btnText = '';
  changePassword = true;
  stores: StoresModel[];

  constructor( private authService: AuthService,
               private router: Router,
               private formBuilder: FormBuilder,
               public toastController: ToastController,
               private route: ActivatedRoute,
               private storesService: StoresService ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      role: ['', Validators.required],
      store: ['']
    });
    this.newStore = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: [''],
      address: ['']
    });
  }

  ionViewWillEnter() {
    this.ID = this.route.snapshot.paramMap.get('id');
    if ( this.ID ) {
      this.title = 'Editar Cuenta';
      this.btnText = 'Actualizar Cuenta';
      this.id = true;
      this.GetById( this.ID );
      this.GetStores();
    } else {
      this.title = 'Nueva Cuenta';
      this.btnText = 'Guardar Cuenta';
      this.id = false;
      this.GetStores();
    }
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
        if ( this.registerForm.value.role !== 'Tienda' ) {
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
        } else if ( (this.registerForm.value.role === 'Tienda') && (!this.registerForm.value.store) ) {
          const storeForm = this.newStore.value;
          this.storesService.POST( storeForm ).subscribe( async res => {
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
          this.registerForm.patchValue({
            store: this.newStore.value.name
          });
          const registerData = this.registerForm.value;
          this.authService.register( registerData ).subscribe( async r => {
            if ( r.success ) {
                const TOAST = await this.toastController.create({
                    duration: 3,
                    message: r.msj
                  });
                TOAST.present();
                this.router.navigateByUrl('/accounts');
            } else {
                const TOAST = await this.toastController.create({
                    duration: 3,
                    message: r.msj
                  });
                TOAST.present();
            }
          });
        } else if ( (this.registerForm.value.role === 'Tienda') && (this.registerForm.value.store) ) {
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
        }
      } else if ( this.ID ) {
        if ( !this.confirmPassword && !this.changePassword ) {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: 'Debes confirmar la contraseña'
          });
          TOAST.present();
        } else if ( (this.confirmPassword === this.registerForm.value.password) && !this.changePassword ) {
          const data = {
            username: this.registerForm.value.username,
            name: this.registerForm.value.name,
            role: this.registerForm.value.role,
            email: this.registerForm.value.email
          };
          this.authService.PUT(this.ID, data ).subscribe( async res => {
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
          const passwordData = {
            username: this.registerForm.value.username,
            password: this.registerForm.value.password
          };
          this.authService.password( passwordData ).subscribe( async res => {
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
        } else if ((this.confirmPassword !== this.registerForm.value.password) && !this.changePassword) {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: 'Las contraseñas no coinciden'
          });
          TOAST.present();
        } else if ( this.id && this.ID && this.changePassword ) {
          const data = {
            username: this.registerForm.value.username,
            name: this.registerForm.value.name,
            role: this.registerForm.value.role,
            email: this.registerForm.value.email
          };
          this.authService.PUT(this.ID, data ).subscribe( async res => {
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
        }
      }
  }

  btnChangePassword() {
    this.changePassword = false;
  }

  GetStores() {
    this.storesService.GET().subscribe( async res => {
      if ( res.success ) {
        const categoriesCollection = (await res.data);
        this.stores = categoriesCollection;
      }
    });
  }

}
