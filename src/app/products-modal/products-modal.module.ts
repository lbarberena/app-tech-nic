import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsModalPageRoutingModule } from './products-modal-routing.module';

import { ProductsModalPage } from './products-modal.page';
import { PipesModule } from '../helpers/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ProductsModalPageRoutingModule
  ],
  declarations: [ProductsModalPage]
})
export class ProductsModalPageModule {}
