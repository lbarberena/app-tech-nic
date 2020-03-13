import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ToastController } from '@ionic/angular';

import { ItemsService } from '../../../services/items.service';
import { ItemsModel } from '../../../helpers/models/items.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  items = [];
  itemsStore = [];
  username: string;
  role: string;
  userId: string;
  name: string;
  admin = false;
  CEO = false;
  store = false;
  searchItemsInput;
  selected;
  goneItems = [];
  goneItemsStore = [];

  constructor( private router: Router,
               private itemsService: ItemsService,
               private alertCtrl: AlertController,
               public toastController: ToastController ) { }

  ionViewWillEnter() {
    this.selected = 'all';
    this.username = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.name = localStorage.getItem('name');
    this.items = [];
    this.itemsStore = [];
    this.goneItems = [];
    this.goneItemsStore = [];
    this.roles();
    this.GET();
  }

  roles() {
    if ( (this.role === 'Admin') || (this.role === 'CEO') ) {
      this.admin = true;
      this.CEO = true;
    } else if ( (this.role === 'Vendedor') || (this.role === 'Tienda') ) {
      this.store = true;
      this.admin = false;
      this.CEO = false;
    }
  }

  async GET() {
    await this.itemsService.GET().subscribe( async res => {
      const itemsCollection: ItemsModel[] = (await res.data);

      itemsCollection.forEach( e => {
        if ( e.quantity > 0 ) {
          this.items.push(e);
        }
      });

      itemsCollection.forEach( e => {
        if ( e.store === this.name ) {
          if ( e.quantity > 0 ) {
            this.itemsStore.push(e);
          }
        }
      });

      itemsCollection.forEach( e => {
        if ( e.quantity === 0 ) {
          this.goneItems.push(e);
        }
      });

      itemsCollection.forEach( e => {
        if ( e.quantity === 0 ) {
          if ( e.store === this.name ) {
            this.goneItemsStore.push(e);
          }
        }
      });
    });
  }

  newProduct() {
    this.router.navigateByUrl('/admin-items');
  }

  newCategory() {
    this.router.navigateByUrl('/categories');
  }

  listCategories() {
    this.router.navigateByUrl('/categories/list-categories');
  }

  async edit( itemId: string ) {
    this.router.navigateByUrl(`/admin-items/${ itemId }`);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.items = [];
    this.itemsStore = [];
    this.goneItems = [];
    this.goneItemsStore = [];
    this.GET();
  }

  async erease( id ) {
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
            this.itemsService.DELETE( id ).subscribe( async res => {
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
}

