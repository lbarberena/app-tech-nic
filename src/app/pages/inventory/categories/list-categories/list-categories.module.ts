import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCategoriesPageRoutingModule } from './list-categories-routing.module';

import { ListCategoriesPage } from './list-categories.page';
import { PipesModule } from 'src/app/helpers/pipes/pipes.module';
import { ProductsCategoryModalPageModule } from 'src/app/modals/products-category-modal/products-category-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ListCategoriesPageRoutingModule,
    ProductsCategoryModalPageModule
  ],
  declarations: [ListCategoriesPage]
})
export class ListCategoriesPageModule {}
