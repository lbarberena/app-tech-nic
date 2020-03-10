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
    canActivate: [AuthGuardService],
    loadChildren: () => import('./inventory/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'categories/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./inventory/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'admin-items',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./inventory/items/admin-items/admin-items.module').then( m => m.AdminItemsPageModule)
  },
  {
    path: 'admin-items/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./inventory/items/admin-items/admin-items.module').then( m => m.AdminItemsPageModule)
  },
  {
    path: 'bill',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./billing/bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'bill/:id',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./billing/bill/bill.module').then( m => m.BillPageModule)
  },
  {
    path: 'products-modal',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./products-modal/products-modal.module').then( m => m.ProductsModalPageModule)
  },  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then( m => m.AccountsPageModule)
  },
  {
    path: 'stores',
    loadChildren: () => import('./stores/stores.module').then( m => m.StoresPageModule)
  },
  {
    path: 'products-category-modal',
    loadChildren: () => import('./products-category-modal/products-category-modal.module').then( m => m.ProductsCategoryModalPageModule)
  },
  {
    path: 'products-stores-modal',
    loadChildren: () => import('./products-stores-modal/products-stores-modal.module').then( m => m.ProductsStoresModalPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'new-order-modal',
    loadChildren: () => import('./new-order-modal/new-order-modal.module').then( m => m.NewOrderModalPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
