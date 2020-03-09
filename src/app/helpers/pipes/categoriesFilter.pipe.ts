import { PipeTransform, Pipe } from '@angular/core';

import { CategoriesModel } from '../models/categories.model';

@Pipe({
  name: 'categoriesFilter',
  pure: false
})
export class CategoriesFilterPipe implements PipeTransform {
  transform(items: CategoriesModel[], searchText: string): any[] {

    if ( !items ) {
      return [];
    }
    if ( !searchText ) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter( ( it: CategoriesModel ) => {
      return it.categoryName.toString().toLowerCase().includes( searchText );
    });
  }
}
