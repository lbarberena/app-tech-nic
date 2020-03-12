import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsStoresModalPageRoutingModule } from './products-stores-modal-routing.module';

import { ProductsStoresModalPage } from './products-stores-modal.page';
import { PipesModule } from '../../helpers/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsStoresModalPageRoutingModule,
    PipesModule
  ],
  declarations: [ProductsStoresModalPage]
})
export class ProductsStoresModalPageModule {}
