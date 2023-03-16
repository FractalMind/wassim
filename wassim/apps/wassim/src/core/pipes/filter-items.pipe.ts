import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';

@Pipe({
  name: 'filterItems',
})
export class FilterItemsPipe implements PipeTransform {
  transform(
    itemList: { id: number; name: string }[] | null,
    searchTerm: Observable<string | null> | undefined
  ): Array<{ id: number; name: string }> | null {
    console.log('FilterItemsPipe', searchTerm);
    // return itemList?.filter( item => item.name.includes(searchTerm || '') ) || itemList;
    // return itemList;
    // if (searchTerm == '' || searchTerm == null) {
    // lastValueFrom( searchTerm?.pipe(
    //   tap( value => { console.log('FilterItemsPipe lastValueFrom', value) })
    // ))
    return itemList;
    // } else {
    //   return itemList?.filter( item => item.name.includes( 'i') ) || itemList
    // }
  }
}
