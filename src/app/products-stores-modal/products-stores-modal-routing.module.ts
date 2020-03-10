import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsStoresModalPage } from './products-stores-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsStoresModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsStoresModalPageRoutingModule {}
