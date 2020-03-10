import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage
  },
  {
    path: 'admin-orders',
    loadChildren: () => import('./admin-orders/admin-orders.module').then( m => m.AdminOrdersPageModule)
  },
  {
    path: 'admin-orders/:id',
    loadChildren: () => import('./admin-orders/admin-orders.module').then( m => m.AdminOrdersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
