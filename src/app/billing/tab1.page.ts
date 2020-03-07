import { Component, OnInit } from '@angular/core';
import { BillsModel } from '../helpers/models/bills.model';
import { BillsService } from '../services/bills.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  bills: BillsModel[];
  loading = false;

  constructor( private billsService: BillsService,
               private router: Router,
               public toastController: ToastController,
               private alertCtrl: AlertController ) {}

  ngOnInit() {
    this.loading = true;
    this.GET();
  }

  newBill() {
    this.router.navigateByUrl(`/bill`);
  }

  GET() {
    this.billsService.GET().subscribe( async res => {
      const billsCollection: BillsModel[] = (await res.data);
      this.bills = billsCollection;
      this.loading = false;
    });
  }

  edit( billId: string ) {
    this.router.navigateByUrl(`/bill/${ billId }`);
  }

  async erease( billId: string ) {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro quieres eliminar?',
      buttons: [
        {
          text: 'Confirmar',
          handler: ( data ) => {
            this.billsService.DELETE( billId ).subscribe( async res => {
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
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

}
