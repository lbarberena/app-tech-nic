import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsCategoryModalPage } from './products-category-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsCategoryModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsCategoryModalPageRoutingModule {}
