import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastController } from '@ionic/angular';

import { AccountingService } from '../services/accountings.service';
import { BillsService } from '../services/bills.service';
import { AccountingsModel } from '../helpers/models/accountings.model';
import { BillsModel } from '../helpers/models/bills.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  admin = false;
  CEO = false;
  store = false;
  role = '';
  name = '';
  userId = '';
  accountingForm: FormGroup;
  bills: BillsModel[];
  myBills = [];
  adminBills = [];
  ceoBills = [];
  calculated = false;
  accountings: AccountingsModel[];
  accountingsStore = [];
  searchInput;
  actualMonth = new Date().getUTCMonth() + 1;
  actualDate: Date;
  total = 0;

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               public toastController: ToastController,
               private accountingService: AccountingService,
               private billsService: BillsService ) {}

  ngOnInit() {
    this.actualDate = new Date();
    this.total = 0;
    this.name = localStorage.getItem('name');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.accountingForm = this.formBuilder.group({
      totalExpends: [0],
      totalIncome: [''],
      balance: [0],
      month: [this.actualMonth],
      date: [this.actualDate],
      userId: [this.userId],
      name: [this.name]
    });
  }

  ionViewWillEnter() {
    this.actualDate = new Date();
    this.name = localStorage.getItem('name');
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId');
    this.total = 0;
    this.bills = [];
    this.myBills = [];
    this.adminBills = [];
    this.roles();
    this.calculated = false;
    this.accountingForm.patchValue({
      totalIncome: 0
    });

    this.GetBillsStore();
    this.GET();
  }

  roles() {
    if ( this.role === 'Admin' ) {
      this.admin = true;
      this.store = false;
      this.CEO = false;
    } else if ( (this.role === 'Vendedor') || (this.role === 'Tienda') ) {
      this.admin = false;
      this.store = true;
      this.CEO = false;
    } else if ( this.role === 'CEO' ) {
      this.admin = false;
      this.store = false;
      this.CEO = true;
    }
  }

  GET() {
    this.accountingService.GET().subscribe( async res => {
      const accountigsCollection = ( await res.data );
      this.accountings = accountigsCollection;

      this.accountings.forEach( e => {
        if ( e.userId === this.userId ) {
          this.accountingsStore.push(e);
        }
      });
    });
  }

  GetBillsStore() {
    this.billsService.GET().subscribe( async res => {
      const billsCollection = (await res.data);
      this.bills = billsCollection;

      this.bills.forEach( e => {
        if ( e.userId === this.userId ) {
          if ( e.month === this.actualMonth ) {
            this.myBills.push(e);
          }
        }
      });

      this.bills.forEach( e => {
        if ( e.month === this.actualMonth ) {
          this.adminBills.push(e);
        }
      });

      this.bills.forEach( e => {
        if ( e.userId === this.userId ) {
          if ( e.month === this.actualMonth ) {
            this.ceoBills.push(e);
          }
        }
      });
    });
  }

  calculateStore() {
    this.myBills.forEach( e => {
      this.total = this.total + e.total;
    });
    this.accountingForm.patchValue({
      totalIncome: this.total
    });
    this.calculated = true;
  }

  calculateAdmin() {
    this.adminBills.forEach( e => {
      this.total = this.total + e.total;
    });
    this.accountingForm.patchValue({
      totalIncome: this.total
    });
    this.calculated = true;
  }

  calculateCEO() {
    this.ceoBills.forEach( e => {
      this.total = this.total + e.total;
    });
    this.accountingForm.patchValue({
      totalIncome: this.total
    });
    this.calculated = true;
  }

  doRefresh( event ) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.accountings = [];
    this.GET();
  }

  saveIncomes() {
    const form = this.accountingForm.value;
    this.accountingService.POST( form ).subscribe( async res => {
      if ( res.success ) {
        const TOAST = await this.toastController.create({
          duration: 3,
          message: res.msj
        });
        TOAST.present();
      } else {
        const TOAST = await this.toastController.create({
          duration: 3,
          message: 'Ocurrión un Error'
        });
        TOAST.present();
      }
    });
  }

}
