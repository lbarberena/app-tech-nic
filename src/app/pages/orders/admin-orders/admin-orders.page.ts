import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { ToastController, AlertController, ModalController } from '@ionic/angular';

import { ProductsModalPage } from 'src/app/modals/products-modal/products-modal.page';
import { OrdersService } from 'src/app/services/orders.service';
import { ItemsService } from 'src/app/services/items.service';
import { NewOrderModalPage } from 'src/app/modals/new-order-modal/new-order-modal.page';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.page.html',
  styleUrls: ['./admin-orders.page.scss'],
})
export class AdminOrdersPage implements OnInit {

  title = '';
  ID: string;
  id = false;
  actualMonth = new Date().getUTCMonth() + 1;
  actualDate = new Date();
  products = [];
  productListForm: FormGroup;
  public productData;
  ordersForm: FormGroup;
  username: string;
  role: string;
  userId: string;
  data = [{
    _id: '',
    itemName: '',
    quantity: 0,
    color: '',
    get: false
  }];
  name: string;
  notificationForm: FormGroup;

  constructor( public toastController: ToastController,
               private alertCtrl: AlertController,
               public modalController: ModalController,
               private router: Router,
               private route: ActivatedRoute,
               private formBuilder: FormBuilder,
               private orderService: OrdersService,
               private itemService: ItemsService,
               private notificationService: NotificationsService ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.username = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
    this.name = localStorage.getItem('name');
    this.actualDate = new Date();
    this.ordersForm = this.formBuilder.group({
      name: [this.name],
      items: this.formBuilder.array( [] ),
      userId: [this.userId],
      user: [this.username],
      date: [this.actualDate],
      store: ['']
    });

    this.notificationForm = this.formBuilder.group({
      app_id: ['30538eaa-216c-4e7a-9cf4-2dbd597cf92b'],
      included_segments: ['Active Users'],
      headings: {
        en: 'Hay un nuevo pedido'
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
    this.actualDate = new Date();
    this.username = localStorage.getItem('user');
    this.name = localStorage.getItem('name');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.ID = this.route.snapshot.paramMap.get('id');
    if ( this.ID ) {
      this.title = 'Editar Pedido';
      this.id = true;
      this.GetOrderById(this.ID);
    } else {
      this.title = 'Nuevo Pedido';
      this.id = false;
    }
  }

  GetOrderById( id: string ) {
    this.orderService.GetByID( id ).subscribe( async res => {
      this.data = res.data.items;
      this.data.forEach( e => {
        let productForm = this.formBuilder.group({
          _id: e._id,
          itemName: e.itemName,
          quantity: e.quantity,
          color: e.color,
          get: e.get
        });
        this.productsForm.push(productForm);
      });

      this.ordersForm.patchValue({
        name: res.data.name,
        user: res.data.user,
        userId: res.data.userId,
        date: res.data.date,
        store: res.data.store
      });
    });
  }

  get productsForm() {
    return this.ordersForm.get('items') as FormArray;
  }

  async addProducts( productId: string, Name: string, Quantity: number, Color: string, Get: boolean ) {
    this.productListForm = this.formBuilder.group({
      _id: productId,
      itemName: Name,
      quantity: Quantity,
      color: Color,
      get: Get
    });

    this.productsForm.push(this.productListForm);
    this.products.push(this.productListForm);

  }
  async addProductsModal( Name: string, Quantity: number, Color: string, Get: boolean ) {
    this.productListForm = this.formBuilder.group({
      itemName: Name,
      quantity: Quantity,
      color: Color,
      get: Get
    });

    this.productsForm.push(this.productListForm);
    this.products.push(this.productListForm);

  }

  deleteProduct( id ) {
    this.productsForm.removeAt( id );
  }

  GetProductsById() {

    const data = this.productData;

    if ( data ) {
      this.itemService.GetByID( data._id ).subscribe( async res => {
        this.ordersForm.patchValue({
          itemName: res.data.name,
          color: res.data.color,
          quantity: 1,
          get: false
        });
        this.addProducts(res.data._id, res.data.name, res.data.quantity, res.data.color, false);
      });
    }
  }

  GetProductsByModal() {

    if ( this.productData ) {
      this.ordersForm.patchValue({
        itemName: this.productData.data.name,
        color: this.productData.data.color,
        quantity: this.productData.data.quantity,
        get: false
      });
      this.addProductsModal(this.productData.data.name, this.productData.data.quantity, this.productData.data.color, false);
    }
  }

  async presentModalExist() {
    const modal = await this.modalController.create({
      component: ProductsModalPage
    });

    modal.onDidDismiss().then( (data) => {
      this.productData = data.data.data;
      this.GetProductsById();
    });
    return await modal.present();
  }

  async presentModalnotExist() {
    const modal = await this.modalController.create({
      component: NewOrderModalPage
    });

    modal.onDidDismiss().then( (data) => {
      if (data.data.data) {
        this.productData = data.data;
        this.GetProductsByModal();
      }

    });
    return await modal.present();
  }

  async SAVE() {
    const form = this.ordersForm.value;
    if ( !this.ID ) {
      if ( this.products.length !== 0 ) {
        if ( this.role !== 'Tienda' ) {
          console.log(form);
          this.orderService.POST( form ).subscribe( async res => {
            if ( res.success ) {
              const TOAST = await this.toastController.create({
                duration: 5,
                message: res.msj
              });
              TOAST.present();
              this.notification(this.name);
              this.router.navigateByUrl('/orders');
            } else {
              const TOAST = await this.toastController.create({
                duration: 5,
                message: 'Ocurrió un error'
              });
              TOAST.present();
            }
          });
        } else if ( this.role === 'Tienda' ) {
          this.ordersForm.patchValue({
            store: this.name
          });
          const storeData = this.ordersForm.value;
          this.orderService.POST( storeData ).subscribe( async res => {
            if ( res.success ) {
              const TOAST = await this.toastController.create({
                duration: 5,
                message: res.msj
              });
              TOAST.present();
              this.notification(this.name);
              this.router.navigateByUrl('/orders');
            } else {
              const TOAST = await this.toastController.create({
                duration: 3,
                message: 'Ocurrió un error'
              });
              TOAST.present();
            }
          });
        }
      } else if ( this.products.length === 0 ) {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: 'Agrega productos'
          });
          TOAST.present();
    }
    } else if ( this.ID ) {
      if ( this.role !== 'Tienda' ) {
        this.orderService.PUT(this.ID, form ).subscribe( async res => {
          if ( res.success ) {
            const TOAST = await this.toastController.create({
              duration: 3,
              message: res.msj
            });
            TOAST.present();
            this.router.navigateByUrl('/orders');
          } else {
            const TOAST = await this.toastController.create({
              duration: 3,
              message: 'Ocurrió un error'
            });
            TOAST.present();
          }
        });
      } else if ( this.role === 'Tienda' ) {
        this.ordersForm.patchValue({
          store: this.name
        });
        const storeData = this.ordersForm.value;
        this.orderService.PUT(this.ID, storeData ).subscribe( async res => {
          if ( res.success ) {
            const TOAST = await this.toastController.create({
              duration: 3,
              message: res.msj
            });
            TOAST.present();
            this.router.navigateByUrl('/orders');
          } else {
            const TOAST = await this.toastController.create({
              duration: 3,
              message: 'Ocurrió un error'
            });
            TOAST.present();
          }
        });
      }
    }
  }

  changeCheckBox(e) {
    this.ordersForm.patchValue({
      get: e.target.checked
    });
  }

  cancel() {
    this.products = [];
  }

  notification( user: string ) {
    this.notificationForm.patchValue({
      contents: {
        en: `${ user }`
      }
    });
    const form = this.notificationForm.value;
    this.notificationService.POST( form ).subscribe( res => {
      if ( res.id ) {
        return true;
      }
    });

  }

}
