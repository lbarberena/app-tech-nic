import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminStoresPageRoutingModule } from './admin-stores-routing.module';
import { AdminStoresPage } from './admin-stores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminStoresPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdminStoresPage]
})
export class AdminStoresPageModule {}
