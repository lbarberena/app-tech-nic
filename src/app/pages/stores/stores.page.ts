import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController, AlertController, ModalController } from '@ionic/angular';

import { StoresService } from '../../services/stores.service';
import { StoresModel } from '../../helpers/models/stores.model';
import { ProductsStoresModalPage } from '../../modals/products-stores-modal/products-stores-modal.page';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage {

  stores: StoresModel[];
  searchInput;
  loading = false;

  constructor( private storesService: StoresService,
               private router: Router,
               public toastController: ToastController,
               private alertCtrl: AlertController,
               public modalController: ModalController ) { }

  ionViewWillEnter() {
    this.loading = true;
    this.GET();
  }

  GET() {
    this.storesService.GET().subscribe( async res => {
      if ( res.success ) {
        const categoriesCollection = (await res.data);
        this.stores = categoriesCollection;
        this.loading = false;
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
          text: 'Cancelar',
          role: 'cancel'
        },
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
    this.stores = [];
    this.GET();
  }

  async presentModal( name: string ) {
    localStorage.setItem('storeName', name);
    const modal = await this.modalController.create({
      component: ProductsStoresModalPage
    });

    return await modal.present();
  }

}
