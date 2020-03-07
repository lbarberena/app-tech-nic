import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesModel } from 'src/app/helpers/models/categories.model';
import { ItemsService } from 'src/app/services/items.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.page.html',
  styleUrls: ['./admin-items.page.scss'],
})
export class AdminItemsPage implements OnInit {
  title = '';
  ID: string;
  newItem: FormGroup;
  categories: CategoriesModel[];
  actualDate = new Date().getUTCMonth() + 1;

  constructor( private route: ActivatedRoute,
               private router: Router,
               private formBuilder: FormBuilder,
               private itemsService: ItemsService,
               private categoriesService: CategoriesService,
               public toastController: ToastController ) { }

  ngOnInit() {
    this.GetCategories();
    this.ID = this.route.snapshot.paramMap.get('id');
    if ( this.ID ) {
      this.title = 'Editar Producto';
      this.GetById( this.ID );
    } else {
      this.title = 'Nuevo Producto';
    }
    this.newItem = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      model: [''],
      brand: [''],
      description: [''],
      category: ['', Validators.required],
      color: [''],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      unitCost: ['', Validators.required],
      store: [''],
      createDate: [''],
      bdCreateDate: [this.actualDate]
    });
  }

  GetById( id: string ) {
    this.itemsService.GetByID( id ).subscribe( async res => {
      this.newItem.patchValue({
        code: res.data.code,
        name: res.data.name,
        brand: res.data.brand,
        model: res.data.model,
        description: res.data.description,
        category: res.data.category,
        color: res.data.color,
        quantity: res.data.quantity,
        price: res.data.price,
        unitCost: res.data.unitCost,
        store: res.data.store,
        createDate: res.data.createDate
      });
    });
  }

  async GetCategories() {
    await this.categoriesService.GET().subscribe( async res => {
      const categoriesCollection: CategoriesModel[] = (await res.data);
      this.categories = categoriesCollection;
    });
  }

  async SAVE() {
    const form: any = this.newItem.value;

    if ( !this.ID ) {
      this.itemsService.POST(form).subscribe(async res => {
        if ( res.success ) {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
          this.cancel();
        } else {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
          console.log(res.msj);
        }
      });
    } else if ( this.ID ) {
      this.itemsService.PUT( this.ID, form ).subscribe( async res => {
        if ( res.success ) {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
          this.cancel();
        } else {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: res.msj
          });
          TOAST.present();
          console.log(res.msj);
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/tabs/items');
  }

}
