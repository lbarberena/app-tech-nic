import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsModalPageRoutingModule } from './products-modal-routing.module';

import { ProductsModalPage } from './products-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsModalPageRoutingModule
  ],
  declarations: [ProductsModalPage]
})
export class ProductsModalPageModule {}
