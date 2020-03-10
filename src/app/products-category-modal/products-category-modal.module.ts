import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsCategoryModalPageRoutingModule } from './products-category-modal-routing.module';

import { ProductsCategoryModalPage } from './products-category-modal.page';
import { PipesModule } from '../helpers/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsCategoryModalPageRoutingModule,
    PipesModule
  ],
  declarations: [ProductsCategoryModalPage]
})
export class ProductsCategoryModalPageModule {}
