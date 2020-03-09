import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/helpers/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    CategoriesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
