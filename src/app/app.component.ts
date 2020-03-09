import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationPage } from './authentication/authentication.page';
import { Tab1Page } from './billing/tab1.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  token = '';
  rootPage;
  admin = false;
  role = '';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
    this.roles();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.token = localStorage.getItem('auth-token');
      this.rootPage = this.token
                    ? Tab1Page
                    : AuthenticationPage;
    });
  }

  roles() {
    this.role = localStorage.getItem('role');
    if ( (this.role === 'admin') || (this.role === 'CEO') ) {
      this.admin = true;
    }
  }

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
