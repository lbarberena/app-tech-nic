import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor( private router: Router,
               private alertCtrl: AlertController ) {}

  async logout() {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro quieres salir?',
      buttons: [
        {
          text: 'Salir',
          handler: ( data ) => {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            localStorage.removeItem('userId');
            this.router.navigateByUrl('/authentication');
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

}
