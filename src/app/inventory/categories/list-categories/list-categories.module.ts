import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCategoriesPageRoutingModule } from './list-categories-routing.module';

import { ListCategoriesPage } from './list-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCategoriesPageRoutingModule
  ],
  declarations: [ListCategoriesPage]
})
export class ListCategoriesPageModule {}
