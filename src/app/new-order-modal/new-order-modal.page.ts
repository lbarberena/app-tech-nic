import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-order-modal',
  templateUrl: './new-order-modal.page.html',
  styleUrls: ['./new-order-modal.page.scss'],
})
export class NewOrderModalPage implements OnInit {

  ordersForm: FormGroup;

  constructor( public modalController: ModalController,
               private formBuilder: FormBuilder,
               private toastController: ToastController ) { }

  ngOnInit() {
    this.ordersForm = this.formBuilder.group({
      name: ['', Validators.required],
      color: [''],
      quantity: ['']
    });
  }

  async dismiss() {
    if ( this.ordersForm.value.name ) {
      this.modalController.dismiss({
        dismissed: true,
        data: this.ordersForm.value
      });
    } else {
      const TOAST = await this.toastController.create({
        duration: 6,
        message: 'Es requerido el nombre'
      });
      TOAST.present();
    }
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

}
