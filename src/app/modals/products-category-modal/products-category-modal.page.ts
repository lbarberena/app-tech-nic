import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ItemsService } from '../../services/items.service';
import { ItemsModel } from '../../helpers/models/items.model';

@Component({
  selector: 'app-products-category-modal',
  templateUrl: './products-category-modal.page.html',
  styleUrls: ['./products-category-modal.page.scss'],
})
export class ProductsCategoryModalPage {

  items = [];
  searchItemsInput;
  itemsStore = [];
  username: string;
  role: string;
  userId: string;
  name: string;
  admin = false;
  CEO = false;
  store = false;
  categoryName: string;
  selected;
  goneItems = [];
  goneItemsStore = [];

  constructor( public modalController: ModalController,
               private itemsService: ItemsService) { }

  ionViewWillEnter() {
    this.username = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.name = localStorage.getItem('name');
    this.categoryName = localStorage.getItem('categoryName');
    this.roles();
    this.GET();
  }

  roles() {
    if ( (this.role === 'Admin') || (this.role === 'CEO') ) {
      this.admin = true;
      this.CEO = true;
      this.selected = 'all';
    } else if ( (this.role === 'Vendedor') || (this.role === 'Tienda') ) {
      this.store = true;
      this.admin = false;
      this.CEO = false;
      this.selected = 'allStore';
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
    localStorage.removeItem('categoryName');
  }

  async GET() {
    await this.itemsService.GET().subscribe( async res => {
      const itemsCollection: ItemsModel[] = (await res.data);

      itemsCollection.forEach( e => {
        if ( e.category === this.categoryName ) {
          if ( e.quantity > 0 ) {
            this.items.push(e);
          }
        }
      });

      itemsCollection.forEach( e => {
        if ( e.category === this.categoryName ) {
          if ( e.quantity === 0 ) {
            this.goneItems.push(e);
          }
        }
      });

      itemsCollection.forEach( e => {
        if ( e.store === this.name ) {
          if ( e.category === this.categoryName ) {
            if ( e.quantity > 0 ) {
              this.itemsStore.push(e);
            }
          }
        }
      });

      itemsCollection.forEach( e => {
        if ( e.store === this.name ) {
          if ( e.category === this.categoryName ) {
            if ( e.quantity === 0 ) {
              this.goneItemsStore.push(e);
            }
          }
        }
      });
    });
  }

}
