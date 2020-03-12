import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCategoriesPage } from './list-categories.page';

const routes: Routes = [
  {
    path: '',
    component: ListCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCategoriesPageRoutingModule {}
