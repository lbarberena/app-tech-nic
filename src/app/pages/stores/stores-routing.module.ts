import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresPage } from './stores.page';

const routes: Routes = [
  {
    path: '',
    component: StoresPage
  },
  {
    path: 'admin-stores',
    loadChildren: () => import('./admin-stores/admin-stores.module').then( m => m.AdminStoresPageModule)
  },
  {
    path: 'admin-stores/:id',
    loadChildren: () => import('./admin-stores/admin-stores.module').then( m => m.AdminStoresPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresPageRoutingModule {}
