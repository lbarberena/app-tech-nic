import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoriesModel } from 'src/app/helpers/models/categories.model';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  newCategory: FormGroup;
  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private categoriesService: CategoriesService,
               public toastController: ToastController ) { }

  ngOnInit() {
    this.newCategory = this.formBuilder.group({
      categoryName: ['', Validators.required],
      description: ['']
    });
  }

  cancel() {
    this.router.navigateByUrl('/tabs/items');
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
