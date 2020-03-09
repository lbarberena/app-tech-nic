import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { RegisterModel } from '../helpers/models/register.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

  accounts: RegisterModel[];

  constructor( private router: Router,
               public toastController: ToastController,
               private alertCtrl: AlertController,
               private authService: AuthService ) { }

  ngOnInit() {
    this.GET();
  }

  GET() {
    this.authService.GET().subscribe( async res => {
      if ( res.success ) {
        const accountsCollection = (await res.data);
        this.accounts = accountsCollection;
      }
    });
  }

  async edit( storeId: string ) {
    // this.router.navigateByUrl(`/stores/admin-stores/${ storeId }`);
  }

  async erease( accountId: string ) {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro quieres eliminar?',
      buttons: [
        {
          text: 'Confirmar',
          handler: ( data ) => {
            this.authService.DELETE( accountId ).subscribe( async res => {
              if ( res.success ) {
                const TOAST = await this.toastController.create({
                  duration: 3,
                  message: res.msj
                });
                TOAST.present();
                this.GET();
              } else {
                const TOAST = await this.toastController.create({
                  duration: 3,
                  message: res.msj
                });
                TOAST.present();
              }
            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  newAccount() {
    this.router.navigateByUrl('/register');
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.GET();
  }

}
