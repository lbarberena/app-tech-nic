import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { CategoriesModel } from 'src/app/helpers/models/categories.model';
import { Router } from '@angular/router';
import { ProductsCategoryModalPage } from 'src/app/modals/products-category-modal/products-category-modal.page';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.page.html',
  styleUrls: ['./list-categories.page.scss'],
})
export class ListCategoriesPage {

  categories: CategoriesModel[];
  role = '';
  admin = false;
  searchInput;

  constructor( private categoriesService: CategoriesService,
               public toastController: ToastController,
               private router: Router,
               private alertCtrl: AlertController,
               public modalController: ModalController ) { }

  @ViewChild('slidingList', {static: true}) slidingList;

  ionViewWillEnter() {
    this.GET();
    this.roles();
  }

  roles() {
    this.role = localStorage.getItem('role');
    if ( (this.role === 'Admin') || (this.role === 'CEO') ) {
      this.admin = true;
    }
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
          text: 'Cancelar',
          role: 'cancel'
        },
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

  async presentModal( name: string ) {
    localStorage.setItem('categoryName', name);
    const modal = await this.modalController.create({
      component: ProductsCategoryModalPage
    });

    return await modal.present();
  }

}
