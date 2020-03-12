import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminOrdersPageRoutingModule } from './admin-orders-routing.module';

import { AdminOrdersPage } from './admin-orders.page';
import { ProductsModalPageModule } from 'src/app/modals/products-modal/products-modal.module';
import { NewOrderModalPageModule } from 'src/app/modals/new-order-modal/new-order-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminOrdersPageRoutingModule,
    ReactiveFormsModule,
    ProductsModalPageModule,
    NewOrderModalPageModule
  ],
  declarations: [AdminOrdersPage]
})
export class AdminOrdersPageModule {}
