import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOrdersPage } from './admin-orders.page';

const routes: Routes = [
  {
    path: '',
    component: AdminOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminOrdersPageRoutingModule {}
