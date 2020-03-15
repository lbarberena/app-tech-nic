import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { ToastController, AlertController, ModalController } from '@ionic/angular';

import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { BillsService } from 'src/app/services/bills.service';
import { ItemsModel } from 'src/app/helpers/models/items.model';
import { ItemsService } from 'src/app/services/items.service';
import { ProductsModalPage } from 'src/app/modals/products-modal/products-modal.page';
import { NotificationsService } from 'src/app/services/notifications.service';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {

  title = '';
  ID: string;
  admin = false;
  CEO = false;
  store = false;
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
  notificationForm: FormGroup;
  userId: string;
  data = [{
    _id: '',
    productName: '',
    code: '',
    quantity: 0,
    unitCost: 0,
    price: 0
  }];

  btnBill = '';
  id = false;
  emailProducts = [];
  emailInpunt;
  itemsNotification = [];
  name: string;
  scannedCode = null;
  discount: number;
  discountFlag = false;
  constructor( private route: ActivatedRoute,
               private itemsService: ItemsService,
               private formBuilder: FormBuilder,
               private billService: BillsService,
               public toastController: ToastController,
               private alertCtrl: AlertController,
               public modalController: ModalController,
               private router: Router,
               private emailComposer: EmailComposer,
               private notificationService: NotificationsService,
               private barcodeScanner: BarcodeScanner ) {
                }

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
      month: [this.actualMonth],
      clientEmail: [''],
      discount: ['']
    });

    this.notificationForm = this.formBuilder.group({
      app_id: ['30538eaa-216c-4e7a-9cf4-2dbd597cf92b'],
      included_segments: ['Subscribed Users'],
      headings: {
        en: 'Producto agotado'
      },
      contents: {
        en: ''
      },
      data: {
        task: 'Aceptar'
      }
    });
  }

  ionViewWillEnter() {
    this.username = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.name = localStorage.getItem('name');
    this.ID = this.route.snapshot.paramMap.get('id');
    this.roles();
    if ( this.ID ) {
      this.id = true;
      this.title = 'Editar Factura';
      this.GetBillById(this.ID);
      this.btnBill = 'Editar Factura';
    } else {
      this.id = false;
      this.title = 'Nueva Factura';
      this.btnBill = 'Facturar';
    }
  }

  roles() {
    if ( (this.role === 'Admin') || (this.role === 'CEO') ) {
      this.admin = true;
      this.CEO = true;
    } else if ( (this.role === 'Vendedor') || (this.role === 'Tienda') ) {
      this.store = true;
      this.admin = false;
      this.CEO = false;
    }
  }

  sendEmail(ClientName: string, Code: string, Total: any, EmailInpunt: string) {
    let productName = [];
    let productQuantity = [];
    let productCode = [];
    this.emailProducts = this.productsForm.value;
    this.emailProducts.forEach( e => {
      productCode.push(e.code);
      productName.push(e.productName);
      productQuantity.push(e.quantity);
    });
    const email = {
      to: `${ EmailInpunt }`,
      cc: 'octaviobarberena8@gmail.com',
      from: 'technicaragua1@gmail.com',
      subject: `Factura ${ Code } Tech Nic`,
      body: `Tech Nic Accessories and more <br><br>
      Código de factura: ${ Code } <br><br>
      Cliente: ${ ClientName } <br><br>
      Productos: <br><br>
      Código: ${ productCode }<br>
      Cantidad: ${ productQuantity }<br>
      Nombre: ${ productName }<br><br>
      Total Factura: C$${ Total }<br><br>
      Gracias por tu compra!`,
      isHtml: true
    };
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
    this.emailComposer.open({
      app: 'gmail'
    });
    localStorage.removeItem('clientName');
    localStorage.removeItem('code');
    localStorage.removeItem('total');
  }

  GetBillById( id: string ) {
    this.billService.GetByID( id ).subscribe( async res => {
      this.data = res.data.products;
      this.data.forEach( e => {
        const productForm = this.formBuilder.group({
          _id: e._id,
          productName: e.productName,
          code: e.code,
          quantity: e.quantity,
          unitCost: e.unitCost,
          price: e.price
        });
        this.productsForm.push(productForm);
        this.products.push(productForm);
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

  async SAVE(email) {
    this.billForm.patchValue({
      username: this.username,
      userId: this.userId
    });
    if (this.ID ) {
      if ( this.products.length === 0 ) {
        const TOAST = await this.toastController.create({
          duration: 3,
          message: 'Selecciona Productos'
        });
        TOAST.present();
      } else {
        this.billForm.patchValue({
          clientEmail: email
        });
        const form = this.billForm.value;
        this.billService.PUT(this.ID, form ).subscribe( async res => {
          if ( res.success ) {
            const TOAST = await this.toastController.create({
              duration: 3,
              message: res.msj
            });
            TOAST.present();
            localStorage.setItem('clientName', res.data.clientName);
            localStorage.setItem('code', res.data.code);
            localStorage.setItem('total', res.data.total);
            this.GetProductsToNotificate();
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
    } else {
      if ( this.products.length === 0 ) {
        const TOAST = await this.toastController.create({
          duration: 3,
          message: 'Selecciona Productos'
        });
        TOAST.present();
      } else {
        this.billForm.patchValue({
          clientEmail: email
        });
        const form = this.billForm.value;
        this.billService.POST( form ).subscribe( async res => {
          if ( res.success ) {
            const TOAST = await this.toastController.create({
              duration: 3,
              message: res.msj
            });
            TOAST.present();
            localStorage.setItem('clientName', res.data.clientName);
            localStorage.setItem('code', res.data.code);
            localStorage.setItem('total', res.data.total);
            this.GetProductsToNotificate();
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

  async addProducts(productId: string, name: string, Quantity: number, UnitCost: number, Price: number, Code: string) {
    this.productListForm = this.formBuilder.group({
      _id: productId,
      code: Code,
      productName: name,
      quantity: Quantity,
      unitCost: UnitCost,
      price: Price
    });

    const QuantityTemp = this.productQuantity - Quantity;

    if ( QuantityTemp >= 0 ) {
      this.itemsService.PUT(productId, {
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
            code: res.data.code,
            productName: res.data.name,
            price: res.data.price,
            quantity: 1,
            unitCost: res.data.unitCost
          });
          this.addProducts( res.data._id, res.data.name, 1, res.data.unitCost, res.data.price, res.data.code);
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

async askForEmail() {
  const alert = await this.alertCtrl.create({
    header: '¿Desea enviar factura?',
    inputs: [
      {
        name: 'email',
        type: 'email',
        placeholder: 'Correo del cliente'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: ( data ) => {
          localStorage.removeItem('clientName');
          localStorage.removeItem('code');
          localStorage.removeItem('total');
          this.SAVE('');
        }
      },
      {
        text: 'Confirmar',
        handler: ( data ) => {
          this.SAVE(data.email);
          const name = localStorage.getItem('clientName');
          const code = localStorage.getItem('code');
          const total = localStorage.getItem('total');
          this.sendEmail(name, code, total, data.email);
        }
      }
    ]
  });
  alert.present();
}

GetProductsToNotificate() {
  this.itemsNotification = this.productsForm.value;
  this.itemsNotification.forEach( e => {
    this.itemsService.GetByID( e._id ).subscribe( res => {
      if ( res.data.quantity === 0 ) {
        this.notification( res.data.name );
      } /* else if ( res.data.quantity === 0 ) {
        if ( res.data.store === this.name ) {
          this.notification( res.data.name );
        }
      } */
    });
  });
}

showNotificationAlert( Header, sub ) {
  this.alertCtrl.create({
    header: Header,
    subHeader: sub,
    buttons: ['Entendido'],
  }).then( alert => alert.present());
}

notification( product: string) {
  this.notificationForm.patchValue({
    contents: {
      en: product
    }
  });
  const form = this.notificationForm.value;
  this.notificationService.POST( form ).subscribe( res => {
    if ( res.id ) {
      return true;
    }
  });
}

async showData(name, quantity, price) {
  let alert;
  alert = await this.alertCtrl.create({
    header: `${ name }`,
    subHeader: `Precio: C$${ price }`,
    message: `Cantidad: ${ quantity }`,
    buttons: [
      {
        text: 'Cerrar',
        role: 'cancel'
      }
    ]
  });
  alert.present();
}

scanCode() {
  this.barcodeScanner.scan().then(
    barcodeData => {
      this.scannedCode = barcodeData;
      this.GetProductsByCode();
    }
  );
}

GetProductsByCode() {

  const data = this.scannedCode;

  if ( data ) {
    this.itemsService.GetByCode( data ).subscribe( async res => {
      this.productQuantity = res.data.quantity;
      this.billForm.patchValue({
        code: res.data.code,
        productName: res.data.name,
        price: res.data.price,
        quantity: 1,
        unitCost: res.data.unitCost
      });
      this.addProductsByCode( res.data._id, res.data.name, 1, res.data.unitCost, res.data.price, res.data.code);
    });
  }
}

async addProductsByCode(productId: string, name: string, Quantity: number, UnitCost: number, Price: number, Code: string) {
  this.productListForm = this.formBuilder.group({
    _id: productId,
    code: Code,
    productName: name,
    quantity: Quantity,
    unitCost: UnitCost,
    price: Price
  });

  const QuantityTemp = this.productQuantity - Quantity;

  this.itemsService.PUT(productId, {
    quantity: QuantityTemp
  }).subscribe( res => {
    this.GetItems();
  });

  this.productsForm.push(this.productListForm);
  this.products.push( this.productListForm );
  this.check();

}

async addDiscount() {
  const alert = await this.alertCtrl.create({
    header: 'Aplicar descuento',
    inputs: [
      {
        name: 'discount',
        type: 'number',
        placeholder: 'Cantidad a descontar'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Confirmar',
        handler: ( data ) => {
          this.discountFlag = true;
          this.checkDiscount( data.discount );
        }
      }
    ]
  });
  alert.present();
}

checkDiscount( Discount ) {
  let SubTotal = 0;

  if ( !this.ID ) {
    this.products.forEach( e => {
      SubTotal = SubTotal + (e.value.price * e.value.quantity);
      let Total = SubTotal;

      if ( Discount > 0 ) {
        Total = Total - Discount;
      } else {
        Total = SubTotal;
      }

      this.billForm.patchValue({
        subTotal: SubTotal,
        total: Total,
        discount: Discount
      });

    });
  } else {
    this.products.forEach( e => {
      SubTotal = SubTotal + (e.value.price * e.value.quantity);
      let Total = SubTotal;

      if ( Discount > 0 ) {
        Total = Total - Discount;
      } else {
        Total = SubTotal;
      }

      this.billForm.patchValue({
        subTotal: SubTotal,
        total: Total,
        discount: Discount
      });

    });
  }

}

}
