import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminItemsPageRoutingModule } from './admin-items-routing.module';

import { AdminItemsPage } from './admin-items.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminItemsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdminItemsPage]
})
export class AdminItemsPageModule {}
