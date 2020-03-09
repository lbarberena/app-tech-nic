import { PipeTransform, Pipe } from '@angular/core';

import { StoresModel } from '../models/stores.model';

@Pipe({
  name: 'storesFilter',
  pure: false
})
export class StoresFilterPipe implements PipeTransform {
  transform(items: StoresModel[], searchText: string): any[] {

    if ( !items ) {
      return [];
    }
    if ( !searchText ) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter( ( it: StoresModel ) => {
      return it.name.toString().toLowerCase().includes( searchText ) ||
      it.name.toString().toLowerCase().includes( searchText );
    });
  }
}
