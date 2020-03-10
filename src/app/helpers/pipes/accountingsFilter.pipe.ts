import { PipeTransform, Pipe } from '@angular/core';

import { AccountingsModel } from '../models/accountings.model';

@Pipe({
  name: 'accountingsFilter',
  pure: false
})
export class AccountingsFilterPipe implements PipeTransform {
  transform(items: AccountingsModel[], searchText: string): any[] {

    if ( !items ) {
      return [];
    }
    if ( !searchText ) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter( ( it: AccountingsModel ) => {
      return it.name.toString().toLowerCase().includes( searchText );
    });
  }
}
