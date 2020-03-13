import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform, AlertController, MenuController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

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
    public menuCtrl: MenuController,
    private oneSignal: OneSignal
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.roles();

      if (this.platform.is('cordova')) {
        this.setPush();
      }
    });
  }

  roles() {
    this.name = localStorage.getItem('name');
    this.username = localStorage.getItem('user');
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
          text: 'Cancelar',
          role: 'cancel'
        },
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
        }
      ]
    });
    alert.present();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  setPush() {
    this.oneSignal.startInit('30538eaa-216c-4e7a-9cf4-2dbd597cf92b', '675719053325');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

    this.oneSignal.handleNotificationOpened().subscribe( res => {
      let additionalData = res.notification.payload.additionalData;
      let msg = res.notification.payload.body;
      let title = res.notification.payload.title;
      this.showAlert(title, msg, additionalData.task);
    });

    this.oneSignal.handleNotificationReceived().subscribe( res => {
      let msg = res.payload.body;
      let title = res.payload.title;
      let additionalData = res.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, data) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `${ data }`,
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }
}
