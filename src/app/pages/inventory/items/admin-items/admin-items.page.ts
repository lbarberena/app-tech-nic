import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastController } from '@ionic/angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

import { CategoriesModel } from 'src/app/helpers/models/categories.model';
import { ItemsService } from 'src/app/services/items.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoresModel } from 'src/app/helpers/models/stores.model';
import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.page.html',
  styleUrls: ['./admin-items.page.scss'],
})
export class AdminItemsPage implements OnInit {
  title = '';
  btnName = '';
  ID: string;
  newItem: FormGroup;
  categories: CategoriesModel[];
  actualDate = new Date().getUTCMonth() + 1;
  username: string;
  role: string;
  userId: string;
  stores: StoresModel[];

  QrData = '';
  scannedCode = null;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';
  generatedCode = false;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private formBuilder: FormBuilder,
               private itemsService: ItemsService,
               private categoriesService: CategoriesService,
               public toastController: ToastController,
               private storesService: StoresService,
               private barcodeScanner: BarcodeScanner,
               private base64ToGallery: Base64ToGallery ) { }

  ngOnInit() {
    this.username = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.GetCategories();
    this.GetStores();
    this.ID = this.route.snapshot.paramMap.get('id');
    if ( this.ID ) {
      this.title = 'Editar Producto';
      this.btnName = 'Actualizar Producto';
      this.GetById( this.ID );
    } else {
      this.title = 'Nuevo Producto';
      this.btnName = 'Guardar Producto';
    }
    this.newItem = this.formBuilder.group({
      code: ['', Validators.required],
      username: [this.username],
      userId: [this.userId],
      name: ['', Validators.required],
      model: [''],
      brand: [''],
      description: [''],
      category: ['', Validators.required],
      color: [''],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      unitCost: ['', Validators.required],
      store: [''],
      createDate: [''],
      bdCreateDate: [this.actualDate]
    });
  }

  GetById( id: string ) {
    this.itemsService.GetByID( id ).subscribe( async res => {
      this.newItem.patchValue({
        code: res.data.code,
        name: res.data.name,
        brand: res.data.brand,
        model: res.data.model,
        description: res.data.description,
        category: res.data.category,
        color: res.data.color,
        quantity: res.data.quantity,
        price: res.data.price,
        unitCost: res.data.unitCost,
        store: res.data.store,
        createDate: res.data.createDate
      });
    });
  }

  async GetCategories() {
    await this.categoriesService.GET().subscribe( async res => {
      const categoriesCollection: CategoriesModel[] = (await res.data);
      this.categories = categoriesCollection;
    });
  }

  async GetStores() {
    await this.storesService.GET().subscribe( async res => {
      const storesCollection: StoresModel[] = (await res.data);
      this.stores = storesCollection;
    });
  }

  async SAVE() {
    const form: any = this.newItem.value;

    if ( !this.ID ) {
      this.itemsService.POST(form).subscribe(async res => {
        if ( res.success ) {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
          this.cancel();
        } else {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
        }
      });
    } else if ( this.ID ) {
      this.itemsService.PUT( this.ID, form ).subscribe( async res => {
        if ( res.success ) {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
          this.cancel();
        } else {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/tabs/items');
  }

  generateQRcode() {
    this.generatedCode = true;
    this.QrData = this.newItem.value.code;
    return this.QrData;
  }

  saveQrCode() {
    
  }

}
