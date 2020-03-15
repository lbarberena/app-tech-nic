import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

import { NgxQRCodeModule } from 'ngx-qrcode2';

import { PipesModule } from 'src/app/helpers/pipes/pipes.module';

import { Tab2Page } from './tab2.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgxQRCodeModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    PipesModule
  ],
  declarations: [Tab2Page],
  providers: [
    BarcodeScanner,
    Base64ToGallery,
    NgxQRCodeModule
  ]
})
export class Tab2PageModule {}
