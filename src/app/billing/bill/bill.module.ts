import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillPageRoutingModule } from './bill-routing.module';

import { BillPage } from './bill.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsModalPageModule } from 'src/app/products-modal/products-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillPageRoutingModule,
    ReactiveFormsModule,
    ProductsModalPageModule
  ],
  declarations: [BillPage]
})
export class BillPageModule {}
