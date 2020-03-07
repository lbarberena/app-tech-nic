import { Component, OnInit } from '@angular/core';
import { ItemsModel } from '../../helpers/models/items.model';
import { Router } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  items: ItemsModel[];
  loading = false;

  constructor( private router: Router,
               private itemsService: ItemsService,
               private alertCtrl: AlertController ) {}

  ngOnInit() {
    this.loading = true;
    this.GET();
  }

  async GET() {
    await this.itemsService.GET().subscribe( async res => {
      const itemsCollection: ItemsModel[] = (await res.data);
      this.items = itemsCollection;
      this.loading = false;
    });
  }

  async newProduct() {
    const alert = await this.alertCtrl.create({
      header: '¿Qué desea hacer?',
      buttons: [
        {
          text: 'Nuevo Producto',
          handler: ( data ) => {
            this.router.navigateByUrl('/admin-items');
          }
        },
        {
          text: 'Nueva Categoría',
          handler: ( data ) => {
            this.router.navigateByUrl('/categories');
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

  edit( itemId: string ) {
    this.router.navigateByUrl(`/admin-items/${ itemId }`);
  }

}
