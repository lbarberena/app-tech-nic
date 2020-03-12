import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastController } from '@ionic/angular';

import { StoresService } from 'src/app/services/stores.service';

@Component({
  selector: 'app-admin-stores',
  templateUrl: './admin-stores.page.html',
  styleUrls: ['./admin-stores.page.scss'],
})
export class AdminStoresPage implements OnInit {

  ID: string;
  title = '';
  newStore: FormGroup;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private formBuilder: FormBuilder,
               public toastController: ToastController,
               private storesService: StoresService ) { }

  ngOnInit() {
    this.ID = this.route.snapshot.paramMap.get('id');
    if ( this.ID ) {
      this.title = 'Editar Tienda';
      this.GetById(this.ID);
    } else {
      this.title = 'Nueva Tienda';
    }
    this.newStore = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: [''],
      address: ['']
    });
  }

  cancel() {
    this.router.navigateByUrl('/stores');
  }

  GetById( id: string) {
    this.storesService.GetByID( id ).subscribe( async res => {
      this.newStore.patchValue({
        name: res.data.name,
        phoneNumber: res.data.phoneNumber,
        address: res.data.address
      });
    });
  }

  async SAVE() {
    const form: any = this.newStore.value;

    if ( !this.ID ) {
      this.storesService.POST(form).subscribe( async res => {
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
    } else if ( this.ID ) {
      this.storesService.PUT( this.ID, form ).subscribe( async res => {
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



}
