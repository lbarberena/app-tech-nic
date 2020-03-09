import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemsModel } from '../helpers/models/items.model';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.page.html',
  styleUrls: ['./products-modal.page.scss'],
})
export class ProductsModalPage {
  items: ItemsModel[];
  searchItemsInput;

  constructor( public modalController: ModalController,
               private itemsService: ItemsService ) { }

  ionViewWillEnter() {
    this.GET();
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
  }

  async GET() {
    await this.itemsService.GET().subscribe( async res => {
      const itemsCollection: ItemsModel[] = (await res.data);
      this.items = itemsCollection;
    });
  }

}
