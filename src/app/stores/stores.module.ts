import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoresPageRoutingModule } from './stores-routing.module';

import { StoresPage } from './stores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoresPageRoutingModule
  ],
  declarations: [StoresPage]
})
export class StoresPageModule {}
