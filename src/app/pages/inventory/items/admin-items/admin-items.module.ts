import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgxQRCodeModule } from 'ngx-qrcode2';

import { AdminItemsPageRoutingModule } from './admin-items-routing.module';
import { AdminItemsPage } from './admin-items.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminItemsPageRoutingModule,
    ReactiveFormsModule,
    NgxQRCodeModule
  ],
  declarations: [AdminItemsPage]
})
export class AdminItemsPageModule {}
