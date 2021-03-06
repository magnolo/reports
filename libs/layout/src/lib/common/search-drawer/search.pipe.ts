import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], query: string, field: string = 'country_name'): any[] {
    if (!items) {
      return [];
    }
    if (!query || query.length === 0) return items;
    return items.filter((item) => {
      return item[field]
        .toLowerCase()
        .includes(query.toLocaleLowerCase());
    });
  }
}
