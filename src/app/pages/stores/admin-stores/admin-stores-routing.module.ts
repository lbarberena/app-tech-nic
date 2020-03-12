import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminStoresPage } from './admin-stores.page';

const routes: Routes = [
  {
    path: '',
    component: AdminStoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminStoresPageRoutingModule {}
