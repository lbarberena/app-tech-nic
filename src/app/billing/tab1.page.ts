import { Component, OnInit } from '@angular/core';
import { BillsModel } from '../helpers/models/bills.model';
import { BillsService } from '../services/bills.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  bills: BillsModel[];
  loading = false;

  constructor( private billsService: BillsService,
               private router: Router ) {}

  ngOnInit() {
    this.loading = true;
    this.GET();
  }

  newBill() {
    this.router.navigateByUrl(`/bill`);
  }

  GET() {
    this.billsService.GET().subscribe( async res => {
      const billsCollection: BillsModel[] = (await res.data);
      this.bills = billsCollection;
      this.loading = false;
    });
  }

  edit( billId: string ) {
    this.router.navigateByUrl(`/bill/${ billId }`);
  }

  erease( billId: string ) {

  }

}
