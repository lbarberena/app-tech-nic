import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController, AlertController } from '@ionic/angular';

import { BillsService } from '../../services/bills.service';
import { ItemsService } from '../../services/items.service';
import { BillsModel } from '../../helpers/models/bills.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  bills: BillsModel[];
  myBills = [];
  products = [];
  username = '';
  searchBillsInput;
  selected;
  admin = false;
  role = '';
  userId = '';
  CEO = false;
  store = false;
  myBillsReverse = [];

  constructor( private billsService: BillsService,
               private router: Router,
               public toastController: ToastController,
               private alertCtrl: AlertController,
               private itemsService: ItemsService ) {}

  ionViewWillEnter() {
    this.selected = 'mines';
    this.username = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.roles();
    this.myBills = [];
    this.GET();
  }

  newBill() {
    this.router.navigateByUrl(`/bill`);
  }

  accounts() {
    this.router.navigateByUrl(`/register`);
  }

  roles() {
    if ( (this.role === 'Admin') || (this.role === 'CEO') ) {
      this.admin = true;
      this.CEO = true;
      this.store = false;
    } else if ( (this.role === 'Tienda') || (this.role === 'Vendedor') ) {
      this.admin = false;
      this.CEO = false;
      this.store = true;
    }
  }

  GET() {
    this.billsService.GET().subscribe( async res => {
      const billsCollection: BillsModel[] = (await res.data);
      this.bills = billsCollection.reverse();

      this.bills.forEach( e => {
        if ( e.userId === this.userId ) {
          this.myBills.push( e );
        }
      });
    });
  }

  async edit( billId: string ) {
    this.router.navigateByUrl(`/bill/${ billId }`);
  }

  async erease( billId: string ) {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro quieres eliminar?',
      buttons: [
        {
          text: 'Confirmar',
          handler: ( data ) => {
            let Quantity = 0;
            this.billsService.GetByID( billId ).subscribe( b => {

              if ( b.success ) {
                this.products = b.data.products;

                this.products.forEach( res => {

                  this.itemsService.GetByID( res._id ).subscribe( async item => {

                    if ( res._id === item.data._id ) {

                      Quantity = item.data.quantity + 1;

                      this.itemsService.PUT(item.data._id, {
                        quantity: Quantity
                      }).subscribe( r => {
                        this.billsService.DELETE( billId ).subscribe( async d => {
                          if ( d.success ) {
                            const TOAST = await this.toastController.create({
                              duration: 3,
                              message: d.msj
                            });
                            TOAST.present();
                            this.GET();
                          } else {
                            const TOAST = await this.toastController.create({
                              duration: 3,
                              message: d.msj
                            });
                            TOAST.present();
                          }
                        });
                      });

                    }

                  });

                });
              }
            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.myBills = [];
    this.GET();
  }

}
