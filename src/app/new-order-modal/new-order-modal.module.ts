import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOrderModalPageRoutingModule } from './new-order-modal-routing.module';

import { NewOrderModalPage } from './new-order-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewOrderModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewOrderModalPage]
})
export class NewOrderModalPageModule {}
