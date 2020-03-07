import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then( m => m.AuthenticationPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./inventory/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'categories/:id',
    loadChildren: () => import('./inventory/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'admin-items',
    loadChildren: () => import('./inventory/items/admin-items/admin-items.module').then( m => m.AdminItemsPageModule)
  },
  {
    path: 'admin-items/:id',
    loadChildren: () => import('./inventory/items/admin-items/admin-items.module').then( m => m.AdminItemsPageModule)
  },
  {
    path: 'bill',
    loadChildren: () => import('./billing/bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'bill/:id',
    loadChildren: () => import('./billing/bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'products-modal',
    loadChildren: () => import('./products-modal/products-modal.module').then( m => m.ProductsModalPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
