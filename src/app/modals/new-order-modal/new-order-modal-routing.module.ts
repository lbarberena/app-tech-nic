import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewOrderModalPage } from './new-order-modal.page';

const routes: Routes = [
  {
    path: '',
    component: NewOrderModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewOrderModalPageRoutingModule {}
