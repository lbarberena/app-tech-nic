import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ItemsService } from '../services/items.service';
import { ItemsModel } from '../helpers/models/items.model';

@Component({
  selector: 'app-products-stores-modal',
  templateUrl: './products-stores-modal.page.html',
  styleUrls: ['./products-stores-modal.page.scss'],
})
export class ProductsStoresModalPage {

  items = [];
  goneItems = [];
  searchItemsInput;
  username: string;
  role: string;
  userId: string;
  name: string;
  admin = false;
  CEO = false;
  store = false;
  storeName: string;
  selected;

  constructor( public modalController: ModalController,
               private itemsService: ItemsService ) { }

  ionViewWillEnter() {
    this.selected = 'all';
    this.username = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.name = localStorage.getItem('name');
    this.storeName = localStorage.getItem('storeName');
    this.roles();
    this.GET();
  }

  roles() {
    if ( (this.role === 'Admin') || (this.role === 'CEO') ) {
      this.admin = true;
      this.CEO = true;
    } else if ( (this.role === 'Vendedor') || (this.role === 'Tienda') ) {
      this.store = true;
    }
  }

  dismiss( Data: any ) {
    this.modalController.dismiss({
      dismissed: true,
      data: Data
    });
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
    localStorage.removeItem('storeName');
  }

  async GET() {
    await this.itemsService.GET().subscribe( async res => {
      const itemsCollection: ItemsModel[] = (await res.data);

      itemsCollection.forEach( e => {
        if ( e.store === this.storeName ) {
          if ( e.quantity > 0 ) {
            this.items.push(e);
          }
        }
      });

      itemsCollection.forEach( e => {
        if ( e.store === this.storeName ) {
          if ( e.quantity === 0 ) {
            this.goneItems.push(e);
          }
        }
      });
    });
  }

}
