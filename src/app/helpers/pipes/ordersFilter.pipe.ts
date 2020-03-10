import { PipeTransform, Pipe } from '@angular/core';

import { OrdersModel } from '../models/orders.model';

@Pipe({
  name: 'ordersFilter',
  pure: false
})
export class OrdersFilterPipe implements PipeTransform {
  transform(items: OrdersModel[], searchText: string): any[] {

    if ( !items ) {
      return [];
    }
    if ( !searchText ) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter( ( it: OrdersModel ) => {
      return it.name.toString().toLowerCase().includes( searchText );
    });
  }
}
