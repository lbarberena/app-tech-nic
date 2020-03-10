import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoresPageRoutingModule } from './stores-routing.module';

import { StoresPage } from './stores.page';
import { PipesModule } from '../helpers/pipes/pipes.module';
import { ProductsStoresModalPageModule } from '../products-stores-modal/products-stores-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    StoresPageRoutingModule,
    ProductsStoresModalPageModule
  ],
  declarations: [StoresPage]
})
export class StoresPageModule {}
