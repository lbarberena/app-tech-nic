import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ToastController, AlertController } from '@ionic/angular';
import { CategoriesModel } from 'src/app/helpers/models/categories.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.page.html',
  styleUrls: ['./list-categories.page.scss'],
})
export class ListCategoriesPage implements OnInit {

  categories: CategoriesModel[];

  constructor( private categoriesService: CategoriesService,
               public toastController: ToastController,
               private router: Router,
               private alertCtrl: AlertController ) { }

  @ViewChild('slidingList', {static: true}) slidingList;

  ngOnInit() {
    this.GET();
  }

  GET() {
    this.categoriesService.GET().subscribe( async res => {
      if ( res.success ) {
        const categoriesCollection = (await res.data);
        this.categories = categoriesCollection;
      }
    });
  }

  async edit( categoryId: string ) {
    await this.slidingList.closeSlidingItems();
    this.router.navigateByUrl(`/categories/${ categoryId }`);
  }

  async erease( categoryId: string ) {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro quieres eliminar?',
      buttons: [
        {
          text: 'Confirmar',
          handler: ( data ) => {
            this.categoriesService.DELETE( categoryId ).subscribe( async res => {
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

  newCategories() {
    this.router.navigateByUrl('/categories');
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
