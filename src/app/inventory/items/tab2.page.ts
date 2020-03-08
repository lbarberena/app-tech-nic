import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ToastController } from '@ionic/angular';

import { ItemsService } from '../../services/items.service';
import { ItemsModel } from '../../helpers/models/items.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  items: ItemsModel[];
  username: string;
  role: string;
  userId: string;
  admin = false;
  searchItemsInput;

  constructor( private router: Router,
               private itemsService: ItemsService,
               private alertCtrl: AlertController,
               public toastController: ToastController ) {}

  @ViewChild('slidingList', {static: true}) slidingList;

  ngOnInit() {
    this.username = localStorage.getItem('user');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.roles();
    this.GET();
  }

  roles() {
    if ( (this.role === 'admin') || (this.role === 'CEO') ) {
      this.admin = true;
    }
  }
  
  accounts() {
    this.router.navigateByUrl(`/register`);
  }

  async GET() {
    await this.itemsService.GET().subscribe( async res => {
      const itemsCollection: ItemsModel[] = (await res.data);
      this.items = itemsCollection;
    });
  }

  newProduct() {
    this.router.navigateByUrl('/admin-items');
  }

  newCategory() {
    this.router.navigateByUrl('/categories');
  }

  listCategories() {
    this.router.navigateByUrl('/categories/list-categories');
  }

  async edit( itemId: string ) {
    await this.slidingList.closeSlidingItems();
    this.router.navigateByUrl(`/admin-items/${ itemId }`);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async erease( id ) {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro quieres eliminar?',
      buttons: [
        {
          text: 'Confirmar',
          handler: ( data ) => {
            this.itemsService.DELETE( id ).subscribe( async res => {
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

