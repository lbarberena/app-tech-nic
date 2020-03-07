import { Component, OnInit } from '@angular/core';
import { BillsModel } from '../helpers/models/bills.model';
import { BillsService } from '../services/bills.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  bills: BillsModel[];
  loading = false;

  constructor( private billsService: BillsService ) {}

  ngOnInit() {
    this.loading = true;
    this.GET();
  }

  newBill() {

  }

  GET() {
    this.billsService.GET().subscribe( async res => {
      const billsCollection: BillsModel[] = (await res.data);
      this.bills = billsCollection;
      this.loading = false;
    });
  }

  edit( billId: string ) {
    
  }

}
