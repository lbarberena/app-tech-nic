import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { ToastController, AlertController, ModalController } from '@ionic/angular';

import { BillsService } from 'src/app/services/bills.service';
import { ItemsModel } from 'src/app/helpers/models/items.model';
import { ItemsService } from 'src/app/services/items.service';
import { ProductsModalPage } from 'src/app/products-modal/products-modal.page';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {

  title = '';
  ID: string;
  items: ItemsModel[];
  billForm: FormGroup;
  products = [];
  public productData;
  actualMonth = new Date().getUTCMonth() + 1;
  actualDate = new Date();
  productQuantity: number;
  productListForm: FormGroup;
  username: string;
  role: string;
  userId: string;
  data = [{
    _id: '',
    productName: '',
    quantity: 0,
    unitCost: 0,
    price: 0
  }];
  constructor( private route: ActivatedRoute,
               private itemsService: ItemsService,
               private formBuilder: FormBuilder,
               private billService: BillsService,
               public toastController: ToastController,
               private alertCtrl: AlertController,
               public modalController: ModalController,
               private router: Router ) { }

  ngOnInit() {
    this.billForm = this.formBuilder.group({
      clientName: [''],
      username: [this.username],
      userId: [this.userId],
      products: this.formBuilder.array( [] ),
      taxes: [''],
      subTotal: ['', Validators.required],
      total: ['', Validators.required],
      Date: [this.actualDate],
      month: [this.actualMonth]
    });
  }

  ionViewWillEnter() {
    this.username = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.ID = this.route.snapshot.paramMap.get('id');
    if ( this.ID ) {
      this.title = 'Editar Factura';
      this.GetBillById(this.ID);
    } else {
      this.title = 'Nueva Factura';
    }
  }

  GetBillById( id: string ) {
    this.billService.GetByID( id ).subscribe( async res => {
      this.data = res.data.products;
      this.data.forEach( e => {
        let productForm = this.formBuilder.group({
          _id: e._id,
          productName: e.productName,
          quantity: e.quantity,
          unitCost: e.unitCost,
          price: e.price
        });
        this.productsForm.push(productForm);
      });

      this.billForm.patchValue({
        clientName: res.data.clientName,
        subTotal: res.data.subTotal,
        total: res.data.total,
        Date: res.data.Date
      });
    });
  }

  async GetItems() {
    await this.itemsService.GET().subscribe( async res => {
      const itemsCollection: ItemsModel[] = (await res.data);
      this.items = itemsCollection;
    });
  }

  async SAVE() {
    this.billForm.patchValue({
      username: this.username,
      userId: this.userId
    });
    const bill = this.billForm.value;
    if (this.ID ) {
      this.billService.PUT(this.ID, bill ).subscribe( async res => {
        if ( res.success ) {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
          this.router.navigateByUrl('/tabs/billing');
          this.products = [];
        } else {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
        }
      });
    } else {
      if ( this.products.length === 0 ) {
        const TOAST = await this.toastController.create({
          duration: 3,
          message: 'Selecciona Productos'
        });
        TOAST.present();
      } else {
        this.billService.POST( bill ).subscribe( async res => {
          if ( res.success ) {
            const TOAST = await this.toastController.create({
              duration: 3,
              message: res.msj
            });
            TOAST.present();
            this.router.navigateByUrl('/tabs/billing');
            this.products = [];
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
  }

  get productsForm() {
    return this.billForm.get('products') as FormArray;
  }

  async addProducts( id: string, productId: string, name: string, Quantity: number, UnitCost: number, Price: number) {
    this.productListForm = this.formBuilder.group({
      _id: productId,
      productName: name,
      quantity: Quantity,
      unitCost: UnitCost,
      price: Price
    });

    const QuantityTemp = this.productQuantity - Quantity;

    if ( QuantityTemp >= 0 ) {
      this.itemsService.PUT(id, {
        quantity: QuantityTemp
      }).subscribe( res => {
        this.GetItems();
      });

      this.productsForm.push(this.productListForm);
      this.products.push( this.productListForm );
      this.check();
    } else {
      const TOAST = await this.toastController.create({
        duration: 3,
        message: 'No hay suficientes productos'
      });
      TOAST.present();
    }

  }

  deleteProduct( id ) {
    this.itemsService.GetByID( this.products[id].value._id ).subscribe( async item => {

      const Quantity = item.data.quantity + 1;

      this.itemsService.PUT(item.data._id, {
        quantity: Quantity
      }).subscribe( r => {
        this.productsForm.removeAt( id );
        this.products.splice(id, 1);
        this.check();
        this.GetItems();
        if ( this.products.length === 0 ) {
          this.billForm.patchValue({
            taxes: 0.0,
            subTotal: 0.0,
            total: 0.0
          });
        }
      });

    });

  }

  GetProductsById() {

    const data = this.productData;

    if ( data ) {
      this.itemsService.GetByID( data._id ).subscribe( async res => {
        this.productQuantity = res.data.quantity;
        if ( res.data.quantity > 0 ) {
          this.billForm.patchValue({
            productName: res.data.name,
            price: res.data.price,
            quantity: 1,
            unitCost: res.data.unitCost
          });
          this.addProducts(data._id, res.data._id, res.data.name, 1, res.data.unitCost, res.data.price);
        } else {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: 'Producto agotado'
          });
          TOAST.present();
        }
        localStorage.removeItem('ProductId');
      });
    }
  }

  check() {
    let SubTotal = 0;

    if ( !this.ID ) {
      this.products.forEach( e => {
        SubTotal = SubTotal + (e.value.price * e.value.quantity);
        const Total = SubTotal;

        this.billForm.patchValue({
          subTotal: SubTotal,
          total: Total
        });

      });
    } else {
      SubTotal = this.billForm.value.total;
      this.products.forEach( e => {
        SubTotal = SubTotal + (e.value.price * e.value.quantity);
        const Total = SubTotal;

        this.billForm.patchValue({
          subTotal: SubTotal,
          total: Total
        });

      });
    }

}

async presentModal() {
  const modal = await this.modalController.create({
    component: ProductsModalPage
  });

  modal.onDidDismiss().then( (data) => {
    this.productData = data.data.data;
    this.GetProductsById();
  });
  return await modal.present();
}

async cancel() {
  if ( !this.ID ) {
    this.products.forEach( res => {

      this.itemsService.GetByID( res.value._id ).subscribe( async item => {

        if ( res.value._id === item.data._id ) {

          const Quantity = item.data.quantity + 1;

          this.itemsService.PUT(item.data._id, {
            quantity: Quantity
          }).subscribe( r => {
            this.check();
            this.GetItems();
            if ( this.products.length === 0 ) {
              this.billForm.patchValue({
                taxes: 0.0,
                subTotal: 0.0,
                total: 0.0
              });
              this.products = [];
            }
          });

        }

      });

    });
  } else {
    return;
  }
}

}
