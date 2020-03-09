import { PipeTransform, Pipe } from '@angular/core';

import { RegisterModel } from '../models/register.model';

@Pipe({
  name: 'accountsFilter',
  pure: false
})
export class AccountsFilterPipe implements PipeTransform {
  transform(items: RegisterModel[], searchText: string): any[] {

    if ( !items ) {
      return [];
    }
    if ( !searchText ) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter( ( it: RegisterModel ) => {
      return it.name.toString().toLowerCase().includes( searchText ) ||
      it.username.toString().toLowerCase().includes( searchText ) ||
      it.email.toString().toLowerCase().includes( searchText ) ||
      it.role.toString().toLowerCase().includes( searchText );
    });
  }
}
