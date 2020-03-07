import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'billing',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../billing/tab1.module').then(m => m.Tab1PageModule)
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'items',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../inventory/items/tab2.module').then(m => m.Tab2PageModule)
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: 'accountings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../accountings/tab3.module').then(m => m.Tab3PageModule)
          }
        ],
        canActivate: [AuthGuardService]
      },
      {
        path: '',
        redirectTo: '/tabs/billing',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/billing',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
