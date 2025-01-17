import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController, AlertController } from '@ionic/angular';

import { OrdersService } from '../../services/orders.service';
import { OrdersModel } from '../../helpers/models/orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  selected;
  searchInput;
  orders: OrdersModel[];
  myOrders = [];
  storeOrders = [];
  admin = false;
  username: string;
  role: string;
  userId: string;
  name: string;
  CEO = false;
  store = false;
  loading = false;


  constructor( private router: Router,
               public toastController: ToastController,
               private alertCtrl: AlertController,
               private ordersService: OrdersService ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loading = true;
    this.orders = [];
    this.myOrders = [];
    this.storeOrders = [];
    this.username = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.name = localStorage.getItem('name');
    this.roles();
    this.GET();
  }

  roles() {
    if ( (this.role === 'Admin') || (this.role === 'CEO') ) {
      this.admin = true;
      this.CEO = true;
      this.selected = 'all';
    } else if ( (this.role === 'Vendedor') || (this.role === 'Tienda') ) {
      this.store = true;
      this.admin = false;
      this.CEO = false;
      this.selected = 'minesStore';
    }
  }

  newOrder() {
    this.router.navigateByUrl(`/orders/admin-orders`);
  }

  async GET() {
    await this.ordersService.GET().subscribe( async res => {
      const ordersCollection: OrdersModel[] = (await res.data);
      this.orders = ordersCollection.reverse();

      this.orders.forEach( e => {
        if ( e.store === this.name ) {
          this.storeOrders.push(e);
        }
      });

      this.orders.forEach( e => {
        if ( e.userId === this.userId ) {
          this.myOrders.push(e);
        }
      });
      this.loading = false;
    });

  }

  edit( id: string ) {
    this.router.navigateByUrl(`/orders/admin-orders/${ id }`);
  }

  async erease( id: string ) {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro quieres eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: ( data ) => {
            this.ordersService.DELETE( id ).subscribe( async res => {
              if ( res.success ) {
                const TOAST = await this.toastController.create({
                  duration: 3,
                  message: res.msj
                });
                TOAST.present();
                this.GET();
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
      ]
    });
    alert.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.storeOrders = [];
    this.orders = [];
    this.myOrders = [];
    this.GET();
  }

}
