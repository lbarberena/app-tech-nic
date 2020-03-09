import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsFilterPipe } from './itemsFilter.pipe';
import { RouterModule } from '@angular/router';
import { StoresFilterPipe } from './storesFilter.pipe';
import { AccountsFilterPipe } from './accountsFilter.pipe';
import { BillsFilterPipe } from './billsFilter.pipe';
import { CategoriesFilterPipe } from './categoriesFilter.pipe';



@NgModule({
  declarations: [
    StoresFilterPipe,
    AccountsFilterPipe,
    BillsFilterPipe,
    ItemsFilterPipe,
    CategoriesFilterPipe
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
    CategoriesFilterPipe
]
})
export class PipesModule { }
