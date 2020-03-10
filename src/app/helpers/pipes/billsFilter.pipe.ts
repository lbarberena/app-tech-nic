import { PipeTransform, Pipe } from '@angular/core';

import { BillsModel } from '../models/bills.model';

@Pipe({
  name: 'billsFilter',
  pure: false
})
export class BillsFilterPipe implements PipeTransform {
  transform(items: BillsModel[], searchText: string): any[] {

    if ( !items ) {
      return [];
    }
    if ( !searchText ) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter( ( it: BillsModel ) => {
      return it.code.toString().toLowerCase().includes( searchText ) ||
      it.clientName.toString().toLowerCase().includes( searchText );
    });
  }
}
