import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BillsService } from 'src/app/services/bills.service';
import { ItemsModel } from 'src/app/helpers/models/items.model';
import { ItemsService } from 'src/app/services/items.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.page.html',
  styleUrls: ['./bill.page.scss'],
})
export class BillPage implements OnInit {

  title = '';
  ID: string;
  items: ItemsModel[];
  billForm: FormGroup;
  products = [];
  actualMonth = new Date().getUTCMonth() + 1;
  productQuantity: number;
  productListForm: FormGroup;
  constructor( private route: ActivatedRoute,
               private itemsService: ItemsService,
               private formBuilder: FormBuilder,
               private billService: BillsService,
               public toastController: ToastController,
               private alertCtrl: AlertController ) { }

  ngOnInit() {
    this.ID = this.route.snapshot.paramMap.get('id');
    if ( this.ID ) {
      this.title = 'Editar Factura';
    } else {
      this.title = 'Nueva Factura';
    }

    this.billForm = this.formBuilder.group({
      clientName: [''],
      products: this.formBuilder.array( [] ),
      taxes: [''],
      subTotal: ['', Validators.required],
      total: ['', Validators.required],
      Date: ['', Validators.required],
      month: [this.actualMonth]
    });

  }

  GetBillById( id: string ) {
    let data = [{
      _id: '',
      productName: '',
      quantity: 0,
      unitCost: 0,
      price: 0
    }];
    this.billService.GetByID( id ).subscribe( async res => {
      data = res.data.products;
      data.forEach( e => {
        let productForm = this.formBuilder.group({
          _id: e._id,
          productName: e.productName,
          quantity: e.quantity,
          unitCost: e.unitCost,
          price: e.price
        });
        this.productsForm.push(productForm);
      });

      this.billForm.patchValue({
        clientName: res.data.clientName,
        universityId: res.data.universityId,
        customerKind: res.data.customerKind,
        paymentType: res.data.paymentType,
        paymentTerms: res.data.paymentTerms,
        taxes: res.data.taxes,
        subTotal: res.data.subTotal,
        total: res.data.total,
        Date: res.data.Date
      });
    });
  }

  async GetItems() {
    await this.itemsService.GET().subscribe( async res => {
      const itemsCollection: ItemsModel[] = (await res.data);
      this.items = itemsCollection;
    });
  }

  get productsForm() {
    return this.billForm.get('products') as FormArray;
  }

  async addProducts( id: string, productId: string, name: string, Quantity: number, UnitCost: number, Price: number) {
    this.productListForm = this.formBuilder.group({
      _id: productId,
      productName: name,
      quantity: Quantity,
      unitCost: UnitCost,
      price: Price
    });

    const QuantityTemp = this.productQuantity - 1;

    if ( QuantityTemp >= 0 ) {
      this.itemsService.PUT(id, {
        quantity: QuantityTemp
      }).subscribe( res => {
        this.GetItems();
      });

      this.productsForm.push(this.productListForm);
      this.products.push( this.productListForm );
      this.check();
    } else {
      const TOAST = await this.toastController.create({
        duration: 3,
        message: 'No hay suficientes productos'
      });
      TOAST.present();
    }

  }

  deleteProduct( id ) {
    this.itemsService.GetByID( this.products[id].value._id ).subscribe( async item => {

      const Quantity = item.data.quantity + 1;

      this.itemsService.PUT(item.data._id, {
        quantity: Quantity
      }).subscribe( r => {
        this.productsForm.removeAt( id );
        this.products.splice(id, 1);
        this.check();
        this.GetItems();
        if ( this.products.length === 0 ) {
          this.billForm.patchValue({
            taxes: 0.0,
            subTotal: 0.0,
            total: 0.0
          });
        }
      });

    });

  }

  saveProductId( id: string ) {
    localStorage.setItem('ProductId', id);
  }

  GetProductsById() {
    const id = localStorage.getItem('ProductId');

    if ( id ) {
      this.itemsService.GetByID( id ).subscribe( async res => {
        this.productQuantity = res.data.quantity;
        if ( res.data.quantity > 0 ) {
          this.billForm.patchValue({
            productName: res.data.name,
            price: res.data.price,
            quantity: 1,
            unitCost: res.data.unitCost
          });
          this.addProducts(id, res.data._id, res.data.name, 1, res.data.unitCost, res.data.price);
        } else {
          const TOAST = await this.toastController.create({
            duration: 3,
            message: 'Producto agotado'
          });
          TOAST.present();
        }
        localStorage.removeItem('ProductId');
      });
    }
  }

  check() {
    let SubTotal = 0;

    this.products.forEach( e => {
      SubTotal = SubTotal + (e.value.price * e.value.quantity);
      const tax = SubTotal * 0.15;
      const Total = SubTotal + tax;

      this.billForm.patchValue({
        taxes: tax,
        subTotal: SubTotal,
        total: Total
      });

    });

}

}
