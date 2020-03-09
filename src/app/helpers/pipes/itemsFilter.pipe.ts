import { PipeTransform, Pipe } from '@angular/core';

import { ItemsModel } from '../models/items.model';

@Pipe({
  name: 'itemsFilter',
  pure: false
})
export class ItemsFilterPipe implements PipeTransform {
  transform(items: ItemsModel[], searchText: string): any[] {

    if ( !items ) {
      return [];
    }
    if ( !searchText ) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter( ( it: ItemsModel ) => {
      return it.name.toString().toLowerCase().includes( searchText ) ||
      it.code.toString().toLowerCase().includes( searchText ) ||
      it.category.toString().toLowerCase().includes( searchText );
    });
  }
}
