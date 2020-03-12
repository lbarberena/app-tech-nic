import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsModalPage } from './products-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsModalPageRoutingModule {}
