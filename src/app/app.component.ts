import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, AlertController, MenuController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationPage } from './authentication/authentication.page';
import { Tab1Page } from './billing/tab1.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  token = '';
  rootPage;
  admin = false;
  CEO = false;
  role = '';
  name = '';
  username = '';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
    this.roles();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.name = localStorage.getItem('name');
      this.username = localStorage.getItem('user');
      this.rootPage = this.token
                    ? Tab1Page
                    : AuthenticationPage;
    });
  }

  ionViewWillEnter() {
    this.roles();
  }

  roles() {
    this.role = localStorage.getItem('role');
    if ( (this.role === 'Admin') ) {
      this.admin = true;
      this.CEO = false;
    } else if ( (this.role === 'CEO') ) {
      this.admin = false;
      this.CEO = true;
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
            localStorage.removeItem('name');
            this.closeMenu();
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

  closeMenu() {
    this.menuCtrl.close();
  }
}
