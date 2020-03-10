import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountingsFilterPipe } from './accountingsFilter.pipe';
import { AccountsFilterPipe } from './accountsFilter.pipe';
import { BillsFilterPipe } from './billsFilter.pipe';
import { CategoriesFilterPipe } from './categoriesFilter.pipe';
import { ItemsFilterPipe } from './itemsFilter.pipe';
import { StoresFilterPipe } from './storesFilter.pipe';



@NgModule({
  declarations: [
    StoresFilterPipe,
    AccountsFilterPipe,
    BillsFilterPipe,
    ItemsFilterPipe,
    CategoriesFilterPipe,
    AccountingsFilterPipe
],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    StoresFilterPipe,
    AccountsFilterPipe,
    BillsFilterPipe,
    ItemsFilterPipe,
    AccountingsFilterPipe,
    CategoriesFilterPipe
]
})
export class PipesModule { }
