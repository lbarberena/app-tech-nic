import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController, AlertController } from '@ionic/angular';

import { StoresService } from '../services/stores.service';
import { StoresModel } from '../helpers/models/stores.model';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {

  stores: StoresModel[];
  role = '';

  constructor( private storesService: StoresService,
               private router: Router,
               public toastController: ToastController,
               private alertCtrl: AlertController ) { }

  ngOnInit() {
    this.GET();
  }

  GET() {
    this.storesService.GET().subscribe( async res => {
      if ( res.success ) {
        const categoriesCollection = (await res.data);
        this.stores = categoriesCollection;
      }
    });
  }

  async edit( storeId: string ) {
    this.router.navigateByUrl(`/stores/admin-stores/${ storeId }`);
  }

  async erease( storeId: string ) {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro quieres eliminar?',
      buttons: [
        {
          text: 'Confirmar',
          handler: ( data ) => {
            this.storesService.DELETE( storeId ).subscribe( async res => {
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

  newStore() {
    this.router.navigateByUrl('/stores/admin-stores');
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.GET();
  }

}
