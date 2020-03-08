import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoriesModel } from 'src/app/helpers/models/categories.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  ID: string;
  title = '';
  newCategory: FormGroup;
  constructor( private router: Router,
               private route: ActivatedRoute,
               private formBuilder: FormBuilder,
               private categoriesService: CategoriesService,
               public toastController: ToastController ) { }

  ngOnInit() {
    this.ID = this.route.snapshot.paramMap.get('id');
    if ( this.ID ) {
      this.title = 'Editar Categoría';
      this.GetById(this.ID);
    } else {
      this.title = 'Nueva Categoría';
    }
    this.newCategory = this.formBuilder.group({
      categoryName: ['', Validators.required],
      description: ['']
    });
  }

  cancel() {
    this.router.navigateByUrl('/tabs/items');
  }

  GetById( id: string) {
    this.categoriesService.GetByID( id ).subscribe( async res => {
      this.newCategory.patchValue({
        categoryName: res.data.categoryName,
        description: res.data.description
      });
    });
  }

  async SAVE() {
    const form: any = this.newCategory.value;

    this.categoriesService.POST(form).subscribe( async res => {
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
      }
    });

  }

}
